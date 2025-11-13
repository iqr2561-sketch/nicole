
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

export const defaultData: PortfolioData = {
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
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Obtener datos desde la API o localStorage como fallback
export const getData = async (): Promise<PortfolioData> => {
  try {
    // Intentar obtener desde la API
    const response = await fetch(`${API_BASE_URL}/get-portfolio`);
    if (response.ok) {
      const data = await response.json();
      // Guardar en localStorage como caché
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return data;
    }
  } catch (error) {
    console.error("Error fetching from API, using localStorage:", error);
  }

  // Fallback a localStorage
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

// Función síncrona para compatibilidad (usa caché de localStorage)
export const getDataSync = (): PortfolioData => {
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

// Guardar datos completos (para compatibilidad)
export const saveData = async (data: PortfolioData): Promise<void> => {
  try {
    // Guardar en localStorage como caché inmediato
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new Event('portfolioDataUpdated'));
    
    // Actualizar en la base de datos
    await Promise.all([
      fetch(`${API_BASE_URL}/update-hero`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data.hero)
      }),
      fetch(`${API_BASE_URL}/update-about`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data.about)
      }),
      fetch(`${API_BASE_URL}/update-contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data.contact)
      })
    ]);

    // Guardar proyectos, skills y photos individualmente
    for (const project of data.projects) {
      await fetch(`${API_BASE_URL}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project)
      });
    }

    for (const skill of data.skills) {
      await fetch(`${API_BASE_URL}/skills`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skill)
      });
    }

    for (const photo of data.photos) {
      await fetch(`${API_BASE_URL}/photos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(photo)
      });
    }
  } catch (error) {
    console.error("Error saving to database:", error);
    // Al menos guardar en localStorage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      window.dispatchEvent(new Event('portfolioDataUpdated'));
    } catch (e) {
      console.error("Error saving to localStorage", e);
    }
  }
};

// Funciones específicas para cada sección
export const saveHero = async (hero: HeroData): Promise<void> => {
  await fetch(`${API_BASE_URL}/update-hero`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(hero)
  });
  const data = getDataSync();
  data.hero = hero;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new Event('portfolioDataUpdated'));
};

export const saveAbout = async (about: AboutData): Promise<void> => {
  await fetch(`${API_BASE_URL}/update-about`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(about)
  });
  const data = getDataSync();
  data.about = about;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new Event('portfolioDataUpdated'));
};

export const saveProject = async (project: Project): Promise<void> => {
  await fetch(`${API_BASE_URL}/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project)
  });
  const data = getDataSync();
  const index = data.projects.findIndex(p => p.id === project.id);
  if (index >= 0) {
    data.projects[index] = project;
  } else {
    data.projects.push(project);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new Event('portfolioDataUpdated'));
};

export const deleteProjectById = async (projectId: string): Promise<void> => {
  await fetch(`${API_BASE_URL}/projects`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ projectId })
  });
  const data = getDataSync();
  data.projects = data.projects.filter(p => p.id !== projectId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new Event('portfolioDataUpdated'));
};

export const saveSkill = async (skill: Skill): Promise<void> => {
  await fetch(`${API_BASE_URL}/skills`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(skill)
  });
  const data = getDataSync();
  const index = data.skills.findIndex(s => s.id === skill.id);
  if (index >= 0) {
    data.skills[index] = skill;
  } else {
    data.skills.push(skill);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new Event('portfolioDataUpdated'));
};

export const deleteSkillById = async (skillId: string): Promise<void> => {
  await fetch(`${API_BASE_URL}/skills`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ skillId })
  });
  const data = getDataSync();
  data.skills = data.skills.filter(s => s.id !== skillId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new Event('portfolioDataUpdated'));
};

export const savePhoto = async (photo: Photo): Promise<void> => {
  await fetch(`${API_BASE_URL}/photos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(photo)
  });
  const data = getDataSync();
  const index = data.photos.findIndex(p => p.id === photo.id);
  if (index >= 0) {
    data.photos[index] = photo;
  } else {
    data.photos.push(photo);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new Event('portfolioDataUpdated'));
};

export const deletePhotoById = async (photoId: string): Promise<void> => {
  await fetch(`${API_BASE_URL}/photos`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ photoId })
  });
  const data = getDataSync();
  data.photos = data.photos.filter(p => p.id !== photoId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new Event('portfolioDataUpdated'));
};

export const saveContact = async (contact: ContactData): Promise<void> => {
  await fetch(`${API_BASE_URL}/update-contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contact)
  });
  const data = getDataSync();
  data.contact = contact;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new Event('portfolioDataUpdated'));
};
