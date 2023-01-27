const Admin = {
    index: () => {
        Admin.handleLogin()
    },
    handleLogin: () => {
        document.getElementById('login').addEventListener('submit', (e) => {
            e.preventDefault()
            let login = new Array
            Array.from(e.target.getElementsByTagName('input')).forEach(element => {
                if(element.value!=='')
                    login[element.name] = element.value
                else
                    console.log(`${element.name} is empty`)
            })
            console.log(login)
            // change location to admin dashboard
            location.href='../../app/admin/dashboard.html'
        })
    }
}

Admin.index()

