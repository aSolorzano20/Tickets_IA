# Instrucciones de desarrollo

## Stack y estructura
- El proyecto usa React 19, React Router 7 y Vite 6.
- La interfaz está escrita en JavaScript con JSX.
- La aplicación y sus componentes están en `src/`; los estilos globales están en `src/styles.css`.
- Revisa los patrones existentes y reutilízalos antes de añadir dependencias o abstracciones.

## Convenciones de código
- Usa `camelCase` para variables y funciones, y `PascalCase` para componentes de React.
- Escribe en inglés los nombres de variables, funciones y componentes.
- Mantén el texto visible de la interfaz en español.
- Mantén los cambios pequeños y enfocados, preservando el comportamiento existente.

## Interfaz y estilos
- Mantén una interfaz clara, adaptable y accesible, con colores suaves y buen contraste.
- Reutiliza los estilos y patrones definidos en `src/styles.css`.
- El proyecto usa CSS convencional y no tiene TailwindCSS configurado. No uses clases Tailwind ni lo añadas como dependencia sin configurarlo explícitamente.

## Datos y seguridad
- No añadas Prisma, bases de datos ni servicios externos de persistencia; usa `localStorage` cuando se necesite persistencia local.
- Cualquier consulta, petición o comando dirigido a una base de datos requiere aprobación previa. No lo ejecutes; indica qué tendría que ejecutarse.

## Comandos
- Instalar dependencias: `npm install` (primera instalación o después de cambios en dependencias).
- Iniciar el servidor de desarrollo: `npm run dev`.
- Generar la compilación de producción: `npm run build`.
- Ejecutar las pruebas unitarias: `npm run test:run`.
- Ejecutar las pruebas con reporte de cobertura: `npm run test:coverage`.

## Verificación
- Ejecuta las pruebas relevantes y `npm run build` para comprobar los cambios.
- La cobertura de `src/` excluye intencionalmente el punto de entrada `src/main.jsx`.
- Si modificas dependencias, actualiza `package-lock.json`.
