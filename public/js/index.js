// live
let nav = [
    { Title: 'Home', Location: './index.html' },
    { Title: 'Brands', Location: './app/brands.html' },
    { Title: 'Categories', Location: './app/categories.html' },
    { Title: 'Shop', Location: './app/shop.html' },
]

NavBarInitiator.appendLI(nav)
document.getElementById('home').classList.add('active')
