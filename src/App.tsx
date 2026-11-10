import { useEffect, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { Cake, CakeSlice, Cookie, CookingPot, Croissant, Menu, Search, X } from 'lucide-react';
import { categories, imageUrl, maps, phone } from './data/catalog';

function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [pathname]);
  return <><div className="announcement">Your neighbourhood bakery · Beaconsfield, Québec <a href={phone}>514 695-5698</a></div>
    <header className="header"><Link to="/" className="wordmark" aria-label="Sainte Marie home">Sainte Marie<span>PÂTISSERIE · BOULANGERIE</span></Link>
      <button className="menu-toggle" aria-expanded={open} aria-controls="navigation" onClick={() => setOpen(!open)}>{open ? <>Close <X aria-hidden="true" size={18} /></> : <>Menu <Menu aria-hidden="true" size={18} /></>}</button>
      <nav id="navigation" className={open ? 'navigation open' : 'navigation'} aria-label="Main navigation"><NavLink to="/catalog">Our catalog</NavLink><NavLink to="/about">Our story</NavLink><NavLink to="/catalog/special-orders">Special orders</NavLink><a className="nav-visit" href="#visit" onClick={() => setOpen(false)}>Visit the bakery</a></nav>
    </header></>;
}
function Footer() {
  return <footer id="visit"><div className="footer-top"><div><p className="eyebrow">A little taste of Sainte Marie</p><h2>Come for the bread,<br /><em>stay for the love.</em></h2></div><div className="visit-details"><p className="eyebrow">Find us in Beaconsfield</p><a href={maps} target="_blank" rel="noreferrer">552D Beaconsfield Blvd<br />Beaconsfield, QC</a><a href={phone}>514 695-5698</a><p>Call us for availability, pricing,<br />and special-order enquiries.</p></div></div><div className="footer-bottom"><Link to="/" className="wordmark">Sainte Marie<span>PÂTISSERIE · BOULANGERIE</span></Link><span>Family-owned. Made with love.</span><a href="#top">Back to top</a></div></footer>;
}
function CategoryIcon({ slug }: { slug: string }) {
  const Icon = slug === 'breads' ? Croissant : slug === 'cookies' ? Cookie : slug === 'cakes' ? CakeSlice : slug === 'special-orders' ? Cake : CookingPot;
  return <Icon className="category-icon" size={24} strokeWidth={1.5} aria-hidden="true" />;
}
function CategoryCards() {
  return <div className="category-grid">{categories.map((category) => <Link className="category-card" to={`/catalog/${category.slug}`} key={category.slug}><div className="category-image"><img src={imageUrl(category.image)} alt={category.shortName} loading="lazy" width="244" height="244" /></div><div className="category-label"><CategoryIcon slug={category.slug} /><h3>{category.shortName}</h3></div></Link>)}</div>;
}
function Home() {
  return <><section className="hero"><div className="hero-copy"><p className="eyebrow">Family-owned · Beaconsfield · Est. 2023</p><h1>A little joy.<br />In <em>every bite.</em></h1><p>Beautiful breads, delightful pastries, and comforting meals. Welcome to your neighbourhood bakery.</p><Link to="/catalog" className="button">Explore our catalog</Link><div className="hero-note">Come for the bread, stay for the love.</div></div><div className="hero-image"><img src={imageUrl('breads-banner')} alt="Fresh croissants, baguettes and challah in the Sainte Marie bakery display" fetchPriority="high" /><div className="hero-seal">BAKED WITH<span>love</span>SAINTE MARIE</div><span className="photo-caption">From our bakery, to your table.</span></div></section>
      <div className="ribbon" aria-hidden="true"><span><Croissant /> Breads & pastries</span><span><Cookie /> A little something sweet</span><span><CookingPot /> Meals to bring home</span><span><CakeSlice /> Made for your moments</span></div>
      <section className="section" id="catalog"><div className="section-heading"><div><p className="eyebrow">Discover our favourites</p><h2>What are you craving?</h2></div><p>Something sweet. Something savoury.<br />Something to share.</p></div><CategoryCards /></section>
      <section className="story-panel"><div className="story-photo"><img src={imageUrl('storefront')} alt="The welcoming Sainte Marie Pâtisserie storefront in Beaconsfield" loading="lazy" /></div><div className="story-copy"><p className="eyebrow">A family bakery, a neighbourhood favourite</p><h2>Our family.<br /><em>Your daily joys.</em></h2><p>Nestled in the heart of Beaconsfield, Sainte Marie Pâtisserie Boulangerie has been sharing a love of sweet and savoury treats since 2023.</p><p>From delicate pastries to crusty breads, our goal is simple: to bring you joy with every bite.</p><Link className="text-link" to="/about">Get to know us</Link></div></section>
      <section className="occasion section"><div><p className="eyebrow">For life’s sweetest moments</p><h2>A celebration<br />that tastes <em>like you.</em></h2><p>Make it personal. Discover our custom cakes and call us to discuss a creation for your next occasion.</p><Link className="button" to="/catalog/special-orders">Explore special orders</Link></div><img src={imageUrl('special-orders-banner')} alt="Pink celebration cake with matching cupcakes" loading="lazy" /></section></>;
}
function Catalog({ slug }: { slug?: string }) {
  const [query, setQuery] = useState('');
  const category = categories.find(item => item.slug === slug);
  const selected = category ? [category] : categories;
  const results = selected.flatMap(item => item.products.map((name, index) => ({ name, category: item, image: `${item.slug}-${index + 1}`, noPhoto: item.slug === 'heat-and-eat' && index === 6 }))).filter(item => item.name.toLowerCase().includes(query.toLowerCase().trim()));
  return <><section className="catalog-intro"><div className="breadcrumb"><Link to="/">Home</Link> / <Link to="/catalog">Catalog</Link>{category && <> / {category.shortName}</>}</div><p className="eyebrow">From our bakery to your table</p><h1>{category ? category.name : 'A taste of Sainte Marie'}</h1><p>{category ? category.intro : 'Explore our breads, sweets, savoury favourites, and creations for special occasions.'}</p>{category?.slug === 'special-orders' && <a className="button" href={phone}>Let’s plan your cake</a>}</section>
    <section className="catalog-section"><nav className="category-tabs" aria-label="Product categories"><NavLink end to="/catalog">All products</NavLink>{categories.map(item => <NavLink key={item.slug} to={`/catalog/${item.slug}`}>{item.shortName}</NavLink>)}</nav><div className="catalog-tools"><span>{results.length} {category?.slug === 'special-orders' ? 'creations' : 'delicious discoveries'}</span><label className="search"><span className="sr-only">Search products</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Find your favourite…" /><Search aria-hidden="true" size={18} /></label></div>
      {results.length > 0 ? <div className="product-grid">{results.map(item => <article className="product" key={item.image}>{item.noPhoto ? <div className="product-no-photo"><CookingPot aria-hidden="true" size={44} strokeWidth={1.5} /><p>Comfort food,<br />ready to bring home.</p></div> : <img src={imageUrl(item.image)} alt={item.name} width="270" height="270" loading="lazy" />}<p className="product-category">{item.category.shortName}</p><h2>{item.name}</h2></article>)}</div> : <div className="empty"><h2>No treats found.</h2><p>Try a different search or explore another category.</p><button className="button" onClick={() => setQuery('')}>Clear search</button></div>}
      <div className="order-note"><CakeSlice aria-hidden="true" size={40} strokeWidth={1.5} /><div><h2>Something caught your eye?</h2><p>Call the bakery for current availability, prices, and ordering details.</p></div><a href={phone} className="button">514 695-5698</a></div></section></>;
}
function About() {
  return <><section className="about-intro section"><p className="eyebrow">Our story · Since 2023</p><h1>A family bakery.<br /><em>A little more love.</em></h1><img src={imageUrl('storefront')} alt="Sainte Marie Pâtisserie Boulangerie storefront" /><div className="about-text"><h2>Welcome to<br />the neighbourhood.</h2><div><p>Sainte Marie Pâtisserie Boulangerie is a family-owned bakery nestled in the heart of Beaconsfield. Established in 2023, our mission is to create delightful pastries and breads that enlighten your taste buds.</p><p>In addition to our bakery items, we are proud to offer a convenient and delicious solution for your meals: our Heat ’n Eat specialties.</p><p>Our goal is to bring joy to our customers with every bite of our sweet and savoury treats. From delicate pastries to crusty breads and delectable desserts, our artistry and attention to detail ensure that each item is a delightful experience.</p><Link to="/catalog" className="text-link">Find your next favourite</Link></div></div></section></>;
}
function NotFound() { return <section className="section empty"><p className="eyebrow">404</p><h1>This page has wandered off.</h1><Link className="button" to="/">Back to the bakery</Link></section>; }
export function App() {
  const { pathname } = useLocation();
  const category = categories.find(item => pathname.replace(/\/$/, '') === `/catalog/${item.slug}`);
  const title = category ? category.shortName : pathname === '/about' ? 'Our story' : pathname === '/catalog' ? 'Product catalog' : 'Pâtisserie & Boulangerie in Beaconsfield';
  return <><title>{`${title} | Sainte Marie`}</title><meta name="description" content="Discover Sainte Marie, a family-owned bakery in Beaconsfield. Explore breads, empanadas, cookies, cakes, Heat ’n Eat meals and custom cakes. Call 514 695-5698." /><div id="top" /><a className="skip-link" href="#main">Skip to content</a><Header /><main id="main"><Routes><Route path="/" element={<Home />} /><Route path="/about" element={<About />} /><Route path="/catalog" element={<Catalog key="all" />} />{categories.map(item => <Route key={item.slug} path={`/catalog/${item.slug}`} element={<Catalog key={item.slug} slug={item.slug} />} />)}<Route path="*" element={<NotFound />} /></Routes></main><Footer /></>;
}
