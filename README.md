# CRM Back Orchestrator

Sistema backend para gestión de CRM construido con NestJS, desplegado en Railway con CI/CD automático.

## 🚀 Características






- **Framework**: NestJS con TypeScript
- **Base de datos**: Redis para cache y sesiones
- **Deployment**: Railway con CI/CD automático
- **Containerización**: Docker multi-stage optimizado
- **Testing**: Jest para pruebas unitarias y e2e
- **Linting**: ESLint + Prettier
- **DevOps**: GitHub Actions para CI/CD

## 📋 Requisitos Previos

- Node.js 20.x
- Yarn
- Docker (opcional para desarrollo local)
- Cuenta en Railway
- Cuenta en GitHub

## 🛠️ Instalación Local

```bash
# Clonar repositorio
git clone <repository-url>
cd crm-back-orchestrator

# Instalar dependencias
yarn install

# Copiar variables de entorno
cp .env.example .env

# Ejecutar en modo desarrollo
yarn start:dev
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo
yarn start:dev          # Servidor con hot reload
yarn start:debug        # Servidor con debugging

# Construcción y producción
yarn build              # Construir aplicación
yarn start:prod         # Ejecutar versión de producción

# Testing
yarn test               # Tests unitarios
yarn test:e2e          # Tests end-to-end
yarn test:cov          # Coverage de tests

# Verificación
yarn verify:build      # Verificar build básico
yarn verify:build:full # Verificación completa (Linux/Mac)
yarn verify:build:win  # Verificación completa (Windows)

# Calidad de código
yarn lint              # Ejecutar linter
yarn format            # Formatear código
```

## 🐳 Docker

### Desarrollo

```bash
# Usar Docker Compose para desarrollo
docker-compose up
```

### Producción

```bash
# Construir imagen de producción
docker build -f Dockerfile.prod -t crm-back-orchestrator .

# Ejecutar contenedor
docker run -p 3000:3000 crm-back-orchestrator
```

## 🚀 Deployment en Railway

### Configuración Inicial

1. **Conectar repositorio con Railway**
   - Crear proyecto en Railway
   - Conectar con repositorio GitHub

2. **Configurar variables de entorno en Railway**
   ```
   NODE_ENV=production
   PORT=3000
   ```

3. **Agregar Redis como servicio**
   - Agregar servicio Redis en Railway
   - Railway automáticamente configurará REDIS_URL

### CI/CD Automático

El proyecto incluye GitHub Actions que:
- ✅ Ejecuta tests en cada push/PR
- ✅ Verifica que el build sea exitoso
- ✅ Despliega automáticamente a Railway en pushes a `main`
- ✅ Notifica resultado del deployment

### Configurar Secretos en GitHub

1. Ve a Settings → Secrets and Variables → Actions
2. Agrega estos secretos:
   - `RAILWAY_TOKEN`: Token de Railway API
   - `RAILWAY_SERVICE_ID`: ID del servicio en Railway

## 📊 Monitoreo y Verificación

### Verificar Build Local

```bash
# Verificación rápida
yarn verify:build

# Verificación completa
yarn verify:build:full  # Linux/Mac
yarn verify:build:win   # Windows
```

### Verificar Deployment

1. **Logs de Railway**: Ve a tu proyecto en Railway → Deployments
2. **GitHub Actions**: Ve a Actions tab en tu repositorio
3. **Health Check**: Railway automáticamente verifica que tu app responda

## 📁 Estructura del Proyecto

```
crm-back-orchestrator/
├── .github/workflows/     # CI/CD workflows
├── scripts/              # Scripts de verificación
├── src/                  # Código fuente
├── Dockerfile           # Docker para desarrollo
├── Dockerfile.prod      # Docker optimizado para producción
├── railway.json         # Configuración de Railway
└── docker-compose.yaml  # Compose para desarrollo local
```

## 🔄 Flujo SCRUM + DevOps

### Ramas y Workflow

1. **Feature branches**: `feature/nombre-feature`
2. **Pull requests**: Siempre crear PR para merge a `main`
3. **CI/CD**: Automático en merge a `main`

### Sprint Workflow

1. **Planning**: Definir features del sprint
2. **Development**: Desarrollar en feature branches
3. **Testing**: CI automático en cada PR
4. **Review**: Code review obligatorio
5. **Deploy**: Automático al merge a `main`
6. **Monitor**: Verificar deployment en Railway

## 🛡️ Variables de Entorno

Copia `.env.example` a `.env` y configura:

```env
NODE_ENV=development
PORT=3000
REDIS_URL=redis://localhost:6379
```

## 📝 Contribución

1. Fork el proyecto
2. Crear feature branch (`git checkout -b feature/nueva-feature`)
3. Commit cambios (`git commit -am 'Agregar nueva feature'`)
4. Push a branch (`git push origin feature/nueva-feature`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
