export interface Booking {
  id?: number;
  name: string;
  phone: string;
  email: string;
  vehicle_type: string;
  make_model: string;
  service: string;
  date: string;
  time: string;
  notes?: string;
  status?: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  created_at?: string;
}

export interface ContactMessage {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  message: string;
  created_at?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  price: string;
  duration: string;
  description: string;
  features: string[];
  image: string;
  slug: string;
}
