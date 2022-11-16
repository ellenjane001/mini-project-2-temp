
const mql = window.matchMedia('(max-width:375px)');
mql.onchange = (e) => {
    new App().changeBtnSize(mql)
}



class App {

    changeBtnSize(x) {
        if (x.matches) { // If media query matches
            console.log('test')
            document.querySelector('p a.btn.btn-primary').classList.remove("btn-lg");
        } else {
            console.log('testing')
            document.querySelector('p a.btn.btn-primary').classList.remove("btn-lg");
        }


    }
}

