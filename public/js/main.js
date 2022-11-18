const apiURL = 'https://fakestoreapi.com/';
let login = localStorage.getItem('login')

if (login === 'true')
    document.querySelector('.right-wrapper.btn-group').style.visibility = "hidden"
else
    document.querySelector('.right-wrapper.btn-group').style.visibility = "visible"


let App = {
    POST: async (url = '', data = {}) => {
        let requestFetch = async (url) => {
            console.log('** beforeSend request fetch **');
            return await fetch(url, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
        }

        return requestFetch(`${apiURL}${url}`)
    }
}

let NavBarInitiator = {
    appendLI: () => {
        // live
        let nav = [{ Title: 'Home', Location: './index.html' }, { Title: 'Brands', Location: './app/brands.html' }, { Title: 'Categories', Location: './app/categories.html' }, { Title: 'Just-Arrived', Location: './app/just-arrived.html' }]

        //local testing
        // let nav = [{ Title: 'Home', Location: '/index.html' }, { Title: 'Brands', Location: '/app/brands.html' }, { Title: 'Categories', Location: '/app/categories.html' }, { Title: 'Just-Arrived', Location: '/app/just-arrived.html' }]
        let ul = document.querySelector('.navbar-nav.ms-auto.mb-2.mb-lg-0.text-uppercase')

        for (let i = 0; i < nav.length; i++) {
            let li = document.createElement('li')
            li.classList.add('nav-item')
            let a = document.createElement('a')
            a.appendChild(document.createTextNode(nav[i].Title.replace('-', ' ')))
            a.href = `${nav[i].Location}`
            a.classList.add('nav-link')
            a.id = nav[i].Title.toLowerCase()
            li.appendChild(a)
            ul.appendChild(li)
        }

    }
}

NavBarInitiator.appendLI()
