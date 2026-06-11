import { useState, useCallback } from "react";

const SERVICES = [
  {
    icon: "⚖",
    name: "Compliance Services",
    desc: "Navigate regulatory frameworks and achieve compliance with industry-mandated security standards.",
    fullDesc: "Our Compliance Services team helps your organisation understand, implement, and maintain the regulatory requirements that govern your industry. Whether you're working toward ISO 27001, SOC 2, PCI-DSS, GDPR, or local data protection mandates, we guide you through every phase — from gap analysis to certification readiness.",
    benefits: [
      "Gap analysis against major frameworks (ISO 27001, SOC 2, PCI-DSS, GDPR)",
      "Policy and procedure development tailored to your sector",
      "Audit preparation and evidence gathering support",
      "Ongoing compliance monitoring and advisory",
      "Staff guidance on regulatory obligations",
    ],
    outcome: "Achieve and sustain compliance certifications that unlock new business opportunities and build stakeholder trust.",
  },
  {
    icon: "🔬",
    name: "Vulnerability Assessment & Penetration Testing (VAPT)",
    desc: "Identify and safely exploit security weaknesses before real attackers do.",
    fullDesc: "Our VAPT engagements combine automated scanning with manual expert-led testing to uncover vulnerabilities across your entire attack surface — networks, applications, cloud infrastructure, and APIs. We deliver clear, prioritised findings so your team can remediate what matters most.",
    benefits: [
      "Network and infrastructure penetration testing",
      "Web and mobile application security testing",
      "API security assessment",
      "Cloud configuration review (AWS, Azure, GCP)",
      "Detailed remediation roadmap with severity ratings",
    ],
    outcome: "Know exactly where you're exposed before adversaries do — and have a clear plan to fix it.",
  },
  {
    icon: "💡",
    name: "IT Product Consulting",
    desc: "Strategic guidance on security tools and alignment of your technology stack.",
    fullDesc: "Choosing and integrating the right security products is complex. Our consultants evaluate your existing stack, identify gaps, and recommend best-fit solutions — without vendor bias. We help you avoid costly misalignments between tools, teams, and business objectives.",
    benefits: [
      "Vendor-neutral security tool evaluation and selection",
      "Technology stack integration planning",
      "Security architecture review and design",
      "Cost-benefit analysis for security investments",
      "Roadmap development aligned to business goals",
    ],
    outcome: "A streamlined, effective security technology stack that delivers value without unnecessary complexity or spend.",
  },
  {
    icon: "📚",
    name: "Information Security Training",
    desc: "Equip your team with deep technical security knowledge and hands-on skills.",
    fullDesc: "Our technical training programmes are built for security professionals, developers, and IT teams who need practical, hands-on skills. Courses range from secure coding practices and cloud security fundamentals to advanced threat hunting and incident response.",
    benefits: [
      "Customised training curricula for your team's skill level",
      "Hands-on labs and real-world scenario exercises",
      "Secure development lifecycle (SDLC) training for engineers",
      "Threat hunting and incident response workshops",
      "Certification preparation support",
    ],
    outcome: "A technically capable team that can identify, respond to, and prevent security incidents independently.",
  },
  {
    icon: "🛡",
    name: "Cyber Training & Awareness",
    desc: "Build a security-first culture across every tier of your organisation.",
    fullDesc: "Human error remains one of the leading causes of breaches. Our Cyber Awareness programmes change behaviour at every level — from the C-suite to frontline staff. Interactive modules, scenario-based learning, and regular micro-training keep your workforce vigilant year-round.",
    benefits: [
      "Role-based awareness modules for all staff levels",
      "Executive and board-level security briefings",
      "Interactive e-learning with progress tracking",
      "Bespoke scenario simulations based on your industry",
      "Measurable behaviour change metrics and reporting",
    ],
    outcome: "A security-conscious culture where every employee is an active line of defence.",
  },
  {
    icon: "🎣",
    name: "Phishing Awareness Campaigns",
    desc: "Simulated phishing attacks to measure and continuously strengthen human defences.",
    fullDesc: "We design and run realistic, controlled phishing simulations that benchmark your organisation's susceptibility and track improvement over time. Campaigns are followed by targeted micro-training for those who clicked, ensuring learning happens at the point of failure.",
    benefits: [
      "Realistic phishing simulation campaigns across email, SMS, and voice",
      "Baseline susceptibility measurement and trending",
      "Instant targeted training for click-through users",
      "Departmental and individual reporting dashboards",
      "Continuous campaign scheduling to maintain vigilance",
    ],
    outcome: "Measurably reduced phishing susceptibility — turning your workforce from a liability into a human firewall.",
  },
  {
    icon: "📊",
    name: "Security Maturity Assessment",
    desc: "Benchmark your current posture and chart a clear roadmap to higher resilience.",
    fullDesc: "Our Security Maturity Assessment benchmarks your organisation against recognised frameworks such as CMMI, NIST CSF, and CIS Controls. We produce a clear, board-ready maturity scorecard alongside a prioritised roadmap so leadership always knows where to invest next.",
    benefits: [
      "Maturity scoring across governance, risk, and technical domains",
      "Benchmarking against NIST CSF, CIS Controls, and CMMI",
      "Board-ready maturity scorecard and executive summary",
      "Prioritised improvement roadmap with effort and impact ratings",
      "Quarterly re-assessment options for continuous tracking",
    ],
    outcome: "Complete visibility of your security posture with a clear, justified path to the next maturity level.",
  },
  {
    icon: "🔍",
    name: "Auditing Services",
    desc: "Independent review of policies, security controls, and technical infrastructure.",
    fullDesc: "Our independent audits provide an objective review of your information security controls, policies, and processes. Whether you need a one-time deep-dive or recurring audit cycles, we deliver structured findings with clear evidence trails that satisfy regulators, partners, and board-level stakeholders.",
    benefits: [
      "Independent policy and procedure audits",
      "Technical control effectiveness review",
      "Third-party and supply chain security audits",
      "Evidence-backed audit reports for regulators and partners",
      "Recurring audit schedules for continuous assurance",
    ],
    outcome: "An objective, credible view of your security controls — ready for regulators, partners, or internal governance.",
  },
];

const PILLARS = [
  { icon: "🔒", title: "Threat-Led Defence", body: "We think like attackers so you can defend like experts — intelligence-driven at every layer." },
  { icon: "🎯", title: "Tailored Strategy", body: "No generic playbooks. Every engagement is calibrated to your organisation's risk profile." },
  { icon: "📈", title: "Measurable Maturity", body: "Clear benchmarks and roadmaps so you always know where you stand and where to grow." },
  { icon: "🤝", title: "Business Alignment", body: "Security that enables business — not a blocker, but a genuine competitive advantage." },
];

// Global responsive styles.
const GLOBAL_CSS = `
  * { 
    box-sizing: border-box; 
    margin: 0; 
    padding: 0; 
  }
  
  html, body { 
    overflow-x: hidden; 
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background: #f7f8fc;
  }

  /* Override Vite's default #root constraints */
  #root {
    width: 100%;
    max-width: none;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    text-align: left; /* Overrides Vite's default center alignment */
  }

  .qs-about-grid,
  .qs-contact-grid,
  .qs-detail-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    align-items: start;
  }

  .qs-svc-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 24px;
  }

  /* Tablet */
  @media (max-width: 960px) {
    .qs-section, .qs-hero, .qs-cta, .qs-header-inner, .qs-footer-inner {
      padding-left: 2rem !important;
      padding-right: 2rem !important;
    }
    .qs-about-grid,
    .qs-contact-grid,
    .qs-detail-grid {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    .qs-pillar-grid {
      grid-template-columns: 1fr 1fr;
    }
    .qs-nav {
      display: none !important; 
    }
  }

  /* Mobile */
  @media (max-width: 640px) {
    .qs-section, .qs-hero, .qs-cta, .qs-header-inner, .qs-footer-inner {
      padding-left: 1.25rem !important;
      padding-right: 1.25rem !important;
    }
    .qs-stat-bar-inner {
      flex-direction: column;
      gap: 32px;
    }
    .qs-stat-item {
      width: 100%;
    }
    .qs-stat-div {
      display: none;
    }
    .qs-pillar-grid {
      grid-template-columns: 1fr;
    }
    .qs-svc-grid {
      grid-template-columns: 1fr;
    }
    .qs-hero, .qs-section, .qs-cta {
      padding-top: 56px !important;
      padding-bottom: 56px !important;
    }
    .qs-geo-svg {
      display: none;
    }
  }
`;

export default function QsectronSite() {
  const [view, setView] = useState("home");
  const [selectedService, setSelectedService] = useState(null);

  const navigate = useCallback((v, service = null) => {
    setView(v);
    if (service !== null) setSelectedService(service);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const t = {
    pageBg:       "#f7f8fc",
    heroBg:       "#0f1535",
    statBg:       "#0a0f28",
    sectionBg:    "#ffffff",
    altSectionBg: "#f4f5f9",
    cardBg:       "#ffffff",
    cardBorder:   "#e4e6f0",
    accent:       "#3730a3",
    accentLight:  "#ede9fe",
    accentMid:    "#a5b4fc",
    headerBg:     "#ffffffee",
    headerBorder: "#e4e6f0",
    logoPrimary:  "#0f1535",
    logoAccent:   "#3730a3",
    navText:      "#4a5568",
    navActive:    "#3730a3",
    heroH1:       "#ffffff",
    heroEm:       "#a5b4fc",
    heroP:        "#94a3b8",
    eyebrow:      "#3730a3",
    eyebrowBg:    "#3730a310",
    eyebrowBorder:"transparent",
    sectionH:     "#0f1535",
    bodyText:     "#4a5568",
    mutedText:    "#6b7280",
    statNum:      "#a5b4fc",
    highlightBg:  "#f0f0ff",
    highlightBorder: "#3730a3",
    highlightText:"#2d3352",
    pillarBg:     "#ffffff",
    pillarBorder: "#e4e6f0",
    pillarH:      "#0f1535",
    pillarP:      "#6b7280",
    svcName:      "#0f1535",
    svcDesc:      "#6b7280",
    ctaBg:        "#0f1535",
    ctaBorder:    "transparent",
    footerBg:     "#0a0f28",
    footerText:   "#6b7280",
    btnPriText:   "#ffffff",
    ciLbl:        "#3730a3",
    ciVal:        "#2d3352",
    ciIconBg:     "#ede9fe",
    mapCardBg:    "#0f1535",
    mapCityColor: "#a5b4fc",
    mapAddrColor: "#94a3b8",
    divider:      "#ffffff15",
  };

  const styles = {
    root: {
      fontFamily: "'Inter', system-ui, sans-serif",
      background: t.pageBg,
      color: t.bodyText,
      flex: 1,
      display: "flex",
      flexDirection: "column",
    },
    header: {
      position: "sticky",
      top: 0,
      zIndex: 200,
      display: "flex",
      justifyContent: "center",
      width: "100%",
      background: t.headerBg,
      borderBottom: `1px solid ${t.headerBorder}`,
      backdropFilter: "blur(14px)",
    },
    headerInner: {
      width: "100%",
      maxWidth: 1140,
      padding: "0 2.5rem",
      minHeight: 72,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    logo: {
      fontSize: 20,
      fontWeight: 800,
      letterSpacing: "2.5px",
      cursor: "pointer",
      color: t.logoPrimary,
      textDecoration: "none",
      whiteSpace: "nowrap",
      flex: 1,
    },
    navContainer: {
      display: "flex", 
      gap: 16, 
      justifyContent: "center",
      flex: 2,
    },
    navLink: (active) => ({
      fontSize: 14,
      fontWeight: 600,
      padding: "8px 16px",
      borderRadius: 6,
      cursor: "pointer",
      border: "none",
      borderBottom: active ? `2px solid ${t.navActive}` : "2px solid transparent",
      background: "transparent",
      color: active ? t.navActive : t.navText,
      transition: "all 0.2s",
      whiteSpace: "nowrap",
    }),
    headerActions: {
      display: "flex",
      justifyContent: "flex-end",
      flex: 1,
    },
    btnPri: {
      fontSize: 14,
      fontWeight: 700,
      padding: "12px 28px",
      borderRadius: 8,
      cursor: "pointer",
      border: "none",
      background: t.accent,
      color: t.btnPriText,
      letterSpacing: "0.3px",
      transition: "opacity 0.2s",
    },
    btnSec: {
      fontSize: 14,
      fontWeight: 600,
      padding: "10px 24px",
      borderRadius: 8,
      cursor: "pointer",
      background: "transparent",
      border: `1px solid ${t.accentMid}`,
      color: t.accent,
      letterSpacing: "0.3px",
      transition: "all 0.2s",
      whiteSpace: "nowrap",
    },
    hero: {
      background: t.heroBg,
      padding: "120px 2.5rem",
      position: "relative",
      overflow: "hidden",
      display: "flex",
      justifyContent: "center",
    },
    heroInnerHome: { 
      maxWidth: 800, 
      width: "100%", 
      position: "relative", 
      zIndex: 2, 
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    heroInnerPage: { 
      maxWidth: 1140, 
      width: "100%", 
      position: "relative", 
      zIndex: 2,
    },
    eyebrow: {
      display: "inline-block",
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: "2.5px",
      padding: "6px 16px",
      borderRadius: 24,
      border: `1px solid ${t.eyebrowBorder}`,
      background: t.eyebrowBg,
      color: t.accent,
      marginBottom: 24,
      textTransform: "uppercase",
    },
    heroH1: {
      fontSize: "clamp(34px, 5.5vw, 56px)",
      fontWeight: 800,
      lineHeight: 1.15,
      letterSpacing: "-1.5px",
      color: t.heroH1,
      marginBottom: 20,
    },
    heroPHome: {
      fontSize: 17,
      lineHeight: 1.7,
      color: t.heroP,
      maxWidth: 640,
      marginBottom: 40,
    },
    heroPPage: {
      fontSize: 17,
      lineHeight: 1.7,
      color: t.heroP,
      maxWidth: 640,
      marginBottom: 0,
    },
    statBar: {
      background: t.statBg,
      padding: "32px 2.5rem",
      borderTop: `1px solid ${t.divider}`,
      borderBottom: `1px solid ${t.divider}`,
      display: "flex",
      justifyContent: "center",
    },
    statBarInner: {
      maxWidth: 1140,
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    statNum: { fontSize: 32, fontWeight: 800, letterSpacing: "-1px", color: t.statNum },
    statLbl: { fontSize: 12, fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", marginTop: 4, color: t.mutedText },
    statDiv: { width: 1, height: 48, background: t.divider },
    pageSection: (bg) => ({
      padding: "96px 2.5rem",
      background: bg || t.sectionBg,
      display: "flex",
      justifyContent: "center",
    }),
    sectionInner: { maxWidth: 1140, width: "100%" },
    secEyebrow: { fontSize: 12, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: t.eyebrow, marginBottom: 12 },
    secH: { fontSize: "clamp(26px, 3.5vw, 36px)", fontWeight: 800, letterSpacing: "-0.8px", color: t.sectionH, marginBottom: 16, lineHeight: 1.2 },
    secSub: { fontSize: 16, lineHeight: 1.7, color: t.mutedText, maxWidth: 640, marginBottom: 48 },
    aboutBody: { fontSize: 16, lineHeight: 1.85, color: t.bodyText },
    aboutHighlight: {
      padding: "24px 28px",
      borderRadius: "0 12px 12px 0",
      borderLeft: `4px solid ${t.accent}`,
      background: t.highlightBg,
      color: t.highlightText,
      fontSize: 15,
      marginTop: 28,
      lineHeight: 1.7,
    },
    pillar: {
      padding: "32px 28px",
      borderRadius: 16,
      background: t.pillarBg,
      border: `1px solid ${t.pillarBorder}`,
      boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
    },
    pillarIcon: {
      width: 48, height: 48,
      borderRadius: 12,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: t.accentLight,
      fontSize: 22,
      marginBottom: 16,
    },
    svcCard: {
      padding: "32px 28px",
      borderRadius: 16,
      background: t.cardBg,
      border: `1px solid ${t.cardBorder}`,
      display: "flex",
      flexDirection: "column",
      gap: 16,
      boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      cursor: "pointer",
      textAlign: "left",
    },
    svcIconWrap: {
      width: 48, height: 48,
      borderRadius: 12,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: t.accentLight,
      fontSize: 24,
    },
    arrowBtn: {
      fontSize: 18,
      color: t.accentMid,
      alignSelf: "flex-end",
      cursor: "pointer",
      background: "none",
      border: "none",
      padding: "6px 10px",
      borderRadius: 8,
      transition: "color 0.2s, background 0.2s",
      lineHeight: 1,
    },
    ctaSection: {
      padding: "96px 2.5rem",
      background: t.ctaBg,
      textAlign: "center",
      borderTop: `1px solid ${t.ctaBorder}`,
      display: "flex",
      justifyContent: "center",
    },
    ctaInner: { maxWidth: 640, width: "100%" },
    ctaH: { fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, letterSpacing: "-1px", color: "#ffffff", marginBottom: 16, lineHeight: 1.18 },
    ctaP: { fontSize: 16, lineHeight: 1.7, color: "#94a3b8", marginBottom: 36 },
    contactCard: {
      padding: "40px",
      borderRadius: 16,
      background: t.pillarBg,
      border: `1px solid ${t.cardBorder}`,
      boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
      textAlign: "left",
    },
    ciIcon: {
      width: 44, height: 44, minWidth: 44,
      borderRadius: 12,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: t.ciIconBg,
      color: t.accent,
      fontSize: 20,
    },
    mapCard: {
      padding: "40px",
      borderRadius: 16,
      background: t.mapCardBg,
      border: `1px solid #3730a340`,
      minHeight: 280,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    },
    footer: {
      background: t.footerBg,
      padding: "40px 2.5rem",
      borderTop: `1px solid ${t.divider}`,
      marginTop: "auto",
      display: "flex",
      justifyContent: "center",
    },
    footerInner: {
      maxWidth: 1140, width: "100%",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      flexWrap: "wrap", gap: 16,
    },
    footerLogoText: { fontSize: 18, fontWeight: 800, letterSpacing: "2px", color: "#ffffff" },
    footerCopy: { fontSize: 13, color: t.footerText },
  };

  const EyebrowTag = ({ text }) => <div style={styles.eyebrow}>{text}</div>;
  const BtnPri = ({ children, onClick }) => (
    <button style={styles.btnPri} onClick={onClick}>{children}</button>
  );
  const BtnSec = ({ children, onClick }) => (
    <button style={styles.btnSec} onClick={onClick}>{children}</button>
  );

  const GeoSVG = () => (
    <svg className="qs-geo-svg" style={{ position: "absolute", right: "-5%", top: "50%", transform: "translateY(-50%)", width: 440, height: 440, opacity: 0.04, pointerEvents: "none" }}
      viewBox="0 0 400 400" fill="none">
      <circle cx="200" cy="200" r="180" stroke="white" strokeWidth="1"/>
      <circle cx="200" cy="200" r="130" stroke="white" strokeWidth="0.6"/>
      <circle cx="200" cy="200" r="80" stroke="white" strokeWidth="0.5"/>
      <line x1="20" y1="200" x2="380" y2="200" stroke="white" strokeWidth="0.5"/>
      <line x1="200" y1="20" x2="200" y2="380" stroke="white" strokeWidth="0.5"/>
      <line x1="70" y1="70" x2="330" y2="330" stroke="white" strokeWidth="0.4"/>
      <line x1="330" y1="70" x2="70" y2="330" stroke="white" strokeWidth="0.4"/>
      <circle cx="200" cy="200" r="5" fill="white"/>
      <circle cx="200" cy="70" r="4" fill="white"/>
      <circle cx="330" cy="200" r="4" fill="white"/>
      <circle cx="200" cy="330" r="4" fill="white"/>
      <circle cx="70" cy="200" r="4" fill="white"/>
    </svg>
  );

  const handleCardHover = (e, isEnter) => {
    e.currentTarget.style.transform = isEnter ? "translateY(-4px)" : "translateY(0)";
    e.currentTarget.style.boxShadow = isEnter ? "0 12px 32px rgba(0,0,0,0.08)" : "0 4px 24px rgba(0,0,0,0.04)";
    const btn = e.currentTarget.querySelector("button");
    if (btn) {
      btn.style.color = isEnter ? t.accent : t.accentMid;
      btn.style.background = isEnter ? t.accentLight : "none";
    }
  };

  const HomeView = () => (
    <>
      <section className="qs-hero" style={styles.hero}>
        <GeoSVG />
        <div style={styles.heroInnerHome}>
          <EyebrowTag text="TRUSTED CYBERSECURITY PARTNER" />
          <h1 style={styles.heroH1}>
            Defend. Detect.<br />
            <em style={{ color: t.heroEm, fontStyle: "normal" }}>Resilience by Design.</em>
          </h1>
          <p style={styles.heroPHome}>
            Qsectron delivers sharp, future-ready security solutions trusted across sectors — strengthening your posture, mitigating risk, and building lasting digital resilience.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
            <BtnPri onClick={() => navigate("services")}>Explore Our Services</BtnPri>
            <BtnSec onClick={() => navigate("contact")}>Contact Us</BtnSec>
          </div>
        </div>
      </section>

      <div className="qs-section" style={styles.statBar}>
        <div className="qs-stat-bar-inner" style={styles.statBarInner}>
          {[["8+","Core Services"],["100%","Client Focus"],["24/7","Vigilance"],["Multi","Sector Expertise"]].map(([n,l],i,a) => (
            <div key={l} className="qs-stat-item" style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <div style={{ textAlign: "center", flex: 1 }}>
                <div style={styles.statNum}>{n}</div>
                <div style={styles.statLbl}>{l}</div>
              </div>
              {i < a.length - 1 && <div className="qs-stat-div" style={styles.statDiv} />}
            </div>
          ))}
        </div>
      </div>

      <section className="qs-section" style={styles.pageSection(t.sectionBg)}>
        <div className="qs-section-inner" style={styles.sectionInner}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={styles.secEyebrow}>About Qsectron</div>
            <h2 style={styles.secH}>Empowering Digital Resilience</h2>
          </div>
          <div className="qs-about-grid">
            <div>
              <p style={styles.aboutBody}>
                Qsectron is a leading cyber security firm, trusted across sectors for delivering sharp, reliable, and future-ready security solutions. Our expert team offers tailored strategies that strengthen your security posture, mitigate risks, and build digital resilience.
              </p>
              <div style={styles.aboutHighlight}>
                From secure application development to risk assessments, Qsectron is your go-to partner for practical, business-aligned cybersecurity.
              </div>
            </div>
            <div className="qs-pillar-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {PILLARS.map(p => (
                <div key={p.title} style={styles.pillar}>
                  <div style={styles.pillarIcon}>{p.icon}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: t.pillarH, marginBottom: 8 }}>{p.title}</div>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: t.pillarP }}>{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="qs-section" style={styles.pageSection(t.altSectionBg)}>
        <div className="qs-section-inner" style={styles.sectionInner}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={styles.secEyebrow}>What We Do</div>
            <h2 style={{ ...styles.secH, marginBottom: 12 }}>Our Core Services</h2>
            <p style={{ ...styles.secSub, margin: "0 auto" }}>Comprehensive security capabilities spanning assessment, defence, compliance, and human resilience.</p>
          </div>
          <div className="qs-svc-grid">
            {SERVICES.slice(0, 4).map(s => (
              <div 
                key={s.name} 
                style={styles.svcCard}
                onClick={() => navigate("service-detail", s)}
                onMouseEnter={e => handleCardHover(e, true)}
                onMouseLeave={e => handleCardHover(e, false)}
              >
                <div style={styles.svcIconWrap}>{s.icon}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: t.svcName, lineHeight: 1.35, flex: 1 }}>{s.name}</div>
                <button style={styles.arrowBtn} title={`Learn more about ${s.name}`}>→</button>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <BtnSec onClick={() => navigate("services")}>View All 8 Services →</BtnSec>
          </div>
        </div>
      </section>

      <section className="qs-cta" style={styles.ctaSection}>
        <div style={styles.ctaInner}>
          <h2 style={styles.ctaH}>Ready to fortify your cyber defences?</h2>
          <p style={styles.ctaP}>Our specialists are ready to assess your security posture and craft a plan that fits your business objectives.</p>
          <BtnPri onClick={() => navigate("contact")}>Get in Touch Today</BtnPri>
        </div>
      </section>
    </>
  );

  const ServicesView = () => (
    <>
      <section className="qs-hero" style={{ ...styles.hero, padding: "80px 2.5rem 72px" }}>
        <GeoSVG />
        <div style={styles.heroInnerHome}>
          <EyebrowTag text="WHAT WE DELIVER" />
          <h1 style={{ ...styles.heroH1, fontSize: "clamp(30px, 4.5vw, 48px)" }}>Our Core Services</h1>
          <p style={{ ...styles.heroPPage, margin: "0 auto" }}>
            Comprehensive cybersecurity capabilities — built around your business, guided by intelligence.
          </p>
        </div>
      </section>

      <section className="qs-section" style={styles.pageSection(t.altSectionBg)}>
        <div className="qs-section-inner" style={styles.sectionInner}>
          <div className="qs-svc-grid">
            {SERVICES.map(s => (
              <div 
                key={s.name} 
                style={styles.svcCard}
                onClick={() => navigate("service-detail", s)}
                onMouseEnter={e => handleCardHover(e, true)}
                onMouseLeave={e => handleCardHover(e, false)}
              >
                <div style={styles.svcIconWrap}>{s.icon}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: t.svcName, lineHeight: 1.35, flex: 1 }}>{s.name}</div>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: t.svcDesc, marginBottom: 8 }}>{s.desc}</p>
                <button style={styles.arrowBtn} title={`Learn more about ${s.name}`}>→</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="qs-cta" style={styles.ctaSection}>
        <div style={styles.ctaInner}>
          <h2 style={styles.ctaH}>Not sure where to start?</h2>
          <p style={styles.ctaP}>Our consultants can help you prioritise based on your current security posture and regulatory obligations.</p>
          <BtnPri onClick={() => navigate("contact")}>Speak to an Expert</BtnPri>
        </div>
      </section>
    </>
  );

  const ServiceDetailView = ({ service }) => {
    if (!service) return null;
    return (
      <>
        <section className="qs-hero" style={{ ...styles.hero, padding: "80px 2.5rem 72px" }}>
          <GeoSVG />
          <div style={{ ...styles.heroInnerHome, textAlign: "center", alignItems: "center" }}>
            <button
              onClick={() => navigate("services")}
              style={{ background: "none", border: "none", color: t.accentMid, fontSize: 14, cursor: "pointer", padding: 0, marginBottom: 24, display: "flex", alignItems: "center", gap: 8, fontWeight: 600 }}
            >
              ← Back to All Services
            </button>
            <div style={{ ...styles.svcIconWrap, width: 64, height: 64, fontSize: 32, marginBottom: 24 }}>{service.icon}</div>
            <EyebrowTag text="OUR SERVICES" />
            <h1 style={{ ...styles.heroH1, fontSize: "clamp(28px, 4vw, 44px)" }}>{service.name}</h1>
            <p style={{ ...styles.heroPPage, margin: "0 auto" }}>{service.desc}</p>
          </div>
        </section>

        <section className="qs-section" style={styles.pageSection(t.sectionBg)}>
          <div className="qs-section-inner" style={styles.sectionInner}>
            <div className="qs-detail-grid">
              <div>
                <div style={styles.secEyebrow}>Overview</div>
                <h2 style={{ ...styles.secH, marginBottom: 20 }}>What this service covers</h2>
                <p style={{ fontSize: 16, lineHeight: 1.85, color: t.bodyText, marginBottom: 32 }}>{service.fullDesc}</p>
                <div style={styles.aboutHighlight}>
                  <strong style={{ color: t.accent, fontSize: 14, letterSpacing: "1px" }}>EXPECTED OUTCOME</strong>
                  <p style={{ margin: "12px 0 0", fontSize: 15, lineHeight: 1.7, color: t.highlightText }}>{service.outcome}</p>
                </div>
              </div>

              <div>
                <div style={styles.secEyebrow}>What's Included</div>
                <h2 style={{ ...styles.secH, marginBottom: 24 }}>Key deliverables</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {service.benefits.map((b, i) => (
                    <div key={i} style={{
                      display: "flex",
                      gap: 16,
                      alignItems: "flex-start",
                      padding: "16px 20px",
                      borderRadius: 12,
                      background: t.altSectionBg,
                      border: `1px solid ${t.cardBorder}`,
                    }}>
                      <div style={{
                        width: 28, height: 28, minWidth: 28,
                        borderRadius: "50%",
                        background: t.accentLight,
                        color: t.accent,
                        fontSize: 13,
                        fontWeight: 800,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        marginTop: 2,
                      }}>{i + 1}</div>
                      <p style={{ fontSize: 15, lineHeight: 1.6, color: t.bodyText, margin: 0 }}>{b}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="qs-section" style={{ ...styles.pageSection(t.altSectionBg) }}>
          <div className="qs-section-inner" style={styles.sectionInner}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div style={styles.secEyebrow}>Explore More</div>
              <h2 style={{ ...styles.secH, marginBottom: 0 }}>Other services you might need</h2>
            </div>
            <div className="qs-svc-grid">
              {SERVICES.filter(s => s.name !== service.name).slice(0, 4).map(s => (
                <div 
                  key={s.name} 
                  style={styles.svcCard}
                  onClick={() => navigate("service-detail", s)}
                  onMouseEnter={e => handleCardHover(e, true)}
                  onMouseLeave={e => handleCardHover(e, false)}
                >
                  <div style={styles.svcIconWrap}>{s.icon}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: t.svcName, lineHeight: 1.35, flex: 1 }}>{s.name}</div>
                  <button style={styles.arrowBtn} title={`Learn more about ${s.name}`}>→</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="qs-cta" style={styles.ctaSection}>
          <div style={styles.ctaInner}>
            <h2 style={styles.ctaH}>Interested in {service.name}?</h2>
            <p style={styles.ctaP}>Our specialists are ready to discuss your needs and tailor an engagement that fits your organisation.</p>
            <BtnPri onClick={() => navigate("contact")}>Get in Touch Today</BtnPri>
          </div>
        </section>
      </>
    );
  };

  const ContactView = () => (
    <>
      <section className="qs-hero" style={{ ...styles.hero, padding: "80px 2.5rem 72px" }}>
        <GeoSVG />
        <div style={styles.heroInnerHome}>
          <EyebrowTag text="GET IN TOUCH" />
          <h1 style={{ ...styles.heroH1, fontSize: "clamp(30px, 4.5vw, 48px)" }}>Contact Qsectron</h1>
          <p style={{ ...styles.heroPPage, margin: "0 auto" }}>
            Reach out to discuss your cybersecurity needs. We respond within one business day.
          </p>
        </div>
      </section>

      <section className="qs-section" style={styles.pageSection(t.sectionBg)}>
        <div className="qs-section-inner" style={styles.sectionInner}>
          <div className="qs-contact-grid">
            <div style={styles.contactCard}>
              <div style={{ ...styles.secEyebrow, marginBottom: 32 }}>Contact Information</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                {[
                  { icon: "📍", label: "Office Address", value: <>No 11/38, Status Quo Building,<br />Sterling Road, Seetha Nagar,<br />Nungambakkam, Chennai,<br />Tamil Nadu, India.</> },
                  { icon: "📞", label: "Phone", value: <>+91 90879 52649<br />+91 86103 17498</> },
                  { icon: "🕐", label: "Business Hours", value: <>Monday – Saturday<br />9:00 AM – 6:00 PM IST</> },
                ].map(ci => (
                  <div key={ci.label} style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                    <div style={styles.ciIcon}>{ci.icon}</div>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: t.ciLbl, marginBottom: 8 }}>{ci.label}</div>
                      <div style={{ fontSize: 15, lineHeight: 1.65, color: t.ciVal }}>{ci.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.mapCard}>
              {/* Subtle background glow */}
              <div style={{ position: 'absolute', top: '-50%', right: '-50%', width: '100%', height: '100%', background: 'radial-gradient(circle, rgba(55,48,163,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

              <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%', background: 'rgba(165, 180, 252, 0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24,
                  border: `1px solid rgba(165, 180, 252, 0.2)`
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={t.mapCityColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: t.mapCityColor, marginBottom: 8 }}>Global Headquarters</div>
                <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-0.5px", color: "#ffffff" }}>Chennai</div>
                <div style={{ fontSize: 16, marginTop: 16, lineHeight: 1.7, color: t.mapAddrColor }}>
                  Status Quo Building,<br />
                  Sterling Road, Nungambakkam,<br />
                  Tamil Nadu, India.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );

  return (
    <div style={styles.root}>
      <style>{GLOBAL_CSS}</style>
      <header className="qs-header" style={styles.header}>
        <div className="qs-header-inner" style={styles.headerInner}>
          <div style={styles.logo} onClick={() => navigate("home")}>
            QSEC<span style={{ color: t.logoAccent }}>TRON</span>
          </div>
          <nav className="qs-nav" style={styles.navContainer}>
            {[["home","Home"],["services","Our Services"],["contact","Contact Us"]].map(([v,label]) => (
              <button key={v} style={styles.navLink(view===v || (view==="service-detail" && v==="services"))} onClick={() => navigate(v)}>{label}</button>
            ))}
          </nav>
          <div className="qs-header-actions" style={styles.headerActions}>
            <button style={styles.btnSec} onClick={() => navigate("contact")}>Get in Touch</button>
          </div>
        </div>
      </header>

      <main style={{ flex: 1 }}>
        {view === "home" && <HomeView />}
        {view === "services" && <ServicesView />}
        {view === "service-detail" && <ServiceDetailView service={selectedService} />}
        {view === "contact" && <ContactView />}
      </main>

      <footer className="qs-footer" style={styles.footer}>
        <div className="qs-footer-inner" style={styles.footerInner}>
          <div style={styles.footerLogoText}>QSEC<span style={{ color: "#a5b4fc" }}>TRON</span></div>
          <div style={styles.footerCopy}>© 2025 Qsectron. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}