---
name: react-unit-testing
description: "Diseña, escribe, ejecuta y mejora pruebas unitarias y de componentes para React con buenas prácticas. Úsalo al probar componentes, hooks, formularios, eventos, estados, errores, accesibilidad o lógica de interfaz, y al diagnosticar pruebas fallidas."
---

# Pruebas unitarias expertas para React

Escribe pruebas confiables que validen el comportamiento observable de la interfaz y la lógica, no detalles internos de implementación. No des por terminada una tarea de pruebas sin ejecutar las pruebas relevantes e informar el resultado.

## Procedimiento

1. **Reconocer el entorno**
   - Lee `package.json`, la configuración del runner, la estructura de pruebas y ejemplos existentes antes de elegir comandos o patrones.
   - Identifica versiones instaladas de React y de las herramientas de testing.
   - Reutiliza el runner y las convenciones existentes. En proyectos Vite sin runner configurado, recomienda Vitest con React Testing Library y `user-event` como opción compatible, pero no instales paquetes ni edites dependencias sin que el alcance lo autorice.
2. **Definir qué comprobar**
   - Deriva casos de los requisitos y del comportamiento visible: renderizado inicial, acciones del usuario, cambios de estado, validación, rutas, estados de carga/vacío/error/éxito y casos límite pertinentes.
   - Prioriza casos de alto riesgo y regresiones relevantes; evita pruebas redundantes que solo aumenten el mantenimiento.
   - Para lógica pura, prueba entradas y salidas incluyendo límites y datos inválidos. Para componentes, prueba el contrato público y sus resultados visibles.
3. **Escribir pruebas mantenibles**
   - Consulta elementos por rol y nombre accesible con `getByRole`, `findByRole` y consultas accesibles equivalentes; usa etiquetas, texto o `data-testid` solo cuando sea necesario.
   - Simula interacciones reales con `user-event` cuando esté disponible. Comprueba formularios, teclado y accesibilidad en los flujos relacionados.
   - Usa `findBy*` o `waitFor` para resultados asíncronos; evita esperas arbitrarias con temporizadores.
   - Aísla el sistema externo en sus límites. Mockea módulos, red, reloj o almacenamiento solo cuando sea necesario y restaura mocks entre pruebas.
   - Mantén cada prueba enfocada, con preparación clara, acción y aserciones significativas. Usa datos deterministas y limpieza consistente.
4. **Evitar pruebas frágiles**
   - No afirmes sobre estado interno, nombres de funciones privadas, estructura DOM incidental, clases CSS irrelevantes ni número de llamadas si eso no forma parte del contrato.
   - Evita snapshots extensos como sustituto de aserciones de comportamiento, mocks excesivos y pruebas que simplemente repiten la implementación.
   - No ocultes errores con `catch` vacíos, aserciones débiles o pruebas marcadas como omitidas sin explicar el motivo.
5. **Ejecutar y diagnosticar**
   - Ejecuta primero las pruebas nuevas o afectadas usando el comando real del proyecto y luego amplía al conjunto relevante.
   - Si fallan, distingue entre defecto de producto, defecto de prueba y problema del entorno; inspecciona el mensaje y corrige la causa, no el síntoma.
   - Ejecuta de nuevo las pruebas después de corregir. Ejecuta la compilación u otras verificaciones del proyecto cuando sean relevantes.
   - Si no hay runner configurado, no afirmes que las pruebas pasaron ni añadas infraestructura sin autorización. Indica la limitación y el comando o configuración necesarios como siguiente paso.
6. **Informar**
   - Resume los casos cubiertos y reporta los comandos ejecutados con resultados claros.
   - Menciona fallos pendientes, limitaciones de entorno y pruebas que no se pudieron ejecutar. No declares la tarea verificada si no ejecutaste las pruebas.

## Buenas prácticas adicionales

- Comprueba accesibilidad mediante roles, nombres accesibles, etiquetas y navegación por teclado en los flujos relevantes.
- Para contexto de providers o rutas, usa el wrapper mínimo necesario que refleje el uso real del componente.
- Evita compartir estado mutable entre pruebas; cada caso debe poder ejecutarse de forma independiente.
- No impongas metas arbitrarias de cobertura. Usa cobertura para detectar áreas sin verificar y prioriza la importancia del comportamiento.
- Mantén los cambios de pruebas en el alcance solicitado y no modifiques la lógica de producción para satisfacer una prueba que no representa un requisito real.
