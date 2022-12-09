let nav = [
    { Title: 'Home', Location: '../index.html' },
    { Title: 'Brands', Location: './brands.html' },
    { Title: 'Products', Location: './products.html' },
]
NavBarInitiator.appendLI(nav)
class SignUp {
    signUp() {
        let forms = document.getElementById('signup-form')
        let form_values = new Object()
        let inputs = forms.getElementsByClassName('form-control')
        for (let a = 0; a < inputs.length; a++) {
            form_values[`${inputs[a].name}`] = inputs[a].value
        }
        // if(Object.values(form_values))
        console.log(Object.values(form_values))
        // App.POST('user.json', form_values).then(e => {
        //     console.log(e)
        // })
    }

}
let forms = document.getElementById('signup-form')
let sign = new SignUp()
forms.onsubmit = (e) => {
    e.preventDefault()
    let forms = document.getElementById('signup-form')
    sign.signUp()
}
