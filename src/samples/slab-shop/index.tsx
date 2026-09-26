import { useState } from 'react'
import { product, type CatalogItem } from './mock'
import './slab-shop.css'

const sheetStyle = (index: number, columns = 3, rows = 2) => ({
  backgroundImage: 'url(/media/slab-shop/products.png)',
  backgroundSize: `${columns * 100}% ${rows * 100}%`,
  backgroundPosition: `${(index % columns) * 50}% ${Math.floor(index / columns) * 100}%`,
})

function Stars({ rating }: { rating: number }) {
  return (
    <span className="slab-stars" aria-label={`별점 ${rating}점`}>
      {'★'.repeat(rating)}
      {'☆'.repeat(5 - rating)}
    </span>
  )
}

function ProductImage({ index, label, className = '' }: { index: number; label: string; className?: string }) {
  return (
    <div className={`slab-product-photo ${className}`} role="img" aria-label={label}>
      <span className="slab-product-photo__frame" aria-hidden="true" style={sheetStyle(index)} />
    </div>
  )
}

function RelatedCard({ item }: { item: CatalogItem }) {
  return (
    <article className="slab-related-card">
      <ProductImage index={item.imageIndex} label={item.title} />
      <div className="slab-related-card__body">
        <span>{item.tag}</span>
        <strong>{item.title}</strong>
        <p>{item.subtitle}</p>
        <b>{item.price.toLocaleString('ko-KR')}원</b>
      </div>
    </article>
  )
}

export default function SlabShop() {
  const [activeColor, setActiveColor] = useState(0)
  const [activeSize, setActiveSize] = useState<string | null>(null)
  const [activeImage, setActiveImage] = useState(0)
  const [cartCount, setCartCount] = useState(0)
  const [cartOpen, setCartOpen] = useState(false)
  const [added, setAdded] = useState(false)

  const imageOptions = [
    { index: 0, label: product.title },
    ...product.relatedProducts.slice(0, 3).map(item => ({ index: item.imageIndex, label: item.title })),
  ]
  const discount = Math.round((1 - product.price / product.originalPrice) * 100)

  function handleAddToCart() {
    if (!activeSize) return
    setCartCount(count => count + 1)
    setCartOpen(true)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1300)
  }

  function decreaseCart() {
    setCartCount(count => Math.max(0, count - 1))
  }

  return (
    <div className="sample-slab-shop">
      <header className="slab-nav">
        <a href="#" className="slab-nav__logo">SLAB</a>
        <nav className="slab-nav__links" aria-label="SLAB 쇼핑 메뉴">
          <a href="#products">제품</a>
          <a href="#spec">스펙</a>
          <a href="#review">리뷰</a>
        </nav>
        <button
          className="slab-nav__cart"
          type="button"
          aria-expanded={cartOpen}
          aria-controls="slab-cart-summary"
          onClick={() => setCartOpen(open => !open)}
        >
          장바구니 {cartCount}
        </button>
      </header>

      <main>
        <section className="slab-hero" aria-labelledby="slab-title">
          <div className="slab-gallery">
            <ProductImage index={imageOptions[activeImage].index} label={imageOptions[activeImage].label} className="slab-gallery__main" />
            <div className="slab-gallery__rail" aria-label="제품 이미지 선택">
              {imageOptions.map((image, index) => (
                <button
                  key={image.label}
                  className={`slab-gallery__thumb${activeImage === index ? ' slab-gallery__thumb--active' : ''}`}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  aria-label={`${image.label} 이미지 보기`}
                >
                  <ProductImage index={image.index} label="" />
                </button>
              ))}
            </div>
          </div>

          <div className="slab-buy">
            <p className="slab-buy__path">제품 / 스툴 / 실내외 겸용</p>
            <h1 id="slab-title">{product.title}</h1>
            <p className="slab-buy__subtitle">{product.subtitle}</p>
            <p className="slab-buy__description">{product.description}</p>

            <div className="slab-price">
              <strong>{product.price.toLocaleString('ko-KR')}원</strong>
              <span>{product.originalPrice.toLocaleString('ko-KR')}원</span>
              <em>{discount}%</em>
            </div>

            <div className="slab-control">
              <p>색상: {product.colors[activeColor].name}</p>
              <div className="slab-swatches">
                {product.colors.map((color, index) => (
                  <button
                    key={color.name}
                    type="button"
                    className={`slab-swatch${activeColor === index ? ' slab-swatch--active' : ''}`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => setActiveColor(index)}
                    aria-label={`${color.name} 선택`}
                  />
                ))}
              </div>
            </div>

            <div className="slab-control">
              <p>옵션: {activeSize ?? '선택 필요'}</p>
              <div className="slab-size-grid">
                {product.variants.map(variant => (
                  <button
                    key={variant.size}
                    type="button"
                    className={`slab-size${activeSize === variant.size ? ' slab-size--active' : ''}`}
                    disabled={!variant.available}
                    onClick={() => setActiveSize(variant.size)}
                    aria-pressed={activeSize === variant.size}
                  >
                    {variant.size}
                  </button>
                ))}
              </div>
            </div>

            <button type="button" className="slab-add" onClick={handleAddToCart} disabled={!activeSize}>
              {added ? '장바구니에 담았습니다' : activeSize ? '장바구니 담기' : '옵션을 선택하세요'}
            </button>
            <p className="slab-buy__sku">SKU {product.sku}</p>
            {cartOpen && (
              <aside className="slab-cart-panel" id="slab-cart-summary" aria-label="SLAB 장바구니 요약">
                <div>
                  <strong>장바구니</strong>
                  <button type="button" onClick={() => setCartOpen(false)}>닫기</button>
                </div>
                {cartCount > 0 ? (
                  <div className="slab-cart-line">
                    <span>{product.title}</span>
                    <div>
                      <button type="button" onClick={decreaseCart} aria-label="수량 줄이기">-</button>
                      <b>{cartCount}</b>
                      <button type="button" onClick={() => setCartCount(count => count + 1)} aria-label="수량 늘리기">+</button>
                      <button type="button" onClick={() => setCartCount(0)}>삭제</button>
                    </div>
                  </div>
                ) : (
                  <p>담긴 상품이 없습니다. 옵션을 선택한 뒤 장바구니에 담아보세요.</p>
                )}
              </aside>
            )}
          </div>
        </section>

        <section className="slab-spec" id="spec">
          <h2>오래 쓰는 기준</h2>
          <div className="slab-spec__grid">
            {product.specs.map(spec => (
              <div className="slab-spec__row" key={spec.label}>
                <span>{spec.label}</span>
                <strong>{spec.value}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="slab-related" id="products">
          <div className="slab-section-head">
            <h2>같이 쓰기 좋은 물건</h2>
            <a href="#">전체 보기</a>
          </div>
          <div className="slab-related__grid">
            {product.relatedProducts.map(item => <RelatedCard key={item.id} item={item} />)}
          </div>
        </section>

        <section className="slab-reviews" id="review">
          <div className="slab-section-head">
            <h2>사용 후기</h2>
            <p>평균 4.7 / 5</p>
          </div>
          <div className="slab-reviews__grid">
            {product.reviews.map(review => (
              <article className="slab-review" key={review.id}>
                <div>
                  <strong>{review.author}</strong>
                  {review.verified && <span>구매 확인</span>}
                </div>
                <Stars rating={review.rating} />
                <p>{review.body}</p>
                <time>{review.date}</time>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
