# Trivia de cumpleaños

Una trivia responsive hecha con Vue 3, TypeScript y Vite. Cada partida tiene 23 preguntas, tres opciones por pregunta y 15 segundos para responder. Al elegir una opción, la respuesta queda bloqueada y se muestra si fue correcta antes de continuar. Si se acaba el tiempo, la trivia avanza sin sumar un punto.

## Empezar

Requiere Node.js 20.19+ o 22.12+.

```sh
npm install
npm run dev
```

Para comprobar y generar la versión de producción:

```sh
npm run build
npm run preview
```

## Publicar en GitHub Pages

El workflow `.github/workflows/deploy.yml` publica automáticamente el sitio al hacer push a `main` (también se puede ejecutar manualmente desde Actions). En la configuración del repositorio, abrí **Settings → Pages** y elegí **GitHub Actions** como origen de despliegue.

Una vez completado el workflow, el sitio estará disponible en:
https://carbis1992.github.io/trivia-cumpleanios/

## Personalizar las preguntas

Editá `src/data/questions.ts`. Cada pregunta tiene un invitado, el texto, exactamente tres opciones y el índice de la respuesta correcta (`0` para la primera, `1` para la segunda, `2` para la tercera). Hay 23 preguntas de ejemplo para reemplazar por las de cada invitado.

El último resultado queda guardado en `localStorage` de ese navegador.