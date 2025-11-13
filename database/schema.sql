-- Esquema de base de datos para el Portfolio
-- Ejecutar este script en Neon PostgreSQL para crear las tablas

-- Tabla para datos del Hero (Inicio)
CREATE TABLE IF NOT EXISTS hero (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255) NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para datos de About (Sobre Mí)
CREATE TABLE IF NOT EXISTS about (
    id SERIAL PRIMARY KEY,
    bio TEXT NOT NULL,
    avatar_url VARCHAR(500) NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para Proyectos
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    project_id VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    technologies TEXT[] DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para Habilidades (Skills)
CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    skill_id VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    icon VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para Fotografías
CREATE TABLE IF NOT EXISTS photos (
    id SERIAL PRIMARY KEY,
    photo_id VARCHAR(100) UNIQUE NOT NULL,
    alt TEXT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para Contacto
CREATE TABLE IF NOT EXISTS contact (
    id SERIAL PRIMARY KEY,
    whatsapp VARCHAR(500),
    github VARCHAR(500),
    linkedin VARCHAR(500),
    instagram VARCHAR(500),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos iniciales (solo si no existen)
INSERT INTO hero (name, subtitle) 
SELECT 'Nicole Ponce', 'Porfolio Personal'
WHERE NOT EXISTS (SELECT 1 FROM hero LIMIT 1);

INSERT INTO about (bio, avatar_url) 
SELECT 
    'Soy una apasionada desarrolladora y diseñadora con un ojo para la estética moderna y el código eficiente. Me especializo en la creación de experiencias de usuario fluidas y memorables utilizando tecnologías de vanguardia como React y Tailwind CSS. Mi objetivo es fusionar diseño y funcionalidad para construir productos digitales que no solo se vean increíbles, sino que también sean intuitivos y accesibles.',
    'https://picsum.photos/seed/portfolio-avatar/256/256'
WHERE NOT EXISTS (SELECT 1 FROM about LIMIT 1);

INSERT INTO contact (whatsapp, github, linkedin, instagram) 
SELECT 
    'https://wa.me/5492245501359',
    '#',
    '#',
    '#'
WHERE NOT EXISTS (SELECT 1 FROM contact LIMIT 1);

-- Índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_projects_project_id ON projects(project_id);
CREATE INDEX IF NOT EXISTS idx_skills_skill_id ON skills(skill_id);
CREATE INDEX IF NOT EXISTS idx_photos_photo_id ON photos(photo_id);

