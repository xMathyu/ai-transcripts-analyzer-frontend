# AI Transcripts Analyzer Frontend

Una interfaz web moderna para analizar y buscar transcripciones utilizando inteligencia artificial. Construida con Next.js, React y Tailwind CSS.

## Características

### 🔍 Búsqueda Avanzada
- Búsqueda rápida por palabras clave
- Filtros por categoría (problemas técnicos, facturación, soporte comercial, etc.)
- Paginación de resultados
- Puntuación de relevancia
- Búsqueda local sin consumir tokens de IA

### 📊 Análisis y Estadísticas
- Dashboard con métricas del sistema
- Estadísticas de uso de OpenAI
- Análisis de rendimiento de caché
- Temas más frecuentes por categoría
- Visualización de datos interactiva

### 📋 Gestión de Transcripciones
- Lista completa de transcripciones
- Filtros por categoría y búsqueda
- Ordenamiento por diferentes criterios
- Vista detallada de cada transcripción
- Metadatos y información de sentimiento

### 🎨 Interfaz Moderna
- Diseño responsivo
- Navegación intuitiva
- Componentes reutilizables
- Estados de carga y error
- Modo claro optimizado

## Tecnologías Utilizadas

- **Frontend**: Next.js 15, React 19, TypeScript
- **Estilos**: Tailwind CSS 4
- **Estado**: React Hooks personalizados
- **HTTP**: Fetch API nativo
- **Linting**: ESLint con configuración Next.js

## Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd ai-transcripts-analyzer-frontend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env.local
   ```
   
   Edita `.env.local` con la URL de tu backend:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## Estructura del Proyecto

```
src/
├── app/                    # Páginas de Next.js App Router
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Dashboard principal
│   ├── search/            # Página de búsqueda
│   ├── transcripts/       # Lista de transcripciones
│   └── analytics/         # Página de análisis
├── components/            # Componentes React
│   ├── analytics/         # Componentes de análisis
│   ├── layout/           # Componentes de navegación
│   ├── search/           # Componentes de búsqueda
│   ├── transcripts/      # Componentes de transcripciones
│   └── ui/               # Componentes de UI reutilizables
├── hooks/                # React Hooks personalizados
├── services/             # Servicios de API
└── types/                # Definiciones de TypeScript
```

## API Backend

El frontend se conecta a una API NestJS que proporciona los siguientes endpoints:

### Endpoints Principales

- `GET /api/transcripts/search` - Búsqueda de transcripciones
- `GET /api/transcripts/statistics` - Estadísticas del sistema
- `GET /api/transcripts/topics/frequent` - Temas más frecuentes
- `GET /api/transcripts` - Lista de todas las transcripciones
- `GET /api/transcripts/:id` - Transcripción específica

### Categorías de Transcripciones

- `technical_issues` - Problemas técnicos
- `billing_issues` - Problemas de facturación
- `commercial_support` - Soporte comercial
- `administrative_requests` - Solicitudes administrativas
- `service_activation` - Activación de servicios
- `complaints` - Quejas

## Desarrollo

### Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Construcción para producción
npm run start    # Servidor de producción
npm run lint     # Linting del código
```

### Estructura de Componentes

#### Hooks Personalizados
- `useSearch` - Manejo de búsquedas
- `useTranscripts` - Lista de transcripciones
- `useStatistics` - Estadísticas del sistema
- `useFrequentTopics` - Temas frecuentes

#### Componentes de UI
- `LoadingSpinner` - Indicador de carga
- `ErrorMessage` - Mensajes de error
- `Badge` - Etiquetas de categorías
- `Card` - Contenedor de contenido

### Convenciones de Código

- Usar TypeScript para tipado estático
- Componentes funcionales con Hooks
- Props interfaces definidas
- Manejo de estados de carga y error
- Comentarios en español para documentación

## Configuración de Producción

1. **Variables de entorno**
   ```bash
   NEXT_PUBLIC_API_URL=https://your-api-domain.com
   ```

2. **Construcción**
   ```bash
   npm run build
   ```

3. **Despliegue**
   ```bash
   npm run start
   ```

## Características Principales

### Dashboard
- Resumen de estadísticas del sistema
- Búsqueda rápida
- Temas trending
- Métricas de rendimiento

### Búsqueda Avanzada
- Búsqueda por palabras clave
- Filtros por categoría
- Resultados paginados
- Mensajes coincidentes destacados

### Analytics
- Estadísticas de transcripciones
- Uso de tokens de OpenAI
- Rendimiento de caché
- Análisis de temas por categoría

### Lista de Transcripciones
- Vista completa de transcripciones
- Filtros y ordenamiento
- Búsqueda en tiempo real
- Metadatos detallados

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## Soporte

Para soporte o preguntas, puedes:
- Abrir un issue en GitHub
- Contactar al equipo de desarrollo
- Revisar la documentación del backend
