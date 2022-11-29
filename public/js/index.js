let nav = [
    { Title: 'Home', Location: './index.html' },
    { Title: 'Brands', Location: './app/brands.html' },
    { Title: 'Products', Location: './app/products.html' },
]

NavBarInitiator.appendLI(nav)
document.getElementById('home').classList.add('active')
