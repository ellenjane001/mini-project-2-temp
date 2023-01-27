NavBarInitiator.appendLI([
    { Title: 'Dashboard', Location: './dashboard.html' },
    { Title: 'Products', Location: './products.html' },
    { Title: 'Users', Location: './users.html' }
])
document.getElementById('dashboard').classList.add('active')

const Dash = {
    index: () => {
document.getElementById('date-today').innerText = new Date()
    }
}

Dash.index()