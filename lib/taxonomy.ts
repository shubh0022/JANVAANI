export interface SubCategory {
  id: string;
  name: string;
  description: string;
  reportCount: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  badgeBg: string;
  reportCount: number;
  subcategories: SubCategory[];
}

export const CIVIC_TAXONOMY: Category[] = [
  // 1. Civil Infrastructure & Roads
  {
    id: 'infrastructure',
    name: 'Infrastructure & Roads',
    icon: 'Hammer',
    description: 'Roads, bridges, footpaths, street lighting, drainage and civil construction.',
    color: '#2563EB',
    badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
    reportCount: 342890,
    subcategories: [
      { id: 'potholes', name: 'Potholes & Broken Roads', description: 'Craters, uneven asphalt, dangerous road patches', reportCount: 124500 },
      { id: 'waterlogging', name: 'Waterlogging & Storm Drainage', description: 'Blocked stormwater drains, road submersion', reportCount: 98400 },
      { id: 'street-lights', name: 'Street Lights & High Masts', description: 'Non-functional, broken, or flickering streetlights', reportCount: 45200 },
      { id: 'footpaths', name: 'Footpaths & Pedestrian Access', description: 'Broken pavements, missing tactile tiles, illegal ramps', reportCount: 32100 },
      { id: 'bridges-flyovers', name: 'Bridges & Flyovers', description: 'Expansion joints, railing damage, structural issues', reportCount: 18400 },
      { id: 'illegal-encroachments', name: 'Public Space Encroachments', description: 'Footpath blocking by shops, construction dumping', reportCount: 24290 },
    ],
  },

  // 2. Public Utilities & Sanitation
  {
    id: 'public-services',
    name: 'Public Utilities & Sanitation',
    icon: 'Droplet',
    description: 'Drinking water supply, waste management, sewerage and civic sanitation.',
    color: '#059669',
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    reportCount: 289450,
    subcategories: [
      { id: 'garbage-dumping', name: 'Garbage Collection & Dumping', description: 'Uncollected bins, roadside heaps, irregular pickup', reportCount: 112000 },
      { id: 'water-supply', name: 'Drinking Water Shortage & Contamination', description: 'Dirty water, low pressure, broken pipelines', reportCount: 94500 },
      { id: 'sewage-overflow', name: 'Open Drains & Sewage Overflow', description: 'Manhole overflow, foul smell, mosquito breeding', reportCount: 54100 },
      { id: 'electricity-cuts', name: 'Power Cuts & Voltage Fluctuations', description: 'Frequent outages, dangling wires, transformer sparks', reportCount: 28850 },
      { id: 'public-toilets', name: 'Public Toilet Hygiene & Maintenance', description: 'Locked facilities, broken taps, lack of water in public urinals', reportCount: 16400 },
      { id: 'water-metering', name: 'Water Metering & Pipeline Leaks', description: 'Leaking municipal mains, faulty billing meters', reportCount: 12200 },
    ],
  },

  // 3. Healthcare & Public Health
  {
    id: 'healthcare',
    name: 'Healthcare & Hospitals',
    icon: 'HeartPulse',
    description: 'Government hospitals, primary health centers, medicines and emergency services.',
    color: '#DC2626',
    badgeBg: 'bg-red-50 text-red-700 border-red-200',
    reportCount: 142100,
    subcategories: [
      { id: 'hospital-care', name: 'Hospital Services & Hygiene', description: 'Doctor unavailability, bed shortage, dirty wards', reportCount: 58900 },
      { id: 'medicine-stock', name: 'Essential Medicine Shortage', description: 'Generic medicine unavailability in Jan Aushadhi / PHC', reportCount: 38200 },
      { id: 'vector-borne', name: 'Dengue & Malaria Outbreaks', description: 'Unsprayed stagnant water, fogging required', reportCount: 24800 },
      { id: 'ambulance', name: 'Emergency & Ambulance Delays', description: '108 ambulance response delays, emergency ward denial', reportCount: 20200 },
      { id: 'ayushman-bharat', name: 'Ayushman Card / PMJAY Denial', description: 'Empanelled hospitals denying cashless treatment', reportCount: 14500 },
      { id: 'blood-bank', name: 'Blood Bank Emergency Availability', description: 'Stock shortages, replacement blood donation friction', reportCount: 8900 },
    ],
  },

  // 4. Education & Anganwadis
  {
    id: 'education',
    name: 'Education & Youth',
    icon: 'GraduationCap',
    description: 'Schools, colleges, midday meals, scholarships and exam management.',
    color: '#7C3AED',
    badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
    reportCount: 118400,
    subcategories: [
      { id: 'school-infra', name: 'School Infrastructure & Toilets', description: 'Missing desks, broken classrooms, non-functional toilets', reportCount: 45200 },
      { id: 'midday-meal', name: 'Midday Meal Quality', description: 'Uncooked or substandard food in government schools', reportCount: 26400 },
      { id: 'scholarships', name: 'Scholarship Disbursal Delays', description: 'State/National scholarship fund transfer issues', reportCount: 28100 },
      { id: 'teacher-shortage', name: 'Teacher Absence & Faculty Shortage', description: 'Lack of subject teachers in rural/urban schools', reportCount: 18700 },
      { id: 'anganwadi-nutrition', name: 'Anganwadi Nutrition & Child Care', description: 'Ration delivery gaps, center building dilapidation', reportCount: 12400 },
      { id: 'exam-centers', name: 'Examination Center Infrastructure', description: 'Power failures, lack of drinking water during board exams', reportCount: 9200 },
    ],
  },

  // 5. Mobility & Public Transport
  {
    id: 'transport',
    name: 'Mobility & Public Transport',
    icon: 'Bus',
    description: 'City buses, metro, railway stations, traffic safety and signals.',
    color: '#EA580C',
    badgeBg: 'bg-orange-50 text-orange-700 border-orange-200',
    reportCount: 165800,
    subcategories: [
      { id: 'bus-frequency', name: 'City Bus Delays & Overcrowding', description: 'Missing routes, GPS tracking broken, irregular buses', reportCount: 62400 },
      { id: 'traffic-signals', name: 'Broken Traffic Signals & Congestion', description: 'Faulty timer, dead signals, chaotic intersections', reportCount: 48900 },
      { id: 'railway-station', name: 'Railway Amenities & Cleanliness', description: 'Platform hygiene, missing display boards, water taps', reportCount: 31200 },
      { id: 'auto-overcharging', name: 'Auto/Taxi Fare Harassment', description: 'Refusal to use meter, overcharging at transit hubs', reportCount: 23300 },
      { id: 'speed-breakers', name: 'Unmarked Speed Breakers', description: 'Non-standard hazardous humps causing spine injuries', reportCount: 18200 },
      { id: 'parking-chaos', name: 'Illegal & Chaotic Parking', description: 'Commercial vehicle parking choking arterial residential lanes', reportCount: 14500 },
    ],
  },

  // 6. Environment & Air Quality
  {
    id: 'environment',
    name: 'Environment & Climate',
    icon: 'TreePine',
    description: 'Air pollution, industrial emissions, lake restoration and green cover.',
    color: '#16A34A',
    badgeBg: 'bg-green-50 text-green-700 border-green-200',
    reportCount: 89300,
    subcategories: [
      { id: 'air-quality', name: 'Air Pollution & Biomass Burning', description: 'Garbage burning smoke, construction dust violations', reportCount: 38400 },
      { id: 'water-bodies', name: 'Lake & River Pollution', description: 'Industrial effluent discharge, sewage let into lakes', reportCount: 27100 },
      { id: 'illegal-tree-cutting', name: 'Illegal Tree Felling', description: 'Unauthorized chopping of trees without municipal permit', reportCount: 14600 },
      { id: 'noise-pollution', name: 'Industrial & Night Noise', description: 'Loudspeakers beyond 10 PM, heavy machinery noise', reportCount: 9200 },
      { id: 'groundwater-depletion', name: 'Groundwater Over-Extraction', description: 'Illegal commercial borewells drying community aquifers', reportCount: 7800 },
      { id: 'urban-heat', name: 'Lack of Tree Canopy & Heat Island', description: 'Concrete expanses without shade along transit corridors', reportCount: 5600 },
    ],
  },

  // 7. Agriculture & Irrigation
  {
    id: 'agriculture',
    name: 'Agriculture & Rural Support',
    icon: 'Tractor',
    description: 'Canal irrigation, fertilizer availability, mandi market rates and PM-Kisan.',
    color: '#CA8A04',
    badgeBg: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    reportCount: 76500,
    subcategories: [
      { id: 'irrigation-canal', name: 'Canal Water Release & Siltation', description: 'Dry sub-canals, tail-end farmers not receiving water', reportCount: 31400 },
      { id: 'fertilizer-black-market', name: 'Urea & DAP Supply Issues', description: 'Shortage or mandatory bundling at cooperative societies', reportCount: 22800 },
      { id: 'crop-damage-survey', name: 'Crop Loss Survey Delays', description: 'Untimely disaster assessment for PM Fasal Bima', reportCount: 14100 },
      { id: 'panchayat-grants', name: 'Panchayat Fund Transparency', description: 'Village road and water tank work accountability', reportCount: 8200 },
      { id: 'mandi-weighing', name: 'Mandi APMC Weighing Malpractices', description: 'Unfair deductions or delay in DBT payment to farmers', reportCount: 6800 },
      { id: 'soil-health-card', name: 'Soil Testing Lab Inaccessibility', description: 'Delayed reports leading to improper NPK usage', reportCount: 4200 },
    ],
  },

  // 8. Public Safety & Emergency
  {
    id: 'public-safety',
    name: 'Public Safety & Emergency',
    icon: 'ShieldAlert',
    description: 'Women safety on streets, dark spots, cyber fraud, fire safety violations.',
    color: '#475569',
    badgeBg: 'bg-slate-50 text-slate-700 border-slate-200',
    reportCount: 64200,
    subcategories: [
      { id: 'dark-spots', name: 'Dark Spots & Unsafe Stretches', description: 'Poor lighting creating unsafe zones for women and elderly', reportCount: 28400 },
      { id: 'cyber-scams', name: 'Civic Cyber Fraud & Phishing', description: 'Fake electricity bill SMS, government scheme impersonation', reportCount: 19800 },
      { id: 'fire-hazards', name: 'Commercial Fire Safety Violations', description: 'Blocked fire exits, missing extinguishers in coaching hubs', reportCount: 16000 },
      { id: 'stray-dogs', name: 'Stray Dog Menace & Rabies Risk', description: 'Aggressive packs near schools, missing animal birth control', reportCount: 14200 },
      { id: 'cctv-blindspots', name: 'CCTV Outages at Key Intersections', description: 'Defective surveillance cameras at crime-prone junctions', reportCount: 9500 },
    ],
  },

  // 9. Digital Services & Telecom
  {
    id: 'digital-services',
    name: 'Digital Services & Telecom',
    icon: 'Wifi',
    description: 'Internet connectivity, mobile towers, online portal downtime, and CSC centers.',
    color: '#0284C7',
    badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
    reportCount: 41200,
    subcategories: [
      { id: 'portal-downtime', name: 'Govt Portal Server Outages', description: 'Server crashes during property tax or ration card deadlines', reportCount: 18400 },
      { id: 'broadband-cuts', name: 'Optical Fiber Cable Cuts', description: 'Unauthorized road digging snapping residential fiber', reportCount: 12200 },
      { id: 'csc-overcharging', name: 'Common Service Center (CSC) Overcharging', description: 'Charging excess fees for Aadhaar update/caste certificates', reportCount: 10600 },
    ],
  },

  // 10. Revenue, Land & Documentation
  {
    id: 'governance-documentation',
    name: 'Governance & Documentation',
    icon: 'FileText',
    description: 'Birth/Death certificates, property registration, 7/12 extracts, ration cards.',
    color: '#4F46E5',
    badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    reportCount: 52100,
    subcategories: [
      { id: 'certificate-delays', name: 'Birth / Death Certificate Delays', description: 'Months of pendency at municipal citizen service centers', reportCount: 22400 },
      { id: 'ration-card-split', name: 'Ration Card Member Addition', description: 'Rejection of valid applications for food security ration cards', reportCount: 16800 },
      { id: 'land-record-errors', name: 'Land Record & Mutation Errors', description: 'Clerical errors in RoR (Record of Rights) / 7/12 extracts', reportCount: 12900 },
    ],
  },

  // 11. Housing & Urban Habitat
  {
    id: 'housing',
    name: 'Housing & Slum Rehabilitation',
    icon: 'Home',
    description: 'PMAY housing quality, slum redevelopment, RWA governance, building safety.',
    color: '#D97706',
    badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
    reportCount: 38400,
    subcategories: [
      { id: 'pmay-construction', name: 'PMAY Flat Handover Delays', description: 'Substandard plastering, missing water connections in urban housing', reportCount: 17400 },
      { id: 'dilapidated-buildings', name: 'Dangerous / Dilapidated Structures', description: 'Monsoon collapse hazard notice compliance', reportCount: 12800 },
      { id: 'rwa-disputes', name: 'Builder Handover & Maintenance Disputes', description: 'Builder non-transfer of corpus fund to resident welfare societies', reportCount: 8200 },
    ],
  },

  // 12. Accessibility & Disability Rights
  {
    id: 'accessibility',
    name: 'Disability Access & Inclusion',
    icon: 'Accessibility',
    description: 'Wheelchair ramps, tactile pathways, accessible transit, disability pensions.',
    color: '#0D9488',
    badgeBg: 'bg-teal-50 text-teal-700 border-teal-200',
    reportCount: 24100,
    subcategories: [
      { id: 'wheelchair-ramps', name: 'Missing Govt Building Wheelchair Ramps', description: 'Steep staircases without accessible ramps or elevators', reportCount: 11200 },
      { id: 'accessible-buses', name: 'Low-Floor Accessible Bus Gaps', description: 'Lack of hydraulic ramps for wheelchair users at bus stops', reportCount: 7800 },
      { id: 'udid-pension', name: 'UDID Card & Disability Pension Gaps', description: 'Delays in monthly financial aid disbursal to Divyang citizens', reportCount: 5100 },
    ],
  },

  // 13. Labor, Employment & Gig Workers
  {
    id: 'labor-employment',
    name: 'Labor, Employment & Gig Workers',
    icon: 'Briefcase',
    description: 'Minimum wages, e-Shram worker benefits, unorganized labor safety.',
    color: '#6366F1',
    badgeBg: 'bg-violet-50 text-violet-700 border-violet-200',
    reportCount: 29800,
    subcategories: [
      { id: 'construction-safety', name: 'Construction Worker Safety Violations', description: 'Missing safety harnesses, helmets, lack of onsite first aid', reportCount: 13400 },
      { id: 'eshram-benefits', name: 'e-Shram Social Security Enrolment', description: 'Assistance in unorganized worker insurance claim processing', reportCount: 9200 },
      { id: 'gig-worker-rest', name: 'Gig Worker Rest Facilities', description: 'Lack of municipal hydration and sanitation stations for delivery partners', reportCount: 7200 },
    ],
  },

  // 14. Consumer Rights & Fair Trade
  {
    id: 'consumer-protection',
    name: 'Consumer Protection & Standards',
    icon: 'Scale',
    description: 'MRP violations, adulterated food, LPG cylinder delivery overcharging.',
    color: '#84CC16',
    badgeBg: 'bg-lime-50 text-lime-800 border-lime-200',
    reportCount: 31200,
    subcategories: [
      { id: 'lpg-overcharging', name: 'LPG Cylinder Delivery Tips Extortion', description: 'Demanding cash above invoiced price for domestic gas cylinders', reportCount: 14800 },
      { id: 'food-adulteration', name: 'Food Adulteration & FSSAI Inspection', description: 'Synthetic milk, spoiled sweets, unhygienic restaurant kitchens', reportCount: 11400 },
      { id: 'weights-measures', name: 'Petrol Pump / Grocery Weighing Fraud', description: 'Tampered electronic scales dispensing less fuel or grain', reportCount: 5000 },
    ],
  },

  // 15. Disaster & Flood Resilience
  {
    id: 'disaster-management',
    name: 'Disaster Management & Flood Relief',
    icon: 'Waves',
    description: 'River embankment breaches, cyclone shelters, flood dewatering pumps.',
    color: '#0891B2',
    badgeBg: 'bg-cyan-50 text-cyan-800 border-cyan-200',
    reportCount: 26400,
    subcategories: [
      { id: 'dewatering-pumps', name: 'Underpass Dewatering Pump Breakdowns', description: 'Submerged underpasses trapping vehicles during heavy rainfall', reportCount: 12800 },
      { id: 'bund-erosion', name: 'River Embankment & Bund Weakening', description: 'Soil erosion threatening low-lying slum habitations', reportCount: 8400 },
      { id: 'siren-alert-systems', name: 'Disaster Siren & Warning Systems', description: 'Non-operational sirens before upstream dam water discharge', reportCount: 5200 },
    ],
  },

  // 16. Heritage, Culture & Sports
  {
    id: 'heritage-sports',
    name: 'Heritage, Culture & Sports',
    icon: 'Trophy',
    description: 'Preservation of monuments, public playgrounds, stadium facilities for youth.',
    color: '#F43F5E',
    badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
    reportCount: 18900,
    subcategories: [
      { id: 'monument-vandalism', name: 'Heritage Stepwell & Monument Neglect', description: 'Garbage dumping inside historic stepwells and heritage gates', reportCount: 8600 },
      { id: 'playground-encroachment', name: 'Public Playground Encroachments', description: 'Children playgrounds turned into vehicle scrap dumps', reportCount: 6400 },
      { id: 'stadium-amenities', name: 'Municipal Sports Complex Maintenance', description: 'Broken synthetic tracks, unmaintained swimming pools', reportCount: 3900 },
    ],
  },
];
