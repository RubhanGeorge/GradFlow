export interface CollegeInfo {
  domain: string;
  name: string;
  shortName: string;
}

export const BANGALORE_COLLEGE_DOMAINS: string[] = [
  "cmrit.ac.in",         // CMR Institute of Technology (Primary)
  "rvce.edu.in",        // RV College of Engineering
  "bmsce.ac.in",        // BMS College of Engineering
  "msrit.edu",          // MS Ramaiah Institute of Technology
  "pes.edu",            // PES University (Ring Road / Electronic City)
  "dsce.edu.in",        // Dayananda Sagar College of Engineering
  "bit-bangalore.edu.in",// Bangalore Institute of Technology
  "nmit.ac.in",         // Nitte Meenakshi Institute of Technology
  "rnsit.ac.in",        // RNS Institute of Technology
  "newhorizonindia.edu",// New Horizon College of Engineering
  "bmsit.in",           // BMS Institute of Technology and Management
  "iiitb.ac.in",        // International Institute of Information Technology Bangalore
  "iisc.ac.in",         // Indian Institute of Science
  "mvjce.edu.in",       // MVJ College of Engineering
  "sir-mvit.edu",       // Sir M. Visvesvaraya Institute of Technology
  "jssateb.ac.in",      // JSS Academy of Technical Education
  "sjbit.edu.in",       // SJB Institute of Technology
  "ksit.ac.in",         // KS Institute of Technology
  "acharyainstitutes.in",// Acharya Institute of Technology
  "hkbk.edu.in",        // HKBK College of Engineering
  "christuniversity.in",// Christ University Faculty of Engineering
  "jainuniversity.ac.in",// Jain University Faculty of Engineering & Tech
  "reva.edu.in",        // REVA University
  "presidencyuniversity.in",// Presidency University
  "alliance.edu.in",    // Alliance University College of Engineering
  "gat.ac.in",          // Global Academy of Technology
  "amcgroup.edu.in",    // AMC Engineering College
  "atria.edu",          // Atria Institute of Technology
  "cambridge.edu.in",   // Cambridge Institute of Technology
  "donboscobangalore.edu.in",// Don Bosco Institute of Technology
  "eastwestedu.in",     // East West Institute of Technology
  "gitam.edu",          // GITAM School of Technology Bangalore
  "gojanedu.in",        // Gopalan College of Engineering and Management
  "jyothyit.ac.in",     // Jyothy Institute of Technology
  "kleit.ac.in",        // KLE Technological University Bangalore Campus
  "nagarjunaeducation.com",// Nagarjuna College of Engineering & Tech
  "oxfordengg.edu",     // The Oxford College of Engineering
  "rajarajeswariengg.edu.in",// RajaRajeswari College of Engineering
  "rajivgandhiit.edu.in",// Rajiv Gandhi Institute of Technology
  "rljit.in",           // RL Jalappa Institute of Technology
  "sai-vidya.edu.in",   // Sai Vidya Institute of Technology
  "sambhram.org",       // Sambhram Institute of Technology
  "secab.org",          // SEA College of Engineering & Technology
  "siddaganga.ac.in",   // Siddaganga Institute of Technology
  "sjim.edu.in",        // SJES College of Engineering
  "smvitm.ac.in",       // Sri Venkateshwara College of Engineering
  "tjohncollege.com",   // T. John Institute of Technology
  "uvce.ac.in",         // University Visvesvaraya College of Engineering
  "vtu.ac.in",          // Visvesvaraya Technological University PG Center
  "yellamma.edu.in"     // Vemana Institute of Technology
];

export const BANGALORE_COLLEGES_METADATA: Record<string, string> = {
  "cmrit.ac.in": "CMR Institute of Technology",
  "rvce.edu.in": "RV College of Engineering",
  "bmsce.ac.in": "BMS College of Engineering",
  "msrit.edu": "MS Ramaiah Institute of Technology",
  "pes.edu": "PES University",
  "dsce.edu.in": "Dayananda Sagar College of Engineering",
  "bit-bangalore.edu.in": "Bangalore Institute of Technology",
  "nmit.ac.in": "Nitte Meenakshi Institute of Technology",
  "rnsit.ac.in": "RNS Institute of Technology",
  "newhorizonindia.edu": "New Horizon College of Engineering",
  "bmsit.in": "BMS Institute of Technology & Management",
  "iiitb.ac.in": "IIIT Bangalore",
  "iisc.ac.in": "Indian Institute of Science (IISc)",
  "mvjce.edu.in": "MVJ College of Engineering",
  "sir-mvit.edu": "Sir M. Visvesvaraya Institute of Technology",
  "jssateb.ac.in": "JSS Academy of Technical Education",
  "sjbit.edu.in": "SJB Institute of Technology",
  "ksit.ac.in": "KS Institute of Technology",
  "acharyainstitutes.in": "Acharya Institute of Technology",
  "hkbk.edu.in": "HKBK College of Engineering",
  "christuniversity.in": "Christ University Faculty of Engineering",
  "jainuniversity.ac.in": "Jain University Faculty of Engineering",
  "reva.edu.in": "REVA University",
  "presidencyuniversity.in": "Presidency University",
  "alliance.edu.in": "Alliance University College of Engineering",
  "gat.ac.in": "Global Academy of Technology",
  "amcgroup.edu.in": "AMC Engineering College",
  "atria.edu": "Atria Institute of Technology",
  "cambridge.edu.in": "Cambridge Institute of Technology",
  "donboscobangalore.edu.in": "Don Bosco Institute of Technology",
  "eastwestedu.in": "East West Institute of Technology",
  "gitam.edu": "GITAM School of Technology Bangalore",
  "gojanedu.in": "Gopalan College of Engineering & Management",
  "jyothyit.ac.in": "Jyothy Institute of Technology",
  "kleit.ac.in": "KLE Technological University Bangalore",
  "nagarjunaeducation.com": "Nagarjuna College of Engineering & Tech",
  "oxfordengg.edu": "The Oxford College of Engineering",
  "rajarajeswariengg.edu.in": "RajaRajeswari College of Engineering",
  "rajivgandhiit.edu.in": "Rajiv Gandhi Institute of Technology",
  "rljit.in": "RL Jalappa Institute of Technology",
  "sai-vidya.edu.in": "Sai Vidya Institute of Technology",
  "sambhram.org": "Sambhram Institute of Technology",
  "secab.org": "SEA College of Engineering & Technology",
  "siddaganga.ac.in": "Siddaganga Institute of Technology",
  "sjim.edu.in": "SJES College of Engineering",
  "smvitm.ac.in": "Sri Venkateshwara College of Engineering",
  "tjohncollege.com": "T. John Institute of Technology",
  "uvce.ac.in": "University Visvesvaraya College of Engineering (UVCE)",
  "vtu.ac.in": "VTU PG Center Bangalore",
  "yellamma.edu.in": "Vemana Institute of Technology"
};

export const getCollegeName = (domain: string): string => {
  return BANGALORE_COLLEGES_METADATA[domain.toLowerCase()] || domain;
};
