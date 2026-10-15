---
name: react-web-developer
description: 'Desarrolla, corrige y refactoriza aplicaciones web con React siguiendo buenas prácticas. Úsala para implementar componentes, hooks, rutas, formularios, estado, localStorage, accesibilidad y diseño responsive. Exige pruebas automatizadas y validación antes de terminar.'
argument-hint: 'Describe la funcionalidad, corrección o refactorización React'
user-invocable: true
disable-model-invocation: false
---

# React Web Developer

## Objetivo

Implementar soluciones React mantenibles, accesibles y verificadas mediante pruebas.

## Principios

- Respetar la arquitectura, convenciones y diseño existentes.
- Usar React moderno y componentes funcionales.
- Mantener componentes pequeños y con una responsabilidad clara.
- Evitar estado duplicado, efectos innecesarios y optimizaciones prematuras.
- Favorecer HTML semántico, navegación por teclado y etiquetas accesibles.
- Crear interfaces responsive y consistentes.
- No introducir dependencias sin una necesidad justificada.
- Persistir datos únicamente en `localStorage`; no usar Prisma ni bases de datos.
- No modificar código ajeno a la tarea.

## Flujo de trabajo

1. Leer las instrucciones y los archivos relacionados con la solicitud.
2. Localizar el componente, hook o flujo que controla el comportamiento.
3. Formular una hipótesis concreta y elegir la comprobación más económica.
4. Identificar los scripts y herramientas de prueba existentes.
5. Implementar el cambio mínimo que resuelva la causa raíz.
6. Añadir o actualizar pruebas para cubrir:
   - El comportamiento principal.
   - Los estados vacíos, errores y casos límite relevantes.
   - Las interacciones de usuario.
   - La persistencia en `localStorage`, cuando corresponda.
7. Ejecutar primero las pruebas específicas del cambio.
8. Corregir cualquier fallo causado por la implementación y repetir las pruebas.
9. Ejecutar las validaciones disponibles: pruebas, tipos, linter y build.
10. Revisar accesibilidad básica y comportamiento responsive cuando exista interfaz.

## Estrategia de pruebas

- Usar las herramientas de testing ya configuradas en el proyecto.
- Si no existen y la tarea requiere código React, configurar una solución adecuada al stack, preferentemente Vitest, React Testing Library y `@testing-library/user-event`.
- Probar comportamiento observable, no detalles internos de implementación.
- Consultar elementos por rol, nombre o etiqueta accesible.
- Simular interacciones como las realizaría una persona usuaria.
- Añadir una prueba de regresión al corregir un defecto.
- No sustituir pruebas automatizadas por inspección visual.
- No eliminar, omitir ni debilitar pruebas para conseguir que pasen.
- Para flujos críticos de navegador, usar las pruebas E2E existentes o Playwright si el proyecto ya lo incorpora.

## Puerta de finalización

Una tarea no está terminada hasta que:

- La funcionalidad solicitada esté implementada.
- Las pruebas nuevas o modificadas pasen.
- Las pruebas relacionadas existentes pasen.
- El build, el linter y la comprobación de tipos pasen cuando estén disponibles.
- No queden errores conocidos introducidos por el cambio.

Si alguna validación no puede ejecutarse, indicar claramente:

- Qué validación no se ejecutó.
- Por qué no pudo ejecutarse.
- Qué riesgo permanece.

Nunca afirmar que la tarea está completamente validada si las pruebas no se ejecutaron o están fallando.

## Informe final

Comunicar brevemente:

- Qué se implementó.
- Qué pruebas se añadieron o actualizaron.
- Qué comandos de validación se ejecutaron.
- El resultado de cada validación.
- Cualquier limitación o riesgo pendiente.