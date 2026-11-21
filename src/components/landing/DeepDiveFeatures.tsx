"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  FolderGit2,
  CheckCircle2,
  FileText,
  Search,
  ArrowRight,
  Check,
  Circle,
  Copy,
  Activity,
  Layers,
} from "lucide-react";
import {
  animate,
  createTimeline,
  createDraggable,
  createSpring,
  createScope,
  onScroll,
  stagger,
} from "animejs";
import { createDrawable, createMotionPath, morphTo } from "animejs/svg";
import { prefersReducedMotion } from "@/lib/motion";

interface FeaturePill {
  id: "milestones" | "checklists" | "vault" | "search";
  label: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
}

const FEATURES: FeaturePill[] = [
  {
    id: "milestones",
    label: "Milestones",
    tagline: "Track initiatives from kickoff to shipping.",
    icon: FolderGit2,
  },
  {
    id: "checklists",
    label: "Checklists",
    tagline: "Actionable deliverables with instant feedback.",
    icon: CheckCircle2,
  },
  {
    id: "vault",
    label: "Knowledge Vault",
    tagline: "Centralize project specs and code snippets.",
    icon: FileText,
  },
  {
    id: "search",
    label: "Command Search",
    tagline: "Instant keyboard lookup across the entire workspace.",
    icon: Search,
  },
];

export function DeepDiveFeatures() {
  const sectionRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<SVGSVGElement>(null);
  const [activeFeature, setActiveFeature] = useState<FeaturePill["id"]>("milestones");

  // Sub-feature states for interactivity
  const [checklistFilter, setChecklistFilter] = useState<"all" | "pending" | "done">("all");
  const [activeSnippet, setActiveSnippet] = useState<"react" | "auth" | "db">("react");
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const sampleChecklist = [
    { id: 1, title: "Refine responsive grid typography", completed: true },
    { id: 2, title: "Audit animation frame rate on mobile", completed: true },
    { id: 3, title: "Deploy release build to production", completed: false },
    { id: 4, title: "Prepare product announcement email", completed: false },
  ];

  // ── Anime.js v4 Scope Lifecycle: Grid Wave, Motion Path, Scroll-Sync ──────
  useEffect(() => {
    if (typeof window === "undefined" || prefersReducedMotion()) return;

    const scope = createScope({
      mediaQueries: { mobile: "(max-width: 768px)" },
      root: sectionRef.current || undefined,
    });

    scope.add(() => {
      // 1. Heavy 2D Grid Stagger Wave Entrance on cards & motif dots
      const tl = createTimeline({
        defaults: { ease: "outExpo" },
      });

      // Ripple the 10x3 background dot matrix outward from center
      tl.add(".grid-motif-dot", {
        opacity: [0, 0.45],
        scale: [0, 1],
        duration: 550,
        delay: stagger(30, { grid: [10, 3], from: "center" }),
      });

      // Slam / ripple the 4 bento cards from center outward with scale & translateY
      tl.add(
        ".bento-wave-card",
        {
          opacity: [0, 1],
          translateY: [48, 0],
          scale: [0.88, 1],
          duration: 800,
          delay: stagger(80, { grid: [2, 2], from: "center" }),
          ease: "outBack(1.35)",
        },
        "-=200"
      );

      // Fade up preview window
      if (previewRef.current) {
        tl.add(
          previewRef.current,
          {
            opacity: [0, 1],
            translateY: [24, 0],
            duration: 650,
          },
          "-=350"
        );
      }

      // 2. SVG Motion Path Animation: Active indicator beacon travels along track
      try {
        const mp = createMotionPath("#workflow-track-svg-path");
        if (mp) {
          animate("#workflow-active-beacon", {
            translateX: mp.translateX,
            translateY: mp.translateY,
            duration: 6000,
            ease: "inOutSine",
            loop: true,
            alternate: true,
          });
        }
      } catch (err) {
        console.warn("Motion path init:", err);
      }

      // 3. Scroll-Synced SVG Line Drawing
      try {
        const drawPaths = sectionRef.current?.querySelectorAll<SVGGeometryElement>(".feature-draw-path");
        if (drawPaths && drawPaths.length > 0) {
          animate(createDrawable(drawPaths), {
            draw: ["0 0", "0 1"],
            delay: stagger(40),
            ease: "inOut(3)",
            autoplay: onScroll({ target: sectionRef.current || undefined, sync: true }),
          });
        }
      } catch (err) {
        console.warn("Feature draw error:", err);
      }
    });

    return () => {
      scope.revert();
    };
  }, []);

  // ── Shape Morphing on Tab Switch via morphTo() ────────────────────────────
  const handleSelectFeature = (id: FeaturePill["id"]) => {
    setActiveFeature(id);

    if (!prefersReducedMotion()) {
      if (previewRef.current) {
        animate(previewRef.current, {
          opacity: [0.65, 1],
          translateY: [15, 0],
          duration: 350,
          ease: "outExpo",
        });
      }

      try {
        const targetMap: Record<string, string> = {
          milestones: "#morph-target-milestones",
          checklists: "#morph-target-checklists",
          vault: "#morph-target-vault",
          search: "#morph-target-search",
        };
        const targetSelector = targetMap[id];
        if (targetSelector) {
          animate("#feature-morph-shape", {
            d: morphTo(targetSelector),
            duration: 550,
            ease: "inOutQuad",
          });
        }
      } catch (err) {
        console.warn("Shape morphing error:", err);
      }
    }
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const filteredTasks = sampleChecklist.filter((t) => {
    if (checklistFilter === "pending") return !t.completed;
    if (checklistFilter === "done") return t.completed;
    return true;
  });

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative py-20 sm:py-28 px-6 sm:px-10 bg-[#E6D5BD] text-[#101010] border-b border-[#101010]/15 bg-grain overflow-hidden"
    >
      {/* ── 2D Dot Matrix Grid Motif (10 cols x 3 rows) ───────────────────── */}
      <div
        className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-5xl h-24 grid grid-cols-10 grid-rows-3 gap-6 pointer-events-none select-none opacity-40 justify-items-center items-center z-0"
        aria-hidden="true"
      >
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className="grid-motif-dot w-1.5 h-1.5 rounded-full bg-[#101010] opacity-0"
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ── Section Header with Active Morphing Accent Emblem ─────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#101010]/15 pb-6 mb-10 gap-4">
          <div className="flex items-start gap-4">
            {/* SVG Morphing Accent Shape */}
            <div className="w-12 h-12 bg-white rounded-xl border border-[#101010]/15 flex items-center justify-center shrink-0 shadow-xs">
              <svg
                width="34"
                height="34"
                viewBox="0 0 100 100"
                fill="none"
                className="text-[#D5360C]"
              >
                {/* Active Shape */}
                <path
                  id="feature-morph-shape"
                  d="M50 0 L58 35 L93 20 L72 50 L100 50 L72 65 L93 90 L58 75 L50 100 L42 75 L7 90 L28 65 L0 50 L28 50 L7 20 L42 35 Z"
                  fill="currentColor"
                />
                {/* Hidden Morph Targets */}
                <path
                  id="morph-target-milestones"
                  d="M50 5 L85 20 L95 50 L85 80 L50 95 L15 80 L5 50 L15 20 Z"
                  style={{ display: "none" }}
                />
                <path
                  id="morph-target-checklists"
                  d="M50 0 L100 50 L50 100 L0 50 Z"
                  style={{ display: "none" }}
                />
                <path
                  id="morph-target-vault"
                  d="M30 5 L70 5 L95 50 L70 95 L30 95 L5 50 Z"
                  style={{ display: "none" }}
                />
                <path
                  id="morph-target-search"
                  d="M50 10 A40 40 0 1 0 50 90 A40 40 0 1 0 50 10 Z"
                  style={{ display: "none" }}
                />
              </svg>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase text-[#D5360C] mb-1 font-semibold">
                <span>03 // CORE CAPABILITIES</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#101010]">
                BUILT FOR MOMENTUM.
              </h2>
            </div>
          </div>

          <div className="text-left md:text-right">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#524D46] block mb-1">
              SOVEREIGN ARCHITECTURE
            </span>
            <p className="font-sans text-xs sm:text-sm text-[#524D46] max-w-sm">
              Four focused tools unified into one calm, responsive workspace.
            </p>
          </div>
        </div>

        {/* ── Visual Workflow Track with createMotionPath() ────────────────── */}
        <div className="mb-10 p-5 rounded-2xl border border-[#101010]/15 bg-white/80 backdrop-blur-xs shadow-xs">
          <div className="flex items-center justify-between border-b border-[#101010]/10 pb-3 mb-3">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D5360C] animate-ping" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#101010]">
                CONTINUOUS WORKFLOW TRACK
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#D5360C] uppercase font-bold">
              LIVE WORKFLOW
            </span>
          </div>

          {/* SVG Process Track & Moving Beacon */}
          <div className="relative w-full overflow-hidden flex items-center justify-center py-2">
            <svg
              ref={trackRef}
              viewBox="0 0 1000 130"
              className="w-full h-auto max-h-[140px]"
              fill="none"
            >
              {/* Continuous Smooth Curved Black Track (starts at 100,50 and ends at 900,50) */}
              <path
                id="workflow-track-svg-path"
                d="M 100 50 C 190 25, 277 25, 367 25 C 457 25, 543 75, 633 75 C 723 75, 810 50, 900 50"
                stroke="#101010"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* 4 Milestone Dots positioned exactly on the path */}
              <circle cx="100" cy="50" r="7" fill="#101010" />
              <circle cx="367" cy="25" r="7" fill="#101010" />
              <circle cx="633" cy="75" r="7" fill="#101010" />
              <circle cx="900" cy="50" r="7" fill="#101010" />

              {/* Station Labels placed directly below each dot inside the SVG coordinate space */}
              <text
                x="100"
                y="112"
                textAnchor="middle"
                fill="#101010"
                fontSize="12"
                fontWeight="700"
                letterSpacing="0.05em"
                fontFamily="ui-monospace, monospace"
              >
                01 // SCOPE
              </text>
              <text
                x="367"
                y="112"
                textAnchor="middle"
                fill="#101010"
                fontSize="12"
                fontWeight="700"
                letterSpacing="0.05em"
                fontFamily="ui-monospace, monospace"
              >
                02 // TASKS
              </text>
              <text
                x="633"
                y="112"
                textAnchor="middle"
                fill="#101010"
                fontSize="12"
                fontWeight="700"
                letterSpacing="0.05em"
                fontFamily="ui-monospace, monospace"
              >
                03 // VAULT
              </text>
              <text
                x="900"
                y="112"
                textAnchor="middle"
                fill="#101010"
                fontSize="12"
                fontWeight="700"
                letterSpacing="0.05em"
                fontFamily="ui-monospace, monospace"
              >
                04 // RELEASE
              </text>

              {/* Moving Active Burnt Orange Beacon traveling via createMotionPath() */}
              <g id="workflow-active-beacon">
                <circle cx="0" cy="0" r="14" fill="#D5360C" />
                <circle cx="0" cy="0" r="5" fill="#FFFFFF" />
              </g>
            </svg>
          </div>
        </div>

        {/* ── Feature Selector Tabs with Heavy 2D Grid Stagger Wave ────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {FEATURES.map((feat) => {
            const Icon = feat.icon;
            const isSelected = activeFeature === feat.id;
            return (
              <button
                key={feat.id}
                type="button"
                onClick={() => handleSelectFeature(feat.id)}
                className={`bento-wave-card p-4 rounded-xl border text-left transition-all cursor-pointer opacity-0 shadow-xs ${
                  isSelected
                    ? "bg-[#D5360C] text-white border-[#D5360C] shadow-md scale-[1.01]"
                    : "bg-white text-[#101010] border-[#101010]/12 hover:border-[#101010]/30 hover:bg-[#FAF4EA]"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-5 h-5 ${isSelected ? "text-white" : "text-[#D5360C]"}`} />
                  <span
                    className={`font-mono text-[10px] uppercase px-1.5 py-0.5 rounded-md font-bold ${
                      isSelected ? "bg-white/20 text-white" : "bg-[#EDE4D5] text-[#524D46]"
                    }`}
                  >
                    ACTIVE
                  </span>
                </div>
                <h3 className="font-sans text-sm font-bold truncate">{feat.label}</h3>
                <p
                  className={`text-[11px] mt-1 line-clamp-1 ${
                    isSelected ? "text-white/85" : "text-[#524D46]"
                  }`}
                >
                  {feat.tagline}
                </p>
              </button>
            );
          })}
        </div>

        {/* ── Interactive Feature Showcase Window ────────────────────────── */}
        <div
          ref={previewRef}
          className="rounded-2xl border border-[#101010]/15 bg-white p-6 sm:p-10 shadow-lg opacity-0 min-h-[360px] relative overflow-hidden"
        >
          {/* Scroll-synced SVG border bracket */}
          <svg
            className="absolute top-2 right-2 w-8 h-8 pointer-events-none text-[#101010]"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path d="M 0 2 L 30 2 L 30 32" stroke="#101010" strokeWidth="2" className="feature-draw-path" />
          </svg>

          {/* 1. Milestones Feature Preview */}
          {activeFeature === "milestones" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#101010]/10 pb-4">
                <div>
                  <h4 className="font-sans text-lg font-bold text-[#101010]">
                    Project & Milestone Directory
                  </h4>
                  <p className="text-xs text-[#524D46]">
                    Track multiple project workstreams with progress visibility.
                  </p>
                </div>
                <Link
                  href="/projects"
                  className="font-sans text-xs font-semibold text-[#D5360C] hover:underline flex items-center gap-1"
                >
                  <span>Open Projects</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    name: "Customer Analytics Suite",
                    status: "Active",
                    progress: 88,
                    deliverables: "14/16 Done",
                  },
                  {
                    name: "Subscription Billing System",
                    status: "Active",
                    progress: 92,
                    deliverables: "22/24 Done",
                  },
                  {
                    name: "Team Knowledge Vault",
                    status: "Completed",
                    progress: 100,
                    deliverables: "18/18 Done",
                  },
                ].map((p, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-[#101010]/10 bg-[#F7F4EF] hover:border-[#101010]/25 transition-all shadow-2xs"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-sans text-xs font-bold text-[#101010] truncate">
                        {p.name}
                      </span>
                      <span className="font-sans text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#EDE4D5] text-[#101010]">
                        {p.status}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-[11px] text-[#524D46] mb-1">
                      <span>Progress</span>
                      <span className="font-mono font-bold text-[#101010]">{p.progress}%</span>
                    </div>
                    <div className="w-full bg-[#EDE4D5] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#D5360C] h-full rounded-full transition-all duration-700"
                        style={{ width: `${p.progress}%` }}
                      />
                    </div>
                    <div className="mt-3 text-[11px] font-mono text-[#524D46]">
                      {p.deliverables}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. Checklists Feature Preview */}
          {activeFeature === "checklists" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#101010]/10 pb-4">
                <div>
                  <h4 className="font-sans text-lg font-bold text-[#101010]">
                    Deliverables Checklist
                  </h4>
                  <p className="text-xs text-[#524D46]">
                    Filter and track deliverables with instant optimistic updates.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 bg-[#EDE4D5] p-1 rounded-lg">
                  {(["all", "pending", "done"] as const).map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setChecklistFilter(filter)}
                      className={`px-3 py-1 rounded-md text-xs font-sans font-semibold capitalize transition-all cursor-pointer ${
                        checklistFilter === filter
                          ? "bg-[#D5360C] text-white shadow-2xs"
                          : "text-[#101010] hover:bg-[#FAF4EA]"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2.5 max-w-2xl">
                {filteredTasks.map((t) => (
                  <div
                    key={t.id}
                    className="flex items-center justify-between p-3.5 rounded-lg border border-[#101010]/10 bg-[#F7F4EF] hover:border-[#101010]/20 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      {t.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-[#D5360C]" />
                      ) : (
                        <Circle className="w-4 h-4 text-[#101010]/40" />
                      )}
                      <span
                        className={`text-xs font-sans ${
                          t.completed ? "line-through text-[#524D46]/70" : "font-medium text-[#101010]"
                        }`}
                      >
                        {t.title}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-[#524D46] uppercase">
                      {t.completed ? "COMPLETED" : "IN PROGRESS"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Knowledge Vault Feature Preview */}
          {activeFeature === "vault" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#101010]/10 pb-4">
                <div>
                  <h4 className="font-sans text-lg font-bold text-[#101010]">
                    Reusable Code & Architecture Notes
                  </h4>
                  <p className="text-xs text-[#524D46]">
                    Store key code snippets, commands, and architectural records.
                  </p>
                </div>
                <div className="flex gap-2">
                  {[
                    { id: "react", label: "Component" },
                    { id: "auth", label: "Session" },
                    { id: "db", label: "Schema" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveSnippet(tab.id as any)}
                      className={`px-3 py-1 rounded-md text-xs font-sans font-semibold transition-all cursor-pointer ${
                        activeSnippet === tab.id
                          ? "bg-[#D5360C] text-white"
                          : "bg-[#EDE4D5] text-[#101010] hover:bg-[#E2D6C3]"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-[#101010]/10 bg-[#F7F4EF] p-4 relative">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#101010]/10 bg-white text-xs font-sans text-[#101010] hover:bg-[#EDE4D5] cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#2A6E3B]" />
                      <span className="text-[11px] text-[#2A6E3B] font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#524D46]" />
                      <span className="text-[11px]">Copy Snippet</span>
                    </>
                  )}
                </button>
                <pre className="font-mono text-xs text-[#101010] overflow-x-auto pr-24 leading-relaxed">
                  {activeSnippet === "react" &&
                    `export function Card({ title, status }: CardProps) {\n  return (\n    <div className="rounded-lg border border-black/10 bg-white p-4">\n      <h3 className="font-bold">{title}</h3>\n      <span>{status}</span>\n    </div>\n  );\n}`}
                  {activeSnippet === "auth" &&
                    `// 256-bit encrypted session check\nconst user = await getCurrentUser();\nif (!user) redirect('/login');\nreturn <DashboardView user={user} />;`}
                  {activeSnippet === "db" &&
                    `model Project {\n  id          String   @id @default(cuid())\n  name        String\n  description String?\n  status      String   @default("active")\n  tasks       Task[]\n}`}
                </pre>
              </div>
            </div>
          )}

          {/* 4. Command Search Feature Preview */}
          {activeFeature === "search" && (
            <div className="space-y-6">
              <div className="border-b border-[#101010]/10 pb-4">
                <h4 className="font-sans text-lg font-bold text-[#101010]">
                  Global Command Search
                </h4>
                <p className="text-xs text-[#524D46]">
                  Search across projects, tasks, notes, and sub-pages in milliseconds.
                </p>
              </div>

              <div className="max-w-xl space-y-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#524D46]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Try typing 'auth', 'design', or 'billing'..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#101010]/20 bg-[#F7F4EF] text-xs font-sans text-[#101010] placeholder:text-[#524D46]/60 focus:outline-none focus:border-[#D5360C]"
                  />
                </div>

                <div className="space-y-2">
                  <span className="font-mono text-[10px] text-[#524D46] uppercase">
                    Sample Indexed Results
                  </span>
                  {[
                    { title: "Design System & Tokens", type: "Project", badge: "Core" },
                    { title: "Review milestone roadmap", type: "Task", badge: "Normal" },
                    { title: "Authentication architecture", type: "Note", badge: "Docs" },
                  ]
                    .filter(
                      (item) =>
                        searchQuery.trim() === "" ||
                        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.type.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 rounded-lg border border-[#101010]/10 bg-[#F7F4EF] hover:bg-[#EDE4D5]/40 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-[#EDE4D5] text-[#101010]">
                            {item.type}
                          </span>
                          <span className="text-xs font-sans font-medium text-[#101010]">
                            {item.title}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-[#524D46]">{item.badge}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
