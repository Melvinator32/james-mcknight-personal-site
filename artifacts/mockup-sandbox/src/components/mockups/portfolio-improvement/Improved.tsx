import React, { useState, useEffect, useRef } from "react";
import {
  Brain, Calculator, ChartBar, ChartSpline, CircleDot, Code, FileSpreadsheet,
  Handshake, Landmark, ListTodo, MonitorPlay, Presentation, Radar, Search,
  SquareSigma, TrendingUp, Tv, Workflow, Mail, Linkedin, ArrowRight, ChevronDown, ChevronUp, MapPin, ExternalLink, Download
} from "lucide-react";
import { cn } from "@/lib/utils";
import "./_improved.css";

const jobs = [
  {
    title: "Corporate Development Analyst",
    company: "International Matex Tank Terminals (IMTT)",
    dates: "2024-04 – Present",
    bullets: [
      "Own and build 100% of commercial DCF models and ~50% of corporate development models used to evaluate investment and commercial decisions.",
      "Built 40+ models spanning $50K facility upgrades to $150MM strategic initiatives, supporting 25+ deal closures and $500MM+ of capital deployment.",
      "Own a complex dock utilization model used in quarterly executive updates to guide project development and site capacity decisions.",
      "Identified a prospective customer's limited alternatives through commercial and market analysis, driving a pricing recommendation 75% above the original proposal that generated ~$12MM of incremental EBITDA.",
      "Led CRM platform selection, implementation, workflow design, automation buildout, and training, and serve as lead administrator for 20 daily users."
    ]
  },
  {
    title: "Senior Analyst, Analyst, Summer Intern",
    company: "Fidelis New Energy, LLC (acquired by Nscale in 2026)",
    dates: "2022-08 – 2024-04",
    bullets: [
      "Developed project finance models for decarbonization opportunities supporting development decisions across projects representing $8B+ of combined capex.",
      "Led coordination of a $9MM grant application for CO2 transportation and storage, saving $400K+ in external consulting fees while managing procurement of 30+ documents totaling 120+ pages.",
      "Evaluated hundreds of grant opportunities across clean hydrogen/ammonia, CCS, SAF, and renewable diesel, supporting applications for over $125MM in federal grant awards.",
      "Helped develop the proprietary community benefits program used across Fidelis' projects and regularly drafted letters of support and intent for legislators, partners, and stakeholders."
    ]
  },
  {
    title: "Investment Analyst",
    company: "Darwin Fenner Fund",
    dates: "2022-01 – 2022-05",
    bullets: [
      "Selected for the Large Cap Student Managed Fund ($1.5M AUM).",
      "Conducted extensive research into the Consumer Discretionary sector and built a comprehensive model using fundamental screens and relative valuations that culminated in buy and sell recommendations for the portfolio."
    ]
  },
  {
    title: "Equity Research Analyst",
    company: "Burkenroad Reports",
    dates: "2021-01 – 2021-05",
    bullets: [
      "Conducted C-suite interviews, built cash flow and earnings projection models, and developed a comparable valuation methodology for Investar Bank.",
      "Produced a 40-page sell-side investment report distributed to ~20,000 institutional and retail investors."
    ]
  },
  {
    title: "Trip Leader",
    company: "Moondance Adventures",
    dates: "2022-06 – 2022-08",
    bullets: [
      "Led 39 students on backpacking trips through Slovenia and Croatia, responsible for logistics, safety, and group leadership in the field."
    ]
  }
];

const ventures = [
  {
    name: "Print-on-Demand E-commerce — Bayou Bill",
    overview: "Ahhh… my weird-brainchild-turned-independent-lifestyle-brand that started as a result of some late-night experimentation! What was initially a fun creative outlet evolved into a successful online store.",
    bullets: [
      "Generates ~$500 of passive revenue a month through a 50+ product Etsy and personal website catalog run on roughly two hours of upkeep per month through automation.",
      "Achieved a 200% YOY conversion lift from pricing, copy, and keyword strategy.",
      "Developed hands-on skills in entrepreneurship, e-commerce, branding, and digital marketing, including Photoshop graphic design, image editing, and mockup creation.",
      "Create original designs inspired by New Orleans, Mardi Gras, live music, and the outdoors — printed on stickers, shirts, hats, and glassware."
    ]
  },
  {
    name: "CardWise — Credit Card Optimization",
    overview: "A side hustle focused on helping others get more value from their existing spending by strategically evaluating cards, benefits, and reward programs.",
    bullets: [
      "Evaluate rewards programs, welcome bonuses, annual fees, statement credits, and redemption options to maximize everyday spending value.",
      "Develop systems to track multiple cards, benefits, deadlines, and points balances while maintaining disciplined payment habits.",
      "Strengthen skills in financial analysis, organization, and optimization by constantly weighing costs, benefits, and opportunity tradeoffs."
    ]
  }
];

type Interest = { name: string; description?: string; children?: Interest[] };
const interests: Interest[] = [
  { name: "Travel", description: "I love planning trips around new places, good food, and the perfect mix of adventure and relaxation. Recent highlights include Costa Rica, Belize, and Mexico City." },
  { name: "Golf", description: "I have played since I was 5 when my grandfather first snuck me onto the local range against the rules after getting tired of chasing my erratic shots around the yard. I eventually played for my high school team. Now I enjoy weekend rounds, post-work (and the occasional pre-work) range sessions, and a perpetual mission to get back to my high school form and break par for the first time!" },
  { name: "Backpacking", description: "Multi-day trips in the mountains are a special escape for me, a habit picked up as a student doing overnight trips in Rocky Mountain National Park in Colorado, the Wind River Range in Wyoming, and Pisgah National Forest in North Carolina in high school.\n\nIn college I had the privilege of backpacking through the French Alps around Chamonix and Zermatt. Post-grad, I led trips with Moondance backpacking through the Slovenian Alps. I have also done multiple trips in the Uintas in Utah and recently bagged my first 14'er in Colorado (Mt. Democrat). Up next on my backpacking bucket list are Alaska, Maine (Appalachian Trail), Zion/Canyonlands, Patagonia, and Glacier National Park." },
  { name: "Sports", description: "Football teams: Tennessee Titans, New Orleans Saints, Tulane, Vanderbilt. (Don't hold it against me for having two college teams and two NFL teams. The only way the Titans and Saints become a problem is if they meet in the Super Bowl — and I think we all know the odds of that. Same goes for Tulane and Vanderbilt meeting in the CFP…)\n\nBasketball: New Orleans Pelicans, Vanderbilt, Tulane\n\nHockey: Nashville Predators\n\nI also enjoy keeping up with F1 and most PGA Tour events. One of my annual highlights is getting to go to the Zurich Classic in New Orleans and watch players play what was my “home” course for several years." },
  { name: "Fly Fishing", description: "There is something healing about nothing but the sound of cold trickling streams early in the morning with a gentle fog slowly lifting off at the crack of dawn. I fell in love with fishing at 5 or 6 when my grandfather started taking me to a bamboo-poles-only trout farm.\n\nFast forward 5 years, my dad finally let me start messing around with his fly rod on a trip in North Carolina. I waded in the river until I was about knee deep and caught my first fish with him — a mighty 3\" rainbow trout, and I never looked back. My love of fly fishing has taken me and my dad on countless unforgettable trips and adventures. I used to tie all of my own flies in high school, and still enjoy sitting down at my work bench for a quiet evening when I return home to channel my creative side for my next adventure." },
  { name: "Live Music", description: "I am obsessed with music, although I do not play any instruments myself. I can talk your ear off about any genre, as virtually every one has been my favorite at some point in the last 10 years. Right now, my Jazz playlists own most of my attention.\n\nNew Orleans makes this an easy one to dive into — I am at as many shows and festivals as possible whenever they come through. At any given moment, I have tickets, or at least plans, for my next 3–5 shows. My ultimate favorite band is the Grateful Dead, and it has probably been several years since I went more than a day without listening to them or learning about their famous lore." },
  { name: "My Dog: Melvin", description: "I adopted Melvin in May of 2025. He is an undisclosed Dachshund mix (I think he is 75% Dachshund, 25% Beagle). He loves long walks, being my office-chair backrest during weekend work sessions, and burrowing under the covers for naps — preferably with me or my girlfriend." },
  { name: "My Family", description: "My parents split time between Nashville and Cashiers, North Carolina, where they bought what will ultimately be their retirement oasis. My dad works in sales for Rich's Foods, and my mom runs Sixth Street Creative, a consultancy firm for both residential and commercial art using local artists in Nashville.\n\nI have two younger sisters, Walker and Caroline. Walker is two years younger than me and currently works for ADP in New York. Caroline is two years younger than Walker and works for Naomi's Village in Austin." },
  { name: "Micro hobbies", children: [{ name: "Indie video games", children: [{ name: "Hades" }, { name: "Outer Wilds" }, { name: "Balatro" }, { name: "Dredge" }] }, { name: "Collecting concert posters and other music-related art" }, { name: "Longboarding" }, { name: "Testing different AI tools" }, { name: "Creating playlists for myself and friends", description: "Currently 100+ and counting — and yes, I shockingly use most of them in a given year." }, { name: "Houseplants" }, { name: "Reading" }, { name: "Training my dachshund" }, { name: "Learning how to do new things", description: "This year was vibe code, surf, drive a boat, and longboard. I'm thinking about learning how to play a synthesizer as my next mini adventure…" }, { name: "Hot Sauces", description: "I typically have a dozen in my fridge at any given time. Right now my favorites are Marie Sharpe's Habanero, Yellowbird Serrano, and Peruana Aji Yellow. I also love making my own habanero sauce." }] },
];

const photos = [
  { pattern: "pattern-1", caption: "Alpine travel — Matterhorn region" },
  { pattern: "pattern-2", caption: "Duck hunting in the marsh" },
  { pattern: "pattern-3", caption: "LSU football — Saturday nights in Death Valley" },
  { pattern: "pattern-4", caption: "Winter outing" },
  { pattern: "pattern-5", caption: "Jazz Fest — New Orleans" },
  { pattern: "pattern-6", caption: "Fly fishing for bonefish — Belize" },
];

const skillIcons = [Calculator, TrendingUp, Landmark, Handshake, Search, ChartSpline, Presentation, Workflow, FileSpreadsheet, SquareSigma, Brain, Tv, Radar, ChartBar, Code, MonitorPlay, ListTodo];
const skills = "Financial Modeling, DCF Valuation, Project Finance, Business Development, Market Research & Intelligence, Investment Analysis, Executive Presentations, Process Improvement, Excel, Macabacus, Capital IQ, Bloomberg, Vortexa, Tableau, Python, PowerPoint, Microsoft Project".split(", ");

const stats = [
  { value: "$500MM+", label: "Capital Deployed", detail: "Across IMTT network" },
  { value: "25+", label: "Deal Closures", detail: "Supported by modeling" },
  { value: "$12MM", label: "Incremental EBITDA", detail: "Generated via pricing analysis" },
  { value: "$8B+", label: "Capex Supported", detail: "In decarbonization projects" },
  { value: "$125MM+", label: "Grant Awards", detail: "Supported federal applications" },
  { value: "$400K+", label: "Consulting Fees Saved", detail: "Through internal coordination" },
];

const navItems = [
  { id: "hero", label: "Overview", type: "prof" },
  { id: "work", label: "Experience", type: "prof" },
  { id: "ventures", label: "Side Ventures", type: "prof" },
  { id: "education", label: "Education & Skills", type: "prof" },
  { id: "interests", label: "Interests", type: "pers" },
  { id: "photos", label: "Gallery", type: "pers" },
  { id: "contact", label: "Contact", type: "pers" }
];

function InterestNode({ node, depth = 0 }: { node: Interest; depth?: number }) {
  const [open, setOpen] = useState(false); 
  const collapsible = !!node.description || !!node.children?.length;
  const nameClass = depth === 0 ? "text-lg font-medium text-stone-200" : depth === 1 ? "text-base font-medium text-stone-300" : "text-sm text-stone-400";
  const indent = depth === 1 ? "pl-4" : depth > 1 ? "pl-8" : "";
  
  if (!collapsible) {
    return (
      <div className={`border-b border-dashed border-stone-800 last:border-0 ${indent}`}>
        <p className={`py-3 ${nameClass}`}>{node.name}</p>
      </div>
    );
  }
  
  return (
    <div className={`border-b border-dashed border-stone-800 last:border-0 ${indent}`}>
      <button 
        type="button" 
        onClick={() => setOpen(!open)} 
        aria-expanded={open} 
        className="flex w-full items-center justify-between gap-3 py-3 text-left transition-colors hover:text-amber-500 group"
      >
        <h3 className={cn(nameClass, "group-hover:text-amber-500 transition-colors")}>{node.name}</h3>
        <span className="text-sm shrink-0 text-stone-500 group-hover:text-amber-500 transition-colors">
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>
      {open && (
        <div className="space-y-4 pb-4 animate-in fade-in slide-in-from-top-1 duration-200">
          {node.description?.split("\n\n").map((p, i) => (
            <p key={i} className="text-stone-400 leading-relaxed text-sm">{p}</p>
          ))}
          {node.children && (
            <div className="space-y-0 mt-2">
              {node.children.map((child) => (
                <InterestNode key={child.name} node={child} depth={depth + 1} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function Improved() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200; // Offset for header

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Init
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 40,
        behavior: "smooth"
      });
    }
  };

  const isPersonalActive = ["interests", "photos", "contact"].includes(activeSection);

  return (
    <div className={cn("min-h-screen font-sans antialiased transition-colors duration-700 ease-in-out", isPersonalActive ? "pers-theme" : "prof-theme")}>
      
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-md border-b border-opacity-10 shadow-sm flex items-center justify-between"
           style={{ backgroundColor: isPersonalActive ? 'rgba(28, 25, 23, 0.85)' : 'rgba(255, 255, 255, 0.9)', borderColor: isPersonalActive ? '#44403c' : '#e2e8f0' }}>
        <div>
          <h1 className="font-serif text-lg font-semibold tracking-tight">James McKnight</h1>
          <p className="text-xs opacity-70">Corporate Development Analyst</p>
        </div>
        <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }} 
           className={cn("text-xs font-semibold px-3 py-1.5 rounded-full transition-colors", 
             isPersonalActive ? "bg-amber-600 text-white" : "bg-slate-900 text-white")}>
          Contact
        </a>
      </div>

      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row">
        
        {/* Sidebar Navigation */}
        <aside className="hidden lg:flex w-72 flex-col justify-between fixed top-0 bottom-0 left-0 xl:left-auto px-8 py-16 overflow-y-auto border-r border-opacity-10 z-40"
               style={{ borderColor: isPersonalActive ? '#44403c' : '#e2e8f0' }}>
          <div>
            <div className="mb-12">
              <h1 className="font-serif text-3xl font-bold tracking-tight mb-2">James McKnight</h1>
              <p className={cn("text-sm font-medium", isPersonalActive ? "text-stone-400" : "text-slate-600")}>
                Corporate Development Analyst<br />at IMTT
              </p>
              <div className="flex items-center gap-2 mt-4 text-xs opacity-60">
                <MapPin size={14} /> New Orleans, LA
              </div>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={cn(
                    "block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 nav-link",
                    activeSection === item.id && "active",
                    activeSection === item.id && (isPersonalActive ? "bg-amber-500 text-stone-900" : "bg-slate-900 text-white")
                  )}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-12 space-y-4">
            <a href="mailto:jrmcknight08@gmail.com" className={cn("flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-semibold transition-all",
               isPersonalActive ? "bg-amber-600 hover:bg-amber-700 text-white" : "bg-slate-900 hover:bg-slate-800 text-white")}>
              <Mail size={16} /> Get in touch
            </a>
            <div className="flex justify-center gap-4">
              <a href="https://www.linkedin.com/in/james-r-mcknight" target="_blank" rel="noopener noreferrer" 
                 className="p-2 rounded-full hover:bg-opacity-10 hover:bg-slate-500 transition-colors opacity-70 hover:opacity-100">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 lg:ml-72 pt-20 lg:pt-0">
          
          {/* PROFESSIONAL REGISTER */}
          <div className="section-prof px-6 py-12 md:px-16 md:py-24 max-w-4xl mx-auto space-y-32">
            
            {/* Hero & Positioning */}
            <section id="hero" className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="space-y-6">
                <div className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold tracking-wider uppercase mb-4">
                  Corporate Development & Finance
                </div>
                <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight text-slate-900">
                  Turning complex commercial data into clear investment decisions.
                </h2>
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl">
                  I specialize in building rigorous financial models that drive strategy. Currently evaluating opportunities across IMTT's terminal network—spanning $50K facility upgrades to $150MM strategic initiatives.
                </p>
              </div>

              {/* Stats Grid - The Proof Points */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 pt-8 border-t border-slate-200">
                {stats.map((stat, i) => (
                  <div key={i} className="stat-card p-5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-center">
                    <p className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">{stat.value}</p>
                    <p className="text-sm font-semibold text-slate-700">{stat.label}</p>
                    <p className="text-xs text-slate-500 mt-1">{stat.detail}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Experience Section */}
            <section id="work" className="space-y-12">
              <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
                <h3 className="font-serif text-3xl font-semibold">Professional Experience</h3>
              </div>
              
              <div className="relative space-y-16">
                {jobs.map((job, index) => (
                  <div key={index} className="relative timeline-item group pl-6 md:pl-8">
                    <div className="timeline-line"></div>
                    <div className="timeline-dot group-hover:scale-125 transition-transform"></div>
                    
                    <div className="space-y-3">
                      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 md:gap-4">
                        <h4 className="text-xl font-semibold text-slate-900">{job.title}</h4>
                        <span className="text-sm font-medium text-slate-500 shrink-0 bg-slate-100 px-2 py-0.5 rounded">{job.dates}</span>
                      </div>
                      <p className="text-lg text-slate-600 font-medium">{job.company}</p>
                      
                      <ul className="mt-4 space-y-2.5 list-none">
                        {job.bullets.map((bullet, i) => (
                          <li key={i} className="relative pl-5 text-slate-600 text-sm md:text-base leading-relaxed">
                            <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Side Ventures */}
            <section id="ventures" className="space-y-12">
              <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
                <h3 className="font-serif text-3xl font-semibold">Side Ventures</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {ventures.map((venture, i) => (
                  <div key={i} className="p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors flex flex-col h-full">
                    <h4 className="text-xl font-semibold text-slate-900 mb-3">{venture.name}</h4>
                    <p className="text-sm text-slate-600 mb-6 italic">"{venture.overview}"</p>
                    <ul className="space-y-3 mt-auto">
                      {venture.bullets.map((bullet, j) => (
                        <li key={j} className="relative pl-5 text-slate-600 text-sm leading-relaxed">
                          <span className="absolute left-0 top-1.5 w-4 h-4 text-slate-300"><ArrowRight size={14} /></span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Education & Skills */}
            <section id="education" className="space-y-16">
              <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
                <h3 className="font-serif text-3xl font-semibold">Education & Skills</h3>
              </div>
              
              <div className="bg-slate-900 text-white p-8 md:p-10 rounded-3xl flex flex-col md:flex-row justify-between gap-6 shadow-xl">
                <div className="space-y-2 max-w-lg">
                  <h4 className="text-2xl font-serif font-semibold">Tulane University</h4>
                  <p className="text-slate-300 font-medium text-lg">A. B. Freeman School of Business</p>
                  <p className="text-slate-400 text-sm leading-relaxed mt-2">
                    Bachelor of Science Management<br/>
                    Double Major in Finance & Legal Studies in Business
                  </p>
                </div>
                <div className="flex flex-col md:items-end justify-center space-y-2 border-t md:border-t-0 md:border-l border-slate-700 pt-4 md:pt-0 md:pl-8">
                  <div className="text-4xl font-bold font-serif">3.7</div>
                  <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">GPA</div>
                  <div className="text-sm text-slate-500 mt-1">Class of 2022</div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">Technical & Professional Arsenal</h4>
                <div className="flex flex-wrap gap-2.5">
                  {skills.map((skill, index) => {
                    const Icon = skillIcons[index % skillIcons.length] ?? CircleDot;
                    return (
                      <div key={skill} className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors">
                        <Icon size={14} className="text-blue-600" />
                        {skill}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>

          {/* 
            ========================================================================
            PERSONAL REGISTER
            Visually distinct dark theme to separate the human from the professional
            ========================================================================
          */}
          <div className="section-pers px-6 py-24 md:px-16 min-h-screen">
            <div className="max-w-4xl mx-auto space-y-32">
              
              <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
                <div className="inline-block px-3 py-1 rounded-full bg-stone-800 text-amber-500 text-xs font-semibold tracking-wider uppercase">
                  Beyond the Models
                </div>
                <h2 className="font-serif text-4xl md:text-5xl font-semibold text-stone-100">
                  The Personal Register
                </h2>
                <p className="text-stone-400 text-lg">
                  Finance is what I do, but it's not all of who I am. From the Wind River Range to the jazz clubs of New Orleans.
                </p>
              </div>

              {/* Interests */}
              <section id="interests" className="space-y-8 bg-stone-900 rounded-3xl p-8 md:p-12 border border-stone-800">
                <div className="flex items-center gap-4 mb-8">
                  <h3 className="font-serif text-3xl font-semibold text-stone-100">Interests & Pursuits</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                  <div className="space-y-2">
                    {interests.slice(0, Math.ceil(interests.length / 2)).map((interest) => (
                      <InterestNode key={interest.name} node={interest} />
                    ))}
                  </div>
                  <div className="space-y-2">
                    {interests.slice(Math.ceil(interests.length / 2)).map((interest) => (
                      <InterestNode key={interest.name} node={interest} />
                    ))}
                  </div>
                </div>
              </section>

              {/* Photos Gallery */}
              <section id="photos" className="space-y-12">
                <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                  <h3 className="font-serif text-3xl font-semibold text-stone-100">In Focus</h3>
                  <span className="text-sm text-stone-500">Visuals missing in production — placeholder art enabled</span>
                </div>
                
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                  {photos.map((photo, i) => (
                    <figure key={i} className="group relative break-inside-avoid overflow-hidden rounded-2xl bg-stone-900 border border-stone-800">
                      {/* Geometric Placeholder replacing the broken img */}
                      <div className={cn("w-full aspect-[4/5] md:aspect-[3/4] photo-placeholder", photo.pattern)}></div>
                      
                      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-5 pt-12 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <span className="text-sm font-medium text-stone-200 leading-tight block drop-shadow-md">
                          {photo.caption}
                        </span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </section>

              {/* Contact */}
              <section id="contact" className="py-12 border-t border-stone-800">
                <div className="bg-stone-900 rounded-[2.5rem] p-8 md:p-16 border border-stone-800 flex flex-col md:flex-row items-center gap-12 md:gap-20 relative overflow-hidden">
                  
                  {/* Decorative background element */}
                  <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl"></div>
                  
                  {/* Headshot Placeholder */}
                  <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shrink-0 border-4 border-stone-800 monogram-bg flex items-center justify-center relative shadow-2xl">
                    <span className="font-serif text-6xl md:text-7xl font-bold text-white opacity-90 drop-shadow-lg tracking-tighter">
                      JM
                    </span>
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-50 mix-blend-overlay"></div>
                  </div>

                  <div className="space-y-8 text-center md:text-left relative z-10">
                    <div className="space-y-2">
                      <h2 className="font-serif text-4xl md:text-5xl font-semibold text-white">Let's Connect</h2>
                      <p className="text-lg text-stone-400">Always open to discussing new opportunities, market trends, or fly fishing spots.</p>
                    </div>

                    <div className="space-y-4 pt-4">
                      <a href="mailto:jrmcknight08@gmail.com" 
                         className="flex items-center justify-center md:justify-start gap-4 group">
                        <div className="w-12 h-12 rounded-full bg-stone-800 flex items-center justify-center group-hover:bg-amber-600 transition-colors">
                          <Mail size={20} className="text-stone-300 group-hover:text-white transition-colors" />
                        </div>
                        <span className="text-lg font-medium text-stone-300 group-hover:text-amber-500 transition-colors">
                          jrmcknight08@gmail.com
                        </span>
                      </a>
                      
                      <a href="https://www.linkedin.com/in/james-r-mcknight" target="_blank" rel="noopener noreferrer"
                         className="flex items-center justify-center md:justify-start gap-4 group">
                        <div className="w-12 h-12 rounded-full bg-stone-800 flex items-center justify-center group-hover:bg-[#0A66C2] transition-colors">
                          <Linkedin size={20} className="text-stone-300 group-hover:text-white transition-colors" />
                        </div>
                        <span className="text-lg font-medium text-stone-300 group-hover:text-blue-400 transition-colors">
                          linkedin.com/in/james-r-mcknight
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </section>

              <footer className="text-center pb-8 text-stone-500 text-sm">
                <p>© {new Date().getFullYear()} James McKnight. All rights reserved.</p>
              </footer>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
