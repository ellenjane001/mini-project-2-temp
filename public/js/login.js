let nav = [
    { Title: 'Home', Location: '../index.html' },
    { Title: 'Brands', Location: './brands.html' },
    { Title: 'Categories', Location: './categories.html' },
    { Title: 'Just-Arrived', Location: './just-arrived.html' }
]
NavBarInitiator.appendLI(nav)

let forms = {
    username: document.getElementById('username'),
    password: document.getElementById('password')
}
class Login {
    loginUser = (credentials) => {
        const { username, password } = credentials
        App.POST(`auth/login`, { username, password }).then(res => {
            console.log(res)
            return res.status
        }).then(data => {
            if (data == 200) {
                console.log('success')
                document.querySelector('button[type="submit"]').classList.add("disabled")
                localStorage.setItem('login', true)
                location.href = '../../index.html'
            } else {
                console.log('failed')
            }
        })
    }

    clearBorder = () => {
        forms.username.style.border = '1px solid #ced4da'
        forms.password.style.border = '1px solid #ced4da'
    }
}

document.body.onload = () => {

}

document.getElementById('login-form').onsubmit = (e) => {
    e.preventDefault()

    let credentials = {
        username: forms.username.value,
        password: forms.password.value
    }
    if (credentials.username !== '' && credentials.password !== '')
        new Login().loginUser(credentials)
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

