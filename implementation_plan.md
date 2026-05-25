# Implementation Plan

Добавление динамического счётчика вопросов о товаре (`questionsCount`) в карточку товара и исправление битой сборки API.

Текущая функциональность вопросов полностью работает: пользователи могут задавать вопросы, админ может отвечать на них через админ-панель, ответы отображаются под вопросом. Однако в карточке товара на табе "Вопросы о товаре" счётчик жёстко зашит как `(0)` — его нужно сделать динамическим, как это сделано для отзывов (`reviewsCount`). Также обнаружена критическая проблема: файл `server/api/questions.post.ts` повреждён — в конце содержит остаток XML-тега `</write_to_file>`, что вызывает ошибку сборки Nitro ("Unterminated regular expression").

[Types]
Добавление одного поля в существующие интерфейсы.

- `IProduct.questionsCount: number` — количество вопросов для товара (аналогично `reviewsCount`), добавляется в Mongoose-схему и интерфейс
- `Product.questionsCount: number` — добавляется в интерфейс на фронте (composable `useProducts.ts`)
- `QuestionData` — без изменений

[Files]
Изменение 5 существующих файлов, создание 1 нового seed-скрипта.

### Изменяемые файлы:

1. **`server/models/Product.ts`** (существующий)
   - Добавить поле `questionsCount: { type: Number, default: 0 }` в схему и интерфейс `IProduct`

2. **`server/api/questions.post.ts`** (существующий) 
   - **Исправить битый файл**: удалить мусор `</write_to_file>` в конце
   - После создания вопроса добавить `await Product.findOneAndUpdate({ id: body.productId }, { $inc: { questionsCount: 1 } })`

3. **`server/api/questions/[id].delete.ts`** (существующий)
   - После удаления вопроса добавить `await Product.findOneAndUpdate({ id: question.productId }, { $inc: { questionsCount: -1 } })`

4. **`server/api/questions/[id].put.ts`** (существующий)
   - Без изменений (ответ админа не меняет количество вопросов)

5. **`composables/useProducts.ts`** (существующий)
   - Добавить поле `questionsCount: number` в тип `Product`

6. **`pages/product/[id].vue`** (существующий)
   - Строка 252: заменить `Вопросы о товаре (0)` на динамическое значение:
     `Вопросы о товаре ({{ product?.questionsCount || 0 }})`

### Новый файл:

7. **`server/scripts/seed-questions-count.ts`** (новый, опциональный seed-скрипт)
   - Для продакшена: подсчитать актуальное количество вопросов для каждого товара и обновить поле `questionsCount` в Product

[Functions]
Модификация 3 существующих serverless-функций, без новых и удалённых.

### Модифицируемые:

1. **`server/api/questions.post.ts` — default export handler**
   - Текущая сигнатура: `defineEventHandler(async (event) => {...})`
   - Изменение: после `Question.create()` добавить `$inc: { questionsCount: 1 }` для соответствующего Product
   - Дополнительно: исправить битый синтаксис (удалить `</write_to_file>` из конца файла)

2. **`server/api/questions/[id].delete.ts` — default export handler**
   - Текущая сигнатура: `defineEventHandler(async (event) => {...})`
   - Изменение: перед удалением вопроса получить его `productId`, затем удалить, затем сделать `$inc: { questionsCount: -1 }`

[Classes]
Без изменений классов.

[Dependencies]
Без изменений зависимостей.

[Testing]
Ручное тестирование.

- Перезапустить dev-сервер, убедиться, что ошибка сборки "Unterminated regular expression" исчезла
- Открыть карточку товара, переключиться на таб "Вопросы о товаре", проверить что вместо `(0)` отображается реальное количество вопросов
- Создать новый вопрос как пользователь — счётчик должен увеличиться
- Удалить вопрос (как админ или автор) — счётчик должен уменьшиться
- Проверить что ответ админа не влияет на счётчик

[Implementation Order]
Все изменения могут быть выполнены последовательно, каждая операция атомарна и не конфликтует с другими.

1. Исправить битый файл `server/api/questions.post.ts` — удалить мусор `</write_to_file>` и сразу добавить инкремент `questionsCount`
2. Обновить `server/models/Product.ts` — добавить поле `questionsCount` в схему и интерфейс
3. Обновить `server/api/questions/[id].delete.ts` — добавить декремент `questionsCount`
4. Обновить `composables/useProducts.ts` — добавить `questionsCount` в тип `Product`
5. Обновить `pages/product/[id].vue` — заменить хардкод `(0)` на динамическое значение
6. Перезапустить dev-сервер и проверить сборку