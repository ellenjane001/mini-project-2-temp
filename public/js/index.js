// live
let nav = [
    { Title: 'Home', Location: './index.html' },
    { Title: 'Brands', Location: './app/brands.html' },
    { Title: 'Categories', Location: './app/categories.html' },
    { Title: 'Just-Arrived', Location: './app/just-arrived.html' }
]

NavBarInitiator.appendLI(nav)
document.getElementById('home').classList.add('active')
