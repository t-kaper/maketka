// Каталог перемычек + рендер схемы «вид сверху» на сетке 15 мм.
//
// Единый источник правды по геометрии: index.html только ссылается на файл
// (data-stl), а форма, размеры и отверстия считаются здесь. Деталь плоская и
// лежит на сетке 15 мм, поэтому её достаточно описать набором ячеек 15×15.

const BASE = import.meta.env.BASE_URL
const CELL = 15 // мм — шаг крепёжной сетки

// ── палитра (повтор токенов из style.css, нужны как явные цвета в SVG) ──
const COLOR = { neon: '#39d0d8', mag: '#ff4fa3', dim: '#7b8a98', ink: '#0a0e12' }

// ── примитивы для набора ячеек (координаты в ячейках, 1 ячейка = 15 мм) ──
function rect(cols, rows, ox = 0, oy = 0) {
  const out = []
  for (let c = 0; c < cols; c++)
    for (let r = 0; r < rows; r++) out.push([ox + c, oy + r])
  return out
}

function normalize(cells) {
  const seen = new Set()
  const uniq = []
  for (const [c, r] of cells) {
    const k = c + ',' + r
    if (!seen.has(k)) { seen.add(k); uniq.push([c, r]) }
  }
  const minc = Math.min(...uniq.map((p) => p[0]))
  const minr = Math.min(...uniq.map((p) => p[1]))
  const cells0 = uniq.map(([c, r]) => [c - minc, r - minr])
  const cols = Math.max(...cells0.map((p) => p[0])) + 1
  const rows = Math.max(...cells0.map((p) => p[1])) + 1
  return { cells: cells0, cols, rows }
}

// ── топологии (всё в мм; w — ширина трека в мм) ──
const I = (w, l) => normalize(rect(w / CELL, l / CELL))

const L = (arm, w = 30) => {
  const a = arm / CELL, n = w / CELL
  return normalize([...rect(a, n), ...rect(n, a)]) // горизонт. плечо + вертик. плечо
}

const Lasym = (armH, armV, w = 30) => {
  const n = w / CELL
  return normalize([...rect(armH / CELL, n), ...rect(n, armV / CELL)])
}

const T = (bar, stem, w = 30) => {
  const b = bar / CELL, s = stem / CELL, n = w / CELL
  const ox = Math.round((b - n) / 2)
  return normalize([...rect(b, n, 0, 0), ...rect(n, s, ox, n)]) // балка сверху + ножка вниз
}

const X = (len, w = 30) => {
  const m = len / CELL, n = w / CELL
  const mid = Math.round((m - n) / 2)
  return normalize([...rect(m, n, 0, mid), ...rect(n, m, mid, 0)]) // две скрещённые балки
}

// ── каталог: ключ = имя stl-файла (как в data-stl) ──
function entry(file, kind, accent, name, geom) {
  return [file, { file, kind, accent, name, geom }]
}

const list = [
  // I — прямые, ширина 15 мм (лёгкая полоса)
  entry('STL/br_15_30.STL', 'I', 'neon', 'I · 15×30', I(15, 30)),
  entry('STL/br_15_45.STL', 'I', 'neon', 'I · 15×45', I(15, 45)),
  entry('STL/br_15_60.STL', 'I', 'neon', 'I · 15×60', I(15, 60)),
  // I — прямые, ширина 30 мм (жёсткая)
  entry('STL/br_30.STL',    'I', 'neon', 'I · 30',    I(30, 30)),
  entry('STL/br_30_30.STL', 'I', 'neon', 'I · 30×30', I(30, 30)),
  entry('STL/br_30_45.STL', 'I', 'neon', 'I · 30×45', I(30, 45)),
  entry('STL/br_30_60.STL', 'I', 'neon', 'I · 30×60', I(30, 60)),
  entry('STL/br_30_90.STL', 'I', 'neon', 'I · 30×90', I(30, 90)),
  // Г — угол 90°, ширина 30 мм
  entry('STL/br_L_60.STL',    'L', 'mag', 'Г · 60×60', L(60)),
  // Т / ✕ — узлы
  entry('STL/br_t_90_45.STL', 'T', 'mag', 'Т · 90/45', T(90, 45)),
  entry('STL/br_x_90_90.STL', 'X', 'mag', '✕ · 90×90', X(90)),
  // кв — квадратные
  entry('STL/kr60_60.STL',    'I', 'neon', 'кв · 60×60',   I(60, 60)),
  entry('STL/kr180_180.STL',  'I', 'neon', 'кв · 180×180', I(180, 180)),
]

export const CATALOG = Object.fromEntries(list)

// ── SVG «вид сверху»: контур по сетке + отверстия крепления ──
function svgFor(def) {
  const { cells, cols, rows } = def.geom
  const accent = COLOR[def.accent] || COLOR.neon
  const unit = Math.max(8, Math.min(30, Math.floor(200 / Math.max(cols, rows))))
  const pad = Math.round(unit * 0.55) + 2
  const W = cols * unit + pad * 2
  const H = rows * unit + pad * 2

  const occ = new Set(cells.map(([c, r]) => c + ',' + r))
  const has = (c, r) => occ.has(c + ',' + r)

  let body = ''
  // заливка ячеек + тонкая внутренняя сетка
  for (const [c, r] of cells) {
    const x = pad + c * unit, y = pad + r * unit
    body += `<rect x="${x}" y="${y}" width="${unit}" height="${unit}" fill="${accent}" fill-opacity="0.10" stroke="${accent}" stroke-opacity="0.20" stroke-width="1"/>`
  }
  // отверстия крепления в центре каждой ячейки (нет для заглушки)
  if (def.kind !== 'cap') {
    for (const [c, r] of cells) {
      const cx = pad + c * unit + unit / 2, cy = pad + r * unit + unit / 2
      body += `<circle cx="${cx}" cy="${cy}" r="${(unit * 0.16).toFixed(1)}" fill="${COLOR.ink}" stroke="${accent}" stroke-opacity="0.65" stroke-width="1"/>`
    }
  }
  // внешний контур: рёбра ячеек без соседа
  let edges = ''
  for (const [c, r] of cells) {
    const x = pad + c * unit, y = pad + r * unit
    if (!has(c - 1, r)) edges += `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + unit}"/>`
    if (!has(c + 1, r)) edges += `<line x1="${x + unit}" y1="${y}" x2="${x + unit}" y2="${y + unit}"/>`
    if (!has(c, r - 1)) edges += `<line x1="${x}" y1="${y}" x2="${x + unit}" y2="${y}"/>`
    if (!has(c, r + 1)) edges += `<line x1="${x}" y1="${y + unit}" x2="${x + unit}" y2="${y + unit}"/>`
  }
  body += `<g stroke="${accent}" stroke-width="2" stroke-linecap="square">${edges}</g>`

  return `<svg viewBox="0 0 ${W} ${H}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${def.name}">${body}</svg>`
}

// ── панель просмотра ──
let current = null

function dimsText(def) {
  const ru = document.documentElement.lang === 'ru'
  const mm = ru ? 'мм' : 'mm'
  const { cols, rows, cells } = def.geom
  const holes = def.kind === 'cap' ? 0 : cells.length
  const box = `${cols * CELL}×${rows * CELL} ${mm}`
  const grid = `${cols}×${rows}`
  if (def.kind === 'cap') return ru ? `габарит ${box} · ${grid}` : `bbox ${box} · ${grid}`
  return ru
    ? `габарит ${box} · сетка ${grid} · отв. ${holes}`
    : `bbox ${box} · grid ${grid} · holes ${holes}`
}

function show(def) {
  if (!def) return
  current = def
  const svg = document.getElementById('brk-svg')
  const name = document.getElementById('brk-name')
  const dims = document.getElementById('brk-dims')
  const dl = document.getElementById('brk-dl')
  if (svg) svg.innerHTML = svgFor(def)
  if (name) name.textContent = def.name
  if (dims) dims.textContent = dimsText(def)
  if (dl) {
    dl.setAttribute('href', `${BASE}3D_Models/${def.file}`)
    dl.classList.remove('hidden')
  }
}

export function initBrackets() {
  const root = document.getElementById('brk-list')
  if (!root) return

  const pick = (el) => {
    const a = el && el.closest('[data-stl]')
    if (!a) return
    const def = CATALOG[a.dataset.stl]
    if (def) show(def)
  }

  root.addEventListener('pointerover', (e) => pick(e.target))
  root.addEventListener('focusin', (e) => pick(e.target))

  // стартовая деталь — первая в списке
  const first = root.querySelector('[data-stl]')
  if (first) {
    const def = CATALOG[first.dataset.stl]
    if (def) show(def)
  }

  // перерисовать подпись при смене языка (мм/mm)
  document.addEventListener('i18n:changed', () => current && show(current))
}
