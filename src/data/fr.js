export const fr = {
  locale: "fr",
  alternateLocale: "en",
  languageLabel: "EN",
  site: {
    name: "JDX",
    description: "Portfolio immersif avec une sculpture 3D fragmentée.",
    homeHref: "/fr",
    sections: {
      hero: {
        sectionLabel: "Joey Decroix",
        intro: "Salut, moi c'est",
        eyebrow: "Joey",
        title: "Decroix",
      },
      about: {
        sectionLabel: "Profil",
        title: "Quand la logique rencontre",
        accentPrefix: "la",
        accent: "créativité",
        body: "Curieux et motivé, je travaille pour devenir développeur full-stack. Grandir à Maurice a nourri mon regard pour le design, tandis que mon parcours en biologie marine m'apporte logique, raisonnement et organisation dans mon travail.",
      },
      skills: {
        sectionLabel: "Compétences",
        kicker: "Compétences techniques",
        title: "Frameworks et librairies avec lesquels je travaille régulièrement",
        controlsLabel: "Contrôle du carousel de compétences",
        previousLabel: "Compétence précédente",
        nextLabel: "Compétence suivante",
      },
      projects: {
        sectionLabel: "Projets",
        kicker: "Projets",
      },
    },
    footer: {
      logoAlt: "JDX",
      title: "Et si on collaborait ensemble ?",
      contactLabel: "Me contacter",
      contactHref: "mailto:joeydecroix.pro@gmail.com",
      legalNoticeLabel: "Mentions légales",
      privacyPolicyLabel: "Politique de confidentialité",
      legalNoticeHref: "/fr/mentions-legales",
      privacyPolicyHref: "/fr/politique-de-confidentialite",
      copyright: "© 2026 Joey Decroix",
    },
    projectDetail: {
      backHomeLabel: "Retour à l'accueil",
      backLabel: "Retour",
      summaryLabel: "Résumé du projet",
    },
    legal: {
      legalNotice: {
        title: "Mentions légales",
        intro:
          "Cette page présente les informations légales relatives au site de Joey Decroix.",
        sections: [
          {
            title: "Éditeur du site",
            paragraphs: [
              "Joey Decroix",
              "Contact : joeydecroix.pro@gmail.com",
              "Adresse : à compléter si nécessaire",
            ],
          },
          {
            title: "Hébergement",
            paragraphs: [
              "Hébergeur : à compléter",
              "Adresse de l’hébergeur : à compléter",
            ],
          },
          {
            title: "Propriété intellectuelle",
            paragraphs: [
              "L’ensemble des contenus présents sur ce site, incluant notamment les textes, visuels, animations, vidéos, éléments graphiques et réalisations, sont protégés par le droit d’auteur sauf mention contraire.",
              "Toute reproduction, représentation, adaptation ou exploitation, totale ou partielle, sans autorisation préalable, est interdite.",
            ],
          },
          {
            title: "Contact",
            paragraphs: [
              "Pour toute demande, vous pouvez utiliser le lien de contact présent sur le site ou écrire à l’adresse : joeydecroix.pro@gmail.com.",
            ],
          },
        ],
      },
      privacyPolicy: {
        title: "Politique de confidentialité",
        intro:
          "Le présent site ne collecte pas directement de données personnelles via un formulaire ou un espace utilisateur.",
        sections: [
          {
            title: "Absence de collecte directe",
            paragraphs: [
              "Le site ne propose ni création de compte, ni formulaire de contact, ni système de paiement.",
              "Le bouton de contact ouvre simplement la messagerie de l’utilisateur via un lien mailto. Les informations éventuellement transmises dans ce cadre le sont directement par l’utilisateur depuis son propre service de messagerie.",
            ],
          },
          {
            title: "Données techniques",
            paragraphs: [
              "Comme tout site web, l’hébergeur peut être amené à traiter des données techniques minimales, telles que les journaux de connexion ou des informations nécessaires au bon fonctionnement et à la sécurité du service.",
            ],
          },
          {
            title: "Cookies",
            paragraphs: [
              "À la date de rédaction de cette page, le site n’utilise pas de cookies publicitaires ni de solution d’analyse d’audience nécessitant une bannière de consentement, sous réserve d’évolution future.",
            ],
          },
          {
            title: "Vos droits",
            paragraphs: [
              "Conformément au RGPD, vous pouvez demander des informations sur les éventuels traitements de données vous concernant en écrivant à : joeydecroix.pro@gmail.com.",
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
      type: "Framework basé sur React",
      color: "#111111",
      level: 6.5,
    },
    {
      slug: "react",
      title: "React",
      type: "Librairie JavaScript",
      color: "#51D6FF",
      level: 8,
    },
    {
      slug: "symfony",
      title: "Symfony",
      type: "Framework backend",
      color: "#CA054D",
      level: 7.5,
    },
    {
      slug: "express-js",
      title: "Express.js",
      type: "Couche API Node",
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
      type: "Scenes WebGL",
      color: "#3153dd",
      level: 6,
    },
    {
      slug: "gsap",
      title: "GSAP",
      type: "Librairie d'animation JavaScript",
      color: "#11d846",
      level: 8,
    },
    {
      slug: "bootstrap-tailwind",
      title: "Bootstrap",
      type: "Librairie CSS",
      color: "#6F2CF3",
      level: 8,
    },
    {
      slug: "tailwind",
      title: "Tailwind",
      type: "Librairie CSS",
      color: "#00BCFF",
      level: 8,
    },
  ],
  projects: [
    {
      slug: "groupe-cola",
      aliases: ["cola"],
      title: "Groupe COLA",
      featuredImage: "/image/projects/cola/groupeCola_first.webp",
      heroImage: "/image/projects/cola/mockup-macbook-groupe-cola.webp",
      heroBackground: "#CECECE",
      year: "2026",
      role: "Développeur créatif",
      status: "en cours",
      eyebrow: "PROJET",
      summary:
        "Le projet pour le groupe COLA visait à moderniser ses sites web et ceux de ses marques. Les anciens sites semblaient datés et n’étaient plus adaptés à l’image professionnelle du groupe. L’objectif était de présenter les marques et les produits de manière plus claire et plus moderne, tout en centralisant leur gestion. Sur ce projet, j’ai notamment développé la partie firewall, le système de recherche, les notifications, le développement front des différents sites ainsi que le middle office.",
      overview: {
        eyebrow: "DÉVELOPPEMENT",
        title: "VUE D'ENSEMBLE DU PROJET",
        description:
          "Voici les grandes étapes du projet. Chaque bloc à droite représente une phase, de la première analyse jusqu'à la livraison finale.",
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
            title: "Conception de l’architecture multisite",
            description:
              "Phase de cadrage technique dédiée à la conception du schéma global du multisite WordPress. Elle a permis d’identifier les éléments communs à tous les sites, comme les champs ACF, les plugins, les fonctionnalités partagées et les fichiers mutualisés, tout en distinguant les spécificités propres à chaque site enfant afin de poser une architecture solide avant le développement.",
            image: null,
            showPlaceholder: false,
            color: "#5C939F",
          },
          {
            number: "02",
            title: "Création de l’espace pro commun",
            description:
              "Conception et développement de l’espace pro commun avant l’intégration de la logique multisite. Cette base partagée, validée par le client, intégrait déjà un système de notifications personnalisé, un moteur de recherche interne, un chatbot avec lien d’accès depuis le back-office, une gestion des crédits par utilisateur, un firewall personnalisé ainsi qu’une gestion fine des rôles entre gestionnaire, client pro et super admin.",
            image: null,
            showPlaceholder: false,
            color: "#111111",
          },
          {
            number: "03",
            title: "Implémentation de la structure multisite",
            description:
              "Mise en place de toute la logique multisite WordPress une fois l’espace pro validé. Les sites enfants héritent du même espace pro et mutualisent les fonctionnalités principales, tout en conservant un contenu propre grâce à des tables de base de données spécifiques à chaque instance. Chaque site enfant dispose aussi de son propre thème, avec charting et intégration graphique dédiés, ainsi qu’un système de recherche personnalisé. L’ensemble a été développé dans un environnement Docker pour fiabiliser la configuration et le cycle de développement.",
            image: null,
            showPlaceholder: false,
            color: "#ED6D40",
          },
          {
            number: "04",
            title: "Déploiement, tests et validation client",
            description:
              "Phase de finalisation centrée sur le déploiement, les tests techniques, les vérifications fonctionnelles et la validation finale par le client. L’objectif était de garantir le bon fonctionnement de l’ensemble du dispositif avant mise en production : structure multisite, espaces pro, rôles utilisateurs, moteurs de recherche, chatbot, firewall et thèmes enfants.",
            image: null,
            showPlaceholder: false,
            color: "#E7E7E7",
          },
        ],
      },
      galleryTitle: "GALERIE DU PROJET",
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
      role: "Développeur créatif",
      status: "refonte",
      projectHref: "https://newonebyc.ch",
      ctaLabel: "Voir en live",
      eyebrow: "PROJET",
      summary:
        "Refonte d’un site dédié à la biorésonance pour moderniser son image et améliorer ses performances. Le site a été reconstruit avec Vite afin d’obtenir un rendu plus rapide, plus fluide et plus adapté qu’un WordPress dans ce contexte. J’ai également réalisé les photos du site sur place, leur retouche sur Photoshop, ainsi que la vidéo d’introduction.",
      overview: {
        eyebrow: "DÉVELOPPEMENT",
        title: "VUE D’ENSEMBLE DU PROJET",
        description:
          "Le projet s’est structuré autour de trois grandes phases, de la validation de la direction visuelle jusqu’à la mise en ligne finale, avec un accent fort sur la fluidité, la performance et le référencement.",
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
            title: "Charte graphique, logo et maquettage",
            description:
              "La première étape a consisté à définir puis faire valider la nouvelle charte graphique par la cliente, avec la création d’un nouveau logo sur Illustrator. Une fois cette direction validée, j’ai pu concevoir les maquettes sur Figma pour poser une base visuelle claire, plus moderne et cohérente avec le repositionnement du site.",
            image: null,
            color: "#5C939F",
          },
          {
            number: "02",
            title: "Intégration Vite et couche d’animation",
            description:
              "Après validation des maquettes, j’ai développé l’ensemble du site avec Vite. Ce choix m’a permis de travailler sur une base front légère, rapide et bien adaptée à un site vitrine peu amené à être édité par la cliente. Vite a apporté une structure simple et performante, que j’ai complétée par une couche d’animation pour renforcer la qualité perçue.",
            image: null,
            color: "#ED6D40",
          },
          {
            number: "03",
            title: "Déploiement, validation et SEO",
            description:
              "La dernière phase a été consacrée à la mise en ligne et à la validation finale par la cliente. Le projet étant principalement orienté front, il y avait peu de logique métier complexe à tester, mais une attention importante a été portée au SEO : traduction du site, ajout des balises hreflang, des meta titles et des meta descriptions, ainsi que la configuration de Google Search Console afin d’assurer un bon référencement et une base solide pour la visibilité du site.",
            image: null,
            color: "#E7E7E7",
          },
        ],
      },
      galleryTitle: "GALERIE DU PROJET",
      galleryImages: Array.from(
        { length: 12 },
        (_, index) => `/image/project-gallery/nbc/${index + 1}.webp`,
      ),
      cover: null,
      hero: null,
      gallery: [],
      tags: ["Vite", "GSAP", "Figma"],
    },
    {
      slug: "moon-cycle",
      title: "Moon Cycle",
      featuredImage: "/image/projects/moonCycle/moonCycle_first.webp",
      heroImage: "/image/projects/moonCycle/mockup-macbook-moon-cycle.webp",
      heroBackground: "#CECECE",
      year: "2025",
      role: "Développeur frontend",
      status: "expérimentation",
      projectHref: "https://moon-cycle.joeydecroix.com",
      ctaLabel: "Voir en live",
      eyebrow: "PROJET",
      summary:
        "Moon Cycle est un projet d’exploration autour de la dynamisation d’un modèle 3D à partir de données dynamiques provenant d’une API. L’idée était de créer une expérience immersive autour des cycles lunaires, avec un modèle 3D de lune éclairé selon la phase réelle du jour et enrichi par des informations récupérées via une API lunaire.",
      overview: {
        eyebrow: "DÉVELOPPEMENT",
        title: "VUE D’ENSEMBLE DU PROJET",
        description:
          "Le projet s’est construit comme un exercice de montée en compétence en JavaScript et en 3D, avec un travail centré sur la visualisation lunaire, l’intégration de données temps réel et la fluidité de l’expérience.",
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
            title: "Maquettage du projet",
            description:
              "La première étape a été le maquettage du projet afin de définir la structure générale du site, la hiérarchie des informations et la place du hero 3D dans l’expérience. L’objectif était de poser une base claire avant de passer à l’intégration et à la logique du cycle lunaire.",
            image: null,
            color: "#5C939F",
          },
          {
            number: "02",
            title: "Choix et intégration du modèle 3D",
            description:
              "La seconde étape a consisté à sélectionner un modèle 3D de lune suffisamment réaliste pour retrouver les vrais cratères, puis à l’importer dans le projet. J’ai ensuite réalisé les paramétrages de base dans la scène afin de bien centrer le modèle et de préparer son affichage dans le hero.",
            image: null,
            color: "#111111",
          },
          {
            number: "03",
            title: "Logique du cycle lunaire et lumière dynamique",
            description:
              "La dernière étape a porté sur toute la logique liée au cycle lunaire. J’ai connecté les données lunaires à la scène pour faire varier la position de la lumière qui éclaire le modèle 3D en fonction de la phase réelle de la lune, afin de rendre visuellement le cycle lunaire directement sur le site.",
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
      role: "Développeur full-stack",
      status: "jeu vidéo",
      projectHref: "https://simonboutruche.itch.io/soulsight",
      ctaLabel: "Voir en live",
      eyebrow: "PROJET",
      summary:
        "Soul Sight est un petit jeu vidéo de type runner réalisé en cinq jours dans le cadre d’un projet de groupe à l’école. Le joueur incarne un adolescent passionné d’urbex qui, au cours d’une exploration, libère accidentellement une âme maléfique après avoir brisé un miroir. Sur ce projet, mon rôle principal a été de développer l’intégralité du jeu sur Godot, tout en découvrant rapidement GDScript dans un temps très court.",
      overview: {
        eyebrow: "DÉVELOPPEMENT",
        title: "VUE D’ENSEMBLE DU PROJET",
        description:
          "Le projet a été mené en équipe sur une durée très courte, avec un objectif clair : concevoir puis livrer un jeu jouable en cinq jours. Mon intervention s’est concentrée sur le développement complet du jeu dans Godot.",
        stacksTitle: "STACKS",
        stacks: [
          { label: "Godot", short: "GD", icon: "/image/svg/godot.svg" },
          { label: "Aseprite", short: "AS", icon: "/image/svg/asprite.svg" },
        ],
        steps: [
          {
            number: "01",
            title: "Création du tilemap",
            description:
              "J’ai conçu un tilemap modulaire dans Godot afin de pouvoir générer plus facilement les différents chemins et segments du jeu. Cette base a servi à structurer le level design et à accélérer la mise en production malgré le temps limité.",
            image: null,
            color: "#5C939F",
          },
          {
            number: "02",
            title: "Paramétrage du personnage et de la barre de vie",
            description:
              "J’ai programmé les déplacements du personnage en GDScript, en ajustant la vitesse, la gravité et les contrôles pour obtenir un comportement jouable. J’ai également intégré une barre de vie qui diminue lorsque le personnage subit des dégâts.",
            image: null,
            color: "#111111",
          },
          {
            number: "03",
            title: "Collisions, obstacles et âmes maléfiques",
            description:
              "J’ai mis en place le système de collisions afin d’assurer des interactions précises avec l’environnement et les obstacles. J’ai aussi intégré les âmes maléfiques qui poursuivent le joueur et lui infligent des dégâts, ce qui a permis de poser le cœur du gameplay.",
            image: null,
            color: "#ED6D40",
          },
          {
            number: "04",
            title: "Export et mise en ligne sur Itch.io",
            description:
              "La dernière étape a consisté à exporter correctement le jeu depuis Godot, à vérifier son bon fonctionnement, puis à le publier sur Itch.io afin de disposer d’une version jouable et partageable en ligne.",
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
