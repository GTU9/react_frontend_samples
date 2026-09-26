import { useState } from 'react'
import { edits, heroData, navLinks, newArrivals, serviceLinks, type Product } from './mock'
import './lumiere-store.css'

const imageStyle = (index: number) => ({
  backgroundImage: 'url(/media/lumiere-store/products.png)',
  backgroundSize: '300% 200%',
  backgroundPosition: `${(index % 3) * 50}% ${Math.floor(index / 3) * 100}%`,
})

function ProductPhoto({ product, className = '' }: { product: Product; className?: string }) {
  return (
    <div className={`ls-photo ${className}`} role="img" aria-label={product.name}>
      <span className="ls-photo__frame" aria-hidden="true" style={imageStyle(product.imageIndex)} />
    </div>
  )
}

function ProductCard({
  product,
  qty,
  onAdd,
}: {
  product: Product
  qty: number
  onAdd: () => void
}) {
  return (
    <article className="ls-product-card">
      <ProductPhoto product={product} />
      <div className="ls-product-card__body">
        <p>{product.category}</p>
        <strong>{product.name}</strong>
        <span>{product.price.toLocaleString('ko-KR')}원</span>
        <div className="ls-color-row" aria-label={`${product.name} 색상`}>
          {product.colors.map(color => <i key={color} style={{ backgroundColor: color }} aria-hidden="true" />)}
        </div>
        <button type="button" onClick={onAdd}>{qty > 0 ? `장바구니 ${qty}` : '장바구니 담기'}</button>
      </div>
    </article>
  )
}

export default function LumiereStore() {
  const [cart, setCart] = useState<Record<string, number>>({})
  const [cartOpen, setCartOpen] = useState(false)
  const [featured, setFeatured] = useState(newArrivals[0].id)

  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0)
  const featuredProduct = newArrivals.find(product => product.id === featured) ?? newArrivals[0]

  function addToCart(id: string) {
    setCart(prev => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }))
    setCartOpen(true)
  }

  function removeFromCart(id: string) {
    setCart(prev => {
      const next = { ...prev }
      delete next[id]
      return next
    })
  }

  function decreaseQty(id: string) {
    setCart(prev => {
      const qty = (prev[id] ?? 0) - 1
      if (qty <= 0) {
        const next = { ...prev }
        delete next[id]
        return next
      }
      return { ...prev, [id]: qty }
    })
  }

  return (
    <div className="sample-lumiere-store">
      <header className="ls-nav">
        <a href="#" className="ls-wordmark">LUMIERE</a>
        <nav aria-label="Lumiere 메뉴">
          {navLinks.map(link => <a key={link.label} href={link.href}>{link.label}</a>)}
        </nav>
        <button
          type="button"
          className="ls-cart"
          aria-expanded={cartOpen}
          aria-controls="lumiere-cart-summary"
          onClick={() => setCartOpen(open => !open)}
        >
          장바구니 ({cartCount})
        </button>
      </header>

      <main>
        <section className="ls-hero" aria-labelledby="lumiere-title">
          <ProductPhoto product={featuredProduct} className="ls-hero__photo" />
          <div className="ls-hero__copy">
            <h1 id="lumiere-title">{heroData.headline}</h1>
            <p>{heroData.subline}</p>
            <a href="#arrivals">{heroData.cta}</a>
          </div>
          <div className="ls-hero__selector" aria-label="대표 상품 선택">
            {newArrivals.slice(0, 4).map(product => (
              <button
                key={product.id}
                type="button"
                className={featured === product.id ? 'is-active' : ''}
                onClick={() => setFeatured(product.id)}
              >
                {product.name}
              </button>
            ))}
          </div>
        </section>

        <section className="ls-arrivals" id="arrivals">
          <div className="ls-section-head">
            <h2>New arrivals</h2>
            <p>입고 수량이 적은 순서로 먼저 보여드립니다.</p>
          </div>
          <div className="ls-product-grid">
            {newArrivals.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                qty={cart[product.id] ?? 0}
                onAdd={() => addToCart(product.id)}
              />
            ))}
          </div>
        </section>

        {cartOpen && (
          <section className="ls-cart-panel" id="lumiere-cart-summary" aria-label="Lumiere 장바구니 요약">
            <div className="ls-cart-panel__head">
              <h2>Cart</h2>
              <button type="button" onClick={() => setCartOpen(false)}>닫기</button>
            </div>
            {cartCount > 0 ? (
              <div className="ls-cart-panel__items">
                {newArrivals.filter(item => cart[item.id]).map(item => (
                  <article key={item.id} className="ls-cart-line">
                    <ProductPhoto product={item} />
                    <div>
                      <strong>{item.name}</strong>
                      <span>{(item.price * (cart[item.id] ?? 0)).toLocaleString('ko-KR')}원</span>
                    </div>
                    <div className="ls-cart-line__actions">
                      <button type="button" onClick={() => decreaseQty(item.id)} aria-label={`${item.name} 수량 줄이기`}>-</button>
                      <b>{cart[item.id]}</b>
                      <button type="button" onClick={() => addToCart(item.id)} aria-label={`${item.name} 수량 늘리기`}>+</button>
                      <button type="button" onClick={() => removeFromCart(item.id)}>삭제</button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p>장바구니가 비어 있습니다. 신상품에서 마음에 드는 상품을 담아보세요.</p>
            )}
          </section>
        )}

        <section className="ls-editorial" id="editorial">
          <ProductPhoto product={newArrivals[1]} className="ls-editorial__photo" />
          <div className="ls-editorial__copy">
            {edits.map(edit => (
              <article key={edit.title}>
                <h2>{edit.title}</h2>
                <p>{edit.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="ls-service" id="service">
          <h2>Service</h2>
          <div>
            {serviceLinks.map(item => <span key={item}>{item}</span>)}
          </div>
        </section>
      </main>

      <footer className="ls-footer">
        <strong>LUMIERE</strong>
        <span>선택한 상품 {cartCount}개</span>
      </footer>
    </div>
  )
}
