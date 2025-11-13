
export interface HeroData {
  name: string;
  subtitle: string;
}

export interface AboutData {
  bio: string;
  avatarUrl: string;
}

export interface Project {
  id: string;
  title: string;
  description:string;
  imageUrl: string;
  technologies: string[];
}

export interface Skill {
  id: string;
  name: string;
  icon: string;
}

export interface Photo {
  id: string;
  alt: string;
  imageUrl: string;
}

export interface ContactData {
  whatsapp: string;
  github: string;
  linkedin: string;
  instagram: string;
}

export interface PortfolioData {
  hero: HeroData,
  about: AboutData;
  projects: Project[];
  skills: Skill[];
  photos: Photo[];
  contact: ContactData;
}

const defaultData: PortfolioData = {
  hero: {
    name: "Nicole Ponce",
    subtitle: "Porfolio Personal"
  },
  about: {
    bio: "Soy una apasionada desarrolladora y diseñadora con un ojo para la estética moderna y el código eficiente. Me especializo en la creación de experiencias de usuario fluidas y memorables utilizando tecnologías de vanguardia como React y Tailwind CSS. Mi objetivo es fusionar diseño y funcionalidad para construir productos digitales que no solo se vean increíbles, sino que también sean intuitivos y accesibles.",
    avatarUrl: "https://picsum.photos/seed/portfolio-avatar/256/256",
  },
  projects: [
    {
      id: "proj-1",
      title: 'Cyber Dashboard',
      description: 'Plataforma de análisis de datos con una estética futurista y visualizaciones interactivas.',
      imageUrl: 'https://picsum.photos/seed/project1/600/400',
      technologies: ['React', 'D3.js', 'Tailwind'],
    },
    {
      id: "proj-2",
      title: 'E-commerce Y2K',
      description: 'Una tienda online con un diseño inspirado en la era Y2K, enfocada en la experiencia de compra.',
      imageUrl: 'https://picsum.photos/seed/project2/600/400',
      technologies: ['Next.js', 'TypeScript', 'Stripe'],
    },
    {
      id: "proj-3",
      title: 'Portfolio Generativo',
      description: 'Un portfolio dinámico que genera layouts únicos cada vez que se visita, usando arte generativo.',
      imageUrl: 'https://picsum.photos/seed/project3/600/400',
      technologies: ['p5.js', 'React', 'Framer Motion'],
    },
  ],
  skills: [
    { id: 'skill-1', name: 'React', icon: 'ReactIcon' },
    { id: 'skill-2', name: 'Tailwind CSS', icon: 'TailwindIcon' },
    { id: 'skill-3', name: 'JavaScript', icon: 'JavaScriptIcon' },
    { id: 'skill-4', name: 'TypeScript', icon: 'TypeScriptIcon' },
    { id: 'skill-5', name: 'Node.js', icon: 'NodeIcon' },
    { id: 'skill-6', name: 'Figma', icon: 'FigmaIcon' },
  ],
  photos: [
      {
        id: 'photo-1',
        alt: 'Un parque tranquilo de noche, iluminado por una farola.',
        imageUrl: 'https://picsum.photos/seed/photo1/600/800',
      },
      {
        id: 'photo-2',
        alt: 'La luna y una estrella en un cielo crepuscular púrpura.',
        imageUrl: 'https://picsum.photos/seed/photo2/600/800',
      },
      {
        id: 'photo-3',
        alt: 'Un edificio de estilo clásico con árboles en primer plano.',
        imageUrl: 'https://picsum.photos/seed/photo3/600/800',
      },
      {
        id: 'photo-4',
        alt: 'Calle de la ciudad de noche con luces de neón.',
        imageUrl: 'https://picsum.photos/seed/photo4/600/800',
      },
      {
        id: 'photo-5',
        alt: 'Sendero brumoso en el bosque por la mañana.',
        imageUrl: 'https://picsum.photos/seed/photo5/600/800',
      },
      {
        id: 'photo-6',
        alt: 'Arquitectura geométrica abstracta.',
        imageUrl: 'https://picsum.photos/seed/photo6/600/800',
      }
  ],
  contact: {
    whatsapp: "https://wa.me/5492245501359",
    github: "#",
    linkedin: "#",
    instagram: "#",
  }
};

const STORAGE_KEY = 'portfolioData';

export const getData = (): PortfolioData => {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      return JSON.parse(storedData);
    }
  } catch (error) {
    console.error("Error reading from localStorage", error);
  }
  return defaultData;
};

export const saveData = (data: PortfolioData) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving to localStorage", error);
  }
};
