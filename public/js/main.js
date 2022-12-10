
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
    initiator: () => {
        return cartItems = JSON.parse(sessionStorage.getItem('cart')).items || [];
    },
    ADD: (value) => {
        console.log(value)
    },
    loadCart: () => {

    }
}
