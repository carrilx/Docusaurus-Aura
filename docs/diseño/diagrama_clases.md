---
sidebar_position: 1
title: Diagrama de clases
---

# Diseño: diagrama de clases

## Modelo de dominio

```mermaid
classDiagram
    class Usuario {
        +String id
        +String nombre
        +Date fechaAlta
        +exportarDatos() File
        +borrarCuenta() void
    }

    class RegistroAnimo {
        +Date fecha
        +int valor
        +List~String~ factores
        +esBajo() bool
    }

    class EntradaDiario {
        +int id
        +Date fecha
        +String texto
        +List~Distorsion~ patronesDetectados
    }

    class Distorsion {
        +String nombre
        +String patron
        +String sugerencia
    }

    class SesionRespiracion {
        +Date inicio
        +int ciclos
        +Tecnica tecnica
    }

    class Tecnica {
        +String nombre
        +List~FaseRespiracion~ fases
    }

    class FaseRespiracion {
        +String etiqueta
        +int segundos
    }

    class Recomendador {
        +recomendar(animo int) Ejercicio
    }

    class RecursoAyuda {
        +String nombre
        +String telefono
        +bool disponible24h
    }

    Usuario "1" --> "*" RegistroAnimo
    Usuario "1" --> "*" EntradaDiario
    Usuario "1" --> "*" SesionRespiracion
    EntradaDiario "*" --> "*" Distorsion
    SesionRespiracion "*" --> "1" Tecnica
    Tecnica "1" *-- "2..4" FaseRespiracion
    Recomendador ..> RegistroAnimo : usa
    Recomendador ..> Tecnica : sugiere
```

## Flujo del check-in

```mermaid
sequenceDiagram
    actor U as Usuario
    participant UI as Pantalla Inicio
    participant S as RegistroService
    participant R as Recomendador
    U->>UI: Elige ánimo + factores
    UI->>S: guardar(registro)
    S-->>UI: OK
    UI->>R: recomendar(animo)
    R-->>UI: "respiración"
    UI-->>U: Muestra sugerencia
```

## Decisiones de diseño

| Decisión | Motivo |
| --- | --- |
| `Recomendador` aislado del resto | Función pura: fácil de probar (ver [pruebas](../pruebas/analisis_caja_blanca.md)) |
| `Tecnica` definida por datos (fases) | Añadir una técnica nueva no requiere código nuevo |
| `RecursoAyuda` embebido en la app | El SOS funciona sin conexión |
| Detector de patrones con reglas simples | Transparente y explicable, sin enviar texto del diario a ningún servidor |
