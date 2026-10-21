---
name: react-web-development
description: "Desarrolla y modifica aplicaciones web con React aplicando buenas prácticas, accesibilidad y pruebas antes de terminar. Úsalo para implementar componentes, páginas, rutas, formularios, estado, estilos o corregir errores en proyectos React."
---

# Desarrollo web con React

Implementa cambios React mantenibles, accesibles y verificados. No declares una tarea terminada sin probar el cambio y comunicar qué verificaciones se ejecutaron.

## Flujo de trabajo

1. **Entender el proyecto**
   - Inspecciona los archivos involucrados, la estructura y los patrones ya usados antes de editar.
   - Revisa `package.json` para confirmar el stack, los comandos y las herramientas de prueba disponibles.
   - Identifica los comportamientos existentes que deben conservarse y los casos que podrían romperse.
2. **Planear la solución**
   - Elige el cambio más pequeño que resuelva el problema completo; reutiliza componentes, estilos y utilidades existentes.
   - Considera estados de carga, vacío, error y éxito cuando correspondan.
   - Para requisitos ambiguos que cambien la experiencia o el alcance, pide una aclaración antes de decidir.
3. **Implementar**
   - Mantén los componentes enfocados y divide la interfaz en componentes reutilizables cuando aporte claridad.
   - Usa estado y efectos de React solo cuando sean necesarios; evita estado duplicado y efectos para valores que puedan calcularse durante el renderizado.
   - Conserva las convenciones de nombres, formato, estructura, idioma y estilos del proyecto.
   - Usa elementos HTML semánticos, etiquetas asociadas a los controles, navegación por teclado y estados de foco visibles.
   - Evita dependencias nuevas si el cambio puede resolverse con las herramientas existentes.
4. **Probar antes de terminar**
   - Busca y ejecuta las pruebas automatizadas relevantes existentes; añade o actualiza pruebas para el comportamiento nuevo o corregido cuando el proyecto tenga un runner configurado.
   - Ejecuta también la compilación o verificación de tipos/lint que corresponda y esté disponible en el proyecto.
   - Comprueba los flujos afectados, incluidos casos límite y errores previsibles. Para cambios de interfaz, verifica el renderizado y la interacción de los controles en un navegador cuando haya herramientas disponibles; si no, realiza una comprobación manual equivalente.
   - Si no existe infraestructura de pruebas, no afirmes que las pruebas automatizadas pasaron: realiza las verificaciones disponibles, explica la limitación y recomienda cómo habilitar pruebas automatizadas si son necesarias. No agregues dependencias de pruebas sin que el alcance lo permita.
   - Si una prueba falla, investiga y corrige los problemas causados por el cambio; vuelve a ejecutar las verificaciones relevantes. No ocultes fallos ni los describas como exitosos.
5. **Cerrar la tarea**
   - Revisa el diff para detectar cambios accidentales, regresiones o código innecesario.
   - Resume los archivos o comportamientos modificados y enumera las pruebas/comandos ejecutados con su resultado.
   - Informa claramente de las verificaciones que no pudieron ejecutarse. No marques como terminado un cambio sin probarlo.

## Criterios de calidad

- Sigue las APIs y patrones recomendados por la versión de React y las bibliotecas presentes en el proyecto.
- Usa claves estables al renderizar listas y evita mutar directamente el estado.
- Maneja errores de forma explícita; no uses valores de éxito ficticios ni captures errores silenciosamente.
- Mantén la interfaz responsive y accesible, y respeta las preferencias de movimiento reducido cuando corresponda.
- No cambies comportamiento no relacionado con la solicitud. Añade comentarios solo para decisiones no evidentes.
