// APi URL of Firebase Realtime Database
const firebaseAPI = 'https://techmart-96763-default-rtdb.asia-southeast1.firebasedatabase.app/'
let cartItems = [];
// determine if login is saved in localstorage 
let login = localStorage.getItem('login')
// if (login === 'true') {
//     // show logout button
//     document.querySelector('html body main .logout').style.display = 'inline-block'
//     document.querySelector('.right-wrapper.btn-group').style.visibility = "hidden"
// }
// else {
//     // hide logout button
//     document.querySelector('.right-wrapper.btn-group').style.visibility = "visible"
//     document.querySelector('html body main .logout').style.display = 'none'
// }
const cartModal = new bootstrap.Modal('#cart-modal', {
})
// Bootstrap toast
const toastTrigger = document.querySelector('html body main .logout')
const toastLiveExample = document.getElementById('liveToast')
if (toastTrigger) {
    toastTrigger.addEventListener('click', () => {
        const toast = new bootstrap.Toast(toastLiveExample)
        localStorage.removeItem('login')
        var timeLeft = 5;
        var elem = document.querySelector('.toast-body');
        var timerId = setInterval(countdown, 1000);
        toast.show()
        function countdown() {
            if (timeLeft == -1) {
                clearTimeout(timerId);
                window.location.reload();
            } else {
                elem.innerHTML = 'Page will reload in ' + timeLeft;
                timeLeft--;
            }
        }
    })
}
// APP - object with functions as its properties
let App = {
    // SEND data to API
    POST: async (url = '', data = {}) => {
        let requestFetch = async (url) => {
            console.log('** beforeSend request fetch **');
            return await fetch(url, {
                method: 'POST',
                // mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
        }
        const req = await requestFetch(`${firebaseAPI}${url}`)
        const json = await req.json()
        return json
    },
    // GET all data in API
    GET: async (url = '') => {
        let requestFetch = async (url) => {
            return await fetch(url, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
        const req = await requestFetch(`${firebaseAPI}${url}`)
        const json = await req.json()
        return json
    },
    getData: async (url = '') => {
        let requestFetch = async (url) => {
            return await fetch(url, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
        const req = await requestFetch(`${url}`)
        const json = await req.json()
        return json
    }
}
// Initiate navbar li
let NavBarInitiator = {
    appendLI: (nav) => {
        let ul = document.querySelector('.navbar-nav.ms-auto.mb-2.mb-lg-0.text-uppercase')
        for (let i = 0; i < nav.length; i++) {
            let li = document.createElement('li')
            li.classList.add('nav-item')
            let a = document.createElement('a')
            a.appendChild(document.createTextNode(nav[i].Title))
            a.href = `${nav[i].Location}`
            a.classList.add('nav-link')
            a.id = nav[i].Title.toLowerCase()
            li.appendChild(a)
            ul.appendChild(li)
        }
    }
}
let Cart = {
    setStorage: (data) => {
        sessionStorage.setItem('cart', JSON.stringify(data))
        console.log(JSON.stringify(JSON.parse(sessionStorage.getItem('cart')), null, 2))
        Cart.LOAD()
    },
    initiator: () => {
        if (!Object.keys(sessionStorage).includes('cart')) {
            sessionStorage.setItem('cart', JSON.stringify({ items: [], totalAmount: 0 }))
        }
        return JSON.parse(sessionStorage.getItem('cart'))
    },
    SET: (data) => {
        let value = Cart.initiator()
        if (value.items.filter(e => e.name === data.name).length > 0) {
            value.items.forEach(element => {
                if (element.name === data.name) {
                    element.count = element.count + data.count
                    element.price = element.price + data.price
                }
            })
        } else {
            value.items.push(data)
        }
        value.totalAmount = value.items.map(e => e.price).reduce((a, b) => a + b)
        Cart.setStorage(value)
        location.reload()
    },

    LOAD: () => {
        let cartQuantity
        if (Object.keys(sessionStorage).includes('cart')) {
            let cart = JSON.parse(sessionStorage.getItem('cart')).items.map(e => e.count)
            if (cart.length > 0) {
                let c = cart.reduce((a, b) => a + b)
                cartQuantity = c
            } else {
                cartQuantity = 0
            }
        } else {
            cartQuantity = 0
        }
        document.getElementById('cart-quantity').innerText = cartQuantity
    },
    VIEW: () => {
        if (Object.keys(sessionStorage).includes('cart')) {
            let data = JSON.parse(sessionStorage.getItem('cart'))
            for (let i = 0; i < data.items.length; i++) {
                let elementsObj = {
                    li: document.createElement('li'), div: document.createElement('div'), h6: document.createElement('h6'), small: document.createElement('small'), span: document.createElement('span')
                }
                const { li, div, h6, small, span } = elementsObj
                li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'lh-sm')
                h6.classList.add('my-0', 'fw-bold')
                h6.innerText = data.items[i].name
                small.innerText = `${data.items[i].count} ${data.items[i].count > 1 ? 'pieces' : 'piece'} x $${data.items[i].pricePerUnit}`
                span.innerText = `$${data.items[i].price.toFixed(2)}`
                div.appendChild(h6)
                div.appendChild(small)
                li.appendChild(div)
                li.appendChild(span)
                document.querySelector('ul.list-group.mb-3').prepend(li)
            }
            document.getElementById('total-amount').innerText = `$${data.totalAmount.toFixed(2)}`

        }
    },
    noItem: () => {
        // if no item in cart
        // table will show 'cart is empty'
        let tr = document.createElement('tr')
        let td = document.createElement('td')
        td.innerText = 'cart is empty'
        tr.appendChild(td)
        td.colSpan = document.querySelector('#cart-modal .modal-body table thead tr').children.length
        td.classList.add('text-center', 'fst-italic', 'fw-bold')
        document.querySelector('#cart-modal .modal-body table tbody').appendChild(tr)
    },

}
Cart.LOAD()
Cart.VIEW()

let nav = [
    { Title: 'Home', Location: '../index.html' },
    { Title: 'Brands', Location: './brands.html' },
    { Title: 'Products', Location: './products.html' },
]
NavBarInitiator.appendLI(nav)

App.getData('https://restcountries.com/v2/all').then(data => {
    let select = document.getElementById('country')
    for (d in data) {
        let option = document.createElement('option')
        option.value = data[d].name
        option.innerText = data[d].name
        select.appendChild(option)
    }
})

const amount = document.getElementById('amount')

paypal_sdk.Buttons({
    createOrder: (data, actions) => {
        console.log(data)
        console.log(actions)
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: '1'
                }
            }]
        })
    },
    onApprove: (data, actions) => {
        console.log(data)
        console.log(actions)
        return actions.order.capture().then((details) => {
            console.log(details)
            console.log(details.payer.name.given_name)
        })
    }
}).render('#paypal');