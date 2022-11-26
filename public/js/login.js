let nav = [
    { Title: 'Home', Location: '../index.html' },
    { Title: 'Brands', Location: './brands.html' },
    { Title: 'Categories', Location: './categories.html' },
    { Title: 'Shop', Location: './shop.html' },
]
NavBarInitiator.appendLI(nav)

let forms = {
    username: document.getElementById('username'),
    password: document.getElementById('password')
}

const toastLogin = document.getElementById('liveToast')
class Login {
    loginUser = (credentials) => {
        const { username, password } = credentials
        App.POST(`auth/login`, { username, password }).then(res => {
            console.log(res)
            return res.status
        }).then(data => {
            if (data == 200) {


            } else {
                console.log('failed')
            }
        })
    }

    clearBorder = () => {
        forms.username.style.border = '1px solid #ced4da'
        forms.password.style.border = '1px solid #ced4da'
    }

    getUsers = async (credentials) => {
        const { username, password } = credentials
        await App.GET('user.json', {}).then(res => res.json()).then(response => {
            Object.keys(response).forEach(function (key) {
                if (response[key].username == username && response[key].password == password) {
                    console.log('success')
                    document.querySelector('button[type="submit"]').classList.add("disabled")
                    localStorage.setItem('login', true)
                    const toast = new bootstrap.Toast(toastLogin)
                    toast.show()
                    setTimeout(() => {
                        location.href = '../../index.html'
                    }, 3000)
                }
                else
                    alert('failed')
            });
        })
    }
}


document.getElementById('login-form').onsubmit = (e) => {
    e.preventDefault()
    let credentials = {
        username: forms.username.value,
        password: forms.password.value
    }


    if (credentials.username !== '' && credentials.password !== '')
        new Login().getUsers(credentials)
    else {
        if (credentials.username === '' && credentials.password === '') {
            forms.username.style.border = "1px solid red"
            forms.password.style.border = "1px solid red"
        }
        else if (credentials.password === '')
            forms.password.style.border = "1px solid red"
        else if (credentials.username === '')
            forms.username.style.border = "1px solid red"
    }
}

forms.username.onfocus = new Login().clearBorder
forms.password.onfocus = new Login().clearBorder

