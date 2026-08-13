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
    ],
  },
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
    ],
  },
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
    ],
  },
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
    ],
  },
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
    ],
  },
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
    ],
  },
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
    ],
  },
];
