// Словарь переводов для i18next.
// Значения могут содержать HTML — они вставляются через innerHTML
// (контент наш, доверенный).

export const resources = {
  ru: {
    translation: {
      doc_title: 'maketka — tKaper',
      doc_desc: 'Печатные макеты tKaper: маленький, средний и большой. STL для 3D-печати.',

      nav_idea: 'идея',
      nav_models: 'макеты',
      nav_extensions: 'расширения',
      nav_brackets: 'перемычки',
      nav_github: 'github ↗',

      h1: '<span class="text-neon">Maketka</span><br class="hidden sm:block">модульное решение для китайских макетных плат (<span class="text-mag">breadboard</span>).',
      intro: '<span class="text-slate-200">Breadboard Maketka</span> — модульная система для стандартных макетных плат  с единой крепёжной сеткой <span class="text-neon">15&nbsp;мм</span>. Здесь лежат STL-файлы коннекторов для 3D-печати: три базовых размера, которые можно печатать по отдельности и наращивать друг с другом  боковушками и разными расширениями.',

      tag_stl: 'STL · 3D-печать',
      tag_sizes: '3 размера · S / M / L',
      tag_grid: 'сетка 15 мм',
      tag_modular: 'модульные шины',

      models_h2: '// коннекторы',
      models_hint: 'файлы — в <a class="text-neon" href="https://github.com/t-kaper/maketka/tree/main/3D_Models/STL">/3D_Models/STL</a>',

      small_title: 'Маленький',
      small_desc: 'S-коннектор <span class="text-dim">60 × 45 мм</span>. Базовый блок, печатается одной деталью, без шин.',

      medium_title: 'Средний',
      medium_desc: 'M-коннектор <span class="text-dim">90 × 45 мм</span> <span class="text-neon">+ боковушка</span> <span class="text-mag">(шина 90 × 15 мм, печатать ×2)</span> по бокам.',

      large_title: 'Большой',
      large_desc: 'L-коннектор <span class="text-dim">180 × 45 мм</span> <span class="text-neon">+ боковушка</span> <span class="text-mag">(шина 180 × 15 мм, печатать ×2)</span> по бокам.',

      footer_note: '<span class="text-mag">#</span> Боковушка (шина) — одна деталь, печатается по 2 шт. на размер (M и L). У маленького макета шин нет.',

      extensions_h2: '// расширители',
      extensions_hint: 'нестандартные расширения',
      dop_ugl_s_title: 'Угловой переходник S',
      dop_ugl_m_title: 'Угловой переходник M',
      dop_ugl_desc: 'Переходник для крепления платодержателя под углом через стандартные перемычки.',

      footer_copy: '© tKaper · мастерская / цифровой сад',
      footer_build: 'build ok <span class="text-mag">·</span> stl готовы',

      br_h2: '// перемычки',
      br_hint: 'по сетке <span class="text-neon">15&nbsp;мм</span>',
      br_view: 'просмотр',
      br_view_hint: 'Наведи (или таб) на размер — покажу схему вида сверху на сетке 15 мм: контур детали и отверстия крепления.',
      br_dl: '↓ скачать .stl',
      br_g_i15:  'прямые I · ширина 15 мм, лёгкая полоса',
      br_g_i30:  'прямые I · ширина 30 мм, жёсткая',
      br_g_l:    'углы Г · поворот 90°, ширина 30 мм',
      br_g_node: 'узлы · тройник Т и крест ✕',
      br_g_sq:   'квадратные · плоская накладка',
    },
  },

  en: {
    translation: {
      doc_title: 'maketka — tKaper',
      doc_desc: 'tKaper printable models: small, medium and large. STL files for 3D printing.',

      nav_idea: 'idea',
      nav_models: 'models',
      nav_extensions: 'extensions',    // было nav_extras
      nav_brackets: 'brackets',
      nav_github: 'github ↗',

      h1: '<span class="text-neon">Maketka</span><br class="hidden sm:block">a modular solution for Chinese breadboards (<span class="text-mag">breadboard</span>).',
      intro: '<span class="text-slate-200">Breadboard Maketka</span> is a modular system for standard breadboards with a single <span class="text-neon">15&nbsp;mm</span> mounting grid. Here are the connector STL files for 3D printing: three base sizes that can be printed separately and extended with side strips and different extras.',

      tag_stl: 'STL · 3D printing',
      tag_sizes: '3 sizes · S / M / L',
      tag_grid: '15 mm grid',
      tag_modular: 'modular bus strips',

      models_h2: '// models',
      models_hint: 'files live in <a class="text-neon" href="https://github.com/t-kaper/maketka/tree/main/3D_Models/STL">/3D_Models/STL</a>',

      small_title: 'Small',
      small_desc: 'S-connector <span class="text-dim">60 × 45 mm</span>. Base block, printed as a single part, no bus strips.',

      medium_title: 'Medium',
      medium_desc: 'M-connector <span class="text-dim">90 × 45 mm</span> <span class="text-neon">+ side strip</span> <span class="text-mag">(bus 90 × 15 mm, print ×2)</span> on the sides.',

      large_title: 'Large',
      large_desc: 'L-connector <span class="text-dim">180 × 45 mm</span> <span class="text-neon">+ side strip</span> <span class="text-mag">(bus 180 × 15 mm, print ×2)</span> on the sides.',

      footer_note: '<span class="text-mag">#</span> The side strip (bus) is one part, printed 2× per size (M and L). The small model has no strips.',

      extensions_h2: '// extensions',
      extensions_hint: 'non-standard extensions',
      dop_ugl_s_title: 'Angle adapter S',
      dop_ugl_m_title: 'Angle adapter M',
      dop_ugl_desc: 'Adapter for mounting a plate holder at an angle via standard brackets',

      footer_copy: '© tKaper · workshop / digital garden',
      footer_build: 'build ok <span class="text-mag">·</span> stl ready',

      br_h2: '// brackets',
      br_hint: 'on <span class="text-neon">15&nbsp;mm</span> grid',
      br_view: 'preview',
      br_view_hint: 'Hover (or tab) a size — a top-down schematic on the 15 mm grid: part outline and mounting holes.',
      br_dl: '↓ download .stl',
      br_g_i15:  'straight I · 15 mm wide, light strip',
      br_g_i30:  'straight I · 30 mm wide, rigid',
      br_g_l:    'L-corner · 90° turn, 30 mm wide',
      br_g_node: 'nodes · T-junction and X-cross',
      br_g_sq:   'square · flat plate',
    },
  },
}
