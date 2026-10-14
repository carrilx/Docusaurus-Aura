---
sidebar_position: 1
title: Despliegue en GitHub Pages
---

# Despliegue en GitHub Pages

Esta misma documentación se publica automáticamente con **GitHub Actions** cada vez que se hace `push` a la rama `main`.

## Flujo de despliegue

```mermaid
flowchart LR
    A[Edito docs/] --> B[git push a main]
    B --> C[GitHub Actions: job build]
    C -->|npm ci + npm run build| D[(Artefacto build/)]
    D --> E[GitHub Actions: job deploy]
    E --> F[🌐 GitHub Pages]
```

## Configuración clave

En `docusaurus.config.ts`:

```ts
const GITHUB_USER = 'tu-usuario';
const REPO_NAME = 'documentacion-daw';

url: `https://${GITHUB_USER}.github.io`,
baseUrl: `/${REPO_NAME}/`,   // debe empezar y terminar en "/"
```

:::danger Si la web carga sin estilos
Casi siempre es un `baseUrl` mal configurado. Debe coincidir **exactamente** con el nombre del repositorio.
:::

## Pasos resumidos

1. Crear el repositorio en GitHub (sin archivos iniciales).
2. Subir el proyecto (`git init`, `git add .`, `git commit`, `git push`).
3. Añadir `.github/workflows/deploy-pages.yml`.
4. En **Settings → Pages → Source** elegir **GitHub Actions**.
5. Revisar la pestaña **Actions** hasta que el job `deploy` termine en verde.

## Despliegue alternativo: Vercel

| | GitHub Pages | Vercel |
| --- | --- | --- |
| Configuración | Workflow YAML propio | Importar repo, casi automático |
| `baseUrl` | `/<repo>/` | `/` |
| Previsualización por rama | No | Sí |
| URL | `usuario.github.io/repo` | `proyecto.vercel.app` |

Esta configuración detecta la variable `VERCEL` durante el build y ajusta `url` y `baseUrl` por sí sola, de modo que **el mismo repositorio se puede publicar en ambas plataformas**.
