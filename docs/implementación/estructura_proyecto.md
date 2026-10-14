---
sidebar_position: 1
title: Estructura del proyecto
---

# Implementación: estructura del proyecto

## Tecnologías

| Capa | Tecnología | Por qué |
| --- | --- | --- |
| UI móvil | React Native + TypeScript | Una base de código para Android e iOS |
| Estado | Zustand | Sencillo y sin boilerplate |
| Almacenamiento local | SQLite cifrado (SQLCipher) | Datos sensibles solo en el dispositivo |
| Pruebas | Jest + React Native Testing Library | Estándar del ecosistema |
| CI/CD | GitHub Actions | Integrado con el repositorio |

## Árbol de carpetas

```text
aura-app/
├── src/
│   ├── screens/            # Una carpeta por pantalla
│   │   ├── Home/
│   │   ├── Breathe/
│   │   ├── Journal/
│   │   ├── Progress/
│   │   └── Sos/
│   ├── components/         # Componentes reutilizables (MoodPicker, Chip…)
│   ├── domain/             # Lógica pura, sin dependencias de UI
│   │   ├── recomendador.ts
│   │   ├── distorsiones.ts
│   │   └── tecnicasRespiracion.ts
│   ├── data/               # Acceso a SQLite
│   └── theme/
├── __tests__/
├── package.json
└── tsconfig.json
```

## Ejemplo: el recomendador

La regla de negocio vive en `domain/`, aislada de React:

```ts title="src/domain/recomendador.ts"
export type Ejercicio = 'respiracion' | 'diario' | 'diario_gratitud';

export function recomendar(animo: number): Ejercicio {
  if (animo <= 2) {
    return 'respiracion';
  }
  if (animo === 3) {
    return 'diario';
  }
  return 'diario_gratitud';
}
```

## Ejemplo: detección de patrones

```ts title="src/domain/distorsiones.ts"
export const DISTORSIONES = [
  { nombre: 'Todo o nada', patron: /\b(siempre|nunca|jamás)\b/i },
  { nombre: 'Etiquetado', patron: /\b(fracaso|inútil|estúpido)\b/i },
];

export const detectar = (texto: string) =>
  DISTORSIONES.filter((d) => d.patron.test(texto));
```

:::tip Prototipo web
La demo de esta documentación (componente `AppDemo`, en `src/components/AppDemo/`) reproduce esta lógica en React para que puedas probarla en el navegador.
:::

## Convenciones

- Una rama por funcionalidad y *pull request* con revisión.
- Mensajes de commit en imperativo (`Añade check-in diario`).
- La carpeta `domain/` **no importa** nada de `screens/` ni `data/`.
