// APi URL of Firebase Realtime Database
const firebaseAPI = 'https://techmart-96763-default-rtdb.asia-southeast1.firebasedatabase.app/'
let cartItems = [];
// determine if login is saved in localstorage 
let login = localStorage.getItem('login')
if (login === 'true') {
    // show logout button
    document.querySelector('html body main .logout').style.display = 'inline-block'
    document.querySelector('.right-wrapper.btn-group').style.visibility = "hidden"
}
else {
    // hide logout button
    document.querySelector('.right-wrapper.btn-group').style.visibility = "visible"
    document.querySelector('html body main .logout').style.display = 'none'
}
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
        console.log(sessionStorage.getItem('cart'))
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
                    element.count++
                    element.price = element.price + data.price
                }
            });
        } else {
            value.items.push(data)
        }
        value.totalAmount = value.items.map(e => e.price).reduce((a, b) => a + b)
        Cart.setStorage(value)
    },
    ADD: (value, count) => {
        let item = JSON.parse(value)
        let itemObj = {
            image: item.image_link.shift(),
            name: item.name,
            price: parseFloat(item.price),
            count: parseInt(count.value)
        }
        Cart.SET(itemObj)
    },
    LOAD: () => {
        let cartQuantity
        if (Object.keys(sessionStorage).includes('cart')) {
            let cart = JSON.parse(sessionStorage.getItem('cart')).items.map(e => e.count)
            if (cart.length > 0) {
                cart.reduce((a, b) => a + b)
                cartQuantity = cart
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
            Cart.clear()
            if (JSON.parse(sessionStorage.getItem('cart')).items.length > 0) {
                let data = JSON.parse(sessionStorage.getItem('cart'))
                for (let i = 0; i < data.items.length; i++) {
                    let elementsObj = {
                        tr: document.createElement('tr'), tdCheck: document.createElement('td'), input: document.createElement('input'), tdName: document.createElement('td'), thumbnail: document.createElement('img'), tdImage: document.createElement('td'), tdQuantity: document.createElement('td'), tdAmount: document.createElement('td'), tdDelete: document.createElement('td'), tdDeleteOne: document.createElement('td')
                    }
                    const { tr, tdCheck, input, tdName, thumbnail, tdImage, tdQuantity, tdAmount, tdDelete, tdDeleteOne } = elementsObj
                    tr.style.verticalAlign = 'middle'
                    input.type = 'checkbox'
                    input.setAttribute('data-value', JSON.stringify(data.items[i]))

                    thumbnail.height = 100
                    thumbnail.width = 100
                    thumbnail.style.objectFit = 'contain'
                    thumbnail.src = data.items[i].image
                    tdAmount.innerText = `$${data.items[i].price.toFixed(2)}`
                    tdName.innerText = data.items[i].name
                    tdQuantity.innerText = data.items[i].count

                    tdDelete.classList.add('text-center')
                    tdDeleteOne.classList.add('text-center')
                    let icon = document.createElement('i')
                    let iconClasses = ['fa-solid', 'fa-trash', 'fa-xl']
                    for (classes in iconClasses) {
                        icon.classList.add(iconClasses[classes])
                    }
                    let icon2 = document.createElement('i')
                    let icon2Classes = ['fa-solid', 'fa-minus', 'fa-xl']
                    for (classes in icon2Classes) {
                        icon2.classList.add(icon2Classes[classes])
                    }
                    tdDeleteOne.setAttribute('data-value', JSON.stringify(data.items[i]))
                    tdDelete.setAttribute('data-value', JSON.stringify(data.items[i]))
                    tdDeleteOne.addEventListener('click', Cart.REMOVE)
                    tdDelete.addEventListener('click', Cart.DELETE)
                    tdDeleteOne.style.cursor = 'pointer'
                    tdDelete.style.cursor = 'pointer'
                    tdCheck.appendChild(input)
                    tdImage.appendChild(thumbnail)
                    tdDeleteOne.appendChild(icon2)
                    tdDelete.appendChild(icon)

                    tdQuantity.classList.add('text-center')
                    tdQuantity.classList.add('h3')
                    let elements = [tdCheck, tdName, tdImage, tdQuantity, tdAmount, tdDeleteOne, tdDelete]
                    for (let a = 0; a < elements.length; a++) {
                        tr.appendChild(elements[a])
                    }
                    console.log(tr)
                    document.querySelector('#cart-modal .modal-body table tbody').appendChild(tr)
                }
                document.getElementById('total-amount').innerText = `$${data.totalAmount.toFixed(2)}`
            }
            else {
                Cart.noItem()
            }

        } else {
            Cart.noItem()
        }
    },
    DELETE: (e) => {
        let data = JSON.parse(e.target.getAttribute('data-value'))
        let value = Cart.initiator()
        console.log(data)

        value.items = value.items.filter(a => a.name !== data.name)
        console.log(value)
        Cart.clear()
        Cart.noItem()
        Cart.setStorage(value)
    },
    REMOVE: (e) => {
        let data = JSON.parse(e.target.getAttribute('data-value'))
    },
    noItem: () => {
        let tr = document.createElement('tr')
        let td = document.createElement('td')
        td.innerText = 'cart is empty'
        tr.appendChild(td)
        td.colSpan = document.querySelector('#cart-modal .modal-body table thead tr').children.length
        td.classList.add('text-center')
        td.classList.add('fst-italic')
        td.classList.add('fw-bold')
        document.querySelector('#cart-modal .modal-body table tbody').appendChild(tr)
    },
    clear: () => {
        if (document.querySelector('#cart-modal .modal-body table tbody').children.length > 0) {
            document.querySelector('#cart-modal .modal-body table tbody').innerHTML = ''
        }
    }
}
document.getElementById('cart-btn').addEventListener('click', e => {
    const myModal = new bootstrap.Modal('#cart-modal', {
    })
    myModal.show()
    Cart.VIEW()
})
Cart.LOAD()
