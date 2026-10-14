---
slug: /intro
sidebar_position: 1
title: Introducción
---

import AppDemo from '@site/src/components/AppDemo';

# Aura: app de bienestar emocional

**Aura** es una aplicación móvil (ficticia) que ayuda a personas adultas a **entender su estado de ánimo, gestionar el estrés y encontrar apoyo** cuando lo necesitan. Esta documentación recorre el ciclo de desarrollo completo: análisis, diseño, implementación, pruebas y despliegue.

## Pruébala ahora

El siguiente prototipo es interactivo. Haz un check-in, respira o escribe en el diario:

<AppDemo />

## Alcance del proyecto

| Módulo | Qué hace | Estado |
| --- | --- | --- |
| Check-in | Registro diario de ánimo y factores | ✅ Prototipo |
| Respiración | Técnicas guiadas con temporizador | ✅ Prototipo |
| Diario TCC | Entradas con detección de patrones de pensamiento | ✅ Prototipo |
| Progreso | Gráficas de evolución semanal | ✅ Prototipo |
| SOS | Teléfonos de ayuda y ejercicio de anclaje | ✅ Prototipo |
| Cuenta y sincronización | Registro, copia en la nube | 🕓 Planificado |

## Cómo está organizada la documentación

1. [Análisis](./análisis/requisitos.md): qué debe hacer el sistema.
2. [Diseño](./diseño/diagrama_clases.md): cómo se estructura.
3. [Implementación](./implementación/estructura_proyecto.md): cómo se organiza el código.
4. [Pruebas](./pruebas/analisis_caja_blanca.md): cómo comprobamos que funciona.
5. [Despliegue](./despliegue/github_pages.md): cómo se publica esta propia documentación.

:::warning Descargo de responsabilidad
Aura es un proyecto **educativo**. No es un producto sanitario, no diagnostica ni sustituye a un profesional.
En caso de crisis, llama al **024** (conducta suicida) o al **112** (emergencias).
:::
