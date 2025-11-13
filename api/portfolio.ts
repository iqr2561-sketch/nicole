import { sql } from './db';
import type { PortfolioData, HeroData, AboutData, Project, Skill, Photo, ContactData } from '../data/portfolioService';

// Obtener todos los datos del portfolio
export async function getPortfolioData(): Promise<PortfolioData> {
  try {
    // Obtener Hero
    const heroResult = await sql`SELECT name, subtitle FROM hero ORDER BY id DESC LIMIT 1`;
    const hero: HeroData = heroResult.rows[0] || { name: 'Nicole Ponce', subtitle: 'Porfolio Personal' };

    // Obtener About
    const aboutResult = await sql`SELECT bio, avatar_url FROM about ORDER BY id DESC LIMIT 1`;
    const about: AboutData = aboutResult.rows[0] || {
      bio: 'Soy una apasionada desarrolladora...',
      avatarUrl: 'https://picsum.photos/seed/portfolio-avatar/256/256'
    };
    about.avatarUrl = about.avatar_url || about.avatarUrl;
    delete (about as any).avatar_url;

    // Obtener Proyectos
    const projectsResult = await sql`SELECT project_id as id, title, description, image_url as "imageUrl", technologies FROM projects ORDER BY created_at DESC`;
    const projects: Project[] = projectsResult.rows.map((p: any) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      imageUrl: p.imageUrl,
      technologies: Array.isArray(p.technologies) ? p.technologies : []
    }));

    // Obtener Skills
    const skillsResult = await sql`SELECT skill_id as id, name, icon FROM skills ORDER BY created_at DESC`;
    const skills: Skill[] = skillsResult.rows;

    // Obtener Photos
    const photosResult = await sql`SELECT photo_id as id, alt, image_url as "imageUrl" FROM photos ORDER BY created_at DESC`;
    const photos: Photo[] = photosResult.rows;

    // Obtener Contact
    const contactResult = await sql`SELECT whatsapp, github, linkedin, instagram FROM contact ORDER BY id DESC LIMIT 1`;
    const contact: ContactData = contactResult.rows[0] || {
      whatsapp: 'https://wa.me/5492245501359',
      github: '#',
      linkedin: '#',
      instagram: '#'
    };

    return {
      hero,
      about,
      projects,
      skills,
      photos,
      contact
    };
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    throw error;
  }
}

// Actualizar Hero
export async function updateHero(data: HeroData): Promise<void> {
  await sql`INSERT INTO hero (name, subtitle) VALUES (${data.name}, ${data.subtitle})`;
}

// Actualizar About
export async function updateAbout(data: AboutData): Promise<void> {
  await sql`INSERT INTO about (bio, avatar_url) VALUES (${data.bio}, ${data.avatarUrl})`;
}

// Crear/Actualizar Proyecto
export async function upsertProject(project: Project): Promise<void> {
  await sql`
    INSERT INTO projects (project_id, title, description, image_url, technologies)
    VALUES (${project.id}, ${project.title}, ${project.description}, ${project.imageUrl}, ${sql.array(project.technologies)})
    ON CONFLICT (project_id) 
    DO UPDATE SET 
      title = ${project.title},
      description = ${project.description},
      image_url = ${project.imageUrl},
      technologies = ${sql.array(project.technologies)},
      updated_at = CURRENT_TIMESTAMP
  `;
}

// Eliminar Proyecto
export async function deleteProject(projectId: string): Promise<void> {
  await sql`DELETE FROM projects WHERE project_id = ${projectId}`;
}

// Crear/Actualizar Skill
export async function upsertSkill(skill: Skill): Promise<void> {
  await sql`
    INSERT INTO skills (skill_id, name, icon)
    VALUES (${skill.id}, ${skill.name}, ${skill.icon})
    ON CONFLICT (skill_id)
    DO UPDATE SET
      name = ${skill.name},
      icon = ${skill.icon},
      updated_at = CURRENT_TIMESTAMP
  `;
}

// Eliminar Skill
export async function deleteSkill(skillId: string): Promise<void> {
  await sql`DELETE FROM skills WHERE skill_id = ${skillId}`;
}

// Crear/Actualizar Photo
export async function upsertPhoto(photo: Photo): Promise<void> {
  await sql`
    INSERT INTO photos (photo_id, alt, image_url)
    VALUES (${photo.id}, ${photo.alt}, ${photo.imageUrl})
    ON CONFLICT (photo_id)
    DO UPDATE SET
      alt = ${photo.alt},
      image_url = ${photo.imageUrl},
      updated_at = CURRENT_TIMESTAMP
  `;
}

// Eliminar Photo
export async function deletePhoto(photoId: string): Promise<void> {
  await sql`DELETE FROM photos WHERE photo_id = ${photoId}`;
}

// Actualizar Contact
export async function updateContact(data: ContactData): Promise<void> {
  await sql`
    INSERT INTO contact (whatsapp, github, linkedin, instagram)
    VALUES (${data.whatsapp}, ${data.github}, ${data.linkedin}, ${data.instagram})
    ON CONFLICT (id) DO NOTHING
  `;
  // Si ya existe, actualizar
  await sql`
    UPDATE contact SET
      whatsapp = ${data.whatsapp},
      github = ${data.github},
      linkedin = ${data.linkedin},
      instagram = ${data.instagram},
      updated_at = CURRENT_TIMESTAMP
    WHERE id = (SELECT id FROM contact ORDER BY id DESC LIMIT 1)
  `;
}

