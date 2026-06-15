# Implementation Plan

[Overview]
Заменить нативную библиотеку `sharp` на чистую JS-библиотеку `jimp` для устранения ошибки "Could not load the 'sharp' module using the win32-x64 runtime" на разных ПК после git clone.

[Types]
- Удалить тип `OptimizeOptions` из `server/utils/image.ts` (заменяется параметрами jimp)

[Files]
**Изменяемые файлы:**
1. `package.json`:
   - Убрать `sharp` из `dependencies`
   - Убрать `@types/sharp` из `devDependencies`
   - Добавить `jimp` в `dependencies`
   - Исправить `postinstall`: `"postinstall": "nuxt prepare"`
   - Исправить `build`: `"build": "nuxt build"`

2. `server/utils/image.ts`:
   - Заменить `import sharp from 'sharp'` на `import { Jimp } from 'jimp'`
   - Переписать функцию `optimizeImage` с использованием Jimp API:
     - Чтение буфера через `Jimp.read(buffer)`
     - Ресайз с сохранением пропорций (`resize({ w: width })`)
     - Конвертация в WebP с качеством через `.quality(quality).getBuffer('image/webp')`
   - Убрать `OptimizeOptions` (заменяется встроенными типами Jimp)
   - Функция `getWebPFilename` остаётся без изменений

**Удаляемые файлы:** нет

[Functions]
**Изменяемые функции:**
1. `optimizeImage(buffer, options?)` в `server/utils/image.ts`
   - Старая сигнатура: `async function optimizeImage(buffer: Buffer, options: OptimizeOptions): Promise<Buffer>` (использует sharp)
   - Новая сигнатура: `async function optimizeImage(buffer: Buffer, options?: { width?: number; quality?: number }): Promise<Buffer>`
   - Реализация: Jimp.read → resize → quality → getBuffer('image/webp')

2. `getWebPFilename(originalName)` — без изменений

[Classes]
Классы не изменяются.

[Dependencies]
**Удалить:**
- `sharp: "^0.34.5"` из `dependencies`
- `@types/sharp: "^0.31.1"` из `devDependencies`

**Добавить:**
- `jimp: "^1.6.0"` (последняя stable-версия с поддержкой ES modules) в `dependencies`

[Testing]
- Убедиться, что `npm install` проходит без ошибок
- Убедиться, что `npm run build` собирает проект
- Убедиться, что `npm run dev` запускается без ошибок sharp
- Проверить загрузку изображений через админку (менее критично)

[Implementation Order]
1. Установить jimp через npm
2. Удалить sharp и @types/sharp
3. Переписать `server/utils/image.ts`
4. Исправить скрипты в `package.json` (убрать костыли)
5. Проверить сборку
6. Закоммитить и запушить