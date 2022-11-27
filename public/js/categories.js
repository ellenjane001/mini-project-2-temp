let nav = [
    { Title: 'Home', Location: '../index.html' },
    { Title: 'Brands', Location: './brands.html' },
    { Title: 'Categories', Location: './categories.html' },
]
NavBarInitiator.appendLI(nav)
document.getElementById('categories').classList.add('active')