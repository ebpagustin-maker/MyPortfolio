import {
  createElement,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";

type HeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4";
  className?: string;
  children: ReactNode;
};

function Heading({ as = "h2", className, children }: HeadingProps) {
  return createElement(as, { className }, children);
}

type LinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  download?: boolean;
  onClick?: () => void;
  target?: string;
  rel?: string;
};

function Link({ children, ...props }: LinkProps) {
  return createElement("a", props, children);
}

function Button({
  className,
  children,
  onClick,
  ariaLabel,
}: {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
}) {
  return createElement(
    "button",
    { className, onClick, type: "button", "aria-label": ariaLabel },
    children,
  );
}

function FormField({
  multiline = false,
  ...props
}: {
  multiline?: boolean;
  name: string;
  placeholder: string;
  required?: boolean;
  type?: string;
  ariaLabel: string;
}) {
  const element = multiline ? "textarea" : "input";
  return createElement(element, {
    ...props,
    "aria-label": props.ariaLabel,
    rows: multiline ? 4 : undefined,
  });
}

function AnimatedMetric({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const start = performance.now();
        const duration = 1200;
        const animate = (time: number) => {
          const progress = Math.min((time - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(value * eased));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
        observer.disconnect();
      },
      { threshold: 0.45 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  return <strong ref={ref}>{prefix}{display}{suffix}</strong>;
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
    </svg>
  );
}

const navItems = [
  ["Work", "#work"],
  ["Research", "#research"],
  ["Services", "#services"],
  ["About", "#about"],
];

const services = [
  {
    number: "01",
    title: "Product Marketing",
    copy: "Turn product value into a compelling market story, launch plan, and commercial motion.",
    items: ["Positioning & messaging", "Go-to-market strategy", "Launch planning", "Sales enablement"],
  },
  {
    number: "02",
    title: "Product Research",
    copy: "Understand the category, customer, and portfolio gaps before committing resources.",
    items: ["Feature benchmarking", "Needs research", "Portfolio gap analysis", "Opportunity identification"],
  },
  {
    number: "03",
    title: "Market Intelligence",
    copy: "Build a clear view of market forces and turn fragmented evidence into decisions.",
    items: ["Market landscapes", "Competitor benchmarking", "Segmentation", "Expansion research"],
  },
  {
    number: "04",
    title: "Brand Strategy",
    copy: "Define a differentiated brand position and translate it into an integrated marketing system.",
    items: ["Brand positioning", "Campaign planning", "Customer journeys", "KPI development"],
  },
  {
    number: "05",
    title: "Digital Marketing",
    copy: "Create useful, coherent content programs that educate customers and support growth.",
    items: ["Content strategy", "Social campaigns", "Copywriting", "Performance tracking"],
  },
  {
    number: "06",
    title: "Retail Experience",
    copy: "Connect product, space, and sales through customer-centered physical experiences.",
    items: ["Showroom marketing", "Merchandising", "Events & activations", "Launch coordination"],
  },
];

const cases = [
  {
    id: "01",
    category: "Product marketing",
    title: "Building Decocity from brand idea to nationwide retail presence",
    summary: "Brand strategy · Portfolio development · Sourcing · Pricing · GTM · Retail rollout",
    result: "Expanded to 50+ stores",
    tone: "wine",
  },
  {
    id: "02",
    category: "Portfolio strategy",
    title: "Turning category research into a high-contribution product pipeline",
    summary: "Opportunity research · Product development · Commercialization · Lifecycle management",
    result: "17 launches · ~30% of sales",
    tone: "ivory",
  },
  {
    id: "03",
    category: "Commercial growth",
    title: "Connecting sourcing, pricing, and product strategy to profitable growth",
    summary: "Sales analytics · Supplier negotiation · Pricing · Demand planning",
    result: "127% YoY net sales growth",
    tone: "rose",
  },
];

const process = [
  ["01", "Discover", "Understand the business, product, customer, and ambition.", "Stakeholder brief · Business goals"],
  ["02", "Research", "Analyze competitors, trends, needs, and opportunities.", "Market scan · Customer insight"],
  ["03", "Define", "Clarify positioning, differentiation, and priorities.", "Positioning · Value proposition"],
  ["04", "Plan", "Build the strategy, campaign plan, and success measures.", "GTM plan · KPI framework"],
  ["05", "Execute", "Bring launches, assets, and experiences to market.", "Campaigns · Sales enablement"],
  ["06", "Optimize", "Learn from performance and refine the approach.", "Performance review · Next actions"],
];

const gallery = [
  { type: "Product launches", title: "Launch narrative system", format: "Messaging · Sales tools" },
  { type: "Product campaigns", title: "Integrated retail campaign", format: "Campaign · Showroom" },
  { type: "Brand storytelling", title: "Decocity brand world", format: "Brand · Portfolio" },
  { type: "Educational content", title: "Product education series", format: "Content · Social" },
  { type: "Events & activations", title: "Construction exhibit", format: "Experience · Sales" },
  { type: "Social media content", title: "Always-on content system", format: "Strategy · Creative" },
];

function SectionIntro({
  eyebrow,
  title,
  copy,
  light = false,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  light?: boolean;
}) {
  return (
    <div className={`section-intro ${light ? "section-intro--light" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <Heading>{title}</Heading>
      {copy && <p className="section-copy">{copy}</p>}
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeResearch, setActiveResearch] = useState(0);
  const [galleryFilter, setGalleryFilter] = useState("All work");
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [selectedCase, setSelectedCase] = useState<number | null>(null);
  const [caseFilter, setCaseFilter] = useState("All cases");
  const [selectedGallery, setSelectedGallery] = useState<number | null>(null);
  const [activeService, setActiveService] = useState<number | null>(null);
  const [activeProcess, setActiveProcess] = useState(1);
  const [activeCompetitor, setActiveCompetitor] = useState(0);
  const [activeSwot, setActiveSwot] = useState(0);
  const [activeProduct, setActiveProduct] = useState(2);
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.add("motion-ready");
    const revealTargets = document.querySelectorAll(
      ".section-intro, .proof-grid > div, .case-card, .research-layout, .service-card, .process-grid article, .gallery-card, .about-grid > *, .timeline article, .impact-layout",
    );
    revealTargets.forEach((node, index) => {
      node.setAttribute("data-reveal", "");
      (node as HTMLElement).style.setProperty("--reveal-delay", `${(index % 4) * 70}ms`);
    });
    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
    );
    revealTargets.forEach((node) => revealObserver.observe(node));

    const sections = document.querySelectorAll("main section[id]");
    const sectionObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`);
      }),
      { rootMargin: "-35% 0px -55% 0px" },
    );
    sections.forEach((section) => sectionObserver.observe(section));
    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("overlay-open", selectedCase !== null || selectedGallery !== null);
    return () => document.body.classList.remove("overlay-open");
  }, [selectedCase, selectedGallery]);

  const moveHero = (event: ReactMouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    event.currentTarget.style.setProperty("--pointer-x", `${x * 22}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${y * 18}px`);
  };

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSent(true);
  };

  const filters = ["All work", "Product launches", "Product campaigns", "Brand storytelling"];
  const visibleGallery =
    galleryFilter === "All work" ? gallery : gallery.filter((item) => item.type === galleryFilter);
  const visibleCases =
    caseFilter === "All cases" ? cases : cases.filter((item) => item.category === caseFilter);

  return (
    <div className="site-shell">
      <header className={`topbar ${scrolled ? "topbar--scrolled" : ""}`}>
        <Link href="#top" className="brand" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark">EA</span>
          <span className="brand-name">Eazel Agustin</span>
        </Link>
        <nav className={`nav ${menuOpen ? "nav--open" : ""}`} aria-label="Main navigation">
          {navItems.map(([label, href]) => (
            <Link key={label} href={href} className={activeSection === href ? "active" : ""} onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          ))}
          <Link href="#contact" className="nav-cta" onClick={() => setMenuOpen(false)}>
            Start a conversation <ArrowIcon />
          </Link>
        </nav>
        <Button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          ariaLabel="Toggle navigation"
        >
          <MenuIcon open={menuOpen} />
        </Button>
      </header>

      <main id="top">
        <section className="hero" onMouseMove={moveHero}>
          <div className="hero-grain" />
          <div className="hero-orb hero-orb--one" />
          <div className="hero-orb hero-orb--two" />
          <svg className="hero-connections" viewBox="0 0 600 600" aria-hidden="true">
            <path d="M40 420C180 300 210 120 380 160s120 200 190 280" />
            <path d="M130 520c100-90 200-70 260-180s90-170 180-180" />
          </svg>
          <div className="hero-content">
            <div className="hero-copy">
              <p className="hero-kicker">Product marketing · Market intelligence · Brand strategy</p>
              <Heading as="h1">
                I turn market insights into marketing that <em>moves business forward.</em>
              </Heading>
              <p className="hero-support">
                I connect product knowledge, market research, brand strategy, and creative execution
                to uncover opportunities, differentiate products, and reach the right customers.
              </p>
              <div className="hero-actions">
                <Link href="#work" className="button button--light">
                  Explore my work <ArrowIcon />
                </Link>
                <Link href="#contact" className="button button--ghost">
                  Let&apos;s work together
                </Link>
              </div>
              <Link href="/resume-eazel-bob-agustin.pdf" className="text-link hero-resume" download>
                View my resume <span>↗</span>
              </Link>
            </div>

            <div className="strategy-board" aria-label="Illustrative strategy workspace">
              <div className="board-label">Strategy workspace / 2026</div>
              <div className="board-report">
                <div className="report-head">
                  <span>MARKET PULSE</span>
                  <small>Illustrative framework</small>
                </div>
                <div className="report-chart">
                  {[38, 56, 44, 69, 63, 84, 72].map((value, index) => (
                    <i key={index} style={{ "--bar-height": `${value}%` } as React.CSSProperties} />
                  ))}
                </div>
                <div className="report-legend">
                  <span>Category demand</span>
                  <strong>+18.4%</strong>
                </div>
              </div>
              <div className="board-matrix">
                <span className="matrix-title">POSITIONING MAP</span>
                <i className="axis axis-x" />
                <i className="axis axis-y" />
                <b className="dot dot-a">A</b>
                <b className="dot dot-b">B</b>
                <b className="dot dot-c">YOU</b>
                <small className="matrix-low">VALUE</small>
                <small className="matrix-high">PREMIUM</small>
              </div>
              <div className="board-note">
                <span>OPPORTUNITY 03</span>
                <strong>Own the practical premium space.</strong>
                <p>High product value. Clear customer need. Underdeveloped category story.</p>
              </div>
              <div className="board-tabs">
                <span>INSIGHT</span><span>STRATEGY</span><span>ACTION</span>
              </div>
              <div className="floating-tag floating-tag--one">Product marketing</div>
              <div className="floating-tag floating-tag--two">Market research</div>
              <div className="floating-tag floating-tag--three">Brand strategy</div>
            </div>
          </div>
          <div className="expertise-strip">
            <span>Product research</span><i />
            <span>Commercial strategy</span><i />
            <span>Go-to-market</span><i />
            <span>Brand growth</span><i />
            <span>Market intelligence</span>
          </div>
        </section>

        <section className="proof section-wrap">
          <p className="eyebrow">Verified career impact</p>
          <div className="proof-grid">
            <div><AnimatedMetric value={127} suffix="%" /><span>YoY net sales growth</span><small>2025 vs. 2024</small></div>
            <div><AnimatedMetric value={17} /><span>Products launched</span><small>~30% of company sales</small></div>
            <div><AnimatedMetric value={50} suffix="+" /><span>Retail stores</span><small>Nationwide expansion supported</small></div>
            <div><AnimatedMetric value={100} prefix="₱" suffix="M" /><span>Supplier cost savings</span><small>Through commercial optimization</small></div>
          </div>
        </section>

        <section className="work section-wrap" id="work">
          <SectionIntro
            eyebrow="Selected work"
            title="Strategy made visible. Results made measurable."
            copy="A selection of verified work spanning brand creation, portfolio development, product commercialization, and commercial growth."
          />
          <div className="case-filters" role="tablist" aria-label="Filter case studies">
            {["All cases", "Product marketing", "Portfolio strategy", "Commercial growth"].map((filter) => (
              <Button key={filter} className={caseFilter === filter ? "active" : ""} onClick={() => setCaseFilter(filter)}>
                {filter}
              </Button>
            ))}
          </div>
          <div className="case-list">
            {visibleCases.map((item) => (
              <article className={`case-card case-card--${item.tone}`} key={item.id}>
                <div className="case-meta"><span>{item.id}</span><span>{item.category}</span></div>
                <Heading as="h3">{item.title}</Heading>
                <p>{item.summary}</p>
                <div className="case-result"><span>Verified outcome</span><strong>{item.result}</strong></div>
                <Button className="case-link" onClick={() => setSelectedCase(Number(item.id) - 1)} ariaLabel={`Explore ${item.title}`}>
                  Explore case study <ArrowIcon />
                </Button>
              </article>
            ))}
          </div>
          <p className="case-note">
            Full project materials can be shared where confidentiality permits. No unverified client
            outcomes are shown.
          </p>
        </section>

        <section className="research" id="research">
          <div className="section-wrap">
            <SectionIntro
              eyebrow="Signature capability"
              title="Research that answers what the business should do next."
              copy="I investigate the product, market, customer, and competition—then connect the evidence to a commercial recommendation."
              light
            />
            <div className="research-layout">
              <div className="research-tabs" role="tablist" aria-label="Research capabilities">
                {["Product research", "Market research", "Competitive intelligence", "Business research", "Strategic recommendations"].map(
                  (label, index) => (
                    <Button
                      key={label}
                      className={activeResearch === index ? "active" : ""}
                      onClick={() => setActiveResearch(index)}
                    >
                      <span>0{index + 1}</span>{label}
                    </Button>
                  ),
                )}
              </div>

              <div className="research-panel">
                {activeResearch === 0 && (
                  <>
                    <div className="panel-heading"><span>MODULE 01</span><Heading as="h3">From category signal to launch strategy</Heading></div>
                    <div className="framework-flow">
                      {["Category", "Customer", "Competitors", "Difference", "Positioning", "Launch"].map((item, index) => (
                        <div key={item}><small>0{index + 1}</small><strong>{item}</strong></div>
                      ))}
                    </div>
                    <div className="product-table">
                      <div className="table-title"><strong>Feature benchmark</strong><span>Illustrative data</span></div>
                      <div className="table-row table-head"><span>OFFER</span><span>VALUE</span><span>DESIGN</span><span>FIT</span></div>
                      {[["Concept A", "82", "74", "HIGH"], ["Concept B", "68", "91", "MID"], ["Market gap", "94", "88", "HIGH"]].map((row, i) => (
                        <Button className={`table-row ${activeProduct === i ? "highlight" : ""}`} key={row[0]} onClick={() => setActiveProduct(i)}>
                          {row.map((cell) => <span key={cell}>{cell}</span>)}
                        </Button>
                      ))}
                      <p className="table-finding">
                        <span>Selected finding</span>
                        {[
                          "Strong baseline value; design story needs clearer differentiation.",
                          "Design-forward offer with a less accessible value position.",
                          "Illustrative whitespace: high value, high design fit, and clearer product education.",
                        ][activeProduct]}
                      </p>
                    </div>
                  </>
                )}
                {activeResearch === 1 && (
                  <>
                    <div className="panel-heading"><span>MODULE 02</span><Heading as="h3">A decision-ready market intelligence view</Heading></div>
                    <div className="insight-cards">
                      <div><small>DEMAND SIGNAL</small><strong>Rising</strong><span>Illustrative</span></div>
                      <div><small>MARKET MATURITY</small><strong>3 / 5</strong><span>Illustrative</span></div>
                      <div><small>CHANNEL GAP</small><strong>Visible</strong><span>Illustrative</span></div>
                    </div>
                    <div className="market-chart">
                      <div className="chart-copy"><strong>Segment opportunity</strong><span>Relative attractiveness · Illustrative</span></div>
                      {[["Emerging", 88], ["Core", 72], ["Premium", 57], ["Value", 43]].map(([label, val]) => (
                        <div className="bar-row" key={label}><span>{label}</span><i><b style={{ "--bar-width": `${val}%` } as React.CSSProperties} /></i><small>{val}</small></div>
                      ))}
                    </div>
                  </>
                )}
                {activeResearch === 2 && (
                  <>
                    <div className="panel-heading"><span>MODULE 03</span><Heading as="h3">See the competitive whitespace clearly</Heading></div>
                    <div className="competitor-switcher">
                      {["Competitor A", "Competitor B", "Competitor C"].map((item, index) => (
                        <Button key={item} className={activeCompetitor === index ? "active" : ""} onClick={() => setActiveCompetitor(index)}>
                          {item}
                        </Button>
                      ))}
                    </div>
                    <div className="competitor-grid">
                      <div className="comp-map">
                        <span className="comp-label">Illustrative positioning</span>
                        <i className="axis axis-x" /><i className="axis axis-y" />
                        <Button className={`bubble b1 ${activeCompetitor === 0 ? "active" : ""}`} onClick={() => setActiveCompetitor(0)}>A</Button>
                        <Button className={`bubble b2 ${activeCompetitor === 1 ? "active" : ""}`} onClick={() => setActiveCompetitor(1)}>B</Button>
                        <Button className={`bubble b3 ${activeCompetitor === 2 ? "active" : ""}`} onClick={() => setActiveCompetitor(2)}>C</Button>
                        <b className="bubble b4">GAP</b>
                      </div>
                      <div className="comp-notes">
                        <small>{["VALUE-LED POSITION", "PREMIUM POSITION", "SPECIALIST POSITION"][activeCompetitor]}</small>
                        <strong>{["Strong access, weaker story.", "High design equity, higher barrier.", "Clear niche, limited scale."][activeCompetitor]}</strong>
                        <p>{["Opportunity: pair accessible value with stronger product education.", "Opportunity: compete on practical value and service clarity.", "Opportunity: bring specialist credibility to a broader audience."][activeCompetitor]}</p>
                        <span>Illustrative insight—not actual market research.</span>
                      </div>
                    </div>
                    <div className="swot-grid">
                      {[
                        ["Strength", "Established distribution"],
                        ["Weakness", "Undifferentiated messaging"],
                        ["Opportunity", "Under-served practical premium space"],
                        ["Threat", "Price-led category pressure"],
                      ].map(([title, copy], index) => (
                        <Button key={title} className={activeSwot === index ? "active" : ""} onClick={() => setActiveSwot(index)}>
                          <span>{title}</span><strong>{activeSwot === index ? copy : "Tap to explore"}</strong>
                        </Button>
                      ))}
                    </div>
                  </>
                )}
                {activeResearch === 3 && (
                  <>
                    <div className="panel-heading"><span>MODULE 04</span><Heading as="h3">Structure ambiguity into a business case</Heading></div>
                    <div className="consulting-flow">
                      {["Business question", "Research", "Key findings", "Implications", "Recommendations"].map((item, index) => (
                        <div key={item}><span>{index + 1}</span><strong>{item}</strong><p>{["Frame the decision", "Build the evidence", "Find the signal", "Connect to value", "Prioritize action"][index]}</p></div>
                      ))}
                    </div>
                  </>
                )}
                {activeResearch === 4 && (
                  <>
                    <div className="panel-heading"><span>MODULE 05</span><Heading as="h3">Turn evidence into prioritized action</Heading></div>
                    <div className="recommendation-flow">
                      {["Insight", "Opportunity", "Strategy", "Action", "KPI"].map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>)}
                    </div>
                    <div className="roadmap">
                      <div><small>NOW</small><strong>Validate the highest-value audience</strong></div>
                      <div><small>NEXT</small><strong>Prototype positioning and channel mix</strong></div>
                      <div><small>LATER</small><strong>Scale, measure, and optimize</strong></div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="research-questions">
              <span>Is there a market opportunity?</span>
              <span>Who should we prioritize?</span>
              <span>How can we differentiate?</span>
              <span>What should we do next?</span>
            </div>
          </div>
        </section>

        <section className="services section-wrap" id="services">
          <SectionIntro
            eyebrow="Services & expertise"
            title="From unanswered question to in-market execution."
            copy="Engage me for focused research, strategic direction, or an end-to-end product marketing challenge."
          />
          <div className="service-grid">
            {services.map((service, index) => (
              <article key={service.title} className={`service-card ${activeService === index ? "active" : ""}`}>
                <span className="service-number">{service.number}</span>
                <Heading as="h3">{service.title}</Heading>
                <p>{service.copy}</p>
                <ul>{service.items.map((item) => <li key={item}>{item}</li>)}</ul>
                <div className="service-reveal">
                  <span>Business problem</span>
                  <p>{["Unclear product value or launch path.", "High-stakes decisions without enough evidence.", "Fragmented market and competitor information.", "A brand that is not distinctive enough.", "Content without a commercial role.", "A disconnected physical customer journey."][index]}</p>
                  <Link href="#work">View relevant work <ArrowIcon /></Link>
                </div>
                <Button className="service-toggle" onClick={() => setActiveService(activeService === index ? null : index)} ariaLabel={`Toggle ${service.title} details`}>
                  {activeService === index ? "Close" : "Explore"}
                </Button>
              </article>
            ))}
          </div>
        </section>

        <section className="process-section">
          <div className="section-wrap">
            <SectionIntro
              eyebrow="How I work"
              title="Rigorous enough for the boardroom. Practical enough for the market."
              light
            />
            <div className="process-track"><i style={{ "--process-progress": `${activeProcess * 20}%` } as React.CSSProperties} /></div>
            <div className="process-grid">
              {process.map(([num, title, copy, deliverables], index) => (
                <article key={title} className={activeProcess === index ? "active" : ""} onClick={() => setActiveProcess(index)}>
                  <span>{num}</span><Heading as="h3">{title}</Heading><p>{copy}</p>
                  <small>{deliverables}</small>
                  <Button onClick={() => setActiveProcess(index)} ariaLabel={`Explore ${title}`}>View step</Button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="gallery section-wrap">
          <SectionIntro
            eyebrow="Creative & campaign work"
            title="Strategy, translated into customer-facing moments."
            copy="Representative work categories from product launches, retail marketing, brand storytelling, education, and activations."
          />
          <div className="filter-row" role="tablist" aria-label="Filter creative work">
            {filters.map((filter) => (
              <Button key={filter} className={galleryFilter === filter ? "active" : ""} onClick={() => setGalleryFilter(filter)}>
                {filter}
              </Button>
            ))}
          </div>
          <div className="gallery-grid">
            {visibleGallery.map((item, index) => (
              <article className={`gallery-card gallery-card--${index % 3}`} key={item.title}>
                <div className="gallery-visual">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div className="visual-sheet"><i /><i /><i /></div>
                  <strong>EA / WORK</strong>
                  <Button className="gallery-open" onClick={() => setSelectedGallery(gallery.indexOf(item))} ariaLabel={`Preview ${item.title}`}>Preview <ArrowIcon /></Button>
                </div>
                <div className="gallery-copy"><small>{item.type}</small><Heading as="h3">{item.title}</Heading><p>{item.format}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="about section-wrap" id="about">
          <div className="about-grid">
            <div className="about-title">
              <p className="eyebrow">About Eazel</p>
              <Heading>A commercially minded marketer who works across the whole product story.</Heading>
            </div>
            <div className="portrait-placeholder">
              <span>EA</span>
              <p>Professional portrait placeholder</p>
            </div>
            <div className="about-copy">
              <p className="lead">
                I&apos;m a Product Marketing Manager with 5+ years of experience turning market
                understanding into products, brands, and commercial programs that grow.
              </p>
              <p>
                My work spans research, portfolio strategy, sourcing, pricing, positioning, retail
                rollout, campaign execution, and performance reporting. That range lets me connect
                the boardroom question to what customers actually see, understand, and buy.
              </p>
              <div className="capability-list">
                <span>Market opportunity analysis</span><span>Portfolio management</span>
                <span>Cross-functional leadership</span><span>Executive reporting</span>
                <span>Supplier negotiation</span><span>Sales enablement</span>
              </div>
            </div>
          </div>
          <div className="timeline">
            <div className="timeline-head"><span>Experience</span><span>2018 — Present</span></div>
            <article>
              <div><span>2021 — PRESENT</span><strong>Polylite Industrial Corporation</strong></div>
              <div><Heading as="h3">Product Marketing Manager</Heading><p>Own the end-to-end lifecycle across market research, product development, sourcing, commercialization, pricing, sales growth, and brand management.</p></div>
            </article>
            <article>
              <div><span>2018 — 2021</span><strong>First Metro Gas Inc.</strong></div>
              <div><Heading as="h3">Credit and Collection Staff</Heading><p>Managed receivables, customer relationships, and financial records using SAP S/4HANA in close coordination with Finance and Sales.</p></div>
            </article>
            <article>
              <div><span>EDUCATION</span><strong>San Beda College Alabang</strong></div>
              <div><Heading as="h3">BS Accounting Technology</Heading><p>A commercial and analytical foundation for product, pricing, and business decisions.</p></div>
            </article>
          </div>
        </section>

        <section className="impact section-wrap">
          <SectionIntro eyebrow="Results & scale" title="A track record grounded in commercial reality." />
          <div className="impact-layout">
            <div className="impact-feature"><AnimatedMetric value={300} prefix="₱" suffix="M+" /><span>Annual sourcing and importation budget managed</span><p>Across 400,000 kg annual import volume and 8 strategic international supplier relationships.</p></div>
            <div className="impact-list">
              <div title="Active product portfolio"><AnimatedMetric value={512} /><span>SKUs managed</span><i style={{ "--metric-width": "92%" } as React.CSSProperties} /></div>
              <div title="Approximate annual average"><AnimatedMetric value={4} prefix="~" /><span>New product lines annually</span><i style={{ "--metric-width": "68%" } as React.CSSProperties} /></div>
              <div title="Nationwide commercial enablement"><AnimatedMetric value={100} suffix="+" /><span>Sales executives supported</span><i style={{ "--metric-width": "83%" } as React.CSSProperties} /></div>
              <div title="International supplier portfolio"><AnimatedMetric value={8} /><span>Strategic suppliers</span><i style={{ "--metric-width": "61%" } as React.CSSProperties} /></div>
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="contact-orbit">RESEARCH · STRATEGY · ACTION ·</div>
          <div className="section-wrap contact-inner">
            <p className="eyebrow">Let&apos;s move the business forward</p>
            <Heading>Have a product to launch, a market to understand, or a business to grow?</Heading>
            <p>Let&apos;s turn research into insight, insight into strategy, and strategy into meaningful marketing action.</p>
            <div className="contact-actions">
              <Link href="mailto:ebp.agustin@gmail.com" className="button button--light">Let&apos;s talk about your project <ArrowIcon /></Link>
              <Link href="#work" className="button button--ghost">Explore my work</Link>
            </div>
            <form className={`contact-form ${formSent ? "is-sent" : ""}`} onSubmit={submitContact}>
              {formSent ? (
                <div className="form-success"><span>Message ready</span><strong>Thank you. Your project brief has been captured.</strong><p>This demonstration confirms the interaction. Please email Eazel directly to begin the conversation.</p><Button onClick={() => setFormSent(false)}>Send another</Button></div>
              ) : (
                <>
                  <FormField name="name" placeholder="Your name" required ariaLabel="Your name" />
                  <FormField name="email" type="email" placeholder="Email address" required ariaLabel="Email address" />
                  <FormField name="company" placeholder="Company / brand" ariaLabel="Company or brand" />
                  <FormField name="brief" placeholder="Tell me about the opportunity, challenge, or launch." required multiline ariaLabel="Project brief" />
                  <Button className="form-submit">Send project brief <ArrowIcon /></Button>
                </>
              )}
            </form>
            <div className="contact-details">
              <div><small>EMAIL</small><Link href="mailto:ebp.agustin@gmail.com">ebp.agustin@gmail.com</Link></div>
              <div><small>LINKEDIN</small><Link href="https://linkedin.com/in/bobbyagustin" target="_blank" rel="noreferrer">linkedin.com/in/bobbyagustin</Link></div>
              <div><small>BASE</small><span>Las Piñas City, Philippines</span></div>
            </div>
          </div>
        </section>
      </main>

      {selectedCase !== null && (
        <div className="project-overlay" role="dialog" aria-modal="true" aria-label={cases[selectedCase].title}>
          <Button className="overlay-backdrop" onClick={() => setSelectedCase(null)} ariaLabel="Close case study" />
          <div className="overlay-panel">
            <Button className="overlay-close" onClick={() => setSelectedCase(null)} ariaLabel="Close case study">Close ×</Button>
            <span className="overlay-kicker">CASE STUDY / {cases[selectedCase].id}</span>
            <Heading>{cases[selectedCase].title}</Heading>
            <p className="overlay-summary">{cases[selectedCase].summary}</p>
            <div className="case-journey">
              {[
                ["Context", "A growth-stage physical product portfolio with nationwide retail ambition."],
                ["Challenge", "Connect product opportunity, brand clarity, sourcing, pricing, and sell-through."],
                ["Research", "Category trends, competitive offers, product specifications, and commercial viability."],
                ["Strategy", "Build a differentiated portfolio and practical go-to-market system."],
                ["Execution", "Supplier coordination, product launches, retail rollout, merchandising, and sales enablement."],
                ["Results", cases[selectedCase].result],
              ].map(([label, copy], index) => <div key={label}><span>0{index + 1}</span><strong>{label}</strong><p>{copy}</p></div>)}
            </div>
            <small>All outcomes shown are resume-verified. Supporting materials are subject to confidentiality.</small>
          </div>
        </div>
      )}

      {selectedGallery !== null && (
        <div className="project-overlay" role="dialog" aria-modal="true" aria-label={gallery[selectedGallery].title}>
          <Button className="overlay-backdrop" onClick={() => setSelectedGallery(null)} ariaLabel="Close preview" />
          <div className="overlay-panel overlay-panel--gallery">
            <Button className="overlay-close" onClick={() => setSelectedGallery(null)} ariaLabel="Close preview">Close ×</Button>
            <div className="device-preview"><div className="device-screen"><span>EA / CAMPAIGN</span><i /><i /><strong>{gallery[selectedGallery].title}</strong><b>PLAY</b></div></div>
            <div><span className="overlay-kicker">{gallery[selectedGallery].type}</span><Heading>{gallery[selectedGallery].title}</Heading><p className="overlay-summary">{gallery[selectedGallery].format}</p><p>Representative portfolio category. Replace this preview with approved project media when available.</p></div>
          </div>
        </div>
      )}

      <footer>
        <span>© 2026 Eazel Bob Agustin</span>
        <span>Product marketing · Strategy · Research</span>
        <Link href="#top">Back to top ↑</Link>
      </footer>
    </div>
  );
}

export default App;
