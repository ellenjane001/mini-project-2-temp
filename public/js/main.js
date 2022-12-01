const apiURL = 'https://fakestoreapi.com/'
const firebaseAPI = 'https://techmart-96763-default-rtdb.asia-southeast1.firebasedatabase.app/'
let login = localStorage.getItem('login')

if (login === 'true') {
    document.querySelector('html body main .logout').style.display = 'inline-block'
    document.querySelector('.right-wrapper.btn-group').style.visibility = "hidden"
}
else {
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
    },
    GET: async (url = '') => {
        let requestFetch = async (url) => {
            console.log('** beforeSend request fetch **');
            return await fetch(url, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }

        return requestFetch(`${firebaseAPI}${url}`)
    }
}

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

let ProductObj = {
    generateCard: (text, image_link, data) => {
        let column = document.createElement('div')
        column.classList.add('col')
        column.classList.add('m-2')
        let div = document.createElement('div')
        div.classList.add('card')
        let image = document.createElement('img')
        image.classList.add('card-img-top')
        image.classList.add('img-fluid')
        image.src = image_link
        let body = document.createElement('div')
        body.classList.add('card-body')
        let h5 = document.createElement('h5')
        h5.classList.add('card-title')
        h5.innerText = text
        let btn = document.createElement('button')
        btn.appendChild(document.createTextNode('View'))
        btn.setAttribute('data-value', `${JSON.stringify(data)}`)
        btn.classList.add('btn')
        btn.classList.add('btn-primary')
        body.appendChild(h5)
        body.appendChild(btn)
        div.appendChild(image)
        div.appendChild(body)
        column.appendChild(div)
        return column
    }
}
