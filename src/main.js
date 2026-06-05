import './style.css'
import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { resources } from './i18n.js'
import { initBrackets } from './brackets.js'

const BASE = import.meta.env.BASE_URL // './' — пути относительные

// Ссылки на STL строим от base-пути, чтобы работало на /maketka/ и локально.
function applyStlLinks() {
  document.querySelectorAll('[data-stl]').forEach((a) => {
    a.setAttribute('href', `${BASE}3D_Models/${a.dataset.stl}`)
  })
}

// Картинки макетов лежат в /models (корень репо), путь строим от base.
// Чтобы поменять картинку — просто подмени файл models/<имя>.svg (или .png).
function applyImgLinks() {
  document.querySelectorAll('[data-img]').forEach((img) => {
    img.setAttribute('src', `${BASE}models/${img.dataset.img}`)
  })
}

function updateToggle() {
  const lng = i18next.language.startsWith('ru') ? 'ru' : 'en'
  document.querySelectorAll('[data-lang]').forEach((btn) => {
    const active = btn.dataset.lang === lng
    btn.classList.toggle('text-neon', active)
    btn.classList.toggle('border-neon/50', active)
    btn.classList.toggle('text-dim', !active)
    btn.setAttribute('aria-pressed', String(active))
  })
}

function translate() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.innerHTML = i18next.t(el.dataset.i18n)
  })

  document.title = i18next.t('doc_title')
  const desc = document.querySelector('meta[name="description"]')
  if (desc) desc.setAttribute('content', i18next.t('doc_desc'))

  document.documentElement.lang = i18next.language.startsWith('ru') ? 'ru' : 'en'
  updateToggle()
  document.dispatchEvent(new Event('i18n:changed'))
}

function bindToggle() {
  document.querySelectorAll('[data-lang]').forEach((btn) => {
    btn.addEventListener('click', () => {
      i18next.changeLanguage(btn.dataset.lang, translate)
    })
  })
}

i18next
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'ru'],
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      lookupQuerystring: 'lng',
      caches: ['localStorage'],
    },
    resources,
    interpolation: { escapeValue: false },
  })
  .then(() => {
    applyStlLinks()
    applyImgLinks()
    bindToggle()
    translate()
    initBrackets()
  })
