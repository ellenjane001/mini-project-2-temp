let nav = [
    { Title: 'Home', Location: '../index.html' },
    { Title: 'Brands', Location: './brands.html' },
    { Title: 'Products', Location: './products.html' },
]
NavBarInitiator.appendLI(nav)
// add ACTIVE class to current page
document.getElementById('brands').classList.add('active')