    # maketka

Лендинг проекта **Breadboard Maketka** (tKaper) со ссылками на STL-файлы
печатных модульных макетов. Двуязычный (RU/EN) через i18next, стили на
Tailwind. Собирается **локально**, в гит коммитится уже готовый результат —
без GitHub Actions.

## Структура

```
src/            ← исходники (правишь тут)
  index.html
  main.js
  i18n.js       ← переводы RU/EN
  style.css
3D_Models/      ← STL-файлы (сборка их не трогает)
index.html      ← СОБРАННЫЙ, в корне — руками не редактировать
assets/         ← собранные app.css / app.js — руками не редактировать
```

## Рабочий цикл

```bash
npm install      # один раз
npm run dev      # правишь src/, смотришь вживую (hot-reload)
npm run build    # собирает src/ → index.html + assets/ в корень
npm run preview  # финальная проверка собранного из корня
git add -A && git push   # пушишь готовое
```

Коммитим **всё, кроме `node_modules/`**: собранные `index.html` и `assets/`
тоже идут в репозиторий — именно их раздаёт GitHub Pages.

## Деплой

В настройках репозитория один раз:
**Settings → Pages → Source → Deploy from a branch → `main` / `root`**.
Дальше просто пушишь в `main` — Pages подхватывает корень. Actions не нужны.

Пути относительные (`base: './'` в `vite.config.js`), поэтому сайт работает
на `t-kaper.github.io/maketka/` без привязки к имени репозитория.

## STL-файлы

Лежат в `3D_Models/`. Имена должны совпадать с теми, на которые ссылается
страница (см. `3D_Models/README.md`): `small.stl`, `medium.stl`,
`medium_side.stl`, `large.stl`, `large_side.stl`.