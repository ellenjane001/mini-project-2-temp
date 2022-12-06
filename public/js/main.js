
// APi URL of Firebase Realtime Database
const firebaseAPI = 'https://techmart-96763-default-rtdb.asia-southeast1.firebasedatabase.app/'

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
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
        }
        const req = await requestFetch(`${apiURL}${url}`)
        const json = await req.json()
        return json
    },
    // GET all data in API
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

let ProductObj = {
    // generate card for products page
    generateCard: (text, image_link, data) => {
        let column = document.createElement('div')
        let columnClasses = ['col', 'm-2']
        for (let a = 0; a < columnClasses.length; a++) {
            column.classList.add(columnClasses[a])
        }
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
        let btnClasses = ['btn', 'btn-primary']
        for (let b = 0; b < btnClasses.length; b++) {
            btn.classList.add(btnClasses[b])
        }
        body.appendChild(h5)
        body.appendChild(btn)
        div.appendChild(image)
        div.appendChild(body)
        column.appendChild(div)
        return column
    }
}

// convert number to english word - this is needed for accordions in products page
function numberToEnglish(n) {
    let oneToTwenty = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ',
        'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
    let tenth = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    if (n.toString().length > 7) return myDiv.innerHTML = 'overlimit';
    //let num = ('0000000000'+ numberInput).slice(-10).match(/^(\d{1})(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    let num = ('0000000' + n).slice(-7).match(/^(\d{1})(\d{1})(\d{2})(\d{1})(\d{2})$/);
    if (!num) return;

    let outputText = num[1] != 0 ? (oneToTwenty[Number(num[1])] || `${tenth[num[1][0]]} ${oneToTwenty[num[1][1]]}`) + ' million ' : '';
    outputText += num[2] != 0 ? (oneToTwenty[Number(num[2])] || `${tenth[num[2][0]]} ${oneToTwenty[num[2][1]]}`) + 'hundred ' : '';
    outputText += num[3] != 0 ? (oneToTwenty[Number(num[3])] || `${tenth[num[3][0]]} ${oneToTwenty[num[3][1]]}`) + ' thousand ' : '';
    outputText += num[4] != 0 ? (oneToTwenty[Number(num[4])] || `${tenth[num[4][0]]} ${oneToTwenty[num[4][1]]}`) + 'hundred ' : '';
    outputText += num[5] != 0 ? (oneToTwenty[Number(num[5])] || `${tenth[num[5][0]]} ${oneToTwenty[num[5][1]]} `) : '';

    return outputText
}