"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ARCHETYPES, QUESTIONS, type ArchetypeKey } from "./quizData";

function computeWinners(answers: (ArchetypeKey | null)[]) {
  const counts: Record<ArchetypeKey, number> = { A: 0, B: 0, C: 0, D: 0 };
  answers.forEach((key) => {
    if (key) counts[key] += 1;
  });
  const max = Math.max(...Object.values(counts));
  const winners = (Object.keys(counts) as ArchetypeKey[]).filter((k) => counts[k] === max && max > 0);
  return winners.length ? winners : (["A"] as ArchetypeKey[]);
}

export default function ArchetypeQuiz() {
  const [screen, setScreen] = useState<"intro" | "question">("intro");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(ArchetypeKey | null)[]>(Array(QUESTIONS.length).fill(null));
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<ArchetypeKey | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState("");
  const [statusOk, setStatusOk] = useState(false);

  const winners = useMemo(() => computeWinners(answers), [answers]);
  const answeredCount = answers.filter(Boolean).length;
  const progressPercent = Math.round((answeredCount / QUESTIONS.length) * 100);

  function resetAll() {
    setScreen("intro");
    setIndex(0);
    setAnswers(Array(QUESTIONS.length).fill(null));
    setShowModal(false);
    setName("");
    setEmail("");
    setConsent(false);
    setStatus("");
  }

  function selectAnswer(key: ArchetypeKey) {
    const next = [...answers];
    next[index] = key;
    setAnswers(next);

    if (index < QUESTIONS.length - 1) {
      setIndex(index + 1);
    } else {
      const w = computeWinners(next);
      setActiveTab(w[0]);
      setShowModal(true);
    }
  }

  function handleSendResults() {
    setStatus("");
    if (!name.trim()) {
      setStatus("Please enter your name.");
      setStatusOk(false);
      return;
    }
    if (!email.trim()) {
      setStatus("Please enter a valid email address.");
      setStatusOk(false);
      return;
    }
    if (!consent) {
      setStatus("Please confirm GDPR consent.");
      setStatusOk(false);
      return;
    }

    fetch("/api/send-archetype-result", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        archetypes: winners.map((k) => ARCHETYPES[k].title),
      }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Unable to send email");
        setStatus("Your results have been sent. Check your inbox.");
        setStatusOk(true);
      })
      .catch(() => {
        setStatus("Something went wrong while sending your results.");
        setStatusOk(false);
      });
  }

  return (
    <section className="bg-carbon py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-5">
        <div className="flex min-h-[60vh] flex-col justify-center rounded-[20px] bg-carbon/75 p-[15px] backdrop-blur-[20px] lg:p-12">
          {screen === "intro" ? (
            <div>
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/16 bg-[#121614] px-3 py-2 text-xs font-bold text-white">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald shadow-[0_0_0_6px_rgba(0,225,132,0.18)]" />
                  Reflective Quiz &bull; 6 questions
                </span>
                <span className="rounded-full border border-white/16 bg-[#121614] px-3 py-2 text-xs font-bold text-white">
                  Progress 0%
                </span>
              </div>

              <p className="mb-2 font-heading text-xl font-medium text-white">Take the Quiz:</p>
              <h1 className="mb-3 font-heading text-[28px] leading-tight font-bold tracking-[-2px] text-white sm:text-[40px]">
                Which Archetype Are You?
              </h1>

              <p className="mb-2 text-white">
                <strong>This isn&rsquo;t a personality test. It&rsquo;s a moment of recognition.</strong>
              </p>
              <p className="mb-2 text-grey">
                This isn&rsquo;t about labels. It&rsquo;s about recognition. This quiz reveals where you are in your
                journey right now. Answer honestly. Your result will highlight the archetype you align with and the
                next phase of growth available to you.
              </p>
              <p className="mb-0 text-grey">
                You may recognise yourself in more than one archetype. This is normal, and often signals a period of
                transition.
              </p>

              <div className="mt-6">
                <button onClick={() => setScreen("question")} className="btn-cta">
                  Explore Your Archetype
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/16 bg-[#121614] px-3 py-2 text-xs font-bold text-white">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald shadow-[0_0_0_6px_rgba(0,225,132,0.18)]" />
                  Question {index + 1} of {QUESTIONS.length}
                </span>
                <div className="flex min-w-[220px] items-center gap-2">
                  <div className="h-2 flex-grow overflow-hidden rounded-full border border-white/16 bg-black/35">
                    <div
                      className="h-full bg-emerald transition-[width] duration-[350ms]"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <span className="rounded-full border border-white/16 bg-[#121614] px-3 py-2 text-xs font-bold whitespace-nowrap text-white">
                    {progressPercent}%
                  </span>
                </div>
              </div>

              <h2 className="mb-2 font-heading text-xl font-semibold text-white">
                {QUESTIONS[index].text}
              </h2>
              <p className="mb-3 text-grey">Choose the option that feels most true.</p>

              <div className="grid gap-2.5">
                {QUESTIONS[index].options.map((opt) => {
                  const selected = answers[index] === opt.key;
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => selectAnswer(opt.key)}
                      aria-pressed={selected}
                      className={`flex items-start gap-3 rounded-xl border px-[15px] py-[15px] text-left transition ${
                        selected
                          ? "border-emerald/70 bg-emerald/10 shadow-[0_0_0_3px_rgba(0,225,132,0.14)]"
                          : "border-white/16 bg-[#121614] hover:border-white/24 hover:bg-[#121614]/90"
                      }`}
                    >
                      <span className="grid h-7 w-7 flex-none place-items-center rounded-[0.65rem] border border-white/16 bg-black/25 font-black text-white">
                        {opt.key}
                      </span>
                      <span className="text-white">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => index > 0 && setIndex(index - 1)}
                  disabled={index === 0}
                  className="rounded-full border border-white/24 px-5 py-2 text-sm font-semibold text-white transition hover:border-emerald/55 hover:bg-white/[0.06] disabled:pointer-events-none disabled:opacity-30"
                >
                  Back
                </button>
                <button
                  onClick={resetAll}
                  className="rounded-full border border-white/24 px-5 py-2 text-sm font-semibold text-white transition hover:border-emerald/55 hover:bg-white/[0.06]"
                >
                  Restart
                </button>
                <span className="ml-auto text-sm text-grey">
                  Answered: {answeredCount}/{QUESTIONS.length}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {showModal && activeTab && (
        <div className="fixed inset-0 z-50 grid place-items-start justify-center overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/85"
            onClick={() => {
              setShowModal(false);
              resetAll();
            }}
          />
          <div className="relative z-10 my-[8vh] max-h-[90vh] w-[92%] max-w-[1000px] overflow-y-auto rounded-[20px] border border-emerald bg-[#121614] p-6 text-white sm:p-10">
            <button
              onClick={() => {
                setShowModal(false);
                resetAll();
              }}
              aria-label="Close"
              className="absolute top-4 right-5 text-3xl leading-none text-white"
            >
              &times;
            </button>

            <h2 className="mb-3 font-heading text-[28px] font-bold sm:text-[36px]">
              Your Archetype{winners.length > 1 ? "s" : ""}
            </h2>
            <p className="mb-2 text-grey">
              You may recognise parts of yourself in more than one archetype. This is not confusion. It is often a
              sign that you are in transition.
            </p>
            <p className="mb-4 text-grey">You most closely align with:</p>

            {winners.length > 1 && (
              <div className="mb-6 flex flex-wrap gap-2 border-b border-white/10 pb-4">
                {winners.map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      activeTab === key
                        ? "border-emerald bg-emerald/10 text-emerald"
                        : "border-white/20 text-white hover:border-emerald/60"
                    }`}
                  >
                    {ARCHETYPES[key].title.replace("The ", "")}
                  </button>
                ))}
              </div>
            )}

            <div className="mb-4 rounded-2xl border border-white/10 bg-black/20 p-6">
              <h3 className="mb-3 font-heading text-xl font-semibold text-white sm:text-2xl">
                {ARCHETYPES[activeTab].title}
              </h3>
              <p className="mb-3">
                <strong>Identity mirror:</strong>
                <br />
                {ARCHETYPES[activeTab].mirror}
              </p>
              <p className="mb-2">
                <strong>What this reflects:</strong>
              </p>
              <ul className="mb-4 list-disc space-y-1 pl-5">
                {ARCHETYPES[activeTab].reflects.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mb-3">
                <strong>What becomes possible:</strong>
                <br />
                {ARCHETYPES[activeTab].possible}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/request-mentorship" className="btn-cta">
                  Request Mentorship
                </Link>
                <Link
                  href="/case-studies"
                  className="rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-emerald hover:text-emerald"
                >
                  Explore Case Studies &rarr;
                </Link>
              </div>
            </div>

            <div className="mt-10 border-t border-white/10 pt-8">
              <h4 className="mb-4 font-heading text-lg font-semibold">Email me my results</h4>
              <div className="mb-3 flex flex-col gap-3">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Enter your name"
                  className="w-full rounded-[10px] bg-white px-4 py-3.5 text-base text-carbon outline-none"
                />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-[10px] bg-white px-4 py-3.5 text-base text-carbon outline-none"
                />
              </div>
              <label className="mb-4 flex cursor-pointer items-start gap-2.5 text-sm text-white/90 select-none">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 flex-none accent-emerald"
                />
                <span>
                  I consent to having my results emailed to me and my data stored in accordance with GDPR.
                </span>
              </label>
              <button onClick={handleSendResults} className="btn-cta w-full text-center">
                Send my results
              </button>
              {status && (
                <p className={`mt-2.5 text-sm ${statusOk ? "text-emerald" : "text-red-400"}`}>{status}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
