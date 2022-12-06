let nav = [
    { Title: 'Home', Location: './index.html' },
    { Title: 'Brands', Location: './app/brands.html' },
    { Title: 'Products', Location: './app/products.html' },
]
// pass nav object to navBarObject to append Links to Navigation initiator
NavBarInitiator.appendLI(nav)
// add ACTIVE class to current page
document.getElementById('home').classList.add('active')
