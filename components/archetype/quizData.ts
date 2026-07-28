export type ArchetypeKey = "A" | "B" | "C" | "D";

export type Question = {
  text: string;
  options: { key: ArchetypeKey; text: string }[];
};

export const QUESTIONS: Question[] = [
  {
    text: "When you are not actively busy, what happens internally?",
    options: [
      { key: "A", text: "I feel an urge to stay productive or push forward" },
      { key: "B", text: "My mind becomes busy with thoughts and reflection" },
      { key: "C", text: "I feel emotionally flat or slightly disconnected" },
      { key: "D", text: "I become aware that something within me is changing" },
    ],
  },
  {
    text: "Which statement feels most accurate right now?",
    options: [
      { key: "A", text: "I function well, but it takes constant effort" },
      { key: "B", text: "I think deeply, sometimes more than I'd like" },
      { key: "C", text: "I'm successful, but not as connected as I once was" },
      { key: "D", text: "I'm not stuck, but I know I'm between phases" },
    ],
  },
  {
    text: "How do you typically respond to pressure?",
    options: [
      { key: "A", text: "I rise to it and rely on discipline" },
      { key: "B", text: "I internalise it and analyse it" },
      { key: "C", text: "I withdraw or detach from it" },
      { key: "D", text: "I notice it and question how I want to relate to it" },
    ],
  },
  {
    text: "What feels most true about your inner world?",
    options: [
      { key: "A", text: "It's organised around performance and responsibility" },
      { key: "B", text: "It's active and reflective, sometimes overwhelming" },
      { key: "C", text: "It feels quieter, but also distant" },
      { key: "D", text: "It feels ready for more alignment and honesty" },
    ],
  },
  {
    text: "What feels like the greatest internal cost right now?",
    options: [
      { key: "A", text: "Sustaining momentum without space to soften" },
      { key: "B", text: "Mental noise and overthinking" },
      { key: "C", text: "Emotional distance or lack of meaning" },
      { key: "D", text: "Carrying an old identity into a new phase" },
    ],
  },
  {
    text: "What are you most open to exploring at this point?",
    options: [
      { key: "A", text: "Leading myself more sustainably" },
      { key: "B", text: "Creating mental clarity and calm" },
      { key: "C", text: "Reconnecting with myself emotionally" },
      { key: "D", text: "Strengthening alignment for what comes next" },
    ],
  },
];

export type Archetype = {
  id: string;
  title: string;
  mirror: string;
  reflects: string[];
  possible: string;
};

export const ARCHETYPES: Record<ArchetypeKey, Archetype> = {
  A: {
    id: "performance-driver",
    title: "The Performance Driver",
    mirror:
      "You are capable, disciplined, and reliable. You have built your life through effort, responsibility, and consistency. Outwardly, you perform well. Internally, it often feels heavy to sustain.",
    reflects: [
      "You are used to leading yourself through pressure",
      "Rest and softness can feel unfamiliar or unproductive",
      "Your success has come from strength, not ease",
    ],
    possible:
      "Through mentoring, the focus is not slowing you down, but removing unnecessary internal strain. This work supports calmer self-leadership, emotional steadiness, and sustainable performance without losing your edge.",
  },
  B: {
    id: "quiet-overthinker",
    title: "The Quiet Overthinker",
    mirror:
      "You are thoughtful, self-aware, and internally rich. Your mind rarely switches off, even when things are going well. You carry more internally than you show externally.",
    reflects: [
      "You process deeply and reflect often",
      "Mental clarity feels elusive despite insight",
      "You are emotionally intelligent, but mentally tired",
    ],
    possible:
      "This work helps you move from constant internal dialogue into grounded clarity. Not by silencing your mind, but by learning how to lead it with awareness, calm, and perspective.",
  },
  C: {
    id: "disconnected-achiever",
    title: "The Disconnected Achiever",
    mirror:
      "You have achieved a great deal, yet feel subtly removed from yourself or your emotions. Life functions, but something feels distant or muted internally.",
    reflects: [
      "You are capable and dependable",
      "Emotional depth feels harder to access",
      "Success does not feel as meaningful as it once did",
    ],
    possible:
      "The mentoring supports reconnection without dismantling your life. Emotional presence, meaning, and self-trust are gently restored so success feels alive again, not hollow.",
  },
  D: {
    id: "transition-seeker",
    title: "The Transition Seeker",
    mirror:
      "You are not in crisis. You are conscious. You sense that the version of you that got you here is no longer the version meant to carry you forward.",
    reflects: [
      "You feel ready for deeper alignment",
      "Old patterns no longer fit",
      "You want growth without disruption",
    ],
    possible:
      "This work supports you in consciously stepping into your next life. Strengthening what already exists while releasing what no longer serves, with clarity, patience, and guidance.",
  },
};
