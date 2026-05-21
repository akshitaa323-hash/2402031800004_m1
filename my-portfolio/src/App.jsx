import { useState, useEffect, useRef } from "react";

const TYPING_WORDS = ["Artificial Intelligence", "Machine Learning", "Deep Learning", "Data Science", "Problem Solving", "Python Development","Web Development"];

const SKILLS = [
  { name: "Python", level: 90, color: "#00d4ff" },
  { name: "C", level: 70, color: "#a855f7" },
  { name: "C++", level: 65, color: "#00d4ff" },
  { name: "JavaScript", level: 70, color: "#a855f7" },
  { name: "React", level: 75, color: "#00d4ff" },
  { name: "HTML/CSS", level: 80, color: "#a855f7" },
  { name: "SQL Basics", level: 75, color: "#00d4ff" },
];

const PROJECTS = [
  {
    title: "Portfolio Website",
    tag: "Frontend · UI/UX",
    desc: "This very site — designed with a cyberpunk AI aesthetic, React, animations, and glassmorphism UI components.",
    tech: ["React", "CSS3", "Animations"],
    icon: "🌐",
    accent: "#00d4ff",
  },
  {
  title: "Escape The Website",
  tag: "Interactive Puzzle Game",
  desc: "A browser-based escape room game where users solve logic-based puzzles, find hidden clues, and navigate through levels to 'escape' the website. Built to improve problem-solving and DOM manipulation skills.",
  tech: ["JavaScript", "HTML", "CSS"],
  icon: "🧠",
  accent: "#7c3aed",
}
];

function Particles() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4 - 0.1,
      r: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.6 + 0.2,
      color: Math.random() > 0.5 ? "#00d4ff" : "#a855f7",
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.alpha * 255).toString(16).padStart(2, "0");
        ctx.fill();
      });
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.08 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        });
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} />;
}

function TypingEffect() {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = TYPING_WORDS[wordIdx];
    const delay = deleting ? 40 : charIdx === word.length ? 1400 : 70;
    const t = setTimeout(() => {
      if (!deleting && charIdx < word.length) {
        setText(word.slice(0, charIdx + 1));
        setCharIdx(charIdx + 1);
      } else if (!deleting && charIdx === word.length) {
        setDeleting(true);
      } else if (deleting && charIdx > 0) {
        setText(word.slice(0, charIdx - 1));
        setCharIdx(charIdx - 1);
      } else {
        setDeleting(false);
        setWordIdx((wordIdx + 1) % TYPING_WORDS.length);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, charIdx, deleting, wordIdx]);
  return (
    <span style={{ color: "#00d4ff", textShadow: "0 0 20px #00d4ff88" }}>
      {text}
      <span style={{ animation: "blink 1s step-end infinite", color: "#a855f7" }}>|</span>
    </span>
  );
}

function SkillBar({ name, level, color, animate }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 13, letterSpacing: "0.08em", color: "#c0cfe0", fontFamily: "'Courier New', monospace" }}>{name}</span>
        <span style={{ fontSize: 12, color, fontFamily: "monospace", fontWeight: 700 }}>{level}%</span>
      </div>
      <div style={{ height: 6, background: "rgba(255,255,255,0.07)", borderRadius: 99, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{
          height: "100%",
          width: animate ? `${level}%` : "0%",
          background: `linear-gradient(90deg, ${color}cc, ${color})`,
          borderRadius: 99,
          boxShadow: `0 0 10px ${color}88`,
          transition: "width 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
          transitionDelay: "0.2s",
        }} />
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? project.accent + "88" : "rgba(255,255,255,0.08)"}`,
        borderRadius: 16,
        padding: "24px",
        backdropFilter: "blur(12px)",
        transition: "all 0.3s ease",
        boxShadow: hovered ? `0 0 30px ${project.accent}33, 0 8px 32px rgba(0,0,0,0.4)` : "0 4px 20px rgba(0,0,0,0.3)",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: hovered ? `linear-gradient(90deg, transparent, ${project.accent}, transparent)` : "transparent",
        transition: "all 0.3s",
      }} />
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <div style={{
          width: 42, height: 42, borderRadius: 10,
          background: `${project.accent}18`,
          border: `1px solid ${project.accent}44`,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20
        }}>{project.icon}</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, color: "#e8f4ff", letterSpacing: "0.02em" }}>{project.title}</div>
          <div style={{ fontSize: 11, color: project.accent, fontFamily: "monospace", marginTop: 2 }}>{project.tag}</div>
        </div>
      </div>
      <p style={{ fontSize: 13, color: "#8eadc4", lineHeight: 1.7, marginBottom: 16 }}>{project.desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {project.tech.map((t) => (
          <span key={t} style={{
            fontSize: 11, padding: "3px 10px", borderRadius: 99,
            background: `${project.accent}15`, border: `1px solid ${project.accent}33`,
            color: project.accent, fontFamily: "monospace"
          }}>{t}</span>
        ))}
      </div>
      <div style={{
        position: "absolute", bottom: -30, right: -30, width: 80, height: 80,
        borderRadius: "50%", background: `${project.accent}08`,
        filter: "blur(20px)", transition: "all 0.3s",
        transform: hovered ? "scale(2)" : "scale(1)",
      }} />
    </div>
  );
}

function Section({ id, children, style = {} }) {
  return (
    <section id={id} style={{ position: "relative", zIndex: 1, padding: "80px 0", ...style }}>
      {children}
    </section>
  );
}

function SectionLabel({ text }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
      <span style={{ fontSize: 11, fontFamily: "monospace", color: "#00d4ff", letterSpacing: "0.2em", textTransform: "uppercase" }}>// {text}</span>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(0,212,255,0.4), transparent)" }} />
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 style={{
      fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 800, letterSpacing: "-0.02em",
      color: "#e8f4ff", marginBottom: 48, fontFamily: "'Segoe UI', sans-serif",
      lineHeight: 1.2,
    }}>{children}</h2>
  );
}

export default function Portfolio() {
  const [navVisible, setNavVisible] = useState(false);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const skillsRef = useRef(null);
  const [formState, setFormState] = useState({ name: "", email: "", msg: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const handler = () => setNavVisible(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setSkillsVisible(true); }, { threshold: 0.3 });
    if (skillsRef.current) observer.observe(skillsRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const handleSend = () => {
    if (formState.name && formState.email && formState.msg) {
      setSent(true);
      setFormState({ name: "", email: "", msg: "" });
      setTimeout(() => setSent(false), 4000);
    }
  };

  const navLinks = ["about", "skills", "projects", "contact"];

  return (
    <div style={{ background: "#030b14", minHeight: "100vh", color: "#c0cfe0", fontFamily: "'Segoe UI', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @keyframes blink { 0%,100%{opacity:1}50%{opacity:0} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)} }
        @keyframes gridPulse { 0%,100%{opacity:0.04}50%{opacity:0.08} }
        @keyframes float { 0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)} }
        @keyframes spin { from{transform:rotate(0deg)}to{transform:rotate(360deg)} }
        @keyframes scanline { 0%{transform:translateY(-100%)}100%{transform:translateY(100vh)} }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #030b14; }
        ::-webkit-scrollbar-thumb { background: #00d4ff44; border-radius: 99px; }
        a { text-decoration: none; }
        input, textarea { outline: none; }
        input::placeholder, textarea::placeholder { color: rgba(176,207,224,0.3); }
      `}</style>

      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(rgba(0,212,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.06) 1px, transparent 1px)`,
        backgroundSize: "50px 50px",
        animation: "gridPulse 4s ease-in-out infinite",
      }} />

      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{
          position: "absolute", left: 0, right: 0, height: "2px",
          background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.03), transparent)",
          animation: "scanline 8s linear infinite",
        }} />
      </div>

      <Particles />

      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: navVisible ? "rgba(3,11,20,0.9)" : "transparent",
        backdropFilter: navVisible ? "blur(20px)" : "none",
        borderBottom: navVisible ? "1px solid rgba(0,212,255,0.1)" : "none",
        transition: "all 0.3s",
        padding: "0 clamp(20px, 6vw, 80px)",
        display: "flex", alignItems: "center", justifyContent: "space-between", height: 64,
      }}>
        <div style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 16, color: "#00d4ff", letterSpacing: "0.1em" }}>
          &lt;AA.DEV /&gt;
        </div>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {navLinks.map((l) => (
            <button key={l} onClick={() => scrollTo(l)} style={{
              background: "none", border: "none", cursor: "pointer",
              color: "#8eadc4", fontSize: 13, fontFamily: "monospace",
              letterSpacing: "0.1em", textTransform: "uppercase",
              transition: "color 0.2s",
            }}
              onMouseEnter={(e) => e.target.style.color = "#00d4ff"}
              onMouseLeave={(e) => e.target.style.color = "#8eadc4"}
            >{l}</button>
          ))}
        </div>
      </nav>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(20px, 6vw, 60px)" }}>

        <Section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 100 }}>
          <div style={{ animation: "fadeInUp 0.8s ease both" }}>
            <div style={{ fontFamily: "monospace", fontSize: 13, color: "#00d4ff", letterSpacing: "0.2em", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#00d4ff", boxShadow: "0 0 10px #00d4ff", animation: "float 2s ease-in-out infinite" }} />
              SYSTEM ONLINE · PORTFOLIO v2.0
            </div>
            <h1 style={{
              fontSize: "clamp(42px, 8vw, 80px)", fontWeight: 900, lineHeight: 1.05,
              letterSpacing: "-0.03em", marginBottom: 12,
              background: "linear-gradient(135deg, #e8f4ff 30%, #00d4ff 60%, #a855f7)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              AKSHITA<br />AGRAWAL
            </h1>
            <div style={{ fontSize: "clamp(14px, 2vw, 18px)", color: "#5a7a9a", letterSpacing: "0.12em", marginBottom: 24, fontFamily: "monospace" }}>
              AI/ML ENTHUSIAST · PYTHON DEVELOPER · CSE STUDENT
            </div>
            <div style={{ fontSize: "clamp(18px, 3vw, 28px)", fontWeight: 600, marginBottom: 40, minHeight: 40 }}>
              <span style={{ color: "#8eadc4" }}>Exploring </span>
              <TypingEffect />
            </div>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button onClick={() => scrollTo("projects")} style={{
                padding: "14px 32px", borderRadius: 8, border: "none",
                background: "linear-gradient(135deg, #00d4ff, #0090c0)",
                color: "#030b14", fontWeight: 800, fontSize: 14, letterSpacing: "0.08em",
                cursor: "pointer", fontFamily: "monospace", textTransform: "uppercase",
                boxShadow: "0 0 30px #00d4ff55, 0 4px 20px rgba(0,212,255,0.3)",
                transition: "all 0.2s",
              }}
                onMouseEnter={(e) => { e.target.style.boxShadow = "0 0 50px #00d4ff88, 0 4px 30px rgba(0,212,255,0.5)"; e.target.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.target.style.boxShadow = "0 0 30px #00d4ff55, 0 4px 20px rgba(0,212,255,0.3)"; e.target.style.transform = "translateY(0)"; }}
              >▶ View Projects</button>
              <button onClick={() => scrollTo("contact")} style={{
                padding: "14px 32px", borderRadius: 8,
                border: "1px solid rgba(168,85,247,0.5)",
                background: "rgba(168,85,247,0.08)", color: "#c084fc",
                fontWeight: 700, fontSize: 14, letterSpacing: "0.08em",
                cursor: "pointer", fontFamily: "monospace", textTransform: "uppercase",
                transition: "all 0.2s",
              }}
                onMouseEnter={(e) => { e.target.style.background = "rgba(168,85,247,0.18)"; e.target.style.borderColor = "rgba(168,85,247,0.9)"; e.target.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.target.style.background = "rgba(168,85,247,0.08)"; e.target.style.borderColor = "rgba(168,85,247,0.5)"; e.target.style.transform = "translateY(0)"; }}
              >Contact Me</button>
            </div>

            <div style={{ display: "flex", gap: 32, marginTop: 60, flexWrap: "wrap" }}>
              {[["2+", "Years Coding"], ["2+", "Projects Built"], ["4", "Semesters Done"]].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: "#00d4ff", fontFamily: "monospace", textShadow: "0 0 20px #00d4ff66" }}>{n}</div>
                  <div style={{ fontSize: 12, color: "#5a7a9a", letterSpacing: "0.08em" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            position: "absolute", right: "5%", top: "20%",
            width: "clamp(200px, 30vw, 400px)", height: "clamp(200px, 30vw, 400px)",
            borderRadius: "50%", pointerEvents: "none",
            background: "radial-gradient(circle, rgba(0,212,255,0.08) 0%, rgba(168,85,247,0.06) 40%, transparent 70%)",
            border: "1px solid rgba(0,212,255,0.1)",
            display: "flex", alignItems: "center", justifyContent: "center",
            animation: "float 6s ease-in-out infinite",
          }}>
            <div style={{
              width: "70%", height: "70%", borderRadius: "50%",
              border: "1px solid rgba(168,85,247,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "clamp(60px, 10vw, 100px)",
            }}>🧠</div>
          </div>
        </Section>

        <Section id="about">
          <SectionLabel text="about.me" />
          <SectionTitle>Decoding the <span style={{ color: "#00d4ff" }}>Engineer</span></SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "center" }}>
            <div>
              <p style={{ fontSize: 15, lineHeight: 1.9, color: "#8eadc4", marginBottom: 20 }}>
                I'm a <strong style={{ color: "#e8f4ff" }}>CSE student at Silver Oak University</strong>, deeply fascinated by the intersection of mathematics and intelligent systems. My journey began with Python scripts and evolved into building projects that solve real problems.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.9, color: "#8eadc4", marginBottom: 28 }}>
                I approach problems like an algorithm — breaking them into sub-problems, iterating, and optimizing. Beyond code, I explore how AI can solve real-world challenges in healthcare, NLP, and web development.
              </p>
              <div style={{
                background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.15)",
                borderRadius: 12, padding: "16px 20px", fontFamily: "monospace",
              }}>
                <div style={{ fontSize: 11, color: "#00d4ff", marginBottom: 10, letterSpacing: "0.15em" }}>// CURRENTLY LEARNING</div>
                {["Machine Learning Algorithms", "Problem Solving", "Data Structures & Algorithms", "Web Development"].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#8eadc4", marginBottom: 6 }}>
                    <span style={{ color: "#a855f7" }}>▸</span> {item}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { icon: "🎓", label: "Education", val: "B.Tech CSE\nSilver Oak Univ." },
                { icon: "📍", label: "Location", val: "Ahmedabad,\nGujarat, India" },
                { icon: "💻", label: "Focus", val: "AI/ML &\nWeb Dev" },
                { icon: "📅", label: "Year", val: "3rd Year\nSemester 5" },
              ].map(({ icon, label, val }) => (
                <div key={label} style={{
                  background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 12, padding: "20px 16px", textAlign: "center",
                  backdropFilter: "blur(10px)",
                  transition: "border-color 0.2s, background 0.2s",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(0,212,255,0.3)"; e.currentTarget.style.background = "rgba(0,212,255,0.05)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
                >
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
                  <div style={{ fontSize: 11, color: "#5a7a9a", letterSpacing: "0.1em", marginBottom: 6 }}>{label}</div>
                  <div style={{ fontSize: 13, color: "#c0cfe0", lineHeight: 1.5, fontWeight: 600, whiteSpace: "pre-line" }}>{val}</div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section id="skills">
          <div ref={skillsRef}>
            <SectionLabel text="system.capabilities" />
            <SectionTitle>Tech <span style={{ color: "#a855f7" }}>Stack</span></SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
              <div>
                <div style={{ fontSize: 12, color: "#00d4ff", fontFamily: "monospace", letterSpacing: "0.15em", marginBottom: 24 }}>PROFICIENCY METRICS</div>
                {SKILLS.map((s) => <SkillBar key={s.name} {...s} animate={skillsVisible} />)}
              </div>
              <div>
                <div style={{ fontSize: 12, color: "#a855f7", fontFamily: "monospace", letterSpacing: "0.15em", marginBottom: 24 }}>TOOL ECOSYSTEM</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {["Git & GitHub", "VS Code", "Google Colab", "Linux", "MySQL", "Tkinter", "Figma" , "Claude", "Canva"].map((tool) => (
                    <span key={tool} style={{
                      fontSize: 12, padding: "6px 14px", borderRadius: 6,
                      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                      color: "#8eadc4", fontFamily: "monospace",
                      transition: "all 0.2s", cursor: "default",
                    }}
                      onMouseEnter={(e) => { e.target.style.borderColor = "rgba(168,85,247,0.5)"; e.target.style.color = "#c084fc"; e.target.style.background = "rgba(168,85,247,0.08)"; }}
                      onMouseLeave={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.color = "#8eadc4"; e.target.style.background = "rgba(255,255,255,0.04)"; }}
                    >{tool}</span>
                  ))}
                </div>
                <div style={{ marginTop: 32, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,212,255,0.1)", borderRadius: 12, padding: 20 }}>
                  <div style={{ fontSize: 11, color: "#00d4ff", fontFamily: "monospace", letterSpacing: "0.15em", marginBottom: 16 }}>// SYSTEM STATUS</div>
                  {[["Learning Mode", "ACTIVE", "#00d4ff"], ["Projects", "2 RUNNING", "#a855f7"], ["Open to Work", "YES", "#22c55e"]].map(([k, v, c]) => (
                    <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, paddingBottom: 10, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <span style={{ fontSize: 13, color: "#5a7a9a", fontFamily: "monospace" }}>{k}</span>
                      <span style={{ fontSize: 12, color: c, fontFamily: "monospace", fontWeight: 700, background: `${c}18`, padding: "3px 10px", borderRadius: 4 }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section id="projects">
          <SectionLabel text="projects.deployed" />
          <SectionTitle>Built with <span style={{ color: "#00d4ff" }}>Intelligence</span></SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {PROJECTS.map((p) => <ProjectCard key={p.title} project={p} />)}
          </div>
        </Section>

        <Section id="contact" style={{ paddingBottom: 100 }}>
          <SectionLabel text="contact.init()" />
          <SectionTitle>Open a <span style={{ color: "#a855f7" }}>Connection</span></SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
            <div>
              <p style={{ fontSize: 15, color: "#8eadc4", lineHeight: 1.9, marginBottom: 32 }}>
                I'm always open to collaborating on interesting AI/ML projects, internship opportunities, or just a good conversation about technology. Send a signal — I'll respond.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { icon: "📧", label: "Email", val: "akshitaa323@gmail.com", color: "#00d4ff", href: "mailto:akshitaa323@gmail.com" },
                  { icon: "🔗", label: "LinkedIn", val: "linkedin.com/in/akshita-agarwal-a65b34329", color: "#a855f7", href: "https://www.linkedin.com/in/akshita-agarwal-a65b34329" },
                  { icon: "💻", label: "GitHub", val: "github.com/akshitaa323-hash", color: "#00d4ff", href: "https://github.com/akshitaa323-hash" },
                ].map(({ icon, label, val, color, href }) => (
                  <a key={label} href={href} style={{
                    display: "flex", alignItems: "center", gap: 16, padding: "14px 20px",
                    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 10, textDecoration: "none", transition: "all 0.2s",
                  }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${color}44`; e.currentTarget.style.background = `${color}08`; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
                  >
                    <span style={{ fontSize: 20 }}>{icon}</span>
                    <div>
                      <div style={{ fontSize: 11, color: "#5a7a9a", fontFamily: "monospace", letterSpacing: "0.1em" }}>{label}</div>
                      <div style={{ fontSize: 13, color, fontFamily: "monospace", marginTop: 2 }}>{val}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 28, backdropFilter: "blur(12px)" }}>
              <div style={{ fontSize: 11, color: "#00d4ff", fontFamily: "monospace", letterSpacing: "0.15em", marginBottom: 20 }}>// TRANSMIT MESSAGE</div>
              {sent && (
                <div style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: 8, padding: "12px 16px", marginBottom: 20, fontSize: 13, color: "#86efac", fontFamily: "monospace" }}>
                  ✓ Message transmitted successfully.
                </div>
              )}
              {[
                { id: "name", label: "// NAME", placeholder: "Your name" },
                { id: "email", label: "// EMAIL", placeholder: "your@email.com" },
              ].map(({ id, label, placeholder }) => (
                <div key={id} style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 11, color: "#5a7a9a", fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: 8 }}>{label}</div>
                  <input
                    value={formState[id]}
                    onChange={(e) => setFormState({ ...formState, [id]: e.target.value })}
                    placeholder={placeholder}
                    style={{
                      width: "100%", padding: "12px 16px", borderRadius: 8,
                      background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.15)",
                      color: "#c0cfe0", fontSize: 14, fontFamily: "monospace",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => e.target.style.borderColor = "rgba(0,212,255,0.5)"}
                    onBlur={(e) => e.target.style.borderColor = "rgba(0,212,255,0.15)"}
                  />
                </div>
              ))}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, color: "#5a7a9a", fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: 8 }}>// MESSAGE</div>
                <textarea
                  value={formState.msg}
                  onChange={(e) => setFormState({ ...formState, msg: e.target.value })}
                  placeholder="What's on your mind?"
                  rows={4}
                  style={{
                    width: "100%", padding: "12px 16px", borderRadius: 8, resize: "vertical",
                    background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.15)",
                    color: "#c0cfe0", fontSize: 14, fontFamily: "monospace",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "rgba(0,212,255,0.5)"}
                  onBlur={(e) => e.target.style.borderColor = "rgba(0,212,255,0.15)"}
                />
              </div>
              <button onClick={handleSend} style={{
                width: "100%", padding: "14px", borderRadius: 8, border: "none",
                background: "linear-gradient(135deg, #00d4ff, #0090c0)",
                color: "#030b14", fontWeight: 800, fontSize: 14,
                letterSpacing: "0.1em", fontFamily: "monospace", textTransform: "uppercase",
                cursor: "pointer", boxShadow: "0 0 20px #00d4ff44",
                transition: "all 0.2s",
              }}
                onMouseEnter={(e) => { e.target.style.boxShadow = "0 0 40px #00d4ff77"; e.target.style.transform = "translateY(-1px)"; }}
                onMouseLeave={(e) => { e.target.style.boxShadow = "0 0 20px #00d4ff44"; e.target.style.transform = "translateY(0)"; }}
              >▶ SEND TRANSMISSION</button>
            </div>
          </div>
        </Section>
      </div>

      <div style={{
        position: "relative", zIndex: 1, textAlign: "center",
        padding: "24px", borderTop: "1px solid rgba(255,255,255,0.05)",
        fontFamily: "monospace", fontSize: 12, color: "#3a5a7a",
      }}>
        <span style={{ color: "#00d4ff" }}>&lt;</span> Designed & Built by Akshita Agrawal · {new Date().getFullYear()} <span style={{ color: "#00d4ff" }}>/&gt;</span>
      </div>
    </div>
  );
}
