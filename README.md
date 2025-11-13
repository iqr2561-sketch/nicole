# Portfolio Y2K Minimalist

Portfolio personal moderno con estética Y2K y panel de administración completo.

## 🚀 Características

- **Portfolio Responsive**: Diseño moderno con animaciones y efectos visuales
- **Panel de Administración**: Gestión completa del contenido del portfolio
- **Base de Datos PostgreSQL**: Almacenamiento persistente con Neon PostgreSQL
- **API RESTful**: Endpoints para todas las operaciones CRUD
- **Deploy en Vercel**: Configuración lista para producción

## 📋 Requisitos Previos

- Node.js 18+ 
- Cuenta en Neon PostgreSQL
- Cuenta en Vercel (para deploy)

## 🛠️ Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/iqr2561-sketch/nicole.git
cd nicole
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
```bash
cp .env.example .env.local
```

Edita `.env.local` con tus credenciales de Neon PostgreSQL.

4. Ejecuta el script SQL en Neon:
   - Ve a tu proyecto en Neon
   - Abre el SQL Editor
   - Copia y ejecuta el contenido de `database/schema.sql`

5. Ejecuta en desarrollo:
```bash
npm run dev
```

## 🗄️ Base de Datos

### Configuración en Neon

1. Crea una base de datos en [Neon](https://neon.tech)
2. Ejecuta el script `database/schema.sql` en el SQL Editor
3. Obtén las credenciales de conexión

### Variables de Entorno Necesarias

En Vercel, configura estas variables de entorno:

```
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
POSTGRES_URL=postgresql://user:password@host/database?sslmode=require
```

## 🚀 Deploy en Vercel

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno en Vercel:
   - Ve a Settings → Environment Variables
   - Agrega `DATABASE_URL` y `POSTGRES_URL` con tus credenciales de Neon
3. Vercel detectará automáticamente la configuración y desplegará

## 📁 Estructura del Proyecto

```
├── api/                 # API routes para Vercel
│   ├── db.ts           # Conexión a la base de datos
│   ├── portfolio.ts    # Funciones de acceso a datos
│   └── *.ts            # Endpoints individuales
├── admin/              # Panel de administración
│   ├── AdminPanel.tsx  # Componente principal
│   └── Manage*.tsx    # Componentes de gestión
├── components/         # Componentes del portfolio
├── data/               # Servicios de datos
│   └── portfolioService.ts
├── database/           # Scripts SQL
│   └── schema.sql      # Esquema de la base de datos
└── pages/              # Páginas del portfolio
```

## 🔐 Panel de Administración

Accede al panel de administración en: `#/admin`

**Credenciales por defecto:**
- Contraseña: `admin`

## 📝 API Endpoints

- `GET /api/get-portfolio` - Obtener todos los datos del portfolio
- `POST /api/update-hero` - Actualizar sección Hero
- `POST /api/update-about` - Actualizar sección About
- `POST /api/projects` - Crear/Actualizar proyecto
- `DELETE /api/projects` - Eliminar proyecto
- `POST /api/skills` - Crear/Actualizar skill
- `DELETE /api/skills` - Eliminar skill
- `POST /api/photos` - Crear/Actualizar foto
- `DELETE /api/photos` - Eliminar foto
- `POST /api/update-contact` - Actualizar contacto

## 🛠️ Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build para producción
- `npm run preview` - Preview del build

## 📄 Licencia

Este proyecto es privado.
