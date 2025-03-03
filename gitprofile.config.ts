// gitprofile.config.ts

const CONFIG = {
  github: {
    username: 'AkiTheMemeGod', // Your GitHub org/user name. (This is the only required config)
  },
  /**
   * If you are deploying to https://<USERNAME>.github.io/, for example your repository is at https://github.com/arifszn/arifszn.github.io, set base to '/'.
   * If you are deploying to https://<USERNAME>.github.io/<REPO_NAME>/,
   * for example your repository is at https://github.com/arifszn/portfolio, then set base to '/portfolio/'.
   */
  base: '/',
  projects: {
    github: {
      display: true, // Display GitHub projects?
      header: 'Github Projects',
      mode: 'automatic', // Mode can be: 'automatic' or 'manual'
      automatic: {
        sortBy: 'updated', // Sort projects by 'stars' or 'updated'
        limit: 20, // How many projects to display.
        exclude: {
          forks: false, // Forked projects will not be displayed if set to true.
          projects: ['AkiTheMemeGod/AkiTheMemeGod.github.io', 'AkiTheMemeGod/AkiTheMemeGod'], // These projects will not be displayed. example: ['arifszn/my-project1', 'arifszn/my-project2']
        },
      },
      manual: {
        // Properties for manually specifying projects
        projects: ['arifszn/gitprofile', 'arifszn/pandora'], // List of repository names to display. example: ['arifszn/my-project1', 'arifszn/my-project2']
      },
    },
    external: {
      header: 'My Projects',
      // To hide the `External Projects` section, keep it empty.
      projects: [
        {
          title: 'Project Name',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut.',
          imageUrl:
            'https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg',
          link: 'https://example.com',
        },
        {
          title: 'Project Name',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut.',
          imageUrl:
            'https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg',
          link: 'https://example.com',
        },
      ],
    },
  },
  seo: {
    title: 'Portfolio of Akash K',
    description: 'This is the portfolio website of Akash K',
    imageURL: 'https://github.com/AkiTheMemeGod/AkiTheMemeGod.github.io/blob/main/142716100.jpeg?raw=true',
  },
  social: {
    linkedin: 'akash-k19052022',
    x: 'AkiTheMemeGod1',
    instagram: 'aki_the_meme_god',
    email: 'k.akashkumar@gmail.com',
  },
  resume: {
    fileUrl:
      'https://srmistrmp-akash-k.tiiny.site/', // Empty fileUrl will hide the `Download Resume` button.
  },
  skills: [
    'Dart',
    'Flutter',
    'Ethical Hacking',
    'Flask',
    'FastAPI',
    'Streamlit',
    'Sqlite',
    'Linux',
    'Kali',
    'Unix',
    'Python',
    'MySQL',
    'Git',
    'CSS',
  ],
  experiences: [
    {
      company: 'ProtoBase',
      position: 'Founder',
      from: 'December 2024',
      to: 'Present',
      companyLink: 'https://protobase.pythonanywhere.com',
    },
    {
      company: 'Checkpoint Systems',
      position: 'Intern',
      from: 'Feb 2025',
      to: 'Present',
      companyLink: 'https://checkpointsystems.com/',
    },
  ],
  certifications: [
    {
      name: 'Certified Ethical Hacker',
      body: 'Certified Ethical Hacker C-EH From EcCouncil',
      year: 'June 2024',
      link: 'https://drive.google.com/file/d/1hB3kUw1XWhaaAbaeVSJW2XhdqJ3lHrTG/view?usp=sharing',
    },
  ],
  educations: [
    {
      institution: 'SRMIST Ramapuram, Chennai',
      degree: 'B.Tech CSE specialization in cybersecurity',
      from: '2022',
      to: '2026',
    },
    {
      institution: 'St.Johns English School & Junior College',
      degree: '12th Grade',
      from: '2021',
      to: '2022',
    },
  ],
  // Display articles from your medium or dev account. (Optional)
  blog: {
    source: 'dev', // medium | dev
    username: 'arifszn', // to hide blog section, keep it empty
    limit: 2, // How many articles to display. Max is 10.
  },
  googleAnalytics: {
    id: '', // GA3 tracking id/GA4 tag id UA-XXXXXXXXX-X | G-XXXXXXXXXX
  },
  // Track visitor interaction and behavior. https://www.hotjar.com
  hotjar: {
    id: '',
    snippetVersion: 6,
  },
  themeConfig: {
    defaultTheme: 'lofi',

    // Hides the switch in the navbar
    // Useful if you want to support a single color mode
    disableSwitch: false,

    // Should use the prefers-color-scheme media-query,
    // using user system preferences, instead of the hardcoded defaultTheme
    respectPrefersColorScheme: false,

    // Display the ring in Profile picture
    displayAvatarRing: true,

    // Available themes. To remove any theme, exclude from here.
    themes: [
      'light',
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'acid',
      'lemonade',
      'night',
      'coffee',
      'winter',
      'dim',
      'nord',
      'sunset',
      'procyon',
    ],

    // Custom theme, applied to `procyon` theme
    customTheme: {
      primary: '#fc055b',
      secondary: '#219aaf',
      accent: '#e8d03a',
      neutral: '#2A2730',
      'base-100': '#E3E3ED',
      '--rounded-box': '3rem',
      '--rounded-btn': '3rem',
    },
  },

  enablePWA: true,
};

export default CONFIG;
