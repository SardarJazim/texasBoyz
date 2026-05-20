import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fallback pure-JS database in case SQLite's binary/C++ module fails to load
class JsonDatabase {
  private filePath: string;
  private bookings: any[] = [];
  private contacts: any[] = [];

  constructor(filePath: string) {
    this.filePath = filePath.replace(/\.db$/, '.json');
    this.load();
  }

  private load() {
    try {
      if (fs.existsSync(this.filePath)) {
        const data = JSON.parse(fs.readFileSync(this.filePath, 'utf8'));
        this.bookings = data.bookings || [];
        this.contacts = data.contacts || [];
      } else {
        this.bookings = [];
        this.contacts = [];
        this.save();
      }
    } catch (e) {
      this.bookings = [];
      this.contacts = [];
    }
  }

  private save() {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify({
        bookings: this.bookings,
        contacts: this.contacts
      }, null, 2), 'utf8');
    } catch (e) {
      console.error('Failed to save JSON database:', e);
    }
  }

  public serialize(callback: () => void) {
    callback();
  }

  public run(query: string, params: any[], callback?: (this: any, err: Error | null) => void) {
    try {
      const lowerQuery = query.toLowerCase();
      if (lowerQuery.includes('insert into bookings')) {
        const id = this.bookings.length ? Math.max(...this.bookings.map(b => b.id || 0)) + 1 : 1;
        const newBooking = {
          id,
          name: params[0],
          phone: params[1],
          email: params[2],
          vehicle_type: params[3],
          make_model: params[4],
          service: params[5],
          date: params[6],
          time: params[7],
          notes: params[8],
          status: 'Pending',
          created_at: new Date().toISOString()
        };
        this.bookings.push(newBooking);
        this.save();
        if (callback) callback.call({ lastID: id }, null);
      } else if (lowerQuery.includes('insert into contacts')) {
        const id = this.contacts.length ? Math.max(...this.contacts.map(c => c.id || 0)) + 1 : 1;
        const newContact = {
          id,
          name: params[0],
          email: params[1],
          phone: params[2],
          message: params[3],
          created_at: new Date().toISOString()
        };
        this.contacts.push(newContact);
        this.save();
        if (callback) callback.call({ lastID: id }, null);
      } else if (lowerQuery.includes('update bookings set status')) {
        const [status, id] = params;
        const booking = this.bookings.find(b => b.id === Number(id));
        let changes = 0;
        if (booking) {
          booking.status = status;
          changes = 1;
          this.save();
        }
        if (callback) callback.call({ changes }, null);
      } else if (lowerQuery.includes('delete from bookings')) {
        const [id] = params;
        const initialLen = this.bookings.length;
        this.bookings = this.bookings.filter(b => b.id !== Number(id));
        const changes = initialLen - this.bookings.length;
        this.save();
        if (callback) callback.call({ changes }, null);
      } else {
        if (callback) callback(null);
      }
    } catch (err: any) {
      if (callback) callback(err);
    }
  }

  public all(query: string, params: any[], callback: (err: Error | null, rows: any[]) => void) {
    try {
      const lowerQuery = query.toLowerCase();
      if (lowerQuery.includes('from bookings')) {
        const sorted = [...this.bookings].sort((a, b) => {
          const compDate = a.date.localeCompare(b.date);
          if (compDate !== 0) return compDate;
          return a.time.localeCompare(b.time);
        });
        callback(null, sorted);
      } else if (lowerQuery.includes('from contacts')) {
        const sorted = [...this.contacts].sort((a, b) => b.created_at.localeCompare(a.created_at));
        callback(null, sorted);
      } else {
        callback(null, []);
      }
    } catch (err: any) {
      callback(err, []);
    }
  }

  public get(query: string, params: any[], callback: (err: Error | null, row: any) => void) {
    callback(null, { version: 'JSON-Engine-v1.0' });
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Ensure database directory exists in project root
  const dbDir = path.join(process.cwd(), 'database');
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
  const dbPath = path.join(dbDir, 'bookings.db');

  // Initialize SQLite Connection or JSON Fallback
  let db: any;
  try {
    const sqlite3Module = await import('sqlite3');
    // Deal with possible default export wrapping
    const sqlite3 = sqlite3Module.default || sqlite3Module;
    db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('❌ Error opening SQLite database:', err.message);
        console.warn('⚠️ Falling back to pure JSON Database Engine.');
        db = new JsonDatabase(dbPath);
      } else {
        console.log('✅ Connected to SQLite database at', dbPath);
        // Create tables if they do not exist
        db.serialize(() => {
          db.run(`
            CREATE TABLE IF NOT EXISTS bookings (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL,
              phone TEXT NOT NULL,
              email TEXT NOT NULL,
              vehicle_type TEXT NOT NULL,
              make_model TEXT NOT NULL,
              service TEXT NOT NULL,
              date TEXT NOT NULL,
              time TEXT NOT NULL,
              notes TEXT,
              status TEXT DEFAULT 'Pending',
              created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
          `, (err: any) => {
            if (err) console.error('Error creating bookings table:', err.message);
          });

          db.run(`
            CREATE TABLE IF NOT EXISTS contacts (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL,
              email TEXT NOT NULL,
              phone TEXT,
              message TEXT NOT NULL,
              created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
          `, (err: any) => {
            if (err) console.error('Error creating contacts table:', err.message);
          });
        });
      }
    });
  } catch (err: any) {
    console.warn('❌ SQLite Loading Failed:', err.message || err);
    console.warn('⚠️ Swapping dynamically to the pure JSON Database fallback.');
    db = new JsonDatabase(dbPath);
  }

  // ==================== API ENDPOINTS ====================

  // GET all bookings (Admin/Dashboard view)
  app.get('/api/bookings', (req, res) => {
    db.all('SELECT * FROM bookings ORDER BY date ASC, time ASC', [], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    });
  });

  // POST create booking with backend WTForms-style validation
  app.post('/api/bookings', (req, res) => {
    const { name, phone, email, vehicle_type, make_model, service, date, time, notes } = req.body;

    // Server-side validations
    if (!name || name.trim().length === 0) {
      return res.status(400).json({ error: 'Customer name is required.' });
    }
    if (!phone || phone.trim().length < 10) {
      return res.status(400).json({ error: 'A valid phone number is required (at least 10 digits).' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ error: 'A valid email address is required.' });
    }
    if (!vehicle_type) {
      return res.status(400).json({ error: 'Please select a vehicle type.' });
    }
    if (!make_model || make_model.trim().length === 0) {
      return res.status(400).json({ error: 'Vehicle Make/Model is required.' });
    }
    if (!service) {
      return res.status(400).json({ error: 'Please select a service.' });
    }
    if (!date) {
      return res.status(400).json({ error: 'Preferred appointment date is required.' });
    }
    if (!time) {
      return res.status(400).json({ error: 'Preferred time slot is required.' });
    }

    const query = `
      INSERT INTO bookings (name, phone, email, vehicle_type, make_model, service, date, time, notes, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending')
    `;
    const params = [
      name.trim(),
      phone.trim(),
      email.trim(),
      vehicle_type,
      make_model.trim(),
      service,
      date,
      time,
      notes ? notes.trim() : ''
    ];

    db.run(query, params, function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error: ' + err.message });
      }
      res.status(201).json({
        success: true,
        message: 'Your detailing appointment slot has been reserved successfully!',
        booking_id: this.lastID
      });
    });
  });

  // UPDATE booking status (Admin control)
  app.put('/api/bookings/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Pending', 'Confirmed', 'Completed', 'Cancelled'].includes(status)) {
      return res.status(400).json({ error: 'Invalid booking status.' });
    }

    db.run('UPDATE bookings SET status = ? WHERE id = ?', [status, id], function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Booking not found.' });
      }
      res.json({ success: true, message: `Booking status updated to ${status}.` });
    });
  });

  // DELETE booking (Admin control)
  app.delete('/api/bookings/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM bookings WHERE id = ?', [id], function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Booking not found.' });
      }
      res.json({ success: true, message: 'Booking reference deleted.' });
    });
  });

  // GET all contact messages (Admin review)
  app.get('/api/contacts', (req, res) => {
    db.all('SELECT * FROM contacts ORDER BY created_at DESC', [], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    });
  });

  // POST create contact message
  app.post('/api/contacts', (req, res) => {
    const { name, email, phone, message } = req.body;

    if (!name || name.trim().length === 0) {
      return res.status(400).json({ error: 'Your name is required.' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ error: 'A valid email address is required.' });
    }
    if (!message || message.trim().length === 0) {
      return res.status(400).json({ error: 'Your message cannot be empty.' });
    }

    const query = `
      INSERT INTO contacts (name, email, phone, message)
      VALUES (?, ?, ?, ?)
    `;
    const params = [
      name.trim(),
      email.trim(),
      phone ? phone.trim() : '',
      message.trim()
    ];

    db.run(query, params, function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error: ' + err.message });
      }
      res.status(201).json({
        success: true,
        message: 'Your message has been sent to our Texas Boyz crew! We will contact you shortly.',
        contact_id: this.lastID
      });
    });
  });

  // Test route for DB status
  app.get('/api/db-health', (req, res) => {
    db.get('SELECT sqlite_version() as version', [], (err, row) => {
      if (err) {
        return res.status(500).json({ status: 'unhealthy', error: err.message });
      }
      res.json({ status: 'healthy', database: 'ready', sqlite_version: row ? (row as any).version : 'unknown' });
    });
  });

  // ==================== VITE MIDDLEWARE / STATIC SERVING ====================

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve built client static assets
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Handle errors elegantly
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Unhandled Server Error: ', err);
    res.status(500).json({
      error: 'Critically slick engine failure! (500 Internal Server Error)',
      details: process.env.NODE_ENV !== 'production' ? err.message : undefined
    });
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`💀 Texas Boyz Detailing Server revving up at http://localhost:${PORT}`);
  });
}

startServer();
