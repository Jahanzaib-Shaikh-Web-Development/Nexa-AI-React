/*
 * NEXAAI — COMMENTED LEARNING COPY
 * Use this file as src/App.jsx in your existing project.
 * It relies on your existing CSS and components/ui files.
 * // comments explain JavaScript; JSX comments use braces and slash-star syntax.
 * Markdown escape damage was removed from the uploaded text.
 * Blockchain includes topic cards and a practice exercise.
 * Existing lesson content and theme controls are retained.
 */
"use client";
// React hooks: useState stores changing values; useEffect synchronizes with browser APIs.
import { useEffect, useState, useRef } from "react";
// Import icons as reusable React components.
import {
  Sparkles,
  LayoutDashboard,
  MessageSquare,
  Code2,
  BookOpen,
  Brain,
  FileText,
  PenLine,
  History,
  Settings,
  ArrowUpRight,
  ArrowRight,
  Search,
  Plus,
  Send,
  Copy,
  Upload,
  Trash2,
  Check,
  ChevronRight,
  LogOut,
  Sun,
  Moon,
  Trophy,
  Download,
  Zap,
  Blocks,
  Palette,
} from "lucide-react";
// Import the project’s existing reusable UI components; @ points to src.
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// Navigation/card data. Each id must exactly match its page condition (case-sensitive).
// name = title; desc = description; icon = component; color = CSS class; hint = footer text.
// Blockchain and Web Development have dedicated content sections.
const toolsList = [
  {
    id: "chat",
    name: "AI Chat",
    desc: "A little curiosity. Endless possibilities.",
    icon: MessageSquare,
    color: "purple",
    hint: "Ask anything, explore ideas",
  },
  {
    id: "code",
    name: "Code Assistant",
    desc: "Your next breakthrough starts here.",
    icon: Code2,
    color: "blue",
    hint: "Write, debug & improve",
  },
  {
    id: "study",
    name: "Study Assistant",
    desc: "Make the complex feel simple.",
    icon: BookOpen,
    color: "green",
    hint: "Understand any topic",
  },
  {
    id: "Blockchain",
    name: "Blockchain",
    desc: "Explore the technology behind a decentralized world.",
    icon: Blocks,
    color: "sh",
    hint: "Learn blockchain & smart contracts",
  },
  {
    id: "Web Development",
    name: "Web Development",
    desc: "Build responsive websites and interactive applications.",
    icon: Code2,
    color: "sha",
    hint: "Explore frontend & backend development",
  },
  {
    id: "Graphic",
    name: "Graphic Design",
    desc: "Turn creative ideas into compelling visual designs.",
    icon: Palette,
    color: "shai",
    hint: "Discover typography, branding & design",
  },
  {
    id: "quiz",
    name: "Quiz Generator",
    desc: "Turn what you know into confidence.",
    icon: Brain,
    color: "orange",
    hint: "Test your knowledge",
  },
  {
    id: "documents",
    name: "Document AI",
    desc: "Less reading. More understanding.",
    icon: FileText,
    color: "cyan",
    hint: "Upload & explore documents",
  },
  {
    id: "writer",
    name: "AI Writer",
    desc: "Find the right words, every time.",
    icon: PenLine,
    color: "pink",
    hint: "Bring your ideas to life",
  },
];
// Starter text shown inside the code editor; this string is not executed.
const initialCode = `import { useState } from 'react';\n\nexport default function Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <button onClick={() => setCount(count + 1)}>\n      Count: {count}\n    </button>\n  );\n}`;
// Quiz data: q is the question, a contains choices, correct is a zero-based index, why explains it.
const bank = [
  {
    q: "What is the output of typeof null?",
    a: ['"null"', '"object"', '"undefined"', '"string"'],
    correct: 1,
    why: 'typeof null returns "object", a historical JavaScript quirk.',
  },
  {
    q: "Which array method creates a new transformed array?",
    a: ["push()", "forEach()", "map()", "pop()"],
    correct: 2,
    why: "map() returns a new array with the callback result for each item.",
  },
  {
    q: "What does const prevent?",
    a: [
      "All object changes",
      "Variable reassignment",
      "Function calls",
      "Array updates",
    ],
    correct: 1,
    why: "const prevents reassignment; object contents may still change.",
  },
  {
    q: "Which operator checks strict equality?",
    a: ["=", "==", "===", "!="],
    correct: 2,
    why: "=== compares without type coercion.",
  },
  {
    q: "What does an async function return?",
    a: ["A Promise", "Only a string", "Nothing", "A DOM node"],
    correct: 0,
    why: "An async function always returns a Promise.",
  },
];
// Offline study content. Chat and Study Assistant reuse these prepared explanations.
const lessons = {
  "React Hooks":
    "React Hooks let function components use state and other React features.\n\nuseState stores a value between renders. Call its setter to update the value and render again.\n\nuseEffect synchronizes a component with an external system, such as a timer or subscription. Return a cleanup function when needed.\n\nExample: const [count, setCount] = useState(0);\n\nPractice: build a counter with increment and reset buttons.",
  "JavaScript Promises":
    'A Promise represents an asynchronous result. It begins pending, then becomes fulfilled or rejected.\n\nUse await inside an async function to wait for its result. Use try/catch to handle failures.\n\nExample: const response = await fetch("/api/books");\n\nPractice: load a list of books and display loading and error states.',
  "CSS Flexbox":
    "Flexbox arranges items along one main axis. Set display: flex on a parent.\n\njustify-content controls main-axis alignment; align-items controls cross-axis alignment. gap adds space between items.\n\nExample: .row { display: flex; gap: 16px; flex-wrap: wrap; }\n\nPractice: make a responsive row of three cards.",

  Blockchain:
    "A blockchain stores records in blocks linked together using cryptographic hashes. Network participants check transactions before they are added to the blockchain.\n\nOnce recorded, data is difficult to change because changing one block affects the links to later blocks.\n\nExample: A block can contain cryptocurrency transaction records and a timestamp.\n\nPractice: describe how a transaction is checked and added to a block.",

  "Web Development":
    "Web development is the work of building websites and web applications.\n\nHTML provides page structure, CSS controls appearance, and JavaScript adds interactivity. Frontend development focuses on what users see; backend development handles server logic and data.\n\nExample: HTML creates a button, CSS styles it, and JavaScript responds when it is clicked.\n\nPractice: build a simple webpage with a heading, an image, and a button.",

  "Graphic Design":
    "Graphic design communicates ideas through visual elements such as text, images, color, and layout.\n\nGood designs use readable fonts, balanced spacing, and colors that work well together.\n\nExample: A poster can combine a clear title, an image, and event details.\n\nPractice: design a simple poster for a school event.",
};
// Reusable brand component. JSX describes the elements React should render.
function Logo() {
  return (
    <span className="logo">
      <Sparkles fill="currentColor" /> Nexa<span>AI</span>
    </span>
  );
}
// Sidebar component receives the current page and the navigation function as props.
function Navigation({ page, go }) {
  // Access sidebar context so choosing a page can close the mobile menu.
  const { setOpenMobile } = useSidebar();
  return (
    <>
      {/* Brand link at the top of the sidebar. */}
      <SidebarHeader>
        <button className="brand" onClick={() => go("landing")}>
          <Logo />
        </button>
      </SidebarHeader>
      <SidebarContent>
        <span className="nav-label">WORKSPACE</span>
        {/* Build menu entries from data; key identifies each item to React. */}
        <SidebarMenu>
          {[
            { id: "dashboard", name: "Dashboard", icon: LayoutDashboard },
            ...toolsList,
            { id: "history", name: "History", icon: History },
          ].map((t) => (
            <SidebarMenuItem key={t.id}>
              <SidebarMenuButton
                isActive={page === t.id}
                onClick={() => {
                  go(t.id);
                  setOpenMobile(false);
                }}
              >
                <t.icon />
                <span>{t.name}</span>
                {page === t.id && <span className="active-dot" />}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <div className="sidebar-note">
          <Sparkles />
          <h3>A little help. A big leap.</h3>
          <p>Your next great idea starts with a question.</p>
          <Button onClick={() => go("chat")}>
            Start a conversation <ArrowRight />
          </Button>
        </div>
      </SidebarContent>
      {/* Settings and profile controls. */}
      <SidebarFooter>
        <SidebarMenuButton onClick={() => go("settings")}>
          <Settings />
          Settings
        </SidebarMenuButton>
        <button className="user-side" onClick={() => go("settings")}>
          <span className="avatar">J</span>
          <span>
            My workspace<small>Personal account</small>
          </span>
          <ChevronRight size={16} />
        </button>
      </SidebarFooter>
    </>
  );
}
// Main component, exported for main.jsx to render. All hooks stay before conditional returns.
export default function App() {
  // Each useState returns [current value, setter]. Calling a setter requests a new render.
  const [page, setPage] = useState("dashboard"),
    [name, setName] = useState("John"), // Profile display name.
    [email, setEmail] = useState(""), // Profile email.
    [bio, setBio] = useState(""), // Profile biography.
    [light, setLight] = useState(false), // true selects light mode; false selects dark mode.
    [search, setSearch] = useState(""), // Text used to filter dashboard cards.
    [notice, setNotice] = useState(""), // Temporary feedback message.
    [history, setHistory] = useState([]), // Activity records saved in this browser.
    [ready, setReady] = useState(false), // Prevents saving initial defaults before saved data is loaded.
    [messages, setMessages] = useState([]), // Conversation messages, each with a role and text.
    [prompt, setPrompt] = useState(""), // Current message input.
    [code, setCode] = useState(initialCode), // Editable code string.
    [analysis, setAnalysis] = useState(""), // Local code-check result.
    [topic, setTopic] = useState("React Hooks"), // Selected study topic.
    [level, setLevel] = useState("Intermediate"), // Selected lesson difficulty.
    [lesson, setLesson] = useState(""), // Explanation currently displayed.
    [quiz, setQuiz] = useState(false), // Whether the quiz has started.
    [qi, setQi] = useState(0), // Current question index, starting at zero.
    [answers, setAnswers] = useState([]), // Submitted answer indices.
    [choice, setChoice] = useState(null), // Selected answer for the current question; null means no selection.
    [review, setReview] = useState(false), // Whether to show answer explanations.
    [docs, setDocs] = useState([]), // Uploaded file names and text, kept in memory.
    [doc, setDoc] = useState(null), // Selected document index.
    [docQuestion, setDocQuestion] = useState(""), // Search phrase for the selected document.
    [docAnswer, setDocAnswer] = useState(""), // Matching document passages.
    [writingTopic, setWritingTopic] = useState("My new React project"), // Subject of the writing template.
    [template, setTemplate] = useState("LinkedIn post"), // Selected draft format.
    [tone, setTone] = useState("Professional"), // Selected writing tone.
    [draft, setDraft] = useState(""), // Editable generated template text.
    [filter, setFilter] = useState("All"); // Selected history category.
  // Run once after mounting: restore data and watch the URL hash.
  useEffect(() => {
    try {
      // Load saved browser data; use an empty object when nothing was saved.
      const d = JSON.parse(localStorage.getItem("nexa-data") || "{}");
      setName(d.name || "John");
      setEmail(d.email || "");
      setBio(d.bio || "");
      setHistory(d.history || []);
      setMessages(d.messages || []);
      setLight(!!d.light);
    } catch { }
    setReady(true);
    // Read the initial hash, then subscribe to later browser navigation changes.
    const normalizePage = (value) => {
      let decoded = value;
      try {
        decoded = decodeURIComponent(value);
      } catch { }
      if (decoded.toLowerCase() === "blockchain") return "Blockchain";
      if (
        ["web development", "web-development"].includes(decoded.toLowerCase())
      )
        return "Web Development";
      if (
        ["graphic", "graphic design", "graphic-design"].includes(
          decoded.toLowerCase(),
        )
      )
        return "Graphic";
      return decoded;
    };
    const route = normalizePage(location.hash.slice(1));
    if (route) setPage(route);
    const fn = () =>
      setPage(normalizePage(location.hash.slice(1)) || "dashboard");
    addEventListener("hashchange", fn);
    // Cleanup prevents a leftover listener when the component unmounts.
    return () => removeEventListener("hashchange", fn);
  }, []);
  // Save selected values whenever they change and apply the theme.
  useEffect(() => {
    if (ready)
      localStorage.setItem(
        "nexa-data",
        JSON.stringify({ name, email, bio, history, messages, light }),
      );
    // CSS uses :root.light to switch the palette on the whole document.
    document.documentElement.classList.toggle("light", light);
  }, [ready, name, email, bio, history, messages, light]);
  // Hide a notification after 3.5 seconds.
  useEffect(() => {
    if (notice) {
      const id = setTimeout(() => setNotice(""), 3500);
      // Cancel the previous timer when the notice changes or the component unmounts.
      return () => clearTimeout(id);
    }
  }, [notice]);
  // Navigate without a full page reload; the URL hash supports browser Back/Forward.
  function go(p) {
    location.hash = p;
    setPage(p);
    setSearch("");
  }
  // Add newest activity first and keep only the most recent 50 records.
  function record(title, type) {
    setHistory((h) =>
      [
        { title, type, date: new Date().toLocaleDateString(), id: Date.now() },
        ...h,
      ].slice(0, 50),
    );
  }
  // Clipboard access is asynchronous and can fail; show feedback in either case.
  async function copy(t) {
    try {
      // Wait for the browser to finish copying before showing success.
      await navigator.clipboard.writeText(t);
      setNotice("Copied to clipboard");
    } catch {
      setNotice("Clipboard unavailable. Select and copy the text.");
    }
  }
  // Offline chat: match lesson keywords, append both messages, then clear the input.
  function send() {
    // Ignore empty messages or messages containing only spaces.
    if (!prompt.trim()) return;
    let reply =
      "This is an offline learning demo. Try asking about React Hooks, JavaScript Promises, or CSS Flexbox for a prepared explanation.";
    // Object.entries supplies each topic name together with its explanation.
    for (const [key, value] of Object.entries(lessons)) {
      if (
        prompt.toLowerCase().includes(key.split(" ").pop().toLowerCase()) ||
        prompt.toLowerCase().includes(key.toLowerCase())
      )
        reply = value;
    }
    setMessages((m) => [
      ...m,
      { role: "user", text: prompt },
      { role: "assistant", text: reply },
    ]);
    record(prompt, "chat");
    setPrompt("");
  }
  // Find the current tool title, then fall back to dashboard/history/settings labels.
  const heading =
    toolsList.find((t) => t.id === page)?.name ||
    {
      dashboard: "Dashboard",
      history: "History",
      settings: "Profile & Settings",
    }[page] ||
    "NexaAI";
  // Create a text file from the draft, click a temporary download link, and release its URL.
  function download() {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([draft], { type: "text/plain" }));
    a.download = "nexa-draft.txt";
    a.click();
    // Free the temporary object URL after requesting the download.
    URL.revokeObjectURL(a.href);
  }
  // Filter tools by the search text, then map each tool into a reusable card.
  const toolCards = (
    <div className="tools-grid">
      {toolsList
        .filter((t) =>
          (t.name + " " + t.hint).toLowerCase().includes(search.toLowerCase()),
        )
        .map((t) => (
          <button className="tool-card" key={t.id} onClick={() => go(t.id)}>
            <div className="card-top">
              <span className={"tool-icon " + t.color}>
                <t.icon size={23} />
              </span>
              <ArrowUpRight size={18} />
            </div>
            <h3>{t.name}</h3>
            <p>{t.desc}</p>
            <span className="card-hint">
              {t.hint}
              <ArrowRight size={15} />
            </span>
          </button>
        ))}
    </div>
  );
  // Render the landing page instead of the workspace when its hash route is selected.
  if (page === "landing")
    return (
      <div className="landing">
        {/* Landing navigation, including the shared light/dark state toggle. */}
        <nav>
          <Logo />
          <div>
            <button
              onClick={() =>
                document
                  .getElementById("features")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Features
            </button>
            <button onClick={() => go("login")}>Log in</button>
            <Button onClick={() => go("signup")}>
              Get started <ArrowRight />
            </Button>

          
          </div>
        </nav>

        {/* Landing introduction and workspace call to action. */}
        <section className="landing-hero">
          <span className="eyebrow">
            <Sparkles size={15} /> YOUR IDEAS, SUPERCHARGED
          </span>
          <h1>
            Your all-in-one
            <br />
            <em>AI study & developer</em>
            <br />
            assistant.
          </h1>
          <p>
            Learn. Build. Create. Grow.
            <br />A smarter space for your next big idea.
          </p>
          <Button onClick={() => go("dashboard")}>
            Explore the workspace <ArrowRight />
          </Button>
          <span className="demo-note">
            Free interactive demo · No account required
          </span>
        </section>
        {/* Reuse the same tool cards as the dashboard. */}
        <section id="features">
          <h2>Six tools. One creative workspace.</h2>
          {toolCards}
        </section>
        <footer>
          <Logo />
          <span>Learn something. Make something.</span>
        </footer>
      </div>
    );
  // These forms simulate account flows; they do not authenticate users or send email.
  if (["login", "signup", "forgot", "reset"].includes(page))
    return (
      <div className="auth">
        <button className="auth-logo" onClick={() => go("landing")}>
          <Logo />
        </button>
        <div className="auth-card">
          <span className="tool-icon purple">
            <Sparkles />
          </span>
          <h1>
            {page === "login"
              ? "Welcome back"
              : page === "signup"
                ? "Create your account"
                : page === "forgot"
                  ? "Forgot password?"
                  : "Reset your password"}
          </h1>
          <p>Demo account flow · No server authentication</p>
          <form
            onSubmit={(e) => {
              // Keep form submission inside React rather than reloading the page.
              e.preventDefault();
              if (page === "forgot") {
                setNotice("Demo only: no email was sent.");
                go("reset");
              } else if (page === "reset") {
                setNotice("Demo reset complete; no password is stored.");
                go("login");
              } else {
                setNotice("Welcome to your demo workspace");
                go("dashboard");
              }
            }}
          >
            {page === "signup" && (
              <label>
                Full name
                <Input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
            )}
            {page !== "reset" && (
              <label>
                Email address
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </label>
            )}
            {page !== "forgot" && (
              <label>
                Password
                <Input
                  type="password"
                  minLength={8}
                  required
                  placeholder="At least 8 characters"
                />
              </label>
            )}
            <Button type="submit">
              {page === "login"
                ? "Log in to demo"
                : page === "signup"
                  ? "Create demo profile"
                  : page === "forgot"
                    ? "Continue demo reset"
                    : "Reset demo password"}
            </Button>
          </form>
          <button onClick={() => go(page === "login" ? "forgot" : "login")}>
            {page === "login" ? "Forgot password?" : "Back to login"}
          </button>
          {page === "login" && (
            <button onClick={() => go("signup")}>New here? Sign up</button>
          )}
          <button onClick={() => go("dashboard")}>Continue as guest →</button>
        </div>
        <div className="auth-quote">
          <Sparkles />
          <h2>
            Same goals.
            <br />
            <em>Smarter tools.</em>
          </h2>
          <p>A little curiosity goes a long way.</p>
        </div>
        {notice && (
          <div role="status" className="toast">
            {notice}
          </div>
        )}
      </div>
    );
  return (
    <SidebarProvider>
      <Sidebar>
        <Navigation page={page} go={go} />
      </Sidebar>
      <main className="workspace">
        {/* Breadcrumb, theme control, and profile shortcut. */}
        <header className="topbar">
          <div className="breadcrumb">
            <SidebarTrigger />
            <span>Workspace</span>
            <ChevronRight size={14} />
            <strong>{heading}</strong>
          </div>
          <div className="top-actions">
            <span className="demo-pill">Interactive demo</span>
            <button
              className="icon-button"
              aria-label="Toggle theme"
              onClick={() => setLight(!light)}
            >
              {light ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button onClick={() => go("settings")} className="avatar">
              {name[0] || "J"}
            </button>
          </div>
        </header>
        <div className="content">
          {/* Conditional rendering: dashboard or the selected tool page. */}
          {page === "dashboard" ? (
            <>
              <div className="welcome">
                <div>
                  <div className="eyebrow">YOUR SPACE TO THINK BIG</div>
                  <h1>
                    Good to see you, {name}. <span className="wave">✦</span>
                  </h1>
                  <p>What would you like to learn, build, or create today?</p>
                </div>
                <span className="date">Let’s make something great.</span>
              </div>
              <section className="feature-banner">
                <div>
                  <span className="eyebrow">
                    <Sparkles size={14} /> A LITTLE INSPIRATION
                  </span>
                  <h2>
                    Big ideas start with
                    <br />a simple conversation.
                  </h2>
                  <p>
                    Untangle a concept, explore an idea, or find your next step.
                  </p>
                  <Button onClick={() => go("chat")}>
                    Let’s talk <ArrowUpRight size={16} />
                  </Button>
                </div>
                <div className="banner-code">
                  <span>
                    <i /> YOUR NEXT BREAKTHROUGH
                  </span>
                  <pre>
                    <b>const</b> possibilities = <em>Infinity</em>;{"\n\n"}
                    <b>while</b> (curiosity) {"{"}
                    {"\n"} learn();{"\n"} create();{"\n"} <em>grow();</em>
                    {"\n"}
                    {"}"}
                  </pre>
                  <div>
                    <Sparkles size={16} /> Made for your curious mind
                  </div>
                </div>
              </section>
              <div className="section-title">
                <h2>
                  Your creative toolkit <span>06</span>
                </h2>
                {/* Controlled input: value reads state; onChange updates it. */}
                <div className="search">
                  <Search size={16} />
                  <input
                    aria-label="Search tools"
                    placeholder="Find a tool..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
              {toolCards}
              {/* Recent activity and counts derived from the history array. */}
              <div className="bottom-grid">
                <section className="panel activity">
                  <div className="section-title">
                    <h2>Recent activity</h2>
                    <button onClick={() => go("history")}>
                      View all <ArrowRight size={14} />
                    </button>
                  </div>
                  {history.length ? (
                    history.slice(0, 3).map((h) => (
                      <button
                        className="history-row"
                        key={h.id}
                        onClick={() => go(h.type)}
                      >
                        <span className="tool-icon blue">
                          <FileText size={19} />
                        </span>
                        <span>
                          <strong>{h.title}</strong>
                          <small>
                            {toolsList.find((t) => t.id === h.type)?.name}
                          </small>
                        </span>
                        <small>{h.date}</small>
                        <ChevronRight size={16} />
                      </button>
                    ))
                  ) : (
                    <div className="empty-activity">
                      <History />
                      <div>
                        <h3>A fresh start, full of possibilities</h3>
                        <p>
                          Your conversations and creations will appear here.
                        </p>
                      </div>
                      <Button variant="outline" onClick={() => go("chat")}>
                        Create your first
                      </Button>
                    </div>
                  )}
                </section>
                <section className="panel stats">
                  <span className="eyebrow">YOUR WORKSPACE</span>
                  <div>
                    <strong>
                      {history.length.toString().padStart(2, "0")}
                    </strong>
                    <span>Ideas explored</span>
                  </div>
                  <div>
                    <strong>
                      {history
                        .filter((h) => h.type === "quiz")
                        .length.toString()
                        .padStart(2, "0")}
                    </strong>
                    <span>Quizzes completed</span>
                  </div>
                  <span className="stats-foot">
                    <Zap size={14} /> Small steps. Real progress.
                  </span>
                </section>
              </div>
              <footer className="workspace-footer">
                <span>NexaAI · A little help for your next big thing.</span>
                <span>
                  Built for curious minds <Sparkles size={12} />
                </span>
              </footer>
            </>
          ) : (
            <>
              <div className="page-heading">
                <div>
                  <span className="eyebrow">YOUR WORKSPACE</span>
                  <h1>{heading}</h1>
                </div>
                {/* Chat-only controls or content; && renders this block only on the chat page. */}
                {page === "chat" && (
                  <Button onClick={() => setMessages([])}>
                    <Plus />
                    New chat
                  </Button>
                )}
              </div>
              {/* Chat-only controls or content; && renders this block only on the chat page. */}
              {page === "chat" && (
                <div className="panel chat-panel">
                  <div className="demo-disclaimer">
                    Offline demo · Prepared learning answers for React Hooks,
                    JavaScript Promises, CSS Flexbox, Blockchain, Web
                    Development and Graphic Design.
                  </div>
                  <div className="messages">
                    {!messages.length ? (
                      <div className="chat-empty">
                        <span className="tool-icon purple">
                          <Sparkles />
                        </span>
                        <h2>Where shall we start?</h2>
                        <p>A question today. A new possibility tomorrow.</p>
                        <div className="suggestions">
                          {Object.keys(lessons).map((k) => (
                            <button
                              key={k}
                              onClick={() => setPrompt("Explain " + k)}
                            >
                              {k}
                              <ArrowUpRight size={15} />
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      messages.map((m, i) => (
                        <div key={i} className={"message " + m.role}>
                          {m.role === "assistant" && <Sparkles size={18} />}
                          <div>
                            <pre>{m.text}</pre>
                            {m.role === "assistant" && (
                              <button onClick={() => copy(m.text)}>
                                <Copy size={14} /> Copy
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <form
                    className="composer"
                    onSubmit={(e) => {
                      // Keep form submission inside React rather than reloading the page.
                      e.preventDefault();
                      send();
                    }}
                  >
                    <Input
                      aria-label="Message"
                      placeholder="Ask about React Hooks, Promises, Flexbox, Blockchain, Web Development or Graphic Design..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                    />
                    <Button
                      type="submit"
                      disabled={!prompt.trim()}
                      aria-label="Send message"
                    >
                      <Send />
                    </Button>
                  </form>
                </div>
              )}
              {/* Code Assistant: edit text and run simple local pattern checks. */}
              {page === "code" && (
                <div className="split">
                  <section className="panel">
                    <div className="section-title">
                      <h2>JavaScript / JSX</h2>
                      <button onClick={() => copy(code)}>
                        <Copy size={16} />
                        Copy
                      </button>
                    </div>
                    <Textarea
                      className="code-editor"
                      aria-label="Code editor"
                      spellCheck={false}
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </section>
                  <section className="panel">
                    <h2>Code insights</h2>
                    <p className="muted">
                      Local pattern checks · Code is not executed.
                    </p>
                    {[
                      "Explain code",
                      "Find common issues",
                      "Best practices",
                    ].map((action) => (
                      <Button
                        className="full"
                        key={action}
                        variant="outline"
                        onClick={() => {
                          setAnalysis(
                            action === "Explain code"
                              ? code.includes("useState")
                                ? "This code uses React state. useState supplies a current value and a setter. Updating the state schedules a render. Review event handlers to understand how users change that value."
                                : "This local explainer recognizes React useState examples. For other code, follow the declarations, inputs, and returned output step by step."
                              : action === "Find common issues"
                                ? [
                                  code.includes("console.log")
                                    ? "• console.log detected: remove debugging output before release."
                                    : "",
                                  code.includes("==") && !code.includes("===")
                                    ? "• Loose equality detected: consider ===."
                                    : "",
                                  code.includes("useState") &&
                                    !code.includes("import")
                                    ? "• useState appears without an import."
                                    : "",
                                ]
                                  .filter(Boolean)
                                  .join("\n") ||
                                "No supported pattern warnings found. This is not a full syntax, security, or correctness check."
                                : "Use descriptive names, keep components focused, handle errors, and add accessible labels.",
                          );
                          record(action, "code");
                        }}
                      >
                        <Code2 />
                        {action}
                      </Button>
                    ))}
                    <pre className="response">
                      {analysis || "Choose a check to explore your code."}
                    </pre>
                  </section>
                </div>
              )}
              {/* Study Assistant: select a topic and difficulty, then display a prepared lesson. */}
              {page === "study" && (
                <div className="split">
                  <section className="panel form-panel">
                    <label>
                      Topic
                      <select
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                      >
                        {Object.keys(lessons).map((k) => (
                          <option key={k}>{k}</option>
                        ))}
                      </select>
                    </label>
                    <label>Difficulty</label>
                    <Tabs value={level} onValueChange={setLevel}>
                      <TabsList>
                        {["Beginner", "Intermediate", "Advanced"].map((k) => (
                          <TabsTrigger value={k} key={k}>
                            {k}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </Tabs>
                    <Button
                      onClick={() => {
                        setLesson(
                          lessons[topic] +
                          (level === "Advanced"
                            ? "\n\nChallenge: explain edge cases, lifecycle behavior, and performance tradeoffs."
                            : level === "Beginner"
                              ? "\n\nStart small: read the example, change one value, and observe the result."
                              : ""),
                        );
                        record(topic, "study");
                      }}
                    >
                      Generate explanation <Sparkles />
                    </Button>
                    <small>Curated offline lessons</small>
                  </section>
                  <section className="panel">
                    <h2>
                      {topic} <span className="muted">/ {level}</span>
                    </h2>
                    <pre className="response">
                      {lesson ||
                        "Choose your topic and generate a lesson to get started."}
                    </pre>
                  </section>
                </div>
              )}
              {/* Quiz has three views: start, questions, and results. */}
              {page === "quiz" && (
                <section className="panel quiz-panel">
                  {!quiz ? (
                    <>
                      <span className="tool-icon orange">
                        <Brain />
                      </span>
                      <h2>Put your knowledge to the test.</h2>
                      <p>
                        JavaScript fundamentals · 5 questions · Instant feedback
                      </p>
                      <Button
                        onClick={() => {
                          // Start a fresh attempt and reset all previous quiz state below.
                          setQuiz(true);
                          setQi(0);
                          setAnswers([]);
                          setChoice(null);
                          setReview(false);
                        }}
                      >
                        Start quiz <ArrowRight />
                      </Button>
                    </>
                  ) : qi < 5 ? (
                    <>
                      <div className="section-title">
                        <span>JavaScript fundamentals</span>
                        <span>Question {qi + 1} / 5</span>
                      </div>
                      <div className="progress-track">
                        <i style={{ width: (qi / 5) * 100 + "%" }} />
                      </div>
                      <h2>{bank[qi].q}</h2>
                      {/* Render each answer as a button; store its index when selected. */}
                      <div className="answers">
                        {bank[qi].a.map((a, i) => (
                          <button
                            key={a}
                            className={choice === i ? "selected" : ""}
                            onClick={() => setChoice(i)}
                          >
                            <span>{String.fromCharCode(65 + i)}</span>
                            {a}
                            {choice === i && <Check size={18} />}
                          </button>
                        ))}
                      </div>
                      <Button
                        disabled={choice === null}
                        onClick={() => {
                          // Copy existing answers, append the selection, and advance to the next question.
                          setAnswers([...answers, choice]);
                          setChoice(null);
                          setQi(qi + 1);
                          if (qi === 4)
                            record("JavaScript fundamentals quiz", "quiz");
                        }}
                      >
                        {qi === 4 ? "See results" : "Next question"}
                        <ArrowRight />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Trophy className="trophy" />
                      <h2>Quiz completed!</h2>
                      {/* Count submitted answers matching the correct index in the question bank. */}
                      <div className="score">
                        {answers.filter((a, i) => a === bank[i].correct).length}{" "}
                        / 5
                      </div>
                      <p>Every question is another step forward.</p>
                      {/* Actions for the current result, such as copying or downloading. */}
                      <div className="button-row">
                        <Button
                          onClick={() => setReview(!review)}
                          variant="outline"
                        >
                          {review ? "Hide" : "Review"} answers
                        </Button>
                        <Button onClick={() => setQuiz(false)}>
                          Try again
                        </Button>
                      </div>
                      {review &&
                        bank.map((q, i) => (
                          <div className="review" key={q.q}>
                            <strong>
                              {answers[i] === q.correct ? "✓" : "✗"} {q.q}
                            </strong>
                            <p>Your answer: {q.a[answers[i]]}</p>
                            <p>{q.why}</p>
                          </div>
                        ))}
                    </>
                  )}
                </section>
              )}
              {/* Document workspace: text upload, preview, keyword search, and removal. */}
              {page === "documents" && (
                <div className="split">
                  <section className="panel">
                    <label className="upload">
                      <Upload size={30} />
                      <h2>Upload your documents</h2>
                      <p>TXT and Markdown · Up to 1 MB each</p>
                      <span className="fake-button">Choose files</span>
                      <input
                        aria-label="Upload documents"
                        type="file"
                        accept=".txt,.md,text/plain,text/markdown"
                        multiple
                        onChange={async (e) => {
                          // Process selected files one at a time; reject files over 1 MB or unsupported extensions.
                          for (const f of Array.from(e.target.files || [])) {
                            if (
                              f.size > 1000000 ||
                              !/\.(txt|md)$/i.test(f.name)
                            ) {
                              setNotice(
                                "Choose a TXT or Markdown file under 1 MB.",
                              );
                              continue;
                            }
                            // Read an accepted text file locally; no server upload occurs here.
                            const text = await f.text();
                            setDocs((d) => [...d, { name: f.name, text }]);
                            record(f.name, "documents");
                          }
                          e.target.value = "";
                        }}
                      />
                    </label>
                    <p className="muted">
                      Files stay in this tab and are cleared when it closes.
                    </p>
                    {docs.map((d, i) => (
                      <div className="history-row" key={i}>
                        <FileText />
                        <button
                          onClick={() => {
                            setDoc(i);
                            setDocAnswer("");
                          }}
                        >
                          {d.name}
                        </button>
                        <button
                          aria-label={"Delete " + d.name}
                          onClick={() => {
                            setDocs(docs.filter((_, j) => j !== i));
                            setDoc(null);
                          }}
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    ))}
                  </section>
                  <section className="panel">
                    <h2>{doc !== null ? docs[doc]?.name : "Document chat"}</h2>
                    {doc !== null ? (
                      <>
                        {/* Render uploaded text as plain text, not executable HTML. */}
                        <pre className="document-preview">
                          {docs[doc]?.text}
                        </pre>
                        <label>
                          Find passages
                          <Input
                            placeholder="Enter a word or phrase"
                            value={docQuestion}
                            onChange={(e) => setDocQuestion(e.target.value)}
                          />
                        </label>
                        <Button
                          className="full"
                          disabled={!docQuestion.trim()}
                          onClick={() => {
                            // Split the text into passages and keep case-insensitive keyword matches.
                            const lines = docs[doc].text
                              .split(/\n|(?<=[.!?])\s/)
                              .filter((s) =>
                                s
                                  .toLowerCase()
                                  .includes(docQuestion.toLowerCase()),
                              );
                            setDocAnswer(
                              lines.slice(0, 8).join("\n\n") ||
                              "No matching passages found. Try another word.",
                            );
                          }}
                        >
                          Find in document <Search />
                        </Button>
                        <pre className="response">{docAnswer}</pre>
                      </>
                    ) : (
                      <div className="empty-state">
                        <FileText />
                        <p>
                          Choose an uploaded document to read and search it.
                        </p>
                      </div>
                    )}
                  </section>
                </div>
              )}
              {/* Writer creates editable templates; it does not call an AI API. */}
              {page === "writer" && (
                <div className="split">
                  <section className="panel form-panel">
                    <label>
                      Template
                      <select
                        value={template}
                        onChange={(e) => setTemplate(e.target.value)}
                      >
                        <option>LinkedIn post</option>
                        <option>Email</option>
                        <option>Study outline</option>
                      </select>
                    </label>
                    <label>
                      Topic
                      <Input
                        value={writingTopic}
                        onChange={(e) => setWritingTopic(e.target.value)}
                      />
                    </label>
                    <label>
                      Tone
                      <select
                        value={tone}
                        onChange={(e) => setTone(e.target.value)}
                      >
                        <option>Professional</option>
                        <option>Friendly</option>
                        <option>Concise</option>
                      </select>
                    </label>
                    <Button
                      disabled={!writingTopic.trim()}
                      onClick={() => {
                        setDraft(
                          template === "Email"
                            ? `Subject: ${writingTopic}\n\n${tone === "Friendly" ? "Hi there," : "Hello,"}\n\nI’m writing to share an update about ${writingTopic}.\n\n[Add your key update and supporting details here.]\n\nI’d appreciate your thoughts on the next steps.\n\nBest,\n${name}`
                            : template === "Study outline"
                              ? `${writingTopic}\n\n1. Define the main concept\n2. Identify key terms\n3. Work through an example\n4. Practice independently\n5. Review what you learned\n\n[Add topic-specific notes under each heading.]`
                              : `${tone === "Friendly" ? "Excited to share" : tone === "Concise" ? "Project update:" : "Here’s a look at"} ${writingTopic}.\n\n[Describe what you built or learned.]\n\nKey takeaways:\n• [First takeaway]\n• [Second takeaway]\n• [Next step]\n\nWhat would you explore next? I’d love to hear your thoughts.`,
                        );
                        record(writingTopic, "writer");
                      }}
                    >
                      Create draft <Sparkles />
                    </Button>
                    <small>
                      Local templates · Edit placeholders before sharing.
                    </small>
                  </section>
                  <section className="panel">
                    <div className="section-title">
                      <h2>Your draft</h2>
                      <PenLine size={18} />
                    </div>
                    <Textarea
                      aria-label="Editable draft"
                      className="draft-editor"
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      placeholder="Your draft will appear here..."
                    />
                    {/* Actions for the current result, such as copying or downloading. */}
                    <div className="button-row">
                      <Button
                        variant="outline"
                        disabled={!draft}
                        onClick={() => copy(draft)}
                      >
                        <Copy />
                        Copy
                      </Button>
                      <Button disabled={!draft} onClick={download}>
                        <Download />
                        Download
                      </Button>
                    </div>
                  </section>
                </div>
              )}
              {/* Filter, open, or remove saved activity entries. */}
              {page === "history" && (
                <section className="panel">
                  <div className="section-title">
                    <Tabs value={filter} onValueChange={setFilter}>
                      <TabsList>
                        {[
                          "All",
                          "chat",
                          "code",
                          "study",
                          "quiz",
                          "writer",
                          "documents",
                        ].map((k) => (
                          <TabsTrigger value={k} key={k}>
                            {k}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </Tabs>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setHistory([]);
                        setNotice("Activity cleared");
                      }}
                    >
                      <Trash2 />
                      Clear
                    </Button>
                  </div>
                  {history
                    .filter((h) => filter === "All" || h.type === filter)
                    .map((h) => (
                      <div className="history-row" key={h.id}>
                        <FileText />
                        <button onClick={() => go(h.type)}>
                          <strong>{h.title}</strong>
                          <small>
                            {h.type} · {h.date}
                          </small>
                        </button>
                        <button
                          aria-label="Delete activity"
                          onClick={() =>
                            setHistory(history.filter((x) => x.id !== h.id))
                          }
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  {!history.filter((h) => filter === "All" || h.type === filter)
                    .length && (
                      <div className="empty-state">
                        <History />
                        <p>No activity yet.</p>
                      </div>
                    )}
                </section>
              )}
              {/* Profile fields and theme controls; persistence comes from the shared effect. */}
              {page === "Blockchain" && (
                <section aria-label="Blockchain lessons">
                  <p className="muted">
                    Learn blockchain fundamentals and start building smart
                    contracts.
                  </p>
                  <div className="tools-grid">
                    {[
                      {
                        title: "Blockchain Basics",
                        description:
                          "A blockchain is a shared digital record. Blocks contain data and link to previous blocks using hashes.",
                      },
                      {
                        title: "Hashing",
                        description:
                          "A hash function converts data into a fixed-length value. A small input change typically produces a very different hash.",
                      },
                      {
                        title: "Crypto Wallets",
                        description:
                          "Wallets manage keys used to access blockchain accounts and sign transactions. Assets remain recorded on the blockchain.",
                      },
                      {
                        title: "Smart Contracts",
                        description:
                          "Smart contracts are programs stored on a blockchain. Users interact with them by sending transactions.",
                      },
                      {
                        title: "Solidity",
                        description:
                          "Solidity is a programming language used to write smart contracts for Ethereum and compatible blockchains.",
                      },
                      {
                        title: "Consensus",
                        description:
                          "Consensus rules help network participants agree on valid transactions and the blockchain’s state.",
                      },
                    ].map((topic) => (
                      <article className="tool-card" key={topic.title}>
                        <div className="card-top">
                          <span className="tool-icon orange">
                            <Blocks size={26} aria-hidden="true" />
                          </span>
                        </div>
                        <h3>{topic.title}</h3>
                        <p>{topic.description}</p>
                      </article>
                    ))}
                  </div>
                  <div className="panel blockchain-practice">
                    <h2>Practice: Design a Simple Storage Contract</h2>
                    <p>
                      Plan a contract that stores one number. It should let
                      users update the number and read its current value.
                    </p>
                    <ol>
                      <li>Create a variable to store the number.</li>
                      <li>Create a function to update it.</li>
                      <li>Create a function to read it.</li>
                    </ol>
                    <details>
                      <summary>
                        Show a hint
                      </summary>
                      <p>
                        Use a uint256 variable, a setter function, and a view
                        function that returns the stored value.
                      </p>
                    </details>
                  </div>
                </section>
              )}

              {page === "Web Development" && (
                <WebDevelopmentStudio light={light} />
              )}
              {page === "Graphic" && <GraphicPlayground light={light} />}
              {page === "settings" && (
                <section className="panel settings-panel">
                  <div className="profile-heading">
                    <span className="avatar large">{name[0] || "J"}</span>
                    <div>
                      <h2>Your profile</h2>
                      <p>Saved in this browser.</p>
                    </div>
                  </div>
                  <form
                    onSubmit={(e) => {
                      // Keep form submission inside React rather than reloading the page.
                      e.preventDefault();
                      setNotice("Profile saved");
                    }}
                  >
                    <label>
                      Full name
                      <Input
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </label>
                    <label>
                      Email address
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </label>
                    <label>
                      Bio
                      <Textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="A little about you..."
                      />
                    </label>
                    <Button type="submit">
                      Save changes <Check />
                    </Button>
                  </form>
                  <div className="setting-row">
                  </div>
                  <Button variant="outline" onClick={() => go("login")}>
                    <LogOut />
                    View login demo
                  </Button>
                </section>
              )}
              {/* Fallback for page IDs without a supported content section. */}
              {![
                "chat",
                "code",
                "study",
                "quiz",
                "documents",
                "writer",
                "history",
                "settings",
                "Blockchain",
                "Web Development",
                "Graphic",
              ].includes(page) && (
                  <section className="empty-state">
                    <h1 className="score">404</h1>
                    <h2>Page not found</h2>
                    <Button onClick={() => go("dashboard")}>
                      Back to dashboard
                    </Button>
                  </section>
                )}
            </>
          )}
        </div>
      </main>
      {notice && (
        <div className="toast" role="status">
          <Check size={18} />
          {notice}
        </div>
      )}
    </SidebarProvider>
  );
}

// A self-contained studio: its styles follow the existing theme toggle.
const studioTemplates = [
  {
    id: "portfolio",
    name: "Personal Portfolio",
    category: "Frontend",
    type: "CREATIVE / PERSONAL",
    color: "#9b7cff",
    title: "Design. Build. Inspire.",
    subtitle: "A space for your work, ideas, and next big opportunity.",
    stack: "HTML · CSS · JavaScript",
    level: "Beginner",
    sections: ["About me", "Selected projects", "Get in touch"],
  },
  {
    id: "restaurant",
    name: "FreshEat Restaurant",
    category: "Frontend",
    type: "FOOD / LIFESTYLE",
    color: "#f3a76d",
    title: "Fresh food. Good mood.",
    subtitle: "Seasonal ingredients. Delicious moments. Made for you.",
    stack: "HTML · CSS · JavaScript",
    level: "Beginner",
    sections: ["Our menu", "Our story", "Visit us"],
  },
  {
    id: "store",
    name: "Modern Online Store",
    category: "Full Stack",
    type: "SHOPPING / COMMERCE",
    color: "#69cfbf",
    title: "Everyday, upgraded.",
    subtitle: "Thoughtful essentials for a better everyday.",
    stack: "React · Express · MongoDB",
    level: "Intermediate",
    sections: ["New arrivals", "Collections", "Your favorites"],
  },
  {
    id: "dashboard",
    name: "Analytics Dashboard",
    category: "Full Stack",
    type: "PRODUCT / ANALYTICS",
    color: "#79aaff",
    title: "Your progress, in focus.",
    subtitle: "Understand your work. Make your next move.",
    stack: "React · Node.js · MongoDB",
    level: "Intermediate",
    sections: ["Overview", "Activity", "Reports"],
  },
];

function StudioPreview({ project, large = false }) {
  return (
    <div
      className={`ws-preview ${large ? "ws-preview-large" : ""}`}
      style={{ "--accent": project.color }}
      aria-label={`${project.name} design preview`}
    >
      <div className="ws-browser">
        <i />
        <i />
        <i />
        <span>{project.id}.studio</span>
      </div>
      <div className="ws-mini-nav">
        <strong>
          {project.id.toUpperCase()}
          <b>®</b>
        </strong>
        <span>Discover &nbsp; About &nbsp; Contact</span>
      </div>
      <div className="ws-mini-hero">
        <div>
          <small>{project.type}</small>
          <h3>{project.title}</h3>
          <p>{project.subtitle}</p>
          <span className="ws-mini-cta">Explore the possibilities ↗</span>
        </div>
        <div className={`ws-art ws-art-${project.id}`}>
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="ws-mini-bottom">
        {project.sections.map((item, i) => (
          <div key={item}>
            <b>0{i + 1}</b>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function WebDevelopmentStudio({ light }) {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [stage, setStage] = useState(0);
  const stages = [
    [
      "HTML",
      "Build the structure",
      "Create a page using semantic headings, navigation, sections, and a contact form.",
    ],
    [
      "CSS",
      "Shape the experience",
      "Style your page with Flexbox and Grid, then adapt it for mobile screens.",
    ],
    [
      "JavaScript",
      "Make it interactive",
      "Add event handlers, validate form fields, and save a preference locally.",
    ],
    [
      "React",
      "Think in components",
      "Build reusable components and manage interactive UI with props and state.",
    ],
    [
      "Backend",
      "Connect your data",
      "Create an API, validate inputs, and store records in a database.",
    ],
  ];
  useEffect(() => {
    try {
      const saved = Number(localStorage.getItem("nexa-studio-stage"));
      if (Number.isInteger(saved) && saved >= 0 && saved < 5) setStage(saved);
    } catch { }
  }, []);
  useEffect(() => {
    if (!selected) return;
    const previous = document.activeElement;
    const dialog = document.getElementById("ws-template-dialog");
    dialog.showModal();
    return () => {
      dialog.close();
      previous?.focus();
    };
  }, [selected]);
  function chooseStage(index) {
    setStage(index);
    try {
      localStorage.setItem("nexa-studio-stage", String(index));
    } catch { }
  }
  function downloadStarter(project) {
    const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${project.name}</title>
<style>*{box-sizing:border-box}body{margin:0;background:#101522;color:#f4f5fa;font:16px system-ui}nav,main,footer{max-width:1100px;margin:auto;padding:28px}nav{display:flex;justify-content:space-between;gap:20px}a{color:${project.color}}.hero{padding:70px 0}h1{font-size:clamp(40px,8vw,86px);max-width:760px;line-height:1.05}p{color:#b5bed0;line-height:1.7}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px}article{padding:28px;border:1px solid #354057;border-radius:18px}button{background:${project.color};border:0;border-radius:9px;padding:14px 22px;cursor:pointer;color:#101522;font-weight:bold}footer{margin-top:50px;border-top:1px solid #354057}</style></head>
<body><nav><strong>${project.name}</strong><a href="#projects">Explore</a></nav><main><section class="hero"><p>${project.type}</p><h1>${project.title}</h1><p>${project.subtitle}</p><button id="explore">Explore the project</button></section><section class="grid" id="projects">${project.sections.map((x) => `<article><h2>${x}</h2><p>Add your own content here to make this project yours.</p></article>`).join("")}</section></main><footer>A frontend starter — add your own features and content.</footer><script>document.getElementById('explore').addEventListener('click',()=>document.getElementById('projects').scrollIntoView({behavior:'smooth'}));</script></body></html>`;
    const url = URL.createObjectURL(new Blob([html], { type: "text/html" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${project.id}-starter.html`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <section
      className={`ws ${light ? "ws-light" : ""}`}
      aria-label="Web Development Studio"
    >
      
      <div className="ws-hero">
        <div className="ws-hero-copy">
          <span className="ws-eyebrow">
            <span /> YOUR NEXT IDEA STARTS HERE
          </span>
          <h2>
            Turn your ideas
            <br />
            into <em>websites.</em>
          </h2>
          <p>
            A creative space to explore designs, choose a starting point, and
            build something that feels like you.
          </p>
          <button
            className="ws-primary"
            onClick={() =>
              document
                .getElementById("ws-gallery")
                .scrollIntoView({ behavior: "smooth", block: "start" })
            }
          >
            Start building <ArrowUpRight size={18} />
          </button>
          <span className="ws-hero-note">
            4 project concepts · Endless possibilities
          </span>
        </div>
        <div className="ws-code" aria-hidden="true">
          <div className="ws-code-top">
            <span>● ● ●</span>
            <span>your-next-idea.jsx</span>
          </div>
          <pre>
            <code>
              <span>const</span> YourNextIdea = () =&gt; {"{"}
              {"\n"} <span>return</span> ({"\n"} &lt;<b>Website</b>
              {"\n"} creativity=<i>"unlimited"</i>
              {"\n"} builtWith=<i>"passion"</i>
              {"\n"} /&gt;{"\n"} );{"\n"}
              {"}"};
            </code>
          </pre>
          <div className="ws-code-status">
            <Check size={15} /> Ready to create something great
          </div>
        </div>
      </div>
      <div className="ws-tech">
        <span>YOUR CREATIVE TOOLKIT</span>
        {[
          ["HTML5", "#ef784c"],
          ["CSS3", "#579dff"],
          ["JavaScript", "#e4c549"],
          ["React", "#58bfd8"],
          ["Node.js", "#7eb66c"],
          ["MongoDB", "#59ad7b"],
        ].map(([name, color]) => (
          <div key={name}>
            <Code2 size={20} style={{ color }} />
            <strong>{name}</strong>
          </div>
        ))}
      </div>
      <div className="ws-heading">
        <div>
          <span className="ws-eyebrow">IN THE SPOTLIGHT</span>
          <h2>One idea. Your own signature.</h2>
        </div>
        <span className="ws-tag">FEATURED PROJECT</span>
      </div>
      <div className="ws-feature">
        <StudioPreview project={studioTemplates[0]} large />
        <div className="ws-feature-copy">
          <span className="ws-tag">BEGINNER FRIENDLY</span>
          <h3>
            A portfolio
            <br />
            that tells your story.
          </h3>
          <p>
            Give your skills and projects a home. Start with a bold
            introduction, selected work, and a clear way to connect.
          </p>
          <div className="ws-pills">
            <span>Responsive layout</span>
            <span>Personal branding</span>
          </div>
          <button
            className="ws-primary"
            onClick={() => setSelected(studioTemplates[0])}
          >
            View project <ArrowUpRight size={18} />
          </button>
        </div>
      </div>
      <div id="ws-gallery" className="ws-heading ws-gallery-heading">
        <div>
          <span className="ws-eyebrow">FIND YOUR STARTING POINT</span>
          <h2>Made for your next project.</h2>
        </div>
        <div className="ws-filters" aria-label="Filter templates">
          {["All", "Frontend", "Full Stack"].map((item) => (
            <button
              key={item}
              aria-pressed={filter === item}
              className={filter === item ? "active" : ""}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="ws-gallery">
        {studioTemplates
          .filter((item) => filter === "All" || item.category === filter)
          .map((project) => (
            <button
              className="ws-template"
              key={project.id}
              onClick={() => setSelected(project)}
            >
              <StudioPreview project={project} />
              <div className="ws-template-info">
                <div>
                  <h3>{project.name}</h3>
                  <p>{project.stack}</p>
                </div>
                <ArrowUpRight size={21} />
              </div>
              <div className="ws-template-meta">
                <span>{project.category}</span>
                <span>{project.level}</span>
              </div>
            </button>
          ))}
      </div>
      <div className="ws-roadmap">
        <div className="ws-heading">
          <div>
            <span className="ws-eyebrow">SMALL STEPS. REAL PROGRESS.</span>
            <h2>Your learning path</h2>
          </div>
          <span className="ws-tag">STAGE {stage + 1} OF 5</span>
        </div>
        <div className="ws-stages">
          {stages.map(([name, subtitle], index) => (
            <button
              key={name}
              aria-pressed={stage === index}
              className={stage === index ? "active" : ""}
              onClick={() => chooseStage(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{name}</strong>
              <small>{subtitle}</small>
            </button>
          ))}
        </div>
        <div className="ws-stage-detail">
          <p>
            <strong>{stages[stage][0]} challenge:</strong> {stages[stage][2]}
          </p>
          {stage < 4 && (
            <button
              className="ws-secondary"
              onClick={() => chooseStage(stage + 1)}
            >
              Next stage <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
      {selected && (
        <dialog
          id="ws-template-dialog"
          className={`ws-dialog ${light ? "ws-light" : ""}`}
          onCancel={() => setSelected(null)}
          onClick={(event) => {
            if (event.target === event.currentTarget) setSelected(null);
          }}
          aria-labelledby="ws-dialog-title"
        >
          <div className="ws-dialog-head">
            <div>
              <span className="ws-eyebrow">PROJECT PREVIEW</span>
              <h2 id="ws-dialog-title">{selected.name}</h2>
            </div>
            <button
              className="ws-secondary"
              autoFocus
              onClick={() => setSelected(null)}
            >
              Close
            </button>
          </div>
          <StudioPreview project={selected} large />
          <p className="ws-dialog-description">
            {selected.subtitle} Download a responsive HTML starter, then
            customize it with your own content. Full Stack concepts need a
            backend added separately.
          </p>
          <button
            className="ws-primary"
            onClick={() => downloadStarter(selected)}
          >
            <Download size={18} /> Download starter HTML
          </button>
        </dialog>
      )}
    </section>
  );
}



const graphicPalettes = [
  { name: "Lavender pop", colors: ["#bba5f4", "#202237", "#fb805f"] },
  { name: "Mint studio", colors: ["#b9e8d4", "#193d37", "#f4b650"] },
  { name: "Coral club", colors: ["#ff917f", "#452840", "#ffe5a3"] },
  { name: "Midnight", colors: ["#232641", "#f9efde", "#b69aff"] },
];
const graphicDefault = {
  format: "Poster",
  headline: "CREATE\nSOMETHING\nBOLD.",
  caption: "YOUR IDEAS DESERVE TO BE SEEN.",
  brand: "NEXA / CREATIVE CLUB",
  background: "#bba5f4",
  ink: "#202237",
  accent: "#fb805f",
  font: "Arial",
  shape: "Orbit",
};
const graphicSizes = {
  Poster: [1080, 1350],
  "Social Post": [1080, 1080],
  Logo: [1000, 1000],
  "Business Card": [1050, 600],
};

function GraphicPlayground({ light }) {
  const canvasRef = useRef(null);
  const [design, setDesign] = useState(graphicDefault);
  const [message, setMessage] = useState("Make something unmistakably yours.");
  const [saved, setSaved] = useState(null);
  const [exporting, setExporting] = useState(false);
  const [width, height] = graphicSizes[design.format];
  useEffect(() => {
    try {
      const data = JSON.parse(
        localStorage.getItem("nexa-graphic-design") || "null",
      );
      if (
        data &&
        Object.hasOwn(graphicSizes, data.format) &&
        ["Arial", "Georgia", "Courier New"].includes(data.font) &&
        ["Orbit", "Flower", "Blocks", "None"].includes(data.shape) &&
        ["background", "ink", "accent"].every((key) =>
          /^#[0-9a-f]{6}$/i.test(data[key]),
        ) &&
        ["headline", "caption", "brand"].every(
          (key) => typeof data[key] === "string" && data[key].length <= 120,
        )
      ) {
        setSaved(data);
        setDesign(data);
        setMessage("Your saved design is ready.");
      }
    } catch {
      setMessage(
        "Local save is unavailable. You can still download your design.",
      );
    }
  }, []);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = design.background;
    ctx.fillRect(0, 0, width, height);
    const padding = width * 0.075;
    ctx.fillStyle = design.ink;
    ctx.font = `bold ${width * 0.019}px Arial`;
    ctx.fillText(design.brand, padding, height * 0.07, width - padding * 2);
    ctx.fillRect(padding, height * 0.1, width - padding * 2, 2);
    // Decorative shapes occupy the lower half, separate from the headline.
    ctx.save();
    ctx.translate(width * 0.69, height * 0.74);
    const radius = Math.min(width * 0.22, height * 0.2);
    ctx.fillStyle = design.accent;
    ctx.strokeStyle = design.ink;
    if (design.shape === "Orbit") {
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.lineWidth = radius * 0.16;
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 1.35, radius * 0.42, -0.55, 0, Math.PI * 2);
      ctx.stroke();
    } else if (design.shape === "Flower") {
      for (let i = 0; i < 8; i++) {
        ctx.save();
        ctx.rotate((i * Math.PI) / 4);
        ctx.beginPath();
        ctx.ellipse(
          0,
          radius * 0.55,
          radius * 0.38,
          radius * 0.7,
          0,
          0,
          Math.PI * 2,
        );
        ctx.fill();
        ctx.restore();
      }
      ctx.fillStyle = design.ink;
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.32, 0, Math.PI * 2);
      ctx.fill();
    } else if (design.shape === "Blocks") {
      ctx.rotate(-0.18);
      ctx.fillRect(-radius, -radius, radius * 1.65, radius * 1.65);
      ctx.strokeStyle = design.ink;
      ctx.lineWidth = 12;
      ctx.strokeRect(
        -radius * 0.5,
        -radius * 0.5,
        radius * 1.65,
        radius * 1.65,
      );
    }
    ctx.restore();
    let fontSize = width * (design.format === "Business Card" ? 0.09 : 0.115);
    const lines = design.headline.split("\n").slice(0, 4);
    ctx.font = `900 ${fontSize}px "${design.font}"`;
    while (
      (lines.some(
        (line) => ctx.measureText(line).width > width - padding * 2,
      ) ||
        lines.length * fontSize * 1.04 > height * 0.39) &&
      fontSize > 16
    ) {
      fontSize -= 2;
      ctx.font = `900 ${fontSize}px "${design.font}"`;
    }
    ctx.fillStyle = design.ink;
    ctx.textBaseline = "top";
    lines.forEach((line, index) =>
      ctx.fillText(line, padding, height * 0.17 + index * fontSize * 1.04),
    );
    ctx.font = `bold ${width * 0.022}px Arial`;
    ctx.fillText("✦", padding, height * 0.76);
    ctx.font = `${width * 0.018}px Arial`;
    ctx.fillText(design.caption, padding, height * 0.925, width - padding * 2);
    ctx.textBaseline = "alphabetic";
  }, [design, width, height]);
  function update(key, value) {
    setDesign((current) => ({ ...current, [key]: value }));
    setMessage("Unsaved changes");
  }
  function applyPalette(palette) {
    setDesign((current) => ({
      ...current,
      background: palette.colors[0],
      ink: palette.colors[1],
      accent: palette.colors[2],
    }));
    setMessage(`${palette.name} applied`);
  }
  function save() {
    try {
      localStorage.setItem("nexa-graphic-design", JSON.stringify(design));
      setSaved({ ...design });
      setMessage("Design saved in this browser.");
    } catch {
      setMessage("Could not save locally. Download PNG to keep your design.");
    }
  }
  function download() {
    setExporting(true);
    canvasRef.current.toBlob((blob) => {
      setExporting(false);
      if (!blob) {
        setMessage("Export failed. Please try again.");
        return;
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `nexa-${design.format.toLowerCase().replaceAll(" ", "-")}.png`;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setMessage(`PNG downloaded at ${width} × ${height} pixels.`);
    }, "image/png");
  }
  const presets = [
    {
      name: "Bold beginnings",
      headline: "CREATE\nSOMETHING\nBOLD.",
      shape: "Orbit",
      palette: 0,
      font: "Arial",
    },
    {
      name: "Fresh perspective",
      headline: "GROW\nYOUR OWN\nWAY.",
      shape: "Flower",
      palette: 1,
      font: "Georgia",
    },
    {
      name: "Creative energy",
      headline: "MAKE\nSOME\nNOISE.",
      shape: "Blocks",
      palette: 2,
      font: "Arial",
    },
    {
      name: "After hours",
      headline: "IDEAS\nAFTER\nDARK.",
      shape: "Orbit",
      palette: 3,
      font: "Courier New",
    },
  ];
  return (
    <section
      className={`gp ${light ? "gp-light" : ""}`}
      aria-label="Creative Playground"
    >
      
      <div className="gp-heading">
        <div>
          <span className="gp-eyebrow">
            A LITTLE PLAY. A LOT OF POSSIBILITY.
          </span>
          <h2>
            Creative Playground<span>✦</span>
          </h2>
          <p>Your words. Your colors. Your next great design.</p>
        </div>
        <button className="gp-primary" onClick={download} disabled={exporting}>
          <Download size={17} />
          {exporting ? "Exporting…" : "Download PNG"}
        </button>
      </div>
      <div className="gp-toolbar">
        <div className="gp-formats" aria-label="Design format">
          {Object.keys(graphicSizes).map((format) => (
            <button
              key={format}
              aria-pressed={design.format === format}
              className={design.format === format ? "active" : ""}
              onClick={() => update("format", format)}
            >
              {format}
            </button>
          ))}
        </div>
        <span>
          {width} × {height} px
        </span>
      </div>
      <div className="gp-workspace">
        <aside className="gp-controls">
          <h3>
            <PenLine size={16} /> Make it yours
          </h3>
          <label>
            Headline
            <textarea
              rows={4}
              maxLength={100}
              value={design.headline}
              onChange={(e) =>
                update(
                  "headline",
                  e.target.value.split("\n").slice(0, 4).join("\n"),
                )
              }
            />
          </label>
          <label>
            Caption
            <input
              maxLength={90}
              value={design.caption}
              onChange={(e) => update("caption", e.target.value)}
            />
          </label>
          <label>
            Brand name
            <input
              maxLength={60}
              value={design.brand}
              onChange={(e) => update("brand", e.target.value)}
            />
          </label>
          <label>
            Typography
            <select
              value={design.font}
              onChange={(e) => update("font", e.target.value)}
            >
              <option value="Arial">Modern · Arial</option>
              <option value="Georgia">Editorial · Georgia</option>
              <option value="Courier New">Technical · Courier</option>
            </select>
          </label>
          <label>
            Graphic element
            <select
              value={design.shape}
              onChange={(e) => update("shape", e.target.value)}
            >
              {["Orbit", "Flower", "Blocks", "None"].map((shape) => (
                <option key={shape}>{shape}</option>
              ))}
            </select>
          </label>
          <div className="gp-colors">
            {[
              ["background", "Background"],
              ["ink", "Text"],
              ["accent", "Accent"],
            ].map(([key, label]) => (
              <label key={key}>
                <input
                  type="color"
                  value={design[key]}
                  aria-label={label + " color"}
                  onChange={(e) => update(key, e.target.value)}
                />
                {label}
              </label>
            ))}
          </div>
          <button
            className="gp-secondary"
            onClick={() => {
              setDesign({ ...graphicDefault });
              setMessage("Default design restored. Save to keep it.");
            }}
          >
            Reset design
          </button>
        </aside>
        <div className="gp-stage">
          <div className="gp-stage-top">
            <span>
              <i /> LIVE PREVIEW
            </span>
            <span>{design.format.toUpperCase()}</span>
          </div>
          <div className="gp-canvas-wrap">
            <canvas
              ref={canvasRef}
              width={width}
              height={height}
              style={{ aspectRatio: `${width} / ${height}` }}
              role="img"
              aria-label={`${design.format} preview: ${design.headline.replaceAll("\n", " ")}`}
            />
          </div>
          <span className="gp-stage-bottom">
            Made by you, powered by a little imagination.
          </span>
        </div>
        <aside className="gp-inspiration">
          <h3>
            <Palette size={17} /> Color stories
          </h3>
          <p>Pick a mood. Make it your own.</p>
          {graphicPalettes.map((palette) => (
            <button
              className="gp-palette"
              key={palette.name}
              onClick={() => applyPalette(palette)}
              aria-label={`Apply ${palette.name} palette`}
            >
              <span>
                {palette.colors.map((color) => (
                  <i key={color} style={{ background: color }} />
                ))}
              </span>
              <strong>{palette.name}</strong>
            </button>
          ))}
          <button
            className="gp-secondary"
            onClick={() => {
              const choices = graphicPalettes.filter(
                (p) => p.colors[0] !== design.background,
              );
              applyPalette(choices[Math.floor(Math.random() * choices.length)]);
            }}
          >
            Shuffle colors <Sparkles size={15} />
          </button>
          <div className="gp-tip">
            <span>DESIGN NOTE</span>
            <p>
              Give your headline room to breathe. A simple message can make a
              strong impression.
            </p>
          </div>
          <button className="gp-primary" onClick={save}>
            <Check size={16} /> Save design
          </button>
          {saved && (
            <button
              className="gp-secondary"
              onClick={() => {
                setDesign({ ...saved });
                setMessage("Saved design restored.");
              }}
            >
              Restore saved
            </button>
          )}
        </aside>
      </div>
      <p className="gp-status" role="status" aria-live="polite">
        {message}
      </p>
      <div className="gp-presets-heading">
        <h3>A spark to get you started</h3>
        <span>Choose a preset and make it yours</span>
      </div>
      <div className="gp-presets">
        {presets.map((preset) => (
          <button
            key={preset.name}
            onClick={() => {
              const colors = graphicPalettes[preset.palette].colors;
              setDesign((current) => ({
                ...current,
                headline: preset.headline,
                font: preset.font,
                shape: preset.shape,
                background: colors[0],
                ink: colors[1],
                accent: colors[2],
              }));
              setMessage(`${preset.name} preset applied`);
            }}
          >
            <span
              className="gp-preset-art"
              style={{
                background: graphicPalettes[preset.palette].colors[0],
                color: graphicPalettes[preset.palette].colors[1],
                fontFamily: preset.font,
              }}
            >
              <strong>
                {preset.headline.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </strong>
              <b style={{ color: graphicPalettes[preset.palette].colors[2] }}>
                {preset.shape === "Flower"
                  ? "✿"
                  : preset.shape === "Blocks"
                    ? "▦"
                    : "◉"}
              </b>
            </span>
            <span className="gp-preset-name">
              {preset.name}
              <ArrowUpRight size={15} />
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
