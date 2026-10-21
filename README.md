## Instalar dependencias

```sh
npm install
```

## Iniciar el servidor de desarrollo

```sh
npm run dev
```

Para exponer el servidor en la red local:

```sh
npm run dev -- --host 0.0.0.0
```

## Pruebas

Ejecutar las pruebas una vez:

```sh
npm run test:run
```

Ejecutar las pruebas y generar el reporte de cobertura:

```sh
npm run test:coverage
```

## Preferencia de tema

El botón de la esquina superior alterna entre modo claro y oscuro. La preferencia se conserva
temporalmente en el almacenamiento de sesión del navegador y se restablece al iniciar una sesión nueva.