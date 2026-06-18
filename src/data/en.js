export const en = {
  locale: "en",
  alternateLocale: "fr",
  languageLabel: "FR",
  site: {
    name: "JDX",
    description: "Immersive portfolio with a fragmented 3D sculpture.",
    homeHref: "/en",
    sections: {
      hero: {
        sectionLabel: "Joey Decroix",
        intro: "Hi, I'm",
        eyebrow: "Joey",
        title: "Decroix",
      },
      about: {
        sectionLabel: "Profile",
        title: "Where logic meets",
        accent: "creativity",
        body: "Curious and motivated, I'm working toward becoming a full-stack developer. Growing up in Mauritius shaped my eye for design, while my background in marine biology brings logic, reasoning, and organization to my work.",
      },
      skills: {
        sectionLabel: "Skills",
        kicker: "Technical skills",
        title: "Frameworks and libraries I regularly work with",
        controlsLabel: "Skill carousel controls",
        previousLabel: "Previous skill",
        nextLabel: "Next skill",
      },
      projects: {
        sectionLabel: "Projects",
        kicker: "Projects",
      },
    },
    footer: {
      logoAlt: "JDX",
      title: "How about we work together ?",
      contactLabel: "Contact me",
      contactHref: "mailto:joeydecroix.pro@gmail.com",
      legalNoticeLabel: "Legal notice",
      privacyPolicyLabel: "Privacy policy",
      legalNoticeHref: "/en/legal-notice",
      privacyPolicyHref: "/en/privacy-policy",
      copyright: "© 2026 Joey Decroix",
    },
    projectDetail: {
      backHomeLabel: "Back to home",
      backLabel: "Back",
      summaryLabel: "Project summary",
    },
    legal: {
      legalNotice: {
        title: "Legal notice",
        intro:
          "This page provides the legal information related to Joey Decroix’s website.",
        sections: [
          {
            title: "Website publisher",
            paragraphs: [
              "Joey Decroix",
              "Contact: joeydecroix.pro@gmail.com",
              "Address: 83 rue de Macruz, St-Pierre en Faucigny",
            ],
          },
          {
            title: "Hosting",
            paragraphs: [
              "Hosting provider: LWS",
            ],
          },
          {
            title: "Intellectual property",
            paragraphs: [
              "All content available on this website, including texts, visuals, animations, videos, graphic elements, and showcased work, is protected by copyright unless stated otherwise.",
              "Any reproduction, representation, adaptation, or use, in whole or in part, without prior authorization is prohibited.",
            ],
          },
          {
            title: "Contact",
            paragraphs: [
              "For any request, you can use the contact link available on the website or write to: joeydecroix.pro@gmail.com.",
            ],
          },
        ],
      },
      privacyPolicy: {
        title: "Privacy policy",
        intro:
          "This website does not directly collect personal data through a form or user account.",
        sections: [
          {
            title: "No direct collection",
            paragraphs: [
              "The website does not provide user accounts, contact forms, or payment features.",
              "The contact button simply opens the user’s email client through a mailto link. Any information sent that way is provided directly by the user through their own email service.",
            ],
          },
          {
            title: "Technical data",
            paragraphs: [
              "Like any website, the hosting provider may process minimal technical data such as connection logs or information required for the proper operation and security of the service.",
            ],
          },
          {
            title: "Cookies",
            paragraphs: [
              "At the time of writing, the website does not use advertising cookies or analytics tools requiring a consent banner, subject to future changes.",
            ],
          },
          {
            title: "Your rights",
            paragraphs: [
              "Under the GDPR, you may request information about any processing concerning your data by writing to: joeydecroix.pro@gmail.com.",
            ],
          },
        ],
      },
    },
  },
  skills: [
    {
      slug: "next-js",
      title: "Next.js",
      type: "React-based framework",
      color: "#111111",
      level: 6.5,
    },
    {
      slug: "react",
      title: "React",
      type: "JavaScript library",
      color: "#51D6FF",
      level: 8,
    },
    {
      slug: "symfony",
      title: "Symfony",
      type: "Backend framework",
      color: "#CA054D",
      level: 7.5,
    },
    {
      slug: "express-js",
      title: "Express.js",
      type: "Node API layer",
      color: "#f7d94c",
      level: 8,
    },
    {
      slug: "wordpress",
      title: "WordPress",
      type: "CMS",
      color: "#29799E",
      level: 9,
    },
    {
      slug: "three-js",
      title: "Three.js",
      type: "WebGL scenes",
      color: "#3153dd",
      level: 6,
    },
    {
      slug: "gsap",
      title: "GSAP",
      type: "JavaScript animation library",
      color: "#11d846",
      level: 8,
    },
    {
      slug: "bootstrap-tailwind",
      title: "Bootstrap",
      type: "CSS library",
      color: "#6F2CF3",
      level: 8,
    },
    {
      slug: "tailwind",
      title: "Tailwind",
      type: "CSS library",
      color: "#00BCFF",
      level: 8,
    },
  ],
  projects: [
    {
      slug: "groupe-cola",
      aliases: ["cola"],
      isPublished: true,
      title: "Groupe COLA",
      featuredImage: "/image/projects/cola/groupeCola_first.webp",
      heroImage: "/image/projects/cola/mockup-macbook-groupe-cola.webp",
      heroBackground: "#CECECE",
      year: "2026",
      role: "Creative Developer",
      status: "in process",
      eyebrow: "PROJECT",
      summary:
        "The project for the COLA group aimed to modernize its websites and those of its brands. The old websites looked outdated and no longer matched the group’s professional image. The goal was to present the brands and products in a clearer, more modern way while centralizing their management. This project was carried out during my apprenticeship at Genesii. On this project, I notably developed the firewall layer, the search system, the notification system, the frontend of the different sites, and the middle office.",
      overview: {
        eyebrow: "DEVELOPMENT",
        title: "PROJECT OVERVIEW",
        description:
          "Here are the key stages of the project. Each block on the right represents one step, from the first analysis to the final delivery.",
        stacksTitle: "STACKS",
        stacks: [
          { label: "WordPress", short: "WP", icon: "/image/svg/wordpress.svg" },
          { label: "PHP", short: "PHP", icon: "/image/svg/php.svg" },
          { label: "Docker", short: "DK", icon: "/image/svg/docker.svg" },
          { label: "GSAP", short: "GS", icon: "/image/svg/gsap.svg" },
          { label: "Bootstrap", short: "B", icon: "/image/svg/bootstrap.svg" },
        ],
        steps: [
          {
            number: "01",
            title: "Multisite architecture design",
            description:
              "A technical framing phase focused on designing the overall WordPress multisite architecture. It helped identify the elements shared across every site, such as ACF fields, plugins, shared features, and mutualized files, while separating what remained specific to each child site in order to define a solid structure before development began.",
            image: null,
            showPlaceholder: false,
            color: "#5C939F",
          },
          {
            number: "02",
            title: "Shared pro space creation",
            description:
              "Design and initial development of the shared pro space before integrating the multisite logic. This common foundation, validated by the client, already included a custom notification system, an internal search engine, a chatbot with a back-office access link, per-user credit management, a custom firewall, and fine-grained role handling for manager, pro client, and super admin.",
            image: null,
            showPlaceholder: false,
            color: "#111111",
          },
          {
            number: "03",
            title: "Multisite structure implementation",
            description:
              "Implementation of the full WordPress multisite logic once the pro space had been approved. Child sites inherit the same pro space and share the main features, while keeping their own content through site-specific database tables. Each child site also has its own theme, which required dedicated charting and frontend integration, along with a custom search system. The whole project was built in Docker to streamline setup, development, and environment management.",
            image: null,
            showPlaceholder: false,
            color: "#ED6D40",
          },
          {
            number: "04",
            title: "Deployment, testing, and client validation",
            description:
              "Finalization phase covering deployment, technical tests, functional checks, and final client approval. The goal was to ensure that the entire setup was working properly before production launch: multisite structure, pro spaces, user roles, search systems, chatbot, firewall, and child themes.",
            image: null,
            showPlaceholder: false,
            color: "#E7E7E7",
          },
        ],
      },
      galleryTitle: "PROJECT GALLERY",
      galleryImages: Array.from(
        { length: 12 },
        (_, index) => `/image/project-gallery/cola/${index + 1}.webp`,
      ),
      cover: null,
      hero: null,
      gallery: [],
      tags: ["WordPress", "PHP", "Bootstrap"],
    },
    {
      slug: "new-one-by-c",
      title: "New One By C",
      featuredImage: "/image/projects/nbc/nbc_first.webp",
      heroImage: "/image/projects/nbc/mockup-macbook-nbc.webp",
      heroBackground: "#CECECE",
      year: "2026",
      role: "Creative Developer",
      status: "redesign",
      projectHref: "https://newonebyc.ch",
      ctaLabel: "View live",
      eyebrow: "PROJECT",
      summary:
        "Redesign of a bioresonance website, combining a refreshed visual identity with a full architectural overhaul. The project involved moving an older WordPress site to a Next.js foundation in order to deliver a faster, smoother, and more suitable experience for this context. I also handled the on-site photography, the Photoshop retouching, and the intro video.",
      overview: {
        eyebrow: "DEVELOPMENT",
        title: "PROJECT OVERVIEW",
        description:
          "The project was organized around three main phases, from validating the visual direction to the final launch, with a strong focus on smoothness, performance, and SEO.",
        stacksTitle: "STACKS",
        stacks: [
          { label: "Next", short: "NX", icon: "/image/svg/nextJs.svg" },
          { label: "GSAP", short: "GS", icon: "/image/svg/gsap.svg" },
          { label: "Figma", short: "FG", icon: "/image/svg/figma.svg" },
          { label: "Illustrator", short: "AI", icon: "/image/svg/illustrator.svg" },
          { label: "Photoshop", short: "PS", icon: "/image/svg/photoshop.svg" },
        ],
        steps: [
          {
            number: "01",
            title: "Visual identity, logo, and wireframing",
            description:
              "The first phase focused on defining and validating the new visual identity with the client, including the creation of a new logo in Illustrator. Once this direction had been approved, I was able to design the wireframes in Figma and establish a cleaner, more modern visual base for the redesign.",
            image: null,
            color: "#5C939F",
          },
          {
            number: "02",
            title: "Technical redesign, Next.js, and motion layer",
            description:
              "Once the wireframes had been validated, I rebuilt the entire website through a full technical redesign and architectural shift, moving from an existing WordPress setup to Next.js. This new foundation gave the project a faster, smoother, and more coherent front-end base, which I extended with a motion layer to improve the overall feel of the experience.",
            image: null,
            color: "#ED6D40",
          },
          {
            number: "03",
            title: "Deployment, validation, and SEO",
            description:
              "The final phase focused on deployment and final client approval. Since the project was mostly front-end oriented, there was limited complex business logic to test, but a significant amount of work went into SEO: multilingual setup, hreflang tags, meta titles, meta descriptions, and Google Search Console configuration, all implemented to provide stronger search visibility and a clean indexing foundation.",
            image: null,
            color: "#E7E7E7",
          },
        ],
      },
      galleryTitle: "PROJECT GALLERY",
      galleryImages: Array.from(
        { length: 12 },
        (_, index) => `/image/project-gallery/nbc/${index + 1}.webp`,
      ),
      cover: null,
      hero: null,
      gallery: [],
      tags: ["Next.js", "GSAP", "Figma"],
    },
    {
      slug: "moon-cycle",
      title: "Moon Cycle",
      featuredImage: "/image/projects/moonCycle/moonCycle_first.webp",
      heroImage: "/image/projects/moonCycle/mockup-macbook-moon-cycle.webp",
      heroBackground: "#CECECE",
      year: "2025",
      role: "Frontend Developer",
      status: "experimentation",
      projectHref: "https://moon-cycle.joeydecroix.com",
      ctaLabel: "View live",
      eyebrow: "PROJECT",
      summary:
        "Moon Cycle is an exploration project built around driving a 3D model with dynamic data coming from an API. The idea was to create an immersive experience focused on lunar cycles, with a 3D moon model lit according to the real phase of the day and enriched with live information fetched from a lunar API.",
      overview: {
        eyebrow: "DEVELOPMENT",
        title: "PROJECT OVERVIEW",
        description:
          "The project was built as a learning exercise in JavaScript and 3D, with a strong focus on lunar visualization, real-time data integration, and the overall smoothness of the experience.",
        stacksTitle: "STACKS",
        stacks: [
          { label: "Vite", short: "VT", icon: "/image/svg/viteJs.svg" },
          { label: "Three.js", short: "3D", icon: "/image/svg/threeJs.svg" },
          { label: "GSAP", short: "GS", icon: "/image/svg/gsap.svg" },
          { label: "Bootstrap", short: "BS", icon: "/image/svg/bootstrap.svg" },
        ],
        steps: [
          {
            number: "01",
            title: "Project wireframing",
            description:
              "The first phase focused on wireframing the project in order to define the overall structure of the site, the information hierarchy, and the place of the 3D hero within the experience. The goal was to establish a clear base before moving on to the integration and the lunar cycle logic.",
            image: null,
            color: "#5C939F",
          },
          {
            number: "02",
            title: "3D model selection and integration",
            description:
              "The second phase consisted of selecting a moon 3D model realistic enough to preserve the real craters, then importing it into the project. I then handled the basic scene setup in order to properly center the model and prepare its display inside the hero.",
            image: null,
            color: "#111111",
          },
          {
            number: "03",
            title: "Lunar cycle logic and dynamic lighting",
            description:
              "The final phase focused on the full lunar cycle logic. I connected the lunar data to the scene so that the light illuminating the 3D model would move according to the real phase of the moon, making the cycle visible directly through the rendering on the site.",
            image: null,
            color: "#E7E7E7",
          },
        ],
      },
      galleryImages: [],
      cover: null,
      hero: null,
      gallery: [],
      tags: ["Vite", "Three.js", "GSAP"],
    },
    {
      slug: "soul-sight",
      title: "Soul Sight",
      featuredImage: "/image/projects/soulSight/soulsight_first.webp",
      heroImage: "/image/projects/soulSight/soulsight_hero.webp",
      year: "2024",
      role: "Full-stack Developer",
      status: "video game",
      projectHref: "https://simonboutruche.itch.io/soulsight",
      ctaLabel: "View live",
      eyebrow: "PROJECT",
      summary:
        "Soul Sight is a small runner-style video game created in five days as part of a group project at school. The player controls a teenager passionate about urbex who accidentally releases an evil soul after breaking a mirror during an exploration. My main role on the project was to handle the full development of the game in Godot while quickly learning GDScript under a tight deadline.",
      overview: {
        eyebrow: "DEVELOPMENT",
        title: "PROJECT OVERVIEW",
        description:
          "The project was developed as a short team production with a clear goal: design and deliver a playable game in five days. My contribution was focused on the full implementation of the game inside Godot.",
        stacksTitle: "STACKS",
        stacks: [
          { label: "Godot", short: "GD", icon: "/image/svg/godot.svg" },
          { label: "Aseprite", short: "AS", icon: "/image/svg/asprite.svg" },
        ],
        steps: [
          {
            number: "01",
            title: "Tilemap creation",
            description:
              "I designed a modular tilemap in Godot to make it easier to build the different paths and gameplay segments of the project. This structure helped establish the level design foundation while keeping production efficient within the limited timeframe.",
            image: null,
            color: "#5C939F",
          },
          {
            number: "02",
            title: "Main character and health bar setup",
            description:
              "I programmed the character movement in GDScript, adjusting speed, gravity, and controls to create a playable feel. I also added a health bar that decreases whenever the player takes damage.",
            image: null,
            color: "#111111",
          },
          {
            number: "03",
            title: "Collisions, obstacles, and evil souls",
            description:
              "I implemented the collision system to ensure precise interaction with the environment and obstacles. I also integrated the evil souls that chase the player and deal damage, which established the core gameplay loop of the project.",
            image: null,
            color: "#ED6D40",
          },
          {
            number: "04",
            title: "Export and upload to Itch.io",
            description:
              "The final step was to export the game properly from Godot, verify that it was running correctly, and publish it on Itch.io to make the project playable and shareable online.",
            image: null,
            color: "#E7E7E7",
          },
        ],
      },
      galleryImages: [],
      cover: null,
      hero: null,
      gallery: [],
      tags: ["Godot", "GDScript", "Game Dev"],
    },
  ],
};
