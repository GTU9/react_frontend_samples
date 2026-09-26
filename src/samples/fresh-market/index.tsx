import { useCallback, useEffect, useRef, useState } from 'react'
import { categories, deals, products, type Category, type Deal, type Product } from './mock'
import './fresh-market.css'

const productImageStyle = (index: number) => ({
  backgroundImage: 'url(/media/fresh-market/products.png)',
  backgroundSize: '400% 300%',
  backgroundPosition: `${(index % 4) * 33.3333}% ${Math.floor(index / 4) * 50}%`,
})

function CountUp({ value }: { value: number }) {
  const [displayed, setDisplayed] = useState(value)
  const previous = useRef(value)

  useEffect(() => {
    const start = previous.current
    const end = value
    previous.current = value
    if (start === end) return

    let frame = 0
    const frames = 18
    function tick() {
      frame += 1
      const t = frame / frames
      setDisplayed(Math.round(start + (end - start) * (1 - Math.pow(1 - t, 3))))
      if (frame < frames) window.requestAnimationFrame(tick)
    }
    window.requestAnimationFrame(tick)
  }, [value])

  return <>{displayed.toLocaleString('ko-KR')}원</>
}

function Icon({ type }: { type: Category['icon'] }) {
  if (type === 'grid') return <span className="fm-icon fm-icon--grid" />
  if (type === 'wave') return <span className="fm-icon fm-icon--wave" />
  if (type === 'cut') return <span className="fm-icon fm-icon--cut" />
  if (type === 'box') return <span className="fm-icon fm-icon--box" />
  if (type === 'bag') return <span className="fm-icon fm-icon--bag" />
  if (type === 'circle') return <span className="fm-icon fm-icon--circle" />
  return <span className="fm-icon fm-icon--leaf" />
}

function Badge({ type }: { type: Product['badge'] }) {
  if (!type) return null
  const labels = { sale: '할인', new: '신상', local: '동네' }
  return <span className={`fm-badge fm-badge--${type}`}>{labels[type]}</span>
}

function ProductPhoto({ product, className = '' }: { product: Product; className?: string }) {
  return (
    <div className={`fm-product-photo ${className}`} role="img" aria-label={product.name}>
      <span className="fm-product-photo__frame" aria-hidden="true" style={productImageStyle(product.imageIndex)} />
    </div>
  )
}

function Stepper({ count, onInc, onDec }: { count: number; onInc: () => void; onDec: () => void }) {
  return (
    <div className="fm-stepper">
      <button type="button" onClick={onDec} aria-label="하나 빼기">-</button>
      <span>{count}</span>
      <button type="button" onClick={onInc} aria-label="하나 추가">+</button>
    </div>
  )
}

function ProductCard({
  product,
  qty,
  onAdd,
  onInc,
  onDec,
}: {
  product: Product
  qty: number
  onAdd: () => void
  onInc: () => void
  onDec: () => void
}) {
  return (
    <article className="fm-product-card">
      <div className="fm-product-card__image">
        <ProductPhoto product={product} />
        <Badge type={product.badge} />
      </div>
      <div className="fm-product-card__body">
        <strong>{product.name}</strong>
        <p>★ {product.rating} ({product.reviewCount})</p>
        <div className="fm-price-row">
          <b>{product.price.toLocaleString('ko-KR')}원</b>
          {product.originalPrice && <span>{product.originalPrice.toLocaleString('ko-KR')}원</span>}
          <em>{product.unit}</em>
        </div>
      </div>
      <div className="fm-product-card__action">
        {qty === 0 ? (
          <button type="button" className="fm-add-btn" onClick={onAdd}>담기</button>
        ) : (
          <Stepper count={qty} onInc={onInc} onDec={onDec} />
        )}
      </div>
    </article>
  )
}

function DealCard({ deal }: { deal: Deal }) {
  const product = products.find(item => item.imageIndex === deal.imageIndex) ?? products[0]
  return (
    <article className="fm-deal-card">
      <ProductPhoto product={product} />
      <div>
        <strong>{deal.title}</strong>
        <p>{deal.subtitle}</p>
      </div>
      <span>{deal.discount}</span>
    </article>
  )
}

export default function FreshMarket() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [cart, setCart] = useState<Record<string, number>>({})
  const [cartOpen, setCartOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const addToCart = useCallback((id: string) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }))
    setCartOpen(true)
  }, [])

  const incQty = useCallback((id: string) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }))
  }, [])

  const decQty = useCallback((id: string) => {
    setCart(prev => {
      const next = (prev[id] ?? 0) - 1
      if (next <= 0) {
        const copy = { ...prev }
        delete copy[id]
        return copy
      }
      return { ...prev, [id]: next }
    })
  }, [])

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => {
      const next = { ...prev }
      delete next[id]
      return next
    })
  }, [])

  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0)
  const totalPrice = products.reduce((sum, product) => sum + (cart[product.id] ?? 0) * product.price, 0)
  const visible = products.filter(product => {
    const categoryMatches = activeCategory === 'all' || product.category === activeCategory
    const searchMatches = product.name.includes(searchQuery.trim())
    return categoryMatches && searchMatches
  })

  return (
    <div className="sample-fresh-market">
      <header className="fm-topbar">
        <a href="#" className="fm-logo">동네식탁</a>
        <form
          className="fm-search"
          onSubmit={event => {
            event.preventDefault()
            document.getElementById('catalog')?.scrollIntoView({ block: 'start' })
          }}
        >
          <input
            value={searchQuery}
            onChange={event => setSearchQuery(event.target.value)}
            placeholder="어떤 상품을 찾으시나요?"
            aria-label="상품 검색"
          />
          <button type="submit" aria-label="검색">검색</button>
        </form>
        <button
          type="button"
          className="fm-cart"
          aria-expanded={cartOpen}
          aria-controls="fresh-cart-summary"
          onClick={() => setCartOpen(open => !open)}
        >
          장바구니 {totalItems}
        </button>
      </header>

      <main>
        <section className="fm-hero">
          <div className="fm-hero__copy">
            <h1>오늘 들어온 동네 장보기</h1>
            <p>채소, 정육, 간편식까지 바로 담아 보세요.</p>
            <a href="#catalog">오늘 장보기</a>
          </div>
          <ProductPhoto product={products[0]} className="fm-hero__photo" />
        </section>

        <section className="fm-categories" aria-label="상품 카테고리">
          {categories.map(category => (
            <button
              key={category.id}
              type="button"
              className={activeCategory === category.id ? 'is-active' : ''}
              onClick={() => setActiveCategory(category.id)}
            >
              <Icon type={category.icon} />
              {category.label}
            </button>
          ))}
        </section>

        <section className="fm-catalog" id="catalog">
          <div className="fm-section-head">
            <h2>{activeCategory === 'all' ? '오늘의 추천' : categories.find(category => category.id === activeCategory)?.label}</h2>
            <span>{visible.length}개</span>
          </div>

          {visible.length > 0 ? (
            <div className="fm-product-grid">
              {visible.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  qty={cart[product.id] ?? 0}
                  onAdd={() => addToCart(product.id)}
                  onInc={() => incQty(product.id)}
                  onDec={() => decQty(product.id)}
                />
              ))}
            </div>
          ) : (
            <div className="fm-empty">
              <p>"{searchQuery}"에 해당하는 상품이 없습니다.</p>
            </div>
          )}
        </section>

        {cartOpen && (
          <section className="fm-cart-panel" id="fresh-cart-summary" aria-label="동네식탁 장바구니 요약">
            <div className="fm-cart-panel__head">
              <h2>장바구니</h2>
              <button type="button" onClick={() => setCartOpen(false)}>닫기</button>
            </div>
            {totalItems > 0 ? (
              <div className="fm-cart-panel__items">
                {products.filter(product => cart[product.id]).map(product => (
                  <article key={product.id} className="fm-cart-line">
                    <ProductPhoto product={product} />
                    <div>
                      <strong>{product.name}</strong>
                      <span>{(product.price * (cart[product.id] ?? 0)).toLocaleString('ko-KR')}원</span>
                    </div>
                    <div className="fm-cart-line__actions">
                      <button type="button" onClick={() => decQty(product.id)} aria-label={`${product.name} 수량 줄이기`}>-</button>
                      <b>{cart[product.id]}</b>
                      <button type="button" onClick={() => incQty(product.id)} aria-label={`${product.name} 수량 늘리기`}>+</button>
                      <button type="button" onClick={() => removeFromCart(product.id)}>삭제</button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p>장바구니가 비어 있습니다. 상품 카드의 담기 버튼으로 추가하세요.</p>
            )}
          </section>
        )}

        <section className="fm-deals">
          <div className="fm-section-head">
            <h2>묶음 장보기</h2>
            <span>{totalItems > 0 ? <CountUp value={totalPrice} /> : '0원'}</span>
          </div>
          <div className="fm-deal-grid">
            {deals.map(deal => <DealCard key={deal.id} deal={deal} />)}
          </div>
        </section>
      </main>
    </div>
  )
}
