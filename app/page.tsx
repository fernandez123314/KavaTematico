'use client'

import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, Leaf, MapPin, Menu as MenuIcon, Minus, Plus, ShoppingBag, X } from 'lucide-react'

type MenuItem = { name: string; price: number; description?: string }
type MenuSection = { name: string; note?: string; items: MenuItem[] }

const sections: MenuSection[] = [
  { name: 'Filtrados', note: 'V60 · Aeropress', items: [
    { name: 'Café de origen boliviano', price: 35 }, { name: 'Café internacional', price: 45 },
  ]},
  { name: 'Cafés calientes', items: [
    ['Espresso',10,'Un shot de café.'],['Americano',13,'Un shot de espresso y agua caliente.'],['Cortadito',14,'Un shot de café espresso con un poco de leche texturizada.'],['Capuchino',16,'Un shot de espresso y leche texturizada.'],['Latte',18,'Un shot de espresso con abundante leche texturizada.'],['Flat white',22,'Doble shot de espresso y leche texturizada.'],['Latte pistacho',22,'Leche texturizada, pasta de pistacho y un espresso.'],['Caramel',24,'Base salsa de caramelo de la casa, leche texturizada y doble espresso.'],['Café bombom',24,'Base leche condensada, leche texturizada y doble espresso.'],['Honey latte',24,'Base miel de abeja, leche texturizada y doble espresso.'],['Mocca',26,'Base chocolate, leche texturizada y doble espresso.'],['Capuchino con crema de leche',26,'Un shot de espresso, leche texturizada y crema de leche.'],['Extra shot de espresso',8],['Extra crema de leche',6]].map(([name,price,description])=>({name,price,description}) as MenuItem)
  },
  { name: 'Chocolates calientes', items: [['Choco latte',18,'Leche texturizada con salsa de chocolate.'],['Submarino',20,'Leche texturizada acompañada de una barra de chocolate.'],['Chocolate con crema',25,'Latte de chocolate decorado con crema de leche.']].map(([name,price,description])=>({name,price,description}) as MenuItem) },
  { name: 'Infusiones y té', note: 'Servidos en tetera · También puedes pedirlo frío con cubos de hielo.', items: [['Té de especialidad en saquito',20,'Palacio del té – París (stock limitado).'],['Lemon lavanda',18],['4 frutos rojos',16],['Jengibre, canela, rodajas de limón y un toque de miel',16],['Káva caliente',15],['Frutas tropicales',15],['Chocolate naranja',15],['Frutos del bosque',15],['Canela, manzanilla y anís estrella',15],['Masala chai',15],['Green chai',15],['Golden chai',15],['Mates y té clásicos en sobre',10]].map(([name,price,description])=>({name,price,description}) as MenuItem) },
  { name: 'Matchas', note: 'Matcha de origen japonés', items: [['Matcha latte caliente',22,'Matcha y leche texturizada.'],['Ice latte matcha',25,'Matcha, leche texturizada y cubos de hielo.'],['Matcha fresh soda',25,'Matcha, sirope de jamaica, sirope de menta, cubos de hielo y agua con gas.'],['Ice berry matcha',28,'Matcha, salsa de frutos rojos, leche texturizada y cubos de hielo.'],['Ice passion matcha',28,'Matcha, salsa de maracuyá, leche texturizada y cubos de hielo.'],['Ice cream matcha',29,'Matcha, leche texturizada, cubos de hielo y una bocha de helado (sabor a elección).'],['Frappé de matcha',29,'Frappé a base matcha, leche, decorado con crema de leche.']].map(([name,price,description])=>({name,price,description}) as MenuItem) },
  { name: 'Cafés fríos', items: [['Káva chapaca',29,'Reducción de vino tinto, salsa de frutos rojos, leche texturizada, un shot de espresso y cubos de hielo.'],['Ice cream káva',29,'Ice latte más una bocha de helado sabor a elección con un toque de crema de leche y salsa toffy.'],['Ice berry latte',26,'Base salsa de frutos rojos, leche texturizada, un shot de espresso y cubos de hielo.'],['Frapuchino',24,'Frappé a base de leche, espresso y decorado con crema de leche.'],['Ice bombom',24,'Base leche condensada, leche texturizada, un shot de espresso y cubos de hielo.'],['Ice caramel',24,'Base salsa de caramelo de la casa, un shot de espresso, leche texturizada y cubos de hielo.'],['Orange coffee',24,'Zumo naranja, un shot de espresso y cubos de hielo.'],['Coffee lemon',24,'Base miel de abeja natural, zumo de limón, un shot de espresso, cubos de hielo y agua con gas.'],['Coffee tonic',20,'Un shot de espresso, agua tónica y cubos de hielo.'],['Cold brew',20,'Cold brew y cubos de hielo.'],['Ice latte',20,'Un shot de espresso, leche texturizada y cubos de hielo (sin azúcar).'],['Aerocano káva',19,'Espresso texturizado en frío con un toque dulce al estilo de káva.'],['Americano',16,'Un shot de espresso, agua y cubos de hielo (sin azúcar).'],['Extra shot de espresso',8]].map(([name,price,description])=>({name,price,description}) as MenuItem) },
  { name: 'Milkshakes', items: [['Pistachuela',26,'Batido de helado de pistacho decorado con crema de leche y salsa toffy.'],['Explosion oreo',26,'Batido de helado de oreo decorado con crema de leche y salsa toffy.'],['Toffy',26,'Batido de helado de dulce de leche coronado con crema de leche y salsa toffy.'],['Affogato clásico',25,'Una bocha de helado artesanal sabor vainilla y doble shot de espresso.'],['Affogato de pistacho',25,'Una bocha de helado artesanal de pistacho y doble shot de espresso.'],['Affogato a tu gusto',25,'Fusiona tu affogato, creando un sabor único, elige un sabor de helado acompañado de un doble shot de espresso.']].map(([name,price,description])=>({name,price,description}) as MenuItem) },
  { name: 'Frappés', items: [{name:'Frutos rojos, maracuyá',price:22,description:'Frappé a base de fruta natural. También puedes pedirlo sin azúcar.'}] },
  { name: 'Sodas artesanales', items: [['Ginger bloom',18,'Jengibre, piña, hierba buena y un toque de limón.'],['Orange honey',18,'Miel natural, naranja y romero.'],['Honey lemon',18,'Limón, miel y cedrón.'],['Berry jamaica',18,'Jamaica y frutos rojos.'],['Pasion cold brew',18,'Maracuyá, piña y cold brew.'],['Lemon cold brew',18,'Hierba buena, limón y cold brew.'],['Frutilla limón',18,'Frutilla, cedrón y limón.'],['Menta pasión',18,'Maracuyá y menta.']].map(([name,price,description])=>({name,price,description}) as MenuItem) },
  { name: 'Jugos', items: [['Jugos de frutas (agua) 400ml',14,'Frutilla, maracuyá, limón, papaya, piña.'],['Licuados con leche 400ml',17,'Banana, frutilla, papaya, limón, maracuyá.'],['Agua sin gas',7],['Agua con gas',10],['Agua con gas y zumo de limón',13]].map(([name,price,description])=>({name,price,description}) as MenuItem) },
  { name: 'Desayunos Káva', items: [['Káva',49,'Omelette relleno con queso mozarella, cebolla y champiñones, acompañado con un mix de hojas verdes, tostadas de focaccia, ensalada de frutas, café o té a elección.'],['Desayuno americano',49,'Huevo revuelto cremoso, tocino, tostadas, queso crema o mantequilla, mermelada de la casa, jugo natural, café o té a elección.'],['Desayuno continental',54,'Croissant, mermelada casera, mantequilla, una porción de huevo revuelto con jamón, porción de frutas, café o té a elección.'],['Desayuno New York',49,'Sándwich en pan bagel, huevo revuelto, tomates confitados, palta y tocino, acompañado de un mini bowl de yogur griego, granolas y frutas, café o té a elección.'],['Tostadas fit',35,'Tostadas integrales, crema de maní, bananas, frutillas, decorado con granolas, acompañado de un café americano.'],['Avocado toast',32,'Porción de huevos poché bañados con salsa holandesa, en pan de masa madre, palta, tocino crocante acompañado de un mix de hojas verdes y tomates confitados.'],['Croque monsieur',32,'Un clásico de Francia en pan brioche, jamón y queso mozzarella, con queso grillado.'],['Croque madame',36,'Sándwich en pan brioche, jamon, queso mozarella, salsa bechamel, queso grillado, coronado con un huevo frito.'],['Ensalada de frutas',22],['Bowl de frutas, yogur griego, granolas y miel',38]].map(([name,price,description])=>({name,price,description}) as MenuItem) },
  { name: 'Tostadas francesas', items: [['Banana y caramelo',26,'Pan brioche de la casa tostado, banana caramelizada, salsa toffy, frutos rojos y crema pastelera.'],['Manzana y canela',26,'Pan brioche de la casa tostado, manzanas caramelizadas, nueces caramelizadas, crema pastelera, nata montada más una bocha de helado.'],['Frutos rojos',26,'Pan brioche de la casa tostado, frutos rojos, salsa de frutos rojos y nata montada.']].map(([name,price,description])=>({name,price,description}) as MenuItem) },
  { name: 'Croissants', items: [['Croissant con trucha curada, queso crema a las hierbas y rúcula',30],['Croissant con queso azul, peras caramelizadas y frutos secos',28],['Croissant relleno con huevo rallado, mayonesa, tomates confitados y queso mozzarella',28],['Croissant con jamón serrano, queso mozzarella, tomates cherry, rúcula y miel picante',28],['Croissant con queso mozzarella, tomates cherry y salsa pesto',28],['Croissant con huevo revuelto y tocino',28],['Croissant con jamón y queso mozzarella',24],['Croissant sin relleno',17],['Croissant dulce, salsa de frutos rojos, frutillas y crema de leche',28]].map(([name,price,description])=>({name,price,description}) as MenuItem) },
  { name: 'Postres', items: [['Cheesecake de pistacho',30,'Tarta de queso al horno a base de pistacho.'],['Cheesecake clásico',28,'Tarta de queso al horno con salsas artesanales de la casa y crema de leche. Sabores: Naranja, maracuyá y frutos rojos.'],['Torta de zanahoria',28,'Bizcocho suave de zanahoria, nueces, caramelo salado, frosting de queso crema y un toque de salsa toffy.'],['Torta de chocolate',28,'Suave bizcocho de chocolate.'],['Tiramisú',25,'El equilibrio perfecto entre la intensidad del café espresso y la delicada cremosidad del queso tipo mascarpone.'],['Pavlova fruit',18,'Pavlova con relleno de frutas de la temporada, dulce de leche decorado con crema de leche.'],['Brownie con helado',25,'Delicioso brownie húmedo, acompañado con una bocha de helado a elección y crema de leche.'],['Lemon pie',22],['Brownie de chocolate',12],['Queque',6],['Cookie káva',6,'Galleta de avena al horno con un toque de coco rallado y frutillas.'],['Cuñapé al horno',5]].map(([name,price,description])=>({name,price,description}) as MenuItem) },
  { name: 'Sándwiches', items: [['Ciabata con peceto',30,'Pan ciabata, láminas de peceto al horno, queso mozzarella, morrones asados, rúcula y salsa dulce de mostaza.'],['Americano',33,'Pan focaccia, lomo de res a la plancha, tocino, queso cheddar, morrones asados y cebolla al vino tinto.'],['Pollo crispy',30,'Pan focaccia, pechuga de pollo crocante bañada en salsa especial, pepinillos encurtidos, zanahoria y ají ulupica.'],['Pollo y miel picante',30,'Pan focaccia, pechuga de pollo grillado, mayonesa verde, rúcula, tomates confitados y un toque de miel picante.'],['Porchetta',29,'Pan focaccia, láminas de fiambre de porchetta a la italiana adobado en hierbas, pesto genovés, queso mozzarella y rúcula.'],['Sándwich campo',30,'Pan focaccia, jamón crudo, queso mozzarella, tomate, rúcula y reducción de aceto balsámico.']].map(([name,price,description])=>({name,price,description}) as MenuItem) },
  { name: 'Paninis calientes', items: [['Panini clásico',24,'Pan ciabata, jamón cocido, queso mozzarella, tomates confitados y salsa especial.'],['Panini pollo',29,'Pan ciabata o masa madre, pollo a la plancha, salsa de la casa, tomates confitados, queso mozzarella y morrones confitados.'],['Panini carne',33,'Pan ciabata o integral, tiras de filete de carne, salsa de la casa, tomates confitados, morrones asados y queso cheddar.'],['Club Káva',34,'Pan brioche, pollo a la plancha, jamon, queso mozarella, huevo frito, tocino, tomate y lechuga.']].map(([name,price,description])=>({name,price,description}) as MenuItem) },
]

const allItems = sections.flatMap(section => section.items.map(item => ({...item, section: section.name})))

function BrandMark() { return <div className="brand"><div className="brand-mark"><Leaf size={25} strokeWidth={1.2}/></div><div><div className="brand-name">KÁVA</div><div className="brand-sub">ECO COFFEE</div><div className="brand-branch">Sucursal Temático</div></div></div> }
function Botanical() { return <div className="botanical" aria-hidden="true"><Leaf className="leaf leaf-a"/><Leaf className="leaf leaf-b"/><Leaf className="leaf leaf-c"/><Leaf className="leaf leaf-d"/></div> }

export default function Page() {
  const [screen, setScreen] = useState<'welcome'|'menu'>('welcome')
  const [active, setActive] = useState('Todas')
  const [cart, setCart] = useState<Record<string, number>>({})
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [comment, setComment] = useState('')
  const [toast, setToast] = useState(false)
  const [cartPulse, setCartPulse] = useState(false)
  const [passportOpen, setPassportOpen] = useState(false)
  const [passportName, setPassportName] = useState('')
  const [passportPhone, setPassportPhone] = useState('')
  const [passportPreview, setPassportPreview] = useState(false)
  const categories = ['Todas', ...sections.map(section => section.name)]
  const visibleSections = active === 'Todas' ? sections : sections.filter(section => section.name === active)
  const cartItems = allItems.filter(item => cart[item.name])
  const cartCount = Object.values(cart).reduce((sum, count) => sum + count, 0)
  const total = useMemo(() => cartItems.reduce((sum, item) => sum + item.price * (cart[item.name] || 0), 0), [cartItems, cart])
  const add = (name: string) => {
    setCart(current => ({...current, [name]: (current[name] || 0) + 1}))
    setToast(true)
    setCartPulse(true)
    window.setTimeout(() => setToast(false), 2200)
    window.setTimeout(() => setCartPulse(false), 450)
  }
  const remove = (name: string) => setCart(current => { const next = {...current}; if ((next[name] || 0) <= 1) delete next[name]; else next[name]--; return next })
  const clearCart = () => { setCart({}); setComment('') }
  const openMenu = () => { setScreen('menu'); setMenuOpen(false); setTimeout(() => document.getElementById('menu')?.scrollIntoView({behavior:'smooth'}), 0) }
  const openCart = () => { setCartOpen(true); setToast(false) }
  const openPassport = () => { setPassportOpen(true); setPassportPreview(false) }
  const submitPassport = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const name = passportName.trim()
    const phone = passportPhone.trim()
    if (!name || !phone) return
    setPassportPreview(true)
    window.setTimeout(() => {
      const message = `Hola Káva, quiero reservar mi Pasaporte Coffee Week\n\nNombre: ${name}\nTeléfono: ${phone}\n\nQuiero reservar mi Pasaporte Coffee Week`
      const whatsappUrl = `https://wa.me/59178100028?text=${encodeURIComponent(message)}`
      const whatsappLink = document.createElement('a')
      whatsappLink.href = whatsappUrl
      whatsappLink.target = '_blank'
      whatsappLink.rel = 'noopener noreferrer'
      whatsappLink.click()
      setPassportOpen(false)
      setPassportPreview(false)
      setScreen('welcome')
    }, 2600)
  }
  const orderText = `Hola Káva, quiero pedir:\n${cartItems.map(item => `${cart[item.name]}x ${item.name} - Bs ${item.price * (cart[item.name] || 0)}`).join('\n')}\nTotal: Bs ${total}${comment ? `\nComentarios: ${comment}` : ''}`
  const submitOrder = () => {
    window.open(`https://wa.me/59178100028?text=${encodeURIComponent(orderText)}`, '_blank', 'noopener,noreferrer')
    clearCart()
    setCartOpen(false)
    openMenu()
  }

  return <main className="káva-app">
    <header className="site-header"><button className="brand-button" onClick={() => setScreen('welcome')}><BrandMark/></button><nav className="desktop-nav"><button onClick={openMenu}>Menú</button><button onClick={() => { document.getElementById('passport')?.scrollIntoView({behavior:'smooth'}); openPassport() }}>Pasaporte</button><button onClick={() => document.getElementById('location')?.scrollIntoView({behavior:'smooth'})}>Ubicación</button><button className="whatsapp-button" onClick={openCart}>◉ Pedir por WhatsApp</button></nav><button className="menu-toggle" aria-label="Abrir menú" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20}/> : <MenuIcon size={20}/>}</button></header>
    <button className={`floating-cart ${cartPulse ? 'is-pulsing' : ''}`} aria-label={`Abrir carrito${cartCount ? `, ${cartCount} productos` : ''}`} onClick={openCart}><ShoppingBag size={21}/>{cartCount > 0 && <b>{cartCount}</b>}<span>Carrito</span></button>
    {toast && <div className="cart-toast" role="status" aria-live="polite"><span className="toast-check">✓</span> Producto agregado al carrito</div>}
    {menuOpen && <div className="mobile-nav"><button onClick={openMenu}>Menú</button><button onClick={() => {setMenuOpen(false);document.getElementById('passport')?.scrollIntoView({behavior:'smooth'})}}>Pasaporte</button><button onClick={() => {setMenuOpen(false);document.getElementById('location')?.scrollIntoView({behavior:'smooth'})}}>Ubicación</button></div>}

    {screen === 'welcome' ? <section className="welcome page-shell"><Botanical/><div className="welcome-copy"><p className="eyebrow">Café de especialidad · sostenible y consciente</p><h1>Bienvenido<br/>a <em>Káva</em></h1><p className="hero-text">Una pausa bien hecha. Café honesto, ingredientes vivos y un espacio para volver a ti.</p><div className="welcome-actions"><button className="button-primary" onClick={openMenu}>Ver menú <ArrowRight size={15}/></button><button className="button-secondary" onClick={() => { document.getElementById('passport')?.scrollIntoView({behavior:'smooth'}); openPassport() }}>Reservar pasaporte <ArrowRight size={15}/></button><button className="button-secondary" onClick={() => document.getElementById('location')?.scrollIntoView({behavior:'smooth'})}>Ver ubicación <MapPin size={15}/></button></div><a className="whatsapp-link" href="https://wa.me/59178100028" target="_blank" rel="noreferrer">◉ Escríbenos por WhatsApp</a></div><div className="hero-note"><Leaf size={15}/> 100% sostenible</div></section> : <section id="menu" className="menu-section page-shell"><button className="back-link" onClick={() => setScreen('welcome')}><ArrowLeft size={15}/> Volver a bienvenida</button><div className="section-heading"><div><p className="eyebrow">La carta completa</p><h2>Hecho para disfrutar<br/><em>sin prisa.</em></h2></div><button className="cart-trigger" onClick={openCart}><ShoppingBag size={17}/> Tu carrito {cartCount > 0 && <b>{cartCount}</b>}</button></div><div className="category-row">{categories.map(category => <button key={category} className={active === category ? 'category-active' : ''} onClick={() => setActive(category)}>{category}</button>)}</div><div className="menu-sections">{visibleSections.map(section => <section className="menu-category" key={section.name}><div className="category-heading"><div><p className="eyebrow">Káva selección</p><h3>{section.name}</h3></div>{section.note && <p>{section.note}</p>}</div><div className="menu-grid">{section.items.map(item => <article className="menu-card" key={`${section.name}-${item.name}`}><div className="card-top"><span className="item-icon"><Leaf size={16}/></span><span className="price">Bs {item.price}</span></div><h4>{item.name}</h4>{item.description && <p>{item.description}</p>}<button className="add-button" aria-label={`Agregar ${item.name}`} onClick={() => add(item.name)}><Plus size={16}/></button></article>)}</div></section>)}</div></section>}

    <section id="passport" className="passport page-shell"><div><p className="eyebrow">Káva Pasaporte</p><h2>Tu café,<br/><em>tu ritual.</em></h2><p>Descubre nuevos orígenes y deja que cada taza te lleve un poco más lejos.</p><button className="button-primary" onClick={openPassport}>Reservar pasaporte <ArrowRight size={15}/></button></div><div className="passport-video-frame"><video className="passport-video" autoPlay muted loop playsInline preload="metadata" aria-label="Experiencia Káva Pasaporte de Café"><source src="/kava-pasaporte.mp4" type="video/mp4" />Tu navegador no admite la reproducción de video.</video></div></section>
    <section id="location" className="location page-shell">
  <div>
    <p className="eyebrow">Encuéntranos</p>
    <h2>
      Una mesa
      <br />
      <em>te espera.</em>
    </h2>
  </div>

  <div className="location-info">
    <p className="location-address">Visítanos en Káva Eco Coffee</p>
    <p>Consulta nuestra ubicación y horarios directamente por WhatsApp.</p>
    
    <a 
      href="https://maps.app.goo.gl/6Rbk58ufVPQHSprFA" 
      target="_blank" 
      rel="noreferrer"
    >
      Abrir en mapas <ArrowRight className="inline" size={14} />
    </a>

    <div className="mt-6 overflow-hidden rounded-2xl shadow-md border border-black/10 w-full">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3711.154204536606!2d-64.73024432472907!3d-21.54082488023975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjHCsDMyJzI3LjAiUyA2NMKwNDMnMzkuNiJX!5e0!3m2!1ses!2sbo!4v1789241462718!5m2!1ses!2sbo"
        width="100%"
        height="300"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        title="Ubicación Káva Eco Coffee"
        className="w-full h-[300px]"
      />
    </div>
  </div>
</section>
    <footer className="footer page-shell"><BrandMark/><p>Experiencia natural · diseño propósito · marcas que importan</p></footer>

    {passportOpen && <div className="overlay passport-overlay" onClick={() => !passportPreview && setPassportOpen(false)}><section className={`passport-flow ${passportPreview ? 'is-previewing' : ''}`} onClick={event => event.stopPropagation()}>{passportPreview ? <div className="passport-preview"><p className="eyebrow">Tu pasaporte está listo</p><div className="digital-passport"><div className="passport-gold-mark"><Leaf size={26}/></div><p className="passport-cover-title">COFFEE WEEK</p><div className="passport-seal"><Leaf size={28}/><span>KÁVA ECO COFFEE</span><small>• TARIJA •</small></div><p className="passport-holder">{passportName}</p></div><p className="passport-status">Preparando tu reserva en WhatsApp...</p></div> : <form className="passport-form" onSubmit={submitPassport}><button type="button" className="modal-close" aria-label="Cerrar reserva" onClick={() => setPassportOpen(false)}><X size={19}/></button><div className="form-leaf"><Leaf size={24}/></div><p className="eyebrow">Coffee Week · Tarija</p><h2>Reservar tu<br/><em>Pasaporte</em></h2><p>Completa tus datos y recibe tu pasaporte digital.</p><label htmlFor="passport-name">Nombre y Apellido</label><input id="passport-name" required value={passportName} onChange={event => setPassportName(event.target.value)} placeholder="Ingresa tu nombre completo" autoComplete="name"/><label htmlFor="passport-phone">Número de teléfono</label><input id="passport-phone" required type="tel" value={passportPhone} onChange={event => setPassportPhone(event.target.value)} placeholder="Ej. +591 71234567" autoComplete="tel"/><button className="button-primary passport-submit" type="submit">Hacer Reserva <ArrowRight size={16}/></button><small>Tu información se usará únicamente para confirmar tu reserva.</small></form>}</section></div>}
    {cartOpen && <div className="overlay" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={event => event.stopPropagation()}><div className="drawer-header"><div><p className="eyebrow">Pedido</p><h2>Tu carrito</h2></div><button aria-label="Cerrar carrito" onClick={() => setCartOpen(false)}><X size={19}/></button></div>{cartItems.length === 0 ? <div className="empty-cart"><ShoppingBag size={30}/><p>Aún no hay nada aquí.</p><button onClick={() => {setCartOpen(false);openMenu()}}>Explorar menú</button></div> : <><div className="drawer-body"><div className="cart-lines">{cartItems.map(item => <div className="cart-line" key={item.name}><div><strong>{item.name}</strong><span>Bs {item.price}</span></div><div className="quantity"><button aria-label={`Quitar uno de ${item.name}`} onClick={() => remove(item.name)}><Minus size={18}/></button><span>{cart[item.name]}</span><button aria-label={`Agregar uno de ${item.name}`} onClick={() => add(item.name)}><Plus size={18}/></button></div></div>)}</div></div><div className="drawer-footer"><div className="drawer-footer-top"><label className="comment-label" htmlFor="comment">Comentarios del pedido</label><button type="button" className="clear-cart" onClick={clearCart}>Vaciar pedido</button></div><textarea id="comment" value={comment} onChange={event => setComment(event.target.value)} placeholder="Ej. Sin azúcar, por favor." rows={3}/><div className="drawer-total"><span>Total del pedido</span><strong>Bs {total}</strong></div><button className="whatsapp-cta" onClick={submitOrder}>Pedir por WhatsApp <ArrowRight size={18}/></button></div></>}</aside></div>}
  </main>
}
