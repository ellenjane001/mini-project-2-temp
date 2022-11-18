let nav = [
    { Title: 'Home', Location: '../index.html' },
    { Title: 'Brands', Location: './brands.html' },
    { Title: 'Categories', Location: './categories.html' },
    { Title: 'Shop', Location: './shop.html' },
]
NavBarInitiator.appendLI(nav)
document.getElementById('categories').classList.add('active')