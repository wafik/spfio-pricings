export interface MockScenario {
  liveMinutes: number;
  documentCount: number;
  targetLanguages: number;
  requiresHumanInTheLoop: boolean;
  label: string;
  description: string;
}

export const MOCK_USER_SCENARIOS: Record<string, MockScenario> = {
  smallChurch: {
    liveMinutes: 180,
    documentCount: 3,
    targetLanguages: 2,
    requiresHumanInTheLoop: false,
    label: "Local House of Worship",
    description: "Sunday services with Spanish translation for growing congregation",
  },
  globalConference: {
    liveMinutes: 2400,
    documentCount: 45,
    targetLanguages: 12,
    requiresHumanInTheLoop: true,
    label: "Global Multi-Track Summit",
    description: "3-day conference with 8 tracks, 12 languages, hybrid attendance",
  },
  continuousSaaS: {
    liveMinutes: 8500,
    documentCount: 450,
    targetLanguages: 6,
    requiresHumanInTheLoop: false,
    label: "Enterprise Platform Localization",
    description: "Ongoing content localization pipeline for global SaaS product",
  },
  corporateTownHall: {
    liveMinutes: 120,
    documentCount: 15,
    targetLanguages: 8,
    requiresHumanInTheLoop: true,
    label: "Corporate Town Hall",
    description: "Monthly all-hands meeting with APAC/EMEA team translation",
  },
  universityLectures: {
    liveMinutes: 600,
    documentCount: 30,
    targetLanguages: 4,
    requiresHumanInTheLoop: false,
    label: "University Lecture Series",
    description: "Semester-long lecture capture with multilingual student support",
  },
  governmentHearing: {
    liveMinutes: 300,
    documentCount: 100,
    targetLanguages: 5,
    requiresHumanInTheLoop: true,
    label: "Public Civic Hearing",
    description: "City council meetings with multilingual community access",
  },
};
