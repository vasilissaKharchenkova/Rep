# Implementation Plan

[Overview]
Исправить ошибку "Could not load the 'sharp' module using the win32-x64 runtime" при запуске `nuxt preview` после `git clone` и `npm run build`.

[Types]
Типы не изменяются.

[Files]
Изменяется только `package.json` — в секции `scripts` исправляется `postinstall` скрипт.

**Изменяемые файлы:**
- `package.json` (корень проекта):
  - Заменить строку `"postinstall": "nuxt prepare"` на `"postinstall": "nuxt prepare && node -e \"process.env.npm_config_include_optional='true'; require('child_process').execSync('npm install sharp --include=optional', {stdio:'inherit', cwd:process.cwd()})\""` — более надёжный вариант: добавить отдельный скрипт `postinstall` этапом установки sharp с опциональными зависимостями.

  Либо просто изменить на: `"postinstall": "nuxt prepare && npm install --include=optional sharp"` — но это может вызвать конфликт с lock-файлом. Лучшее решение — добавить в `scripts` поле `"postinstall": "nuxt prepare"` оставить как есть, но переименовать его, и создать отдельный хук, который гарантирует установку нативных биндингов через npm lifecycle.

  **Оптимальное решение:** Изменить скрипт `postinstall` на:
  ```
  "postinstall": "nuxt prepare && npm install --include=optional sharp --no-save"
  ```
  Флаг `--no-save` не добавляет sharp в package.json (он уже там есть), а `--include=optional` заставляет npm установить опциональные зависимости sharp (нативные бинарники под текущую платформу).

[Functions]
Функции не изменяются.

[Classes]
Классы не изменяются.

[Dependencies]
Зависимости не изменяются — `sharp` ^0.34.5 остаётся в `dependencies`. Добавляется только гарантия установки его опциональных (нативных) зависимостей через `postinstall` скрипт.

[Testing]
Проверить, что после `git clone`, `npm install`, `npm run build`, `npm run preview` — сервер запускается без ошибки sharp.

[Implementation Order]
Одна правка в `package.json`:
1. Отредактировать скрипт `postinstall` в `package.json`: `"postinstall": "nuxt prepare && npm install --include=optional sharp --no-save"`