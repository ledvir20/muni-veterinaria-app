# inertia-permission-react

Aplicación de ejemplo basada en Laravel + Inertia + React. Provee gestión de usuarios, roles, permisos y funcionalidad adicional (2FA, tareas, etc.) con patrones y componentes reutilizables.

## Requisitos

- PHP >= 8.4
- Node.js (compatibilidad con Vite)
- Composer
- Herd (Laravel Herd) para servir la app en local

## Instalación (rápida)

1. Instalar dependencias PHP:
   composer install
2. Instalar dependencias JS:
   npm install
3. Ejecutar el servidor de desarrollo:
   npm run dev
   o para compilar:
   npm run build
4. (Opcional) Ejecutar tests:
   php artisan test --filter=...  
   o revisar configuración en [tests/Pest.php](tests/Pest.php)

## Desarrollo frontend

- Entrada principal: [resources/js/app.tsx](resources/js/app.tsx) — Inertia + React app.
- Resolución de páginas vía Vite/Inertia (`resolvePageComponent`) y wayfinder (ver [vite.config.ts](vite.config.ts)).
- Archivos importantes:
    - Layouts y páginas: [resources/js/pages/welcome.tsx](resources/js/pages/welcome.tsx), [resources/js/pages/tasks/index.tsx](resources/js/pages/tasks/index.tsx)
    - Hooks: [`useTwoFactorAuth`](resources/js/hooks/use-two-factor-auth.ts), [`useInitials`](resources/js/hooks/use-initials.tsx)
    - Tipos globales: [resources/js/types/index.d.ts](resources/js/types/index.d.ts)
    - Utilidades: [`cn`, `toUrl`](resources/js/lib/utils.ts)
- SSR y configuración Inertia: [config/inertia.php](config/inertia.php) y vista base [resources/views/app.blade.php](resources/views/app.blade.php).

## Flujo de datos / Formularios

- Se usa Inertia v2 / React Forms (ej.: páginas de tareas usan `Form` y controladores desde el backend). Ver ejemplo de lista y eliminación en [resources/js/pages/tasks/index.tsx](resources/js/pages/tasks/index.tsx).

## Tests

- Pest está configurado (ver [tests/Pest.php](tests/Pest.php)).
- Siga las reglas de pruebas en `.junie/guidelines.md` para creación y ejecución de pruebas: [.junie/guidelines.md](.junie/guidelines.md).

## Scripts útiles (package.json)

- npm run dev — modo desarrollo (Vite)
- npm run build — build de producción
- composer run dev — shim para pipelines Laravel (ver `.junie/guidelines.md` si hay errores de Vite)

## Notas y convenciones del proyecto

- Siga las guías internas en [.junie/guidelines.md](.junie/guidelines.md).
- Uso de Wayfinder configurado en [vite.config.ts](vite.config.ts) para rutas tipadas.
- Componentes UI y patterns reutilizables en `resources/js/components` y `resources/js/layouts`.

## Estructura relevante

- [resources/js/app.tsx](resources/js/app.tsx)
- [resources/js/pages/welcome.tsx](resources/js/pages/welcome.tsx)
- [resources/js/pages/tasks/index.tsx](resources/js/pages/tasks/index.tsx)
- [resources/js/hooks/use-two-factor-auth.ts](resources/js/hooks/use-two-factor-auth.ts)
- [resources/js/hooks/use-initials.tsx](resources/js/hooks/use-initials.tsx)
- [resources/js/types/index.d.ts](resources/js/types/index.d.ts)
- [resources/js/lib/utils.ts](resources/js/lib/utils.ts)
- [vite.config.ts](vite.config.ts)
- [config/inertia.php](config/inertia.php)
- [resources/views/app.blade.php](resources/views/app.blade.php)
- [.junie/guidelines.md](.junie/guidelines.md)
- [tests/Pest.php](tests/Pest.php)
