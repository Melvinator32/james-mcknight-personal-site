import flyFishingBoatPhoto from "@/assets/photo-flyfishing-boat.jpeg";
import golfYoungPhoto from "@/assets/photo-golf-young.jpeg";
import musicWinterWonderGrassPhoto from "@/assets/photo-music-winterwondergrass.jpeg";
import travelMadeiraPhoto from "@/assets/photo-travel-madeira.jpeg";
import travelAlpineHikePhoto from "@/assets/photo-travel-alpine-hike.jpeg";
import musicConcertGroupPhoto from "@/assets/photo-music-concert-group.jpeg";
import sportsLsuFootballPhoto from "@/assets/photo-sports-lsu-football.jpeg";
import sportsBasketballPhoto from "@/assets/photo-sports-basketball.jpeg";
import travelVenicePhoto from "@/assets/photo-travel-venice.jpeg";
import sportsSkiingPhoto from "@/assets/photo-sports-skiing.jpeg";
import wfhSetupPhoto from "@/assets/photo-wfh-setup.png";
import houseplantPropagationBottlePhoto from "@/assets/photo-houseplant-propagation-bottle.jpeg";
import houseplantBonsaiPhoto from "@/assets/photo-houseplant-bonsai.jpeg";
import houseplantPonytailPalmPhoto from "@/assets/photo-houseplant-ponytail-palm.jpeg";
import houseplantPropagationStationPhoto from "@/assets/photo-houseplant-propagation-station.jpeg";
import projectPodShop from "@/assets/project-pod-shop.png";
import yellowbirdSauce from "@/assets/yellowbird-serrano.webp";
import marieSharpsSauce from "@/assets/marie-sharps-habanero.webp";
import peruanaSauce from "@/assets/peruana-aji-amarillo.webp";
/**
 * Portfolio Data
 * Single source of truth for all portfolio content
 */

import type {
  PersonalInfo,
  Experience,
  Writing,
  Speaking,
  Project,
  Education,
  SocialLink,
  Interest,
  SideVenture,
  Photo,
  Stat,
} from "@/types/portfolio";

import headshotPhoto from "@/assets/headshot-photo.png";
import projectWeirwoodPreview from "@/assets/project-weirwood-preview.jpg";
import projectRewardsPreview from "@/assets/project-cardwise-perks-preview.jpg";
import projectBlackjackPreview from "@/assets/project-blackjack-preview.jpg";
import projectZenPreview from "@/assets/project-zen-preview.jpg";
import projectRadioPreview from "@/assets/project-radio-dashboard.jpg";
import projectBayouBillPreview from "@/assets/project-bayou-bill-tracker-preview.jpg";
import projectDailyWisdomPreview from "@/assets/project-daily-wisdom-preview.jpg";
import travelMountain from "@/assets/photo-travel-mountain.jpeg";
import jazzFestPhoto from "@/assets/photo-jazzfest.jpeg";
import flyFishingPhoto from "@/assets/photo-flyfishing.jpeg";
import familyPhoto from "@/assets/photo-family.jpeg";
import melvinBlanketPhoto from "@/assets/photo-melvin-blanket.jpeg";
import melvinRunningPhoto from "@/assets/photo-melvin-running.jpeg";
import melvinBedPhoto from "@/assets/photo-melvin-bed.jpeg";
import golfPhoto from "@/assets/photo-golf.jpeg";
import alpineCowPhoto from "@/assets/photo-alpine-cow.jpeg";
import winterBridgePhoto from "@/assets/photo-winter-bridge.jpeg";
import duckHuntingPhoto from "@/assets/photo-duck-hunting.jpeg";
import groupPhoto from "@/assets/photo-group.jpeg";
import homeOfficePhoto from "@/assets/photo-home-office.jpeg";
import jazzArtPhoto from "@/assets/photo-jazz-art.jpeg";

import backpackingRidgePhoto from "@/assets/photo-backpacking-ridge.jpeg";
import backpackingFriendsPhoto from "@/assets/photo-backpacking-friends.jpeg";
import billyStringsPosterPhoto from "@/assets/photo-poster-billy-strings.jpeg";
import melvinPillowPhoto from "@/assets/photo-melvin-pillow.jpeg";
import jazzFestPosterPhoto from "@/assets/photo-poster-jazz-fest.jpeg";
import moePosterPhoto from "@/assets/photo-poster-moe-stringdusters.jpeg";
import deadCompanyPosterPhoto from "@/assets/photo-poster-dead-and-company.jpeg";

// ===== Portfolio Data =====

export const personalInfo: PersonalInfo = {
  name: "James McKnight",
  title: "Corporate Development Analyst at IMTT",
  location: { city: "New Orleans, LA", country: "USA" },
  website: "www.linkedin.com/in/james-r-mcknight",
  email: "jrmcknight08@gmail.com",
  avatar: headshotPhoto,
  bio: "I'm a corporate development analyst at IMTT, a bulk liquid storage terminal operator, where my work has transformed from underwriting capital projects and acquisitions to building the tools our team uses to do it faster.\n\nAfter work, I dive into my personal projects and side hustles. Almost everything I've built started as curiosity or a solution to a personal problem. About half the time, I look up and realize I've made something that might interest or help other people too. My goal with this site is to publish demos of that work, collect honest feedback, and figure out which of it is worth taking further!",
  skills: "Financial Modeling, DCF Valuation, Project Finance, Investment Analysis, Acquisition Underwriting, M&A Analysis, Scenario & Sensitivity Analysis, Commercial Due Diligence, Business Development, Market Research & Intelligence, Competitive Analysis, Capital IQ, Bloomberg, Vortexa, Process Improvement, Data Visualization, Workflow Automation, Dashboard Development, AI-Assisted Development, Tableau, Python, Excel, Macabacus, Executive Presentations, PowerPoint, Microsoft Project, Photoshop, Brand Creation, Mockup / Rendering Creation",
  positioningTag: "Corporate Development & Finance",
  heroHeadline: "Following curiosity. Building useful tools. Seeing where they lead.",
  heroSummary: "I specialize in building rigorous financial models that drive strategy. Currently evaluating opportunities across IMTT's terminal network — spanning $50K facility upgrades to $150MM strategic initiatives.",
};

export const stats: Stat[] = [
  { value: "$500MM+", label: "Capital Deployed", detail: "Across IMTT network" },
  { value: "25+", label: "Deal Closures", detail: "Supported by modeling" },
  { value: "$12MM", label: "Incremental EBITDA", detail: "Generated via pricing analysis" },
  { value: "$8B+", label: "Capex Supported", detail: "In decarbonization projects" },
  { value: "$125MM+", label: "Grant Awards", detail: "Supported federal applications" },
  { value: "$400K+", label: "Consulting Fees Saved", detail: "Through internal coordination" },
];

export const experience: Experience[] = [
  {
    id: "exp-1",
    company: "International Matex Tank Terminals (IMTT)",
    role: "Corporate Development Analyst",
    location: "New Orleans, LA",
    startDate: "2024-04",
    endDate: null,
    description:
      "Own the commercial DCF and corporate development models that guide IMTT's investment decisions across its terminal network.",
    highlights: [
      "Own and build 100% of commercial DCF models and ~50% of corporate development models used to evaluate investment and commercial decisions — 40+ models spanning $50K facility upgrades to $150MM strategic initiatives, supporting 25+ deal closures and $500MM+ of capital deployment.",
      "Own a complex dock utilization model used in quarterly executive updates to guide project development and site capacity decisions.",
      "Identified a prospective customer's limited alternatives through commercial and market analysis, driving a pricing recommendation 75% above the original proposal that generated ~$12MM of incremental EBITDA.",
      "Led CRM platform selection, implementation, workflow design, and automation buildout, and serve as lead administrator for 20 daily users.",
    ],
    current: true,
  },
  {
    id: "exp-3",
    company: "Fidelis New Energy, LLC (acquired by Nscale in 2026)",
    role: "Senior Analyst, Analyst, Summer Intern",
    location: "Houston, TX",
    startDate: "2022-08",
    endDate: "2024-04",
    description:
      "Built project finance models and led grant strategy for decarbonization projects representing $8B+ of combined capex.",
    highlights: [
      "Developed project finance models for decarbonization opportunities supporting development decisions across projects representing $8B+ of combined capex.",
      "Led coordination of a $9MM grant application for CO2 transportation and storage, saving $400K+ in external consulting fees while managing procurement of 30+ documents totaling 120+ pages.",
      "Evaluated hundreds of grant opportunities across clean hydrogen/ammonia, CCS, SAF, and renewable diesel, supporting applications for over $125MM in federal grant awards.",
      "Helped develop the proprietary community benefits program used across Fidelis' projects and regularly drafted letters of support and intent for legislators, partners, and stakeholders.",
    ],
    current: false,
  },
  {
    id: "exp-4",
    company: "Darwin Fenner Fund",
    role: "Investment Analyst",
    location: "New Orleans, LA",
    startDate: "2022-01",
    endDate: "2022-05",
    description:
      "Selected for the Large Cap Student Managed Fund ($1.5M AUM), covering the Consumer Discretionary sector.",
    highlights: [
      "Selected for the Large Cap Student Managed Fund ($1.5M AUM).",
      "Conducted extensive research into the Consumer Discretionary sector and built a comprehensive model using fundamental screens and relative valuations that culminated in buy and sell recommendations for the portfolio.",
    ],
    current: false,
  },
  {
    id: "exp-5",
    company: "Burkenroad Reports",
    role: "Equity Research Analyst",
    location: "New Orleans, LA",
    startDate: "2021-01",
    endDate: "2021-05",
    description:
      "Produced a 40-page sell-side investment report on Investar Bank distributed to ~20,000 institutional and retail investors.",
    highlights: [
      "Conducted C-suite interviews with Investar Bank leadership.",
      "Built cash flow and earnings projection models.",
      "Developed a comparable valuation methodology for Investar Bank.",
      "Produced a 40-page sell-side investment report distributed to ~20,000 institutional and retail investors.",
    ],
    current: false,
  },
  {
    id: "exp-6",
    company: "Moondance Adventures",
    role: "Trip Leader",
    location: "Slovenia & Croatia",
    startDate: "2022-06",
    endDate: "2022-08",
    description:
      "Led 39 students on backpacking trips through Slovenia and Croatia.",
    highlights: [
      "Responsible for logistics, safety, and group leadership in the field.",
    ],
    current: false,
  },
];

export const writing: Writing[] = [];

export const speaking: Speaking[] = [];

export const sideVentures: SideVenture[] = [
  {
    name: "Print-on-Demand E-commerce — Bayou Bill",
    description:
      "Ahhh… my weird-brainchild-turned-independent-lifestyle-brand that started as a result of some late-night experimentation! What was initially a fun creative outlet evolved into a means of sending my friends unique personalized gifts inspired by shared interests. After a while, I eventually decided to launch a successful online store that generates ~$500 of passive revenue a month.\n\nBayou Bill is a 50+ product Etsy and personal website catalog run on roughly two hours of upkeep per month through automation, with a 200% YOY conversion lift from pricing, copy, and keyword strategy.\n\nRunning Bayou Bill has helped me develop hands-on skills in entrepreneurship, e-commerce, branding, and digital marketing. I've learned how to take products from concept to launch, analyze customer demand, refine listings and pricing, and build a consistent brand identity. Along the way, I've also developed practical Photoshop skills in graphic design, image editing, mockup creation, and preparing artwork for digital and physical products.\n\nMy content is largely inspired by the quirky culture of New Orleans and Mardi Gras, my love of live music, and the outdoors. I create original designs that can be printed or embroidered on virtually anything, but my main choice of merch are stickers, shirts, hats, and drinking glasses. I am constantly helping friends and family out with commissioned ideas as well!",
  },
  {
    name: "CardWise — Credit Card Optimization",
    description:
      "I manage a small credit card optimization side hustle focused on helping others get more value from their existing spending. This includes evaluating which cards best fit their spending habits, identifying worthwhile welcome offers and benefits, and helping organize rewards, credits, and annual fees so they are easier to manage.\n\nMy credit card management side hustle has taught me how to strategically evaluate rewards programs, welcome bonuses, annual fees, statement credits, and redemption options to maximize the value of everyday spending. I've developed systems to track multiple cards, benefits, deadlines, and points balances while maintaining disciplined payment habits and avoiding unnecessary fees or interest. It has also strengthened my skills in financial analysis, organization, optimization, and attention to detail by requiring me to constantly weigh costs, benefits, and opportunity tradeoffs.",
  },
];

export const projects: Project[] = [
  {
    id: "demo-radio",
    icon: "Radio",
    name: "Tuned In",
    description:
      "A personal productivity workspace for organizing tasks, planning the day, tracking goals, and staying focused. Explore its board and matrix views in a browser-based demo with sample tasks — refresh to reset your changes.",
    techStack: ["App Design", "State Management", "Productivity UX"],
    demoUrl: "/demos/radio-station.html",
    walkthroughUrl: "/demos/radio-station-walkthrough.html",
    thumbnail: projectRadioPreview,
    status: "active",
  },
  {
    id: "demo-weirwood",
    icon: "Ship",
    name: "Weirwood",
    description:
      "An interactive vessel and cargo movement dashboard built on Vortexa data across the IMTT terminal network, with region, product, and terminal filters, pivot views, and PDF/PPT/XLS export of any view.",
    techStack: ["Data Visualization", "Market Intelligence", "Dashboards"],
    demoUrl: "/demos/weirwood.html",
    walkthroughUrl: "/demos/Weirwood_Walkthrough.pdf",
    thumbnail: projectWeirwoodPreview,
    status: "active",
  },
  {
    id: "proj-2",
    icon: "Users",
    name: "Connections",
    description:
      "A personal relationship manager built to make staying in touch more intentional. Connections organizes the people in your life, tracks the last time you connected, and turns custom relationship cadences into a focused list of timely follow-ups. Explore the interactive demo using invented sample data.",
    techStack: ["Python / Flask", "SQLite", "Relationship Management"],
    demoUrl: "/demos/connections.html",
    status: "active",
  },
  {
    id: "demo-daily-wisdom",
    icon: "BookOpen",
    name: "Daily Wisdom",
    description:
      "A personal learning app that turns book highlights, practical tips, and finance and energy notes into short daily lessons. It covers unseen material before repeating, with configurable topics and email previews. Try the interactive demo with sample content — no emails are sent.",
    techStack: ["Python / Flask", "SQLite", "Learning Tools"],
    demoUrl: "/demos/daily-wisdom-demo.html",
    thumbnail: projectDailyWisdomPreview,
    status: "active",
  },
  {
    id: "proj-4",
    icon: "ShoppingBag",
    name: "POD Shop",
    liveUrl: "https://bayou-bill.printify.me/",
    thumbnail: projectPodShop,
    description:
      "A 50+ product Etsy catalog run on roughly two hours of upkeep per month through automation, with a 150% conversion lift from pricing, copy, and keyword strategy.",
    techStack: ["Etsy", "Print-on-Demand", "SEO", "Automation"],
    status: "active",
  },
  {
    id: "demo-bayou-bill-tracker",
    icon: "ChartNoAxesCombined",
    name: "Bayou Bill Shop Data Tracker",
    description:
      "A shop analytics dashboard for Bayou Bill, bringing revenue, profit, advertising performance, top products, traffic sources, and order fulfillment into one view. Explore interactive charts with illustrative sample data — no live Etsy or Printify connection.",
    techStack: ["JavaScript", "SVG Charts", "E-commerce Analytics"],
    demoUrl: "/demos/bayou-bill-shop-tracker.html",
    thumbnail: projectBayouBillPreview,
    status: "active",
  },
  {
    id: "demo-rewards",
    icon: "CreditCard",
    name: "Cardwise",
    description:
      "A personal spend and rewards ledger that ingests statement exports, categorizes transactions, and tracks points earn rates and card-level value across time.",
    techStack: ["Spend Analytics", "XLSX Parsing", "Dashboards"],
    demoUrl: "/demos/rewards-ledger.html",
    thumbnail: projectRewardsPreview,
    status: "active",
  },
  {
    id: "demo-zen",
    icon: "Flower2",
    name: "Zen Garden Meditation",
    description:
      "A canvas-based zen garden sandbox — rake patterns into sand, place stones and plants, and pan or zoom around the composition.",
    techStack: ["Canvas", "Generative Art", "Touch UX"],
    demoUrl: "/demos/zen-garden.html",
    thumbnail: projectZenPreview,
    status: "active",
  },
  {
    id: "demo-blackjack",
    icon: "Spade",
    name: "Black Jack Trainer",
    description:
      "A basic-strategy and counting trainer that deals real shoes, grades every decision against optimal play, and tracks accuracy over sessions.",
    techStack: ["Game Logic", "Probability", "PWA"],
    demoUrl: "/demos/blackjack-trainer.html",
    thumbnail: projectBlackjackPreview,
    status: "active",
  },
];

export const photos: Photo[] = [
  {
    src: travelMountain,
    alt: "Two people in an alpine field with a snow-dusted pyramidal mountain peak in the background",
    caption: "Alpine travel — Matterhorn region",
  },
  {
    src: duckHuntingPhoto,
    alt: "Two men in a duck blind boat among tall marsh reeds, one holding a shotgun",
    caption: "Duck hunting in the marsh",
  },
  {
    src: winterBridgePhoto,
    alt: "A couple sitting on a bridge railing over a creek with snow-dusted evergreen forest behind",
    caption: "Winter outing",
  },
  {
    src: golfPhoto,
    alt: "A golfer carrying his bag along a winding fairway through dune grass",
    caption: "Golf, links-style",
  },
  {
    src: alpineCowPhoto,
    alt: "James walking alongside a cow in an alpine meadow with a mountain hut in the background",
    caption: "An unexpected trail companion in the Alps",
  },
  {
    src: groupPhoto,
    alt: "A group of nine friends and family dressed up for a holiday gathering in front of a house",
    caption: "Holiday gathering",
  },
  {
    src: jazzFestPhoto,
    alt: "A couple in the crowd at the New Orleans Jazz Fest festival stage",
    caption: "Jazz Fest — New Orleans",
  },
  {
    src: flyFishingPhoto,
    alt: "A man holding a cutthroat trout beside an alpine lake with a snow-streaked mountain behind",
    caption: "High-country fly fishing",
  },
  {
    src: familyPhoto,
    alt: "James with his parents and two sisters, dressed up for an evening event",
    caption: "My family",
  },
  {
    src: melvinBlanketPhoto,
    alt: "A dachshund mix burrowed into a gray blanket, peeking out",
    caption: "Melvin, mid-burrow",
  },
  {
    src: melvinRunningPhoto,
    alt: "A dachshund mix running through tall grass",
    caption: "Melvin on a walk",
  },
  {
    src: melvinBedPhoto,
    alt: "A dachshund mix sitting alert in his dog bed at home",
    caption: "Melvin, on duty",
  },
  {
    src: homeOfficePhoto,
    alt: "A home office corner with a standing desk, three monitors, house plants, and a framed concert poster on the wall",
    caption: "Home office, with the collection on the wall",
  },
  {
    src: jazzArtPhoto,
    alt: "An ink illustration of a trumpet player painted over sheet music, signed Pazos 2026",
    caption: "Jazz artwork by Pazos, part of the collection",
  },
];

export const interests: Interest[] = [
  {
    name: "Travel",
    photos: [
      ...photos.filter((photo) => [winterBridgePhoto].includes(photo.src)),
      { src: travelMadeiraPhoto, alt: "A couple overlooking the Atlantic coast in Madeira", caption: "Madeira" },
      { src: travelAlpineHikePhoto, alt: "A hiking selfie above an alpine valley", caption: "Alpine hiking" },
      { src: travelVenicePhoto, alt: "Friends on the water in Venice at sunset", caption: "Venice at sunset" },
    ],
    description:
      "I love planning trips around new places, good food, and the perfect mix of adventure and relaxation. Recent highlights include Costa Rica, Belize, and Mexico City.",
  },
  {
    name: "Golf",
    photos: [
      ...photos.filter((photo) => [golfPhoto].includes(photo.src)),
      { src: golfYoungPhoto, alt: "A young golfer carrying a golf bag", caption: "An early round" },
    ],
    description:
      "I have played since I was 5 when my grandfather first snuck me onto the local range against the rules after getting tired of chasing my erratic shots around the yard. I eventually played for my high school team. Now I enjoy weekend rounds, post-work (and the occasional pre-work) range sessions, and a perpetual mission to get back to my high school form and break par for the first time!",
  },
  {
    name: "Backpacking",
    photos: [
      ...photos.filter((photo) => [travelMountain, alpineCowPhoto].includes(photo.src)),
      { src: backpackingRidgePhoto, alt: "Two hikers posing on a rocky ridge beneath a tall mountain and blue sky", caption: "A moment on the trail" },
      { src: backpackingFriendsPhoto, alt: "Two friends with hiking gear in an alpine meadow with snowy mountains behind them", caption: "Backpacking with friends" },
    ],
    description:
      "Multi-day trips in the mountains are a special escape for me, a habit picked up as a student doing overnight trips in Rocky Mountain National Park in Colorado, the Wind River Range in Wyoming, and Pisgah National Forest in North Carolina in high school.\n\nIn college I had the privilege of backpacking through the French Alps around Chamonix and Zermatt. Post-grad, I led trips with Moondance backpacking through the Slovenian Alps. I have also done multiple trips in the Uintas in Utah and recently bagged my first 14'er in Colorado (Mt. Democrat). Up next on my backpacking bucket list are Alaska, Maine (Appalachian Trail), Zion/Canyonlands, Patagonia, and Glacier National Park.",
  },
  {
    name: "Sports",
    photos: [
      { src: sportsLsuFootballPhoto, alt: "At an LSU football game in Tiger Stadium", caption: "Saturday night in Tiger Stadium" },
      { src: sportsBasketballPhoto, alt: "Courtside at a basketball game", caption: "Courtside" },
    ],
    description:
      "Football teams: Tennessee Titans, New Orleans Saints, Tulane, Vanderbilt. (Don't hold it against me for having two college teams and two NFL teams. The only way the Titans and Saints become a problem is if they meet in the Super Bowl — and I think we all know the odds of that. Same goes for Tulane and Vanderbilt meeting in the CFP…)\n\nBasketball: New Orleans Pelicans, Vanderbilt, Tulane\n\nHockey: Nashville Predators\n\nI also enjoy keeping up with F1 and most PGA Tour events. One of my annual highlights is getting to go to the Zurich Classic in New Orleans and watch players play what was my “home” course for several years.",
  },
  {
    name: "Fly Fishing",
    photos: [...photos.filter((photo) => [flyFishingPhoto].includes(photo.src)), { src: flyFishingBoatPhoto, alt: "Holding a fish aboard a boat with a fishing guide on open water", caption: "Fly fishing on open water" }],
    description:
      "There is something healing about nothing but the sound of cold trickling streams early in the morning with a gentle fog slowly lifting off at the crack of dawn. I fell in love with fishing at 5 or 6 when my grandfather started taking me to a bamboo-poles-only trout farm.\n\nFast forward 5 years, my dad finally let me start messing around with his fly rod on a trip in North Carolina. I waded in the river until I was about knee deep and caught my first fish with him — a mighty 3\" rainbow trout, and I never looked back. My love of fly fishing has taken me and my dad on countless unforgettable trips and adventures. I used to tie all of my own flies in high school, and still enjoy sitting down at my work bench for a quiet evening when I return home to channel my creative side for my next adventure.",
  },
  {
    name: "Live Music",
    photos: [
      ...photos.filter((photo) => [jazzFestPhoto].includes(photo.src)),
      { src: musicWinterWonderGrassPhoto, alt: "WinterWonderGrass festival stage in the mountains", caption: "WinterWonderGrass" },
      { src: musicConcertGroupPhoto, alt: "A group of family and friends outside a concert venue", caption: "A night of live music" },
    ],
    description:
      "I am obsessed with music, although I do not play any instruments myself. I can talk your ear off about any genre, as virtually every one has been my favorite at some point in the last 10 years. Right now, my Jazz playlists own most of my attention.\n\nNew Orleans makes this an easy one to dive into — I am at as many shows and festivals as possible whenever they come through. At any given moment, I have tickets, or at least plans, for my next 3–5 shows. My ultimate favorite band is the Grateful Dead, and it has probably been several years since I went more than a day without listening to them or learning about their famous lore. If you look closely at my vibe coding portfolio page, you will see lots of easter egg references to the Dead…",
  },
  {
    name: "My Dog: Melvin",
    photos: [
      ...photos.filter((photo) => [melvinBlanketPhoto, melvinRunningPhoto, melvinBedPhoto].includes(photo.src)),
      { src: melvinPillowPhoto, alt: "Melvin curled up on a bed with his head resting on a pillow", caption: "Melvin, making himself comfortable" },
    ],
    description:
      "I adopted Melvin in May of 2025. He is an undisclosed Dachshund mix (I think he is 75% Dachshund, 25% Beagle). He loves long walks, being my office-chair backrest during weekend work sessions, and burrowing under the covers for naps — preferably with me or my girlfriend.",
  },
  {
    name: "My Family",
    photos: photos.filter((photo) => [familyPhoto, groupPhoto].includes(photo.src)),
    description:
      "My parents split time between Nashville and Cashiers, North Carolina, where they bought what will ultimately be their retirement oasis. My dad works in sales for Rich's Foods, and my mom runs Sixth Street Creative, a consultancy firm for both residential and commercial art using local artists in Nashville.\n\nI have two younger sisters, Walker and Caroline. Walker is two years younger than me and currently works for ADP in New York. Caroline is two years younger than Walker and works for Naomi's Village in Austin.",
  },
  {
    name: "Micro hobbies",
    children: [
      {
        name: "Reading",
        description: "Here are some of my favorites over the last 2 years:",
        children: [
          { name: "The Ice Man – Phillip Carlo" },
          { name: "Never Eat Alone – Keith Ferrazi" },
          { name: "The Fish that Ate the Whale – Rich Cohen" },
          { name: "Empire of the Summer Moon" },
          { name: "The Count of Monte Cristo" },
          { name: "A Knight of Seven Kingdoms – George R.R Martin" },
          { name: "Ready Player One – Ernest Cline" },
          { name: "How the World Really Works – Vaclav Smil" },
          { name: "Stories of Your Life and Others – Ted Chiang" },
          { name: "Man’s Search for Meaning – Viktor E. Frankl" },
        ],
      },
      {
        name: "Collecting concert posters and other music-related art",
        photos: [
          {
            src: jazzArtPhoto,
            alt: "An ink illustration of a trumpet player painted over sheet music, signed Pazos 2026",
            caption: "A recent pickup — jazz trumpeter by Pazos",
          },
          { src: billyStringsPosterPhoto, alt: "Billy Strings concert poster with an alligator playing a brass instrument and other swamp animals", caption: "Billy Strings — New Orleans" },
          { src: jazzFestPosterPhoto, alt: "Framed 2022 New Orleans Jazz and Heritage Festival poster depicting a pianist and a brass band", caption: "New Orleans Jazz & Heritage Festival, 2022" },
          { src: moePosterPhoto, alt: "Framed moe. and The Infamous Stringdusters concert poster with a toad beneath a purple sky", caption: "moe. & The Infamous Stringdusters — The Joy Theater" },
          { src: deadCompanyPosterPhoto, alt: "Framed Dead and Company Dead Forever poster showing a lizard at a slot machine", caption: "Dead & Company — Dead Forever" },
        ],
      },
      {
        name: "Creating playlists for myself and friends",
        description:
          "Currently 100+ and counting — and yes, I shockingly use most of them in a given year.",
      },
      { name: "Discovering new music" },
      { name: "Duck Hunting", photos: photos.filter((photo) => photo.src === duckHuntingPhoto) },
      { name: "Longboarding" },
      {
        name: "Skiing / Snowboarding",
        photos: [{ src: sportsSkiingPhoto, alt: "Skiing high in a snow-covered mountain range", caption: "A day on the slopes" }],
      },
      { name: "Testing different AI tools" },
      {
        name: "Collecting Houseplants / Propagating",
        photos: [
          { src: houseplantPropagationBottlePhoto, alt: "A pothos cutting propagating in a green glass bottle", caption: "A pothos propagation" },
          { src: houseplantBonsaiPhoto, alt: "A bonsai-style succulent beside grasses and a small cactus", caption: "A windowsill plant collection" },
          { src: houseplantPonytailPalmPhoto, alt: "A ponytail palm in a blue ceramic pot", caption: "Ponytail palm" },
          { src: houseplantPropagationStationPhoto, alt: "Pothos and philodendron cuttings growing in glass propagation vessels", caption: "The propagation station" },
        ],
      },
      {
        name: "Perfecting my WFH setup",
        photos: [{ src: wfhSetupPhoto, alt: "A home office with multiple monitors, plants, and framed artwork", caption: "My work-from-home setup" }],
      },
      { name: "Training my dachshund (or trying at least)" },
      {
        name: "Learning new skills",
        description:
          "This year was vibe code, surf, drive a boat, and longboard. I'm thinking about learning how to play a synthesizer as my next mini adventure…",
      },
      {
        name: "Hot Sauces",
        photos: [
          { src: yellowbirdSauce, alt: "Yellowbird Serrano hot sauce bottle", caption: "Yellowbird Serrano" },
          { src: marieSharpsSauce, alt: "Marie Sharp’s Fiery Hot Habanero pepper sauce bottle", caption: "Marie Sharp’s Fiery Hot Habanero" },
          { src: peruanaSauce, alt: "Peruana Ají Amarillo sauce bottle", caption: "Peruana Ají Amarillo" },
        ],
        description:
          "I typically have a dozen in my fridge at any given time. Right now my favorites are Marie Sharpe's Habanero, Yellowbird Serrano, and Peruana Aji Yellow. I also love making my own habanero sauce.",
      },
      {
        name: "Indie video games",
        children: [
          { name: "Factorio" },
          { name: "Hades" },
          { name: "Outer Wilds" },
          { name: "Balatro" },
          { name: "Dredge" },
        ],
      },
      { name: "Low-stakes poker nights with friends" },
      { name: "Trivia nights" },
      { name: "Working through my extensive restaurant list as a major foodie", description: "Personal top three in NOLA: Social Peruvian, Zasu, Herbsaint." },
    ],
  },
];

export const education: Education[] = [

  {
    id: "edu-1",
    institution: "Tulane University, A. B. Freeman School of Business",
    degree: "Bachelor of Science",
    field: "Management — Double Major in Finance and Legal Studies in Business",
    startYear: "2018",
    endYear: "2022",
    location: "New Orleans, LA",
  },
];

export const socialLinks: SocialLink[] = [
  {
    platform: "LinkedIn",
    username: "james-r-mcknight",
    url: "https://www.linkedin.com/in/james-r-mcknight",
  },
  {
    platform: "Email",
    username: "jrmcknight08@gmail.com",
    url: "mailto:jrmcknight08@gmail.com",
  },
];
