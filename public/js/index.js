let nav = [
    { Title: 'Home', Location: './index.html' },
    { Title: 'Brands', Location: './app/brands.html' },
    { Title: 'Categories', Location: './app/categories.html' },
]

NavBarInitiator.appendLI(nav)
document.getElementById('home').classList.add('active')
