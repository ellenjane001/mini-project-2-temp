let nav = [
    { Title: 'Home', Location: '../index.html' },
    { Title: 'Brands', Location: './brands.html' },
    { Title: 'Categories', Location: './categories.html' },
    { Title: 'Just-Arrived', Location: './just-arrived.html' }
]
NavBarInitiator.appendLI(nav)
document.getElementById('categories').classList.add('active')