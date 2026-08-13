export type RepresentativeLevel = 'mp' | 'mla' | 'corporator' | 'officer';

export interface Representative {
  id: string;
  name: string;
  role: string; // e.g. "Member of Parliament (Lok Sabha)", "Member of Legislative Assembly (MLA)", "Municipal Councillor / Corporator", "Municipal Commissioner (IAS)"
  level: RepresentativeLevel;
  party?: string;
  partySymbol?: string;
  avatar: string;
  state: string;
  district: string;
  taluka?: string;
  constituencyOrWard: string;
  wardNumber?: string;
  zone?: string;
  officeAddress: string;
  contactPhone: string;
  whatsappHelpline: string;
  officialEmail: string;
  publicCallingHours: string;
  attendanceRate?: number; // e.g. 94%
  ladFundAllocatedCr?: number; // e.g. 5.0 (₹ Cr)
  ladFundUtilizedCr?: number; // e.g. 4.65 (₹ Cr)
  ladFundUtilizationPercent?: number; // e.g. 93%
  grievancesResolvedRate: number; // e.g. 88.5%
  citizenRating: number; // e.g. 4.4 out of 5
  totalCitizenInterventions: number;
  openGrievanceCount: number;
  declaredAssetsCr?: number; // e.g. 8.4 (₹ Cr)
  criminalCasesCount?: number; // ADR transparency data
  term: string; // e.g. "2024 – 2029"
  keyInitiatives: string[];
}

export interface WardLeadershipComposite {
  wardNumber: string;
  wardName: string;
  district: string;
  state: string;
  corporator: Representative;
  wardEngineer: Representative;
  mla: Representative;
  mp: Representative;
}

export const ALL_REPRESENTATIVES: Representative[] = [
  // ==========================================
  // 🇮🇳 MEMBERS OF PARLIAMENT (LOK SABHA / RAJYA SABHA)
  // ==========================================
  {
    id: 'rep_mp_vadodara',
    name: 'Dr. Hemang Joshi',
    role: 'Member of Parliament (Lok Sabha)',
    level: 'mp',
    party: 'Bharatiya Janata Party (BJP)',
    partySymbol: '🪷',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    state: 'Gujarat',
    district: 'Vadodara',
    taluka: 'Vadodara City & Rural',
    constituencyOrWard: 'Vadodara Parliamentary Constituency (#20)',
    officeAddress: 'Parliamentary Nodal Office, Near Race Course Circle, Alkapuri, Vadodara, Gujarat 390007',
    contactPhone: '+91 265 233 4488',
    whatsappHelpline: '+91 94260 11223',
    officialEmail: 'hemang.joshi.mp@sansad.nic.in',
    publicCallingHours: 'Mon-Fri: 10:00 AM - 1:00 PM',
    attendanceRate: 96,
    ladFundAllocatedCr: 5.0,
    ladFundUtilizedCr: 4.78,
    ladFundUtilizationPercent: 95.6,
    grievancesResolvedRate: 89.2,
    citizenRating: 4.5,
    totalCitizenInterventions: 3420,
    openGrievanceCount: 84,
    declaredAssetsCr: 6.2,
    criminalCasesCount: 0,
    term: '2024 – 2029',
    keyInitiatives: [
      'Vishwamitri Riverfront Restoration & Stormwater Catchment Channeling',
      'Vadodara Smart Railway Station Multi-Modal Transit Hub',
      'AI-Powered Urban Heat Island Reduction Project',
    ],
  },
  {
    id: 'rep_mp_ahmedabad_east',
    name: 'Shri Hasmukhbhai Patel',
    role: 'Member of Parliament (Lok Sabha)',
    level: 'mp',
    party: 'Bharatiya Janata Party (BJP)',
    partySymbol: '🪷',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    state: 'Gujarat',
    district: 'Ahmedabad',
    taluka: 'Ahmedabad East',
    constituencyOrWard: 'Ahmedabad East Parliamentary Constituency (#07)',
    officeAddress: 'MP Public Grievance Office, Nikol Road, Ahmedabad, Gujarat 382350',
    contactPhone: '+91 79 2281 9900',
    whatsappHelpline: '+91 98250 88990',
    officialEmail: 'hasmukh.patel.mp@sansad.nic.in',
    publicCallingHours: 'Mon-Sat: 11:00 AM - 2:00 PM',
    attendanceRate: 92,
    ladFundAllocatedCr: 5.0,
    ladFundUtilizedCr: 4.52,
    ladFundUtilizationPercent: 90.4,
    grievancesResolvedRate: 86.4,
    citizenRating: 4.3,
    totalCitizenInterventions: 4120,
    openGrievanceCount: 112,
    declaredAssetsCr: 9.8,
    criminalCasesCount: 0,
    term: '2024 – 2029',
    keyInitiatives: [
      'Kharicut Canal Underground Drainage & Beautification Project',
      'Ring Road Congestion Mitigation Flyovers',
    ],
  },
  {
    id: 'rep_mp_mumbai_south',
    name: 'Adv. Arvind Sawant',
    role: 'Member of Parliament (Lok Sabha)',
    level: 'mp',
    party: 'Shiv Sena (UBT)',
    partySymbol: '🔥',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    state: 'Maharashtra',
    district: 'Mumbai',
    taluka: 'Mumbai City',
    constituencyOrWard: 'Mumbai South Parliamentary Constituency (#31)',
    officeAddress: 'Shivaji Park Public Office, Dadar West, Mumbai 400028',
    contactPhone: '+91 22 2430 5566',
    whatsappHelpline: '+91 98200 44556',
    officialEmail: 'arvind.sawant.mp@sansad.nic.in',
    publicCallingHours: 'Mon-Fri: 10:00 AM - 12:30 PM',
    attendanceRate: 94,
    ladFundAllocatedCr: 5.0,
    ladFundUtilizedCr: 4.85,
    ladFundUtilizationPercent: 97.0,
    grievancesResolvedRate: 91.0,
    citizenRating: 4.6,
    totalCitizenInterventions: 5280,
    openGrievanceCount: 95,
    declaredAssetsCr: 4.5,
    criminalCasesCount: 0,
    term: '2024 – 2029',
    keyInitiatives: [
      'Coastal Road Green Buffer Restoration',
      'Heritage Water Pipeline Structural Audits',
    ],
  },
  {
    id: 'rep_mp_bengaluru_south',
    name: 'Tejasvi Surya',
    role: 'Member of Parliament (Lok Sabha)',
    level: 'mp',
    party: 'Bharatiya Janata Party (BJP)',
    partySymbol: '🪷',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    taluka: 'Bengaluru South',
    constituencyOrWard: 'Bengaluru South Parliamentary Constituency (#26)',
    officeAddress: 'MP Constituency Office, 10th Cross, Jayanagar 2nd Block, Bengaluru 560011',
    contactPhone: '+91 80 2656 7788',
    whatsappHelpline: '+91 99000 11223',
    officialEmail: 'office@tejasvisurya.in',
    publicCallingHours: 'Mon-Sat: 9:30 AM - 1:00 PM',
    attendanceRate: 95,
    ladFundAllocatedCr: 5.0,
    ladFundUtilizedCr: 4.90,
    ladFundUtilizationPercent: 98.0,
    grievancesResolvedRate: 92.8,
    citizenRating: 4.7,
    totalCitizenInterventions: 6840,
    openGrievanceCount: 68,
    declaredAssetsCr: 3.8,
    criminalCasesCount: 0,
    term: '2024 – 2029',
    keyInitiatives: [
      'Suburban Rail Corridor & Namma Metro Phase 3 Integration',
      'Lake Rejuvenation & Stormwater Artificial Recharge Wells',
    ],
  },

  // ==========================================
  // 📜 MEMBERS OF LEGISLATIVE ASSEMBLY (MLAs)
  // ==========================================
  {
    id: 'rep_mla_sayajigunj',
    name: 'Keyur Rokadiya',
    role: 'Member of Legislative Assembly (MLA)',
    level: 'mla',
    party: 'Bharatiya Janata Party (BJP)',
    partySymbol: '🪷',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
    state: 'Gujarat',
    district: 'Vadodara',
    taluka: 'Vadodara City',
    constituencyOrWard: 'Sayajigunj Assembly Constituency (#141)',
    officeAddress: 'MLA Office, Near Sayaji Garden, Kala Ghoda, Vadodara, Gujarat 390001',
    contactPhone: '+91 265 241 1234',
    whatsappHelpline: '+91 98795 22334',
    officialEmail: 'keyur.rokadiya.mla@gujaratassembly.gov.in',
    publicCallingHours: 'Mon-Sat: 10:00 AM - 1:30 PM',
    attendanceRate: 98,
    ladFundAllocatedCr: 3.5,
    ladFundUtilizedCr: 3.32,
    ladFundUtilizationPercent: 94.8,
    grievancesResolvedRate: 90.4,
    citizenRating: 4.6,
    totalCitizenInterventions: 2150,
    openGrievanceCount: 42,
    declaredAssetsCr: 4.1,
    criminalCasesCount: 0,
    term: '2022 – 2027',
    keyInitiatives: [
      'Sayajigunj & MS University Footpath Modernization & Cycling Tracks',
      'Underground Drainage Pumping Station Capacity Expansion',
    ],
  },
  {
    id: 'rep_mla_raopura',
    name: 'Balkrishna Shukla',
    role: 'Member of Legislative Assembly (MLA)',
    level: 'mla',
    party: 'Bharatiya Janata Party (BJP)',
    partySymbol: '🪷',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    state: 'Gujarat',
    district: 'Vadodara',
    taluka: 'Vadodara City',
    constituencyOrWard: 'Raopura Assembly Constituency (#144)',
    officeAddress: 'MLA Office, Jubelibaug Complex, Raopura, Vadodara 390001',
    contactPhone: '+91 265 242 8877',
    whatsappHelpline: '+91 98240 55667',
    officialEmail: 'balkrishna.shukla@gujaratassembly.gov.in',
    publicCallingHours: 'Daily: 11:00 AM - 2:00 PM',
    attendanceRate: 91,
    ladFundAllocatedCr: 3.5,
    ladFundUtilizedCr: 3.15,
    ladFundUtilizationPercent: 90.0,
    grievancesResolvedRate: 85.2,
    citizenRating: 4.2,
    totalCitizenInterventions: 1890,
    openGrievanceCount: 56,
    declaredAssetsCr: 5.4,
    criminalCasesCount: 0,
    term: '2022 – 2027',
    keyInitiatives: [
      'Heritage Old City Overhead Wire Underground Cabling Project',
      'Water Tank Storage Expansion at Panigate',
    ],
  },
  {
    id: 'rep_mla_akota',
    name: 'Chaitanya Desai',
    role: 'Member of Legislative Assembly (MLA)',
    level: 'mla',
    party: 'Bharatiya Janata Party (BJP)',
    partySymbol: '🪷',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80',
    state: 'Gujarat',
    district: 'Vadodara',
    taluka: 'Vadodara City',
    constituencyOrWard: 'Akota Assembly Constituency (#143)',
    officeAddress: 'MLA Public Relations Office, Productivity Road, Akota, Vadodara 390020',
    contactPhone: '+91 265 235 9900',
    whatsappHelpline: '+91 94270 33445',
    officialEmail: 'chaitanya.desai.mla@gujaratassembly.gov.in',
    publicCallingHours: 'Mon-Fri: 9:30 AM - 12:30 PM',
    attendanceRate: 93,
    ladFundAllocatedCr: 3.5,
    ladFundUtilizedCr: 3.28,
    ladFundUtilizationPercent: 93.7,
    grievancesResolvedRate: 88.0,
    citizenRating: 4.4,
    totalCitizenInterventions: 1640,
    openGrievanceCount: 38,
    declaredAssetsCr: 7.2,
    criminalCasesCount: 0,
    term: '2022 – 2027',
    keyInitiatives: [
      'Akota-Dandia Bazaar Bridge Traffic Optimization & Smart Lights',
      'Gotri Lake Rainwater Harvesting Basin',
    ],
  },
  {
    id: 'rep_mla_manjalpur',
    name: 'Yogesh Patel',
    role: 'Member of Legislative Assembly (MLA)',
    level: 'mla',
    party: 'Bharatiya Janata Party (BJP)',
    partySymbol: '🪷',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80',
    state: 'Gujarat',
    district: 'Vadodara',
    taluka: 'Vadodara South',
    constituencyOrWard: 'Manjalpur Assembly Constituency (#145)',
    officeAddress: 'MLA Office, GIDC Cross Roads, Manjalpur, Vadodara 390011',
    contactPhone: '+91 265 264 4555',
    whatsappHelpline: '+91 98251 66778',
    officialEmail: 'yogesh.patel.mla@gujaratassembly.gov.in',
    publicCallingHours: 'Mon-Sat: 10:30 AM - 1:30 PM',
    attendanceRate: 96,
    ladFundAllocatedCr: 3.5,
    ladFundUtilizedCr: 3.42,
    ladFundUtilizationPercent: 97.7,
    grievancesResolvedRate: 93.1,
    citizenRating: 4.7,
    totalCitizenInterventions: 2840,
    openGrievanceCount: 29,
    declaredAssetsCr: 3.6,
    criminalCasesCount: 0,
    term: '2022 – 2027',
    keyInitiatives: [
      'Manjalpur Stormwater Canal Desilting & RCC Lining',
      'Solar Rooftop Grid Subsidy Push for RWAs',
    ],
  },

  // ==========================================
  // 🏛️ MUNICIPAL COUNCILLORS / CORPORATORS (WARD LEVEL)
  // ==========================================
  {
    id: 'rep_corp_w07_1',
    name: 'Shri Manoj Patel (Karelibaug)',
    role: 'Municipal Councillor / Corporator',
    level: 'corporator',
    party: 'Bharatiya Janata Party (BJP)',
    partySymbol: '🪷',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
    state: 'Gujarat',
    district: 'Vadodara',
    taluka: 'Vadodara City',
    constituencyOrWard: 'Ward 7 (Karelibaug & VIP Road)',
    wardNumber: 'Ward 07',
    zone: 'East Zone',
    officeAddress: 'Ward 7 Municipal Ward Office, Near Amrapali Complex, Karelibaug, Vadodara 390018',
    contactPhone: '+91 265 248 7766',
    whatsappHelpline: '+91 98980 12345',
    officialEmail: 'manoj.patel.ward07@vmc.gov.in',
    publicCallingHours: 'Mon-Sat: 9:00 AM - 12:00 PM & 5:00 PM - 7:00 PM',
    grievancesResolvedRate: 92.4,
    citizenRating: 4.6,
    totalCitizenInterventions: 860,
    openGrievanceCount: 14,
    term: '2021 – 2026',
    keyInitiatives: [
      '7th Street Stormwater Inundation Sump Pump Installation',
      'VIP Road High-Mast LED Conversion & Garbage Blackspot Elimination',
    ],
  },
  {
    id: 'rep_corp_w04_1',
    name: 'Smt. Seema K. Dave',
    role: 'Municipal Councillor / Corporator',
    level: 'corporator',
    party: 'Bharatiya Janata Party (BJP)',
    partySymbol: '🪷',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    state: 'Gujarat',
    district: 'Vadodara',
    taluka: 'Vadodara City',
    constituencyOrWard: 'Ward 4 (Sayajigunj & Station)',
    wardNumber: 'Ward 04',
    zone: 'Central Zone',
    officeAddress: 'Ward 4 Administrative Office, Station Road, Sayajigunj, Vadodara 390005',
    contactPhone: '+91 265 236 4433',
    whatsappHelpline: '+91 98254 33221',
    officialEmail: 'seema.dave.ward04@vmc.gov.in',
    publicCallingHours: 'Mon-Fri: 10:00 AM - 1:00 PM',
    grievancesResolvedRate: 84.1,
    citizenRating: 4.2,
    totalCitizenInterventions: 1140,
    openGrievanceCount: 26,
    term: '2021 – 2026',
    keyInitiatives: [
      'Railway Station Auto Stand Traffic Flow Redesign',
      'Faculty of Tech Storm Drain Clearance',
    ],
  },
  {
    id: 'rep_corp_w09_1',
    name: 'Shri Nitin D. Solanki',
    role: 'Municipal Councillor / Corporator',
    level: 'corporator',
    party: 'Indian National Congress (INC)',
    partySymbol: '✋',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
    state: 'Gujarat',
    district: 'Vadodara',
    taluka: 'Vadodara City',
    constituencyOrWard: 'Ward 9 (Akota & Old Padra Rd)',
    wardNumber: 'Ward 09',
    zone: 'West Zone',
    officeAddress: 'Ward 9 Civic Centre, Near Harinagar Cross Roads, Gotri Road, Vadodara 390021',
    contactPhone: '+91 265 238 9911',
    whatsappHelpline: '+91 94265 88990',
    officialEmail: 'nitin.solanki.ward09@vmc.gov.in',
    publicCallingHours: 'Daily: 9:30 AM - 12:30 PM',
    grievancesResolvedRate: 78.5,
    citizenRating: 4.0,
    totalCitizenInterventions: 920,
    openGrievanceCount: 31,
    term: '2021 – 2026',
    keyInitiatives: [
      'Gotri Hospital Approach Road Pothole Overlay',
      'Dangling Low-Tension Power Cable Tightening',
    ],
  },
  {
    id: 'rep_corp_w12_1',
    name: 'Shri Kalpesh R. Shah',
    role: 'Municipal Councillor / Corporator',
    level: 'corporator',
    party: 'Bharatiya Janata Party (BJP)',
    partySymbol: '🪷',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    state: 'Gujarat',
    district: 'Vadodara',
    taluka: 'Vadodara South',
    constituencyOrWard: 'Ward 12 (Manjalpur & GIDC)',
    wardNumber: 'Ward 12',
    zone: 'South Zone',
    officeAddress: 'Ward 12 Municipal Office, Tarsali Bypass, Manjalpur, Vadodara 390011',
    contactPhone: '+91 265 263 2211',
    whatsappHelpline: '+91 98250 11998',
    officialEmail: 'kalpesh.shah.ward12@vmc.gov.in',
    publicCallingHours: 'Mon-Sat: 10:00 AM - 1:00 PM',
    grievancesResolvedRate: 94.8,
    citizenRating: 4.8,
    totalCitizenInterventions: 740,
    openGrievanceCount: 12,
    term: '2021 – 2026',
    keyInitiatives: [
      'GIDC Industrial Waste Night Patrol Enforcement',
      'Manjalpur Sports Complex Surrounding Footpath Tiles',
    ],
  },

  // ==========================================
  // 👔 EXECUTIVE ADMINISTRATIVE LEADERSHIP (IAS, IPS & CHIEF ENGINEERS)
  // ==========================================
  {
    id: 'rep_ias_comm',
    name: 'Shri Dilip Kumar Rana, IAS',
    role: 'Municipal Commissioner (VMC Head)',
    level: 'officer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
    state: 'Gujarat',
    district: 'Vadodara',
    constituencyOrWard: 'Vadodara Municipal Corporation Headquarters',
    officeAddress: 'Khanderao Market Headquarters, Rajmahal Road, Vadodara 390001',
    contactPhone: '+91 265 243 3116',
    whatsappHelpline: '+91 94270 00100',
    officialEmail: 'comm-vmc@gujarat.gov.in',
    publicCallingHours: 'Mon, Wed, Fri: 3:00 PM - 5:00 PM',
    grievancesResolvedRate: 91.4,
    citizenRating: 4.7,
    totalCitizenInterventions: 12640,
    openGrievanceCount: 540,
    term: 'Cadre Service',
    keyInitiatives: [
      'Real-Time 24-Hour SLA Auto-Escalation Protocol for P1 Emergencies',
      'Digital Citizen Verified Resolution Verification System',
      'Vishwamitri Catchment Basin Desilting & Monitoring Drone Fleet',
    ],
  },
  {
    id: 'rep_ias_collector',
    name: 'Shri Bijal Shah, IAS',
    role: 'District Magistrate & Collector',
    level: 'officer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    state: 'Gujarat',
    district: 'Vadodara',
    constituencyOrWard: 'District Collectorate, Vadodara',
    officeAddress: 'District Collectorate Office, Kothi Compound, Raopura, Vadodara 390001',
    contactPhone: '+91 265 243 3000',
    whatsappHelpline: '+91 94260 00200',
    officialEmail: 'collector-vad@gujarat.gov.in',
    publicCallingHours: 'Tue & Thu: 2:30 PM - 4:30 PM',
    grievancesResolvedRate: 93.0,
    citizenRating: 4.8,
    totalCitizenInterventions: 8450,
    openGrievanceCount: 320,
    term: 'Cadre Service',
    keyInitiatives: [
      'District Disaster Management Command Center',
      'Jan Seva Kendra Digitization & Revenue Record Transparency',
    ],
  },
  {
    id: 'rep_ips_cp',
    name: 'Shri Narasimha Komar, IPS',
    role: 'Commissioner of Police (Vadodara City)',
    level: 'officer',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
    state: 'Gujarat',
    district: 'Vadodara',
    constituencyOrWard: 'Vadodara City Police Commissionerate',
    officeAddress: 'Police Bhavan, Jail Road, Vadodara 390001',
    contactPhone: '+91 265 241 5111',
    whatsappHelpline: '+91 99784 00100',
    officialEmail: 'cp-vad@gujarat.gov.in',
    publicCallingHours: 'Daily Emergency 112 / Office: 11:00 AM - 1:00 PM',
    grievancesResolvedRate: 95.2,
    citizenRating: 4.9,
    totalCitizenInterventions: 6200,
    openGrievanceCount: 110,
    term: 'Cadre Service',
    keyInitiatives: [
      'SHE Team Women Safety Hotspot Patrols',
      'AI CCTV Traffic Congestion & Illegal Parking Detection',
    ],
  },
  {
    id: 'rep_eng_w07',
    name: 'Er. Rajesh K. Patel',
    role: 'Executive Engineer (Ward 7 In-Charge)',
    level: 'officer',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
    state: 'Gujarat',
    district: 'Vadodara',
    taluka: 'Vadodara City',
    constituencyOrWard: 'Ward 7 (Karelibaug)',
    wardNumber: 'Ward 07',
    officeAddress: 'Ward 7 Zonal Engineering Workshop, Karelibaug, Vadodara 390018',
    contactPhone: '+91 265 248 1199',
    whatsappHelpline: '+91 98790 44556',
    officialEmail: 'ee.ward07@vmc.gov.in',
    publicCallingHours: 'Mon-Fri: 9:00 AM - 11:30 AM',
    grievancesResolvedRate: 92.4,
    citizenRating: 4.5,
    totalCitizenInterventions: 540,
    openGrievanceCount: 18,
    term: 'Engineering Service',
    keyInitiatives: [
      'Stormwater Drain Desilting & Pothole Asphalt Patching Fleet Dispatch',
    ],
  },
];

// Composite mapping for any given Ward
export function getWardLeadership(wardNumberOrName: string): WardLeadershipComposite {
  const norm = wardNumberOrName.toLowerCase();

  const corp =
    ALL_REPRESENTATIVES.find(
      (r) => r.level === 'corporator' && r.constituencyOrWard.toLowerCase().includes(norm)
    ) || ALL_REPRESENTATIVES.find((r) => r.level === 'corporator')!;

  const officer =
    ALL_REPRESENTATIVES.find(
      (r) => r.level === 'officer' && r.constituencyOrWard.toLowerCase().includes(norm)
    ) || ALL_REPRESENTATIVES.find((r) => r.id === 'rep_eng_w07')!;

  const mla = ALL_REPRESENTATIVES.find((r) => r.level === 'mla')!;
  const mp = ALL_REPRESENTATIVES.find((r) => r.level === 'mp')!;

  return {
    wardNumber: 'Ward 07',
    wardName: 'Karelibaug & VIP Road',
    district: 'Vadodara',
    state: 'Gujarat',
    corporator: corp,
    wardEngineer: officer,
    mla,
    mp,
  };
}
