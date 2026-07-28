// /app.js
/**
 * Interactive Archetype Quiz
 * Answer mapping: A→Performance Driver, B→Quiet Overthinker, C→Disconnected Achiever, D→Transition Seeker
 */

const QUESTIONS = [
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
      { key: "B", text: "I think deeply, sometimes more than I’d like" },
      { key: "C", text: "I’m successful, but not as connected as I once was" },
      { key: "D", text: "I’m not stuck, but I know I’m between phases" },
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
      { key: "A", text: "It’s organised around performance and responsibility" },
      { key: "B", text: "It’s active and reflective, sometimes overwhelming" },
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

const ARCHETYPES = {
  A: {
    id: "performance-driver",
    title: "The Performance Driver",
    icon: '<img src="/img/bg-icon.svg" alt="" style="width: 50px; height: 50px; display: inline-block; vertical-align: middle;" />',
    mirror: "You are capable, disciplined, and reliable. You have built your life through effort, responsibility, and consistency. Outwardly, you perform well. Internally, it often feels heavy to sustain.",
    reflects: [
      "You are used to leading yourself through pressure",
      "Rest and softness can feel unfamiliar or unproductive",
      "Your success has come from strength, not ease",
    ],
    possible: "Through mentoring, the focus is not slowing you down, but removing unnecessary internal strain. This work supports calmer self-leadership, emotional steadiness, and sustainable performance without losing your edge.",
    cta1: { label: "Request Mentorship", href: "/request-mentorship" },
    cta2: { label: "Explore Case Studies →", href: "/case-studies" },
  },
  B: {
    id: "quiet-overthinker",
    title: "The Quiet Overthinker",
    icon: '<img src="/img/bg-icon.svg" alt="" style="width: 50px; height: 50px; display: inline-block; vertical-align: middle;" />',
    mirror: "You are thoughtful, self-aware, and internally rich. Your mind rarely switches off, even when things are going well. You carry more internally than you show externally.",
    reflects: [
      "You process deeply and reflect often",
      "Mental clarity feels elusive despite insight",
      "You are emotionally intelligent, but mentally tired",
    ],
    possible: "This work helps you move from constant internal dialogue into grounded clarity. Not by silencing your mind, but by learning how to lead it with awareness, calm, and perspective.",
    cta1: { label: "Request Mentorship", href: "/request-mentorship" },
    cta2: { label: "Explore Case Studies →", href: "/case-studies" },
  },
  C: {
    id: "disconnected-achiever",
    title: "The Disconnected Achiever",
    icon: '<img src="/img/bg-icon.svg" alt="" style="width: 50px; height: 50px; display: inline-block; vertical-align: middle;" />',
    mirror: "You have achieved a great deal, yet feel subtly removed from yourself or your emotions. Life functions, but something feels distant or muted internally.",
    reflects: [
      "You are capable and dependable",
      "Emotional depth feels harder to access",
      "Success does not feel as meaningful as it once did",
    ],
    possible: "The mentoring supports reconnection without dismantling your life. Emotional presence, meaning, and self-trust are gently restored so success feels alive again, not hollow.",
    cta1: { label: "Request Mentorship", href: "/request-mentorship" },
    cta2: { label: "Explore Case Studies →", href: "/case-studies" },
  },
  D: {
    id: "transition-seeker",
    title: "The Transition Seeker",
    icon: '<img src="/img/bg-icon.svg" alt="" style="width: 50px; height: 50px; display: inline-block; vertical-align: middle;" />',
    mirror: "You are not in crisis. You are conscious. You sense that the version of you that got you here is no longer the version meant to carry you forward.",
    reflects: [
      "You feel ready for deeper alignment",
      "Old patterns no longer fit",
      "You want growth without disruption",
    ],
    possible: "This work supports you in consciously stepping into your next life. Strengthening what already exists while releasing what no longer serves, with clarity, patience, and guidance.",
    cta1: { label: "Request Mentorship", href: "/request-mentorship" },
    cta2: { label: "Explore Case Studies →", href: "/case-studies" },
  },
};

const app = document.getElementById("app");

const state = {
  started: false,
  index: 0,
  answers: Array(QUESTIONS.length).fill(null),
  scores: { A: 0, B: 0, C: 0, D: 0 },
};

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setScoreForAnswerChange(oldKey, newKey) {
  if (oldKey && state.scores[oldKey] !== undefined) state.scores[oldKey] -= 1;
  if (newKey && state.scores[newKey] !== undefined) state.scores[newKey] += 1;
}

function answeredCount() {
  return state.answers.filter(Boolean).length;
}

function progressPercent() {
  return Math.round((answeredCount() / QUESTIONS.length) * 100);
}

function renderIntro() {
  app.innerHTML = `
    <div class="card-body quiz-pulse sm-mb-20px">
      <div class="d-flex flex-wrap gap-2 align-items-center justify-content-between mb-3 md-mb-10">
        <span class="badge rounded-pill badge-soft px-3 py-2">
          <span class="dot me-2" aria-hidden="true"></span>
          Reflective Quiz • 6 questions
        </span>
        <span class="badge rounded-pill badge-soft px-3 py-2">Progress 0%</span>
      </div>
       <span class="h3 fs-30 alt-font fw-500  mb-2 md-mb-5">Take the Quiz:</span>
      <h1 class="h3 alt-font fw-700 ls-minus-2px fs-40 mb-3 md-mb-10">Which Archetype Are You?</h1>

      <p class="mb-2"><strong>This isn’t a personality test. It’s a moment of recognition.</strong></p>
      <p class="lead-muted mb-2">
      This isn’t about labels. It’s about recognition.
        This quiz reveals where you are in your journey right now. Answer honestly. Your result will highlight the archetype you align with and the next phase of growth available to you.
      </p>
      <p class="lead-muted mb-0">
        You may recognise yourself in more than one archetype.
        This is normal, and often signals a period of transition.
      </p>

      <div class="mt-4 md-mt-12 d-grid d-sm-flex gap-2">
        <button id="startBtn" class="btn-primary active btn-box-shadow fw-600">Explore Your Archetype</button>
      </div>
    </div>
  `;

  document.getElementById("startBtn").addEventListener("click", () => {
    state.started = true;
    state.index = 0;
    renderQuestion();
  });
}

function renderQuestion() {
  const q = QUESTIONS[state.index];
  const pct = progressPercent();
  const selected = state.answers[state.index];

  app.innerHTML = `
    <div class="card-body">
      <div class="d-flex flex-wrap gap-2 align-items-center justify-content-between mb-3">
        <span class="badge rounded-pill badge-soft px-3 py-2">
          <span class="dot me-2" aria-hidden="true"></span>
          Question ${state.index + 1} of ${QUESTIONS.length}
        </span>

        <div class="d-flex align-items-center gap-2" style="min-width: 220px;">
          <div class="progress flex-grow-1" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}">
            <div class="progress-bar" style="width: ${pct}%;"></div>
          </div>
          <span class="badge rounded-pill badge-soft px-3 py-2">${pct}%</span>
        </div>
      </div>

      <h2 class="h5 mb-2">${escapeHtml(q.text)}</h2>
      <p class="text-muted-2 mb-3">Choose the option that feels most true.</p>

      <div class="d-grid gap-2" role="group" aria-label="Answer options">
        ${q.options
          .map(
            (opt) => `
            <button
              type="button"
              class="btn btn-outline-light option-btn ${selected === opt.key ? 'active' : ''}"
              data-key="${opt.key}"
              aria-pressed="${selected === opt.key ? 'true' : 'false'}"
            >
              <span class="option-key">${opt.key}</span>
              <span>${escapeHtml(opt.text)}</span>
            </button>
          `
          )
          .join("")}
      </div>

      <div class="mt-4 d-flex flex-wrap gap-2 align-items-center">
        <button id="backBtn" class="btn btn-outline-light" ${state.index === 0 ? 'disabled' : ''}>Back</button>
        <button id="restartBtn" class="btn btn-outline-light">Restart</button>
        <span class="ms-auto text-muted-2 small">Answered: ${answeredCount()}/${QUESTIONS.length}</span>
      </div>
    </div>
  `;

  app.querySelectorAll("button[data-key]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const newKey = btn.getAttribute("data-key");
      const oldKey = state.answers[state.index];

      if (oldKey !== newKey) {
        state.answers[state.index] = newKey;
        setScoreForAnswerChange(oldKey, newKey);
      }
      nextStep();
    });
  });

  document.getElementById("backBtn")?.addEventListener("click", () => {
    if (state.index > 0) {
      state.index -= 1;
      renderQuestion();           // ← re-render fixes progress bar on back
    }
  });

  document.getElementById("restartBtn")?.addEventListener("click", resetAll);
}

function nextStep() {
  if (state.index < QUESTIONS.length - 1) {
    state.index += 1;
    renderQuestion();
    return;
  }
  renderResult();
}

function computeWinners() {
  const entries = Object.entries(state.scores);
  const max = Math.max(...entries.map(([, v]) => v));
  const winners = entries.filter(([, v]) => v === max).map(([k]) => k);
  return { winners, max };
}

function getSelectedArchetypes() {
  const { winners } = computeWinners();

  return winners.map((key) => {
    const archetype = ARCHETYPES[key];

    return {
      key,
      title: archetype.title,
      mirror: archetype.mirror,
      reflects: archetype.reflects,
      possible: archetype.possible,
    };
  });
}

function buildResultEmailHtml(selectedArchetypes) {
  if (!selectedArchetypes.length) {
    return "";
  }

  return `
    <div style="margin: 16px 0 0;">
      ${selectedArchetypes
        .map(
          (archetype) => `
            <div style="margin: 0 0 20px; padding: 16px; border: 1px solid #e5e7eb; border-radius: 12px; background: #f1f7f7;">
              <h3 style="margin: 0 0 12px; font-size: 18px; color: #111827;">${escapeHtml(archetype.title)}</h3>
              <p style="margin: 0 0 12px; line-height:2;">${escapeHtml(archetype.mirror)}</p>
              <p style="margin: 0 0 8px; line-height:2;"><strong>What this reflects:</strong></p>
              <ul style="margin: 0 0 12px 20px; padding: 0; line-height:2;">
                ${archetype.reflects.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
              </ul>
              <p style="margin: 0; line-height:2;">${escapeHtml(archetype.possible)}</p>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function logSelectedArchetypes(selectedArchetypes) {
  console.log("You most closely align with:");

  selectedArchetypes.forEach((archetype) => {
    console.log(archetype.title);
    console.log(archetype.mirror);
    console.log("What this reflects:");
    archetype.reflects.forEach((item) => console.log(`- ${item}`));
    console.log(archetype.possible);
  });
}

function renderResult() {
  const { winners } = computeWinners();

  let tabsHtml = '';
  let contentHtml = '';

  winners.forEach((key, idx) => {
    const archetype = ARCHETYPES[key];
    const isActive = idx === 0 ? 'active' : '';

    tabsHtml += `
      <li class="nav-item" role="presentation">
        <button class="nav-link ${isActive}" id="tab-${key}" data-bs-toggle="tab" data-bs-target="#content-${key}" type="button" role="tab" aria-controls="content-${key}" aria-selected="${isActive}">
          ${archetype.icon} ${archetype.title.split(' ')[1] || archetype.title}
        </button>
      </li>
    `;

    contentHtml += `
      <div class="tab-pane fade ${isActive ? 'show active' : ''}" id="content-${key}" role="tabpanel" aria-labelledby="tab-${key}">
        <div class="card bg-dark border-light mb-4">
          <div class="card-body">
            <h3 class="mb-3">${archetype.icon} ${archetype.title}</h3>
            <p class="mb-3"><strong>Identity mirror:</strong><br>${escapeHtml(archetype.mirror)}</p>
            <p class="mb-2"><strong>What this reflects:</strong></p>
            <ul class="mb-4 result-reflects-list">${archetype.reflects.map(i => `<li>${escapeHtml(i)}</li>`).join("")}</ul>
            <p class="mb-3"><strong>What becomes possible:</strong><br>${escapeHtml(archetype.possible)}</p>
            <div class="d-grid d-sm-flex gap-2 sm-mt-3">
              <a class="btn btn-success" href="${escapeHtml(archetype.cta1.href)}" onclick="${escapeHtml(archetype.cta1.onclick)}">${escapeHtml(archetype.cta1.label)}</a>
              <a class="btn btn-outline-light" href="${escapeHtml(archetype.cta2.href)}">${escapeHtml(archetype.cta2.label)}</a>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  const resultHtml = `
    <h2 class="mb-3 fs-40">Your Archetype${winners.length > 1 ? 's' : ''}</h2>
    <p class="lead-muted mb-2"> You may recognise parts of yourself in more than one archetype. This is not confusion. It is often a sign that you are in transition.</p>
    <p class="lead-muted mb-4">You most closely align with:</p>

    ${winners.length > 1 ? `
      <ul class="nav nav-tabs mb-4" id="archetypeTabs" role="tablist">
        ${tabsHtml}
      </ul>
      <div class="tab-content">
        ${contentHtml}
      </div>
    ` : contentHtml}
  `;

  openResultModal(resultHtml);
}

const modal = document.getElementById("resultModal");
const modalContent = document.getElementById("resultContent");
const closeModalBtn = document.getElementById("closeResultModal");

function openResultModal(html) {
  modalContent.innerHTML = html;
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeResultModal() {
  modal.classList.add("hidden");
  document.body.style.overflow = "";
  resetAll();
}

closeModalBtn.addEventListener("click", closeResultModal);
modal.querySelector(".result-backdrop")?.addEventListener("click", closeResultModal);

document.getElementById("sendResultsBtn")?.addEventListener("click", () => {
  const name = document.getElementById("resultName")?.value.trim();
  const email = document.getElementById("resultEmail")?.value.trim();
  const consent = document.getElementById("gdprConsent")?.checked;
  const status = document.getElementById("emailStatus");
  const selectedArchetypes = getSelectedArchetypes();
  const resultTitle = `Your Archetype Result${selectedArchetypes.length > 1 ? "s" : ""} — A Clearer View of Where You Are`;

  status.textContent = "";

  if (!name) {
    status.textContent = "Please enter your name.";
    return;
  }
  if (!email) {
    status.textContent = "Please enter a valid email address.";
    return;
  }
  if (!consent) {
    status.textContent = "Please confirm GDPR consent.";
    return;
  }

  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  logSelectedArchetypes(selectedArchetypes);

  fetch("/.netlify/functions/send-mail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      firstName: name.split(/\s+/)[0] || name,
      email,
      subject: "Your Archetype Result — A Clearer View of Where You Are",
      resultTitle,
      resultText: selectedArchetypes.map((archetype) => `${archetype.title}: ${archetype.mirror}`).join("\n\n"),
      archetypes: selectedArchetypes,
      resultHtml: buildResultEmailHtml(selectedArchetypes),
      mentorshipUrl: "https://calendly.com/twolivestheory/mentorship",
    }),
  })
    .then(async (response) => {
      const raw = await response.text();
      let data = {};

      if (raw) {
        try {
          data = JSON.parse(raw);
        } catch (error) {
          data = { error: raw };
        }
      }

      if (!response.ok) {
        throw new Error(data?.error || "Unable to send email");
      }

      status.textContent = "Your results have been sent. Check your inbox.";
      status.style.color = "#00E184";
    })
    .catch((error) => {
      status.textContent = error.message || "Something went wrong while sending your results.";
      status.style.color = "#ff6b6b";
    });
});

function resetAll() {
  state.started = false;
  state.index = 0;
  state.answers = Array(QUESTIONS.length).fill(null);
  state.scores = { A: 0, B: 0, C: 0, D: 0 };

  renderIntro();
}

renderIntro();
