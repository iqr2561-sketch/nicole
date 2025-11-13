# 🚀 Guía de Deploy - Portfolio con Neon PostgreSQL

## Paso 1: Configurar la Base de Datos en Neon

1. **Ejecuta el script SQL:**
   - Ve a tu proyecto en [Neon Console](https://console.neon.tech)
   - Abre el **SQL Editor**
   - Copia y pega el contenido completo de `database/schema.sql`
   - Ejecuta el script (botón "Run")

2. **Verifica que las tablas se crearon:**
   - Deberías ver las siguientes tablas:
     - `hero`
     - `about`
     - `projects`
     - `skills`
     - `photos`
     - `contact`

## Paso 2: Configurar Variables de Entorno en Vercel

1. **Ve a tu proyecto en Vercel:**
   - Abre tu proyecto desplegado
   - Ve a **Settings** → **Environment Variables**

2. **Agrega las siguientes variables:**

   ```
   DATABASE_URL=postgresql://neondb_owner:npg_cZ8VtCJRjU3i@ep-green-river-aehj4qpx-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

   ```
   POSTGRES_URL=postgresql://neondb_owner:npg_cZ8VtCJRjU3i@ep-green-river-aehj4qpx-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

   ```
   POSTGRES_URL_NON_POOLING=postgresql://neondb_owner:npg_cZ8VtCJRjU3i@ep-green-river-aehj4qpx.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

   **Importante:** 
   - Marca estas variables para **Production**, **Preview** y **Development**
   - Haz clic en **Save** después de agregar cada variable

3. **Variables opcionales (pero recomendadas):**
   
   ```
   POSTGRES_USER=neondb_owner
   POSTGRES_HOST=ep-green-river-aehj4qpx-pooler.c-2.us-east-2.aws.neon.tech
   POSTGRES_PASSWORD=npg_cZ8VtCJRjU3i
   POSTGRES_DATABASE=neondb
   ```

## Paso 3: Redesplegar en Vercel

1. **Después de agregar las variables de entorno:**
   - Ve a la pestaña **Deployments**
   - Haz clic en los tres puntos (⋯) del último deployment
   - Selecciona **Redeploy**
   - Confirma el redeploy

   O simplemente haz un nuevo push a `main` y Vercel desplegará automáticamente.

## Paso 4: Verificar el Deploy

1. **Verifica que la API funciona:**
   - Visita: `https://tu-proyecto.vercel.app/api/get-portfolio`
   - Deberías ver un JSON con los datos del portfolio

2. **Verifica el panel de administración:**
   - Visita: `https://tu-proyecto.vercel.app/#/admin`
   - Inicia sesión con la contraseña: `admin`
   - Prueba guardar algún cambio

3. **Verifica el portfolio:**
   - Visita: `https://tu-proyecto.vercel.app`
   - Deberías ver el portfolio cargando datos desde la base de datos

## 🔧 Solución de Problemas

### Error: "Cannot connect to database"
- Verifica que las variables de entorno estén correctamente configuradas en Vercel
- Asegúrate de que el script SQL se ejecutó correctamente en Neon
- Verifica que la URL de conexión incluya `?sslmode=require`

### Error: "Table does not exist"
- Ejecuta nuevamente el script `database/schema.sql` en Neon
- Verifica que todas las tablas se crearon correctamente

### La API retorna 500
- Revisa los logs en Vercel: **Deployments** → **View Function Logs**
- Verifica que `@vercel/postgres` esté instalado (ya está en `package.json`)

### Los cambios no se guardan
- Verifica que las variables de entorno estén configuradas
- Revisa la consola del navegador para errores
- Verifica los logs de Vercel para errores del servidor

## 📝 Notas Importantes

- **Seguridad:** Nunca subas las credenciales de la base de datos al repositorio
- **Backup:** Neon hace backups automáticos, pero puedes crear backups manuales desde el dashboard
- **Límites:** El plan gratuito de Neon tiene límites de uso, revisa tu consumo en el dashboard

## ✅ Checklist de Deploy

- [ ] Script SQL ejecutado en Neon
- [ ] Tablas creadas correctamente
- [ ] Variables de entorno configuradas en Vercel
- [ ] Proyecto redesplegado en Vercel
- [ ] API funcionando (`/api/get-portfolio`)
- [ ] Panel de administración accesible
- [ ] Portfolio cargando datos desde la base de datos
- [ ] Cambios se guardan correctamente

¡Listo! Tu portfolio está completamente funcional con base de datos PostgreSQL. 🎉

