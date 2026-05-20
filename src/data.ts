import { ServiceItem } from './types';

export const SERVICES: ServiceItem[] = [
  {
    id: 's1',
    title: 'Interior Detailing',
    price: '$150+',
    duration: '2 - 3 Hours',
    slug: 'interior-detailing',
    description: 'Deep decontamination, extraction, and steam cleaning of all fabric, leather, carpets, and dashboard surfaces. We pull out the grime you didn\'t even know was there.',
    features: [
      'Deep steam cleaning & sanitation',
      'Hot water carpet extraction',
      'Leather treatment & conditioning',
      'Intricate dashboard, vents & console detailing',
      'Odor eliminator & headliner refresh',
      'Pet hair removal & thorough vacuuming'
    ],
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 's2',
    title: 'Exterior Detail & Wash',
    price: '$100+',
    duration: '1.5 - 2 Hours',
    slug: 'exterior-detailing',
    description: 'Multi-stage foam bath, clay bar decontamination, iron remover, and spray wax sealant. Reclaim that glossy slick mirror reflectivity and repel the elements.',
    features: [
      'Two-bucket hand wash & active foam bath',
      'Clay bar decontamination & iron treatment',
      'Wheel barrels, wheel arches & tire cleaning',
      'Slick silica spray sealant (3-month protection)',
      'Exterior glass, trim, & exhaust tips polished',
      'Microfiber blow dry to prevent water spots'
    ],
    image: 'https://images.unsplash.com/photo-1520116467521-81284722c5b3?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 's3',
    title: 'Full Detail Packages',
    price: '$225+',
    duration: '4 - 5 Hours',
    slug: 'full-detail',
    description: 'The ultimate resurrection. Combination of our signature Interior and Exterior detailing services for a total vehicle reboot. Restores that brand-new showroom feel inside and out.',
    features: [
      'Everything in Interior Detailing',
      'Everything in Exterior Detailing',
      'Engine bay basic wipe down & dressing',
      'Door jambs degreased & polished',
      'Premium hydrophobic paint sealant applied',
      'Complementary air freshener bomb'
    ],
    image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d59085?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 's4',
    title: 'Ceramic Coating',
    price: '$650+',
    duration: '1 - 2 Days',
    slug: 'ceramic-coating',
    description: 'Long-term professional paint armor. We apply hard-layered nano-ceramics that chemically bond with your clearcoat, shielding it from UV rays, acid rain, bird droppings, and light scratches.',
    features: [
      'Multi-stage deep paint prep & wash',
      'Compulsory clay bar & iron bath chemical prep',
      'Includes single-stage paint correction polish',
      '9H hardness ceramic coating application',
      'Hydrophobic self-cleaning water contact angles',
      '3-Year or 5-Year guaranteed protection options'
    ],
    image: '/src/assets/images/perfect_finish_1779289609638.png'
  },
  {
    id: 's5',
    title: 'Paint Correction',
    price: '$300+',
    duration: '6 - 12 Hours',
    slug: 'paint-correction',
    description: 'Resurrect faded, scratched, or swirled paint. We use leveling compounds and dual-action rotary polishers to cut micro-scratches out of your clear coat, restoring flawless gloss.',
    features: [
      'Paint depth thickness gauge check',
      'Single-stage or multi-stage leveling cuts',
      'Eliminates 75% to 90%+ of all swirl marks',
      'Removes water spot etching & paint haziness',
      'Polished to a brilliant liquid mirror gloss',
      'Prepared perfectly for sealants or ceramic coating'
    ],
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 's6',
    title: 'Headlight Restoration',
    price: '$80',
    duration: '1 Hour',
    slug: 'headlight-restoration',
    description: 'Resurrect yellowed, oxidation-fogged headlamps with wet sanding, compound leveling, clear polishing, and a heavy-duty UV blocker clearcoat wrap to keep them crystal-clear.',
    features: [
      'Wet sanding of heavy yellow oxidation (800-3000 grit)',
      'Compounding & micro-polishing stage',
      'Removes foggy glare for safer night driving',
      'Clear protective ceramic sealant wrap',
      'Increases beam projection & brightness',
      'Lifetime warranty against re-oxidation'
    ],
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 's7',
    title: 'Engine Bay Detailing',
    price: '$100',
    duration: '1 - 1.5 Hours',
    slug: 'engine-bay',
    description: 'Meticulous grease & grime extraction. We cover sensitive electrical layout, foam scrub with specialized degreasers, steam clean crevices, dry-blow, and dress plastics in premium matte protector.',
    features: [
      'Alternator & electronics layout safety wrap',
      'Heavy-duty safe degreasing foam wash',
      'Steam detail of baked-on dirt & leaves',
      'Microfiber blow dry (no water pool left behind)',
      'Plastic, rubber & composite protective dressing',
      'Improves heat dissipation & aesthetics'
    ],
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 's8',
    title: 'Mobile Detailing Crew',
    price: '+$50 Service Fee',
    duration: 'Any Service duration',
    slug: 'mobile-detailing',
    description: 'We bring the shop directly to your driveway! Equipped with on-board filtered pure water, professional generator power, and full detailing toolkit. Ultimate convenience.',
    features: [
      'Full service directly at your home or office',
      'Equipped with on-board water & quiet generators',
      'No water or electricity hooks required from you',
      'Available across Longview and East Texas area',
      'Flexible scheduling to fit your busy hours',
      'Eco-friendly water runoff control guards'
    ],
    image: '/src/assets/images/spooky_garage_1779289637192.png'
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Michael R.',
    location: 'Longview, TX',
    stars: 5,
    date: 'May 12, 2026',
    comment: 'Texas Boyz resurrected my black Dodge Charger! The ceramic coating is so slick water won\'t even stick to it. The spooky gothic detailing vibe is super cool but their work is extremely professional and premium. 10/10 recommend!',
    vehicle: '2023 Dodge Charger SRT'
  },
  {
    id: 2,
    name: 'Amanda K.',
    location: 'Gladewater, TX',
    stars: 5,
    date: 'April 28, 2026',
    comment: 'My kids had destroyed the interior of my Ford Explorer. They steam cleaned and extracted every stain from the carpets, and it smells amazing. Hard to believe it is the same car! They lived up to the street style branding - high quality and aggressive stance on clean!',
    vehicle: '2021 Ford Explorer'
  },
  {
    id: 3,
    name: 'Jared T.',
    location: 'Kilgore, TX',
    stars: 5,
    date: 'May 05, 2026',
    comment: 'Paint correction and ceramic detail was perfect. Every single swirl mark from the previous owner\'s automatic car washes is completely gone. Their mobile rig holds pure spot-free water. Unbelievable work, thank you guys!',
    vehicle: '2022 Chevrolet Corvette Stingray'
  }
];

export const STATS = [
  { label: 'Vehicles resurrected', count: 1250, suffix: '+' },
  { label: 'Ceramic Coatings applied', count: 320, suffix: '+' },
  { label: 'Hours of Detailing Care', count: 5000, suffix: '+' },
  { label: 'Five-Star Reviews', count: 480, suffix: '+' }
];

export const BEFORE_AFTER_GALLERY = [
  {
    id: 'g1',
    title: 'Hood Paint Correction',
    desc: 'Heavy swirl marks removed and restored to high gloss mirror reflection.',
    before: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&q=80&w=800',
    after: '/src/assets/images/perfect_finish_1779289609638.png'
  },
  {
    id: 'g2',
    title: 'Dirty SUV Carpet Extraction',
    desc: 'Deep mud and soda extraction restore fabric to clean matte texture.',
    before: 'https://images.unsplash.com/photo-1599256872237-5dcc0fbe966a?auto=format&fit=crop&q=80&w=800',
    after: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'g3',
    title: 'Cloudy Headlight Sanding',
    desc: 'Heavily oxidized lenses sanded, polished, and coated crystal clear.',
    before: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=600',
    after: 'https://images.unsplash.com/photo-1549399542-7ee3dc1d962e?auto=format&fit=crop&q=80&w=600'
  }
];
