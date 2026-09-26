# Commerce samples redesign notes

## Why AI mockups looked generic

- NN/g notes that vague AI prototyping prompts tend to converge on familiar layouts, sans-serif minimal styling, and generic component choices because tools draw from broad existing UI patterns: https://www.nngroup.com/articles/ai-prototyping/
- NN/g's UX-context design article frames the correction as adding domain context, user goals, and constraints before asking for output: https://www.nngroup.com/articles/ux-context-design/
- Baymard's product-page research emphasizes concrete product imagery, visible variation controls, and product-specific purchase information rather than generic feature blocks: https://baymard.com/research/product-page
- Baymard's product-image article specifically calls out the importance of scale and useful product imagery: https://baymard.com/research-articles/in-scale-product-images
- NN/g's ecommerce product-page guidance reinforces that product pages need text and images that help shoppers judge details and choose: https://www.nngroup.com/articles/ecommerce-product-pages/

## Primary domain references

- MoMA Design Store: https://store.moma.org/
  Used as a reference for design-object commerce where the product is the content. Decision: SLAB uses strong product photography, sparse navigation, and specification rows instead of decorative brutalist geometry.
- HAY / design supply retail as represented through MoMA's HAY merchandising: https://store.moma.org/
  Decision: SLAB focuses on modular utility objects, hard black-white-red contrast, option selection, and material specs.
- NET-A-PORTER: https://www.net-a-porter.com/en-us/
  Decision: Lumiere uses editorial fashion hierarchy, large model/product photography, quiet white/black/olive color, product color swatches, and cart actions.
- Kurly USA / Korean grocery ecommerce: https://www.kurlyglobal.com/ and https://www.kurlyglobal.com/en
  Decision: Fresh uses Korean grocery categories, search-first header, product photo cards, won pricing, sale/local badges, quantity steppers, and bundle suggestions.

## Image generation concept

- Representative concept generated with built-in ImageGen: `C:/Users/admin/.codex/generated_images/01a0df4a-94b9-7b51-94ad-e3696d7b9358/call_djoMd9a0jR9thv79IRxfWhtw.png`
- Asset sheets generated with built-in ImageGen and copied into owned media directories:
  - `public/media/slab-shop/products.png`
  - `public/media/lumiere-store/products.png`
  - `public/media/fresh-market/products.png`

## Per-sample decisions

### slab-shop

- Repositioned as an independent utilitarian objects/design supply shop.
- Replaced sneaker hype mock data with a concrete modular stool product, local manufacturing notes, material specs, option sizes, and related design objects.
- Replaced geometric placeholders with local product photography from `public/media/slab-shop/products.png`.
- Preserved purchase behavior: color selection, size/option selection, disabled unavailable options, add-to-cart gating, cart count, thumbnail switching, reviews.
- Registry recommendation: description should mention `utilitarian object shop / product-detail commerce`; style label should emphasize `black-white-red industrial catalog`.

### lumiere-store

- Repositioned as an independent fashion editorial catalog.
- Replaced tonal placeholder blocks with model/product imagery from `public/media/lumiere-store/products.png`.
- Added a hero product selector, shoppable arrivals, color swatches, service strip, and cart count feedback.
- Kept the brand quiet and editorial: white/black/olive palette, serif headline, no fake metrics or trust logos.
- Registry recommendation: description should mention `fashion editorial catalog with cart`; style label should emphasize `airy editorial / olive monochrome`.

### fresh-market

- Repositioned as a Korean neighborhood grocery catalog.
- Replaced emoji produce with local product photography from `public/media/fresh-market/products.png`.
- Preserved search, category filtering, empty state, add-to-cart, quantity steppers, animated cart total, and deal cards.
- Converted content to Korean grocery products and won pricing.
- Registry recommendation: description should mention `Korean grocery catalog with search/category/cart`; style label should emphasize `plain white neighborhood market`.
