# Portfolio Sample Redesign

Concept image: `docs/redesign/portfolio-concept.png`

## Why generic AI mockups fail here

- They substitute mood words for domain evidence: neon grids for creative technology, generic "studio" typography without project material, and gradient rectangles instead of photography.
- They overuse the same layout grammar: hero, three cards, fake metrics, soft glass panels, and unsupported proof claims.
- They avoid operational detail. A credible portfolio needs selectable works, case metadata, real process images, and controls that reveal the maker's judgment.

## Research sources

- Joshua Pothen, creative technologist portfolio: https://www.joshuapothen.com/
  Decision: Nebula should feel like a working desk and selected-works index, with categories such as creative code, physical computing, immersive light/installation, and tangible project media.
- Aaron Wong-Ellis, creative technologist and artist: https://aaronwongellis.com/
  Decision: Nebula's copy should describe sensors, computer vision, lighting, installations, and actual availability, not abstract sci-fi dashboards.
- Tashkeel Advanced Interactive Art & Technology Workshop: https://tashkeel.org/workshops/art-tech-foundation-masterclass-300526
  Decision: use local workbench imagery for physical computing and show prototyping tools as the visual anchor.
- Flores & Prats / gooood architecture studio installation article: https://www.gooood.cn/emotional-heritage-by-flores-prats.htm
  Decision: Atelier should show model tables, process, drawings, and case details, with studio culture expressed through materials rather than generic client logos.
- Herzog & de Meuron project index: https://www.herzogdemeuron.com/
  Decision: Atelier rows should carry project number, location, discipline, and year in a restrained index, with a selected case panel.
- Dan Watson contact sheet interview: https://uskees.com/blogs/news/5-good-things-dan-watson-manchester-uk
  Decision: Lens should expose the contact-sheet/editing process and keep a black-and-white photographic surface instead of decorative gradients.
- Unsplash monochrome street references used as local assets: https://unsplash.com/fr/photos/une-photo-en-noir-et-blanc-de-personnes-traversant-la-rue-MhPknNEwxRo and https://unsplash.com/es/fotos/una-foto-en-blanco-y-negro-de-una-mujer-mirando-por-una-ventana-rmPwGr6gcwc
  Decision: Lens uses local downloaded black-and-white imagery and native filters/lightbox controls.

## Sample decisions

### `nebula-folio`

- Direction: graphite/lime creative technologist selected works index.
- Interaction: selecting a work row updates a detailed case panel with image, role, summary, production notes, and tools.
- Assets: `public/media/nebula-folio/art-tech-workbench.jpg`, `public/media/nebula-folio/code-installation.jpg`.
- Avoided: neon/purple gradients, glow orbs, fake metrics, terminal sci-fi veneer.

### `atelier-studio`

- Direction: Swiss editorial graphic/architecture studio, true white and red.
- Interaction: project rows select a case panel; studio/process and method sections retain a strict grid.
- Assets: `public/media/atelier-studio/red-model-studio.jpg`, `public/media/atelier-studio/model-assembly.jpg`.
- Avoided: flat color thumbnails, generic client wall, rounded marketing cards.

### `lens-gallery`

- Direction: black-and-white photographer contact sheet.
- Interaction: native category filter buttons update the frame grid; images open a keyboard-navigable lightbox with previous/next/escape.
- Assets: `public/media/lens-gallery/contact-sheet.jpg`, `crosswalk.jpg`, `train-window.jpg`, `city-shadow.jpg`.
- Avoided: gradient placeholders, color-heavy travel-photo mood, inert gallery controls.

## Recommended registry updates

- `nebula-folio`: description could mention "크리에이티브 테크놀로지스트의 물성 기반 작업 인덱스"; style label could remain portfolio/experimental but avoid "neon".
- `atelier-studio`: description could mention "스위스 타이포그래피 기반 건축/그래픽 스튜디오 사례집"; style label could emphasize editorial/Swiss.
- `lens-gallery`: description could mention "흑백 콘택트 시트와 라이트박스를 갖춘 사진가 포트폴리오"; style label could emphasize monochrome/editorial photography.
