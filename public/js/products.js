let nav = [
    { Title: 'Home', Location: '../index.html' },
    { Title: 'Brands', Location: './brands.html' },
    { Title: 'Products', Location: './products.html' },
]
NavBarInitiator.appendLI(nav)
document.getElementById('products').classList.add('active')
const CONTAINER = document.querySelector('.col-10>h1+.row')
class Products {
    appendAccordion = (data, i) => {
        let accordItem = document.createElement('div')
        let h2 = document.createElement('h2')
        h2.classList.add('accordion-header')
        h2.id = `flush-heading${this.number(i + 1)}`
        accordItem.classList.add('accordion-item')
        let button = document.createElement('button')
        button.classList.add('accordion-button')
        button.classList.add('collapsed')
        button.type = 'button'
        button.setAttribute('data-bs-toggle', 'collapse')
        button.setAttribute('aria-expanded', 'false')
        button.setAttribute('aria-controls', `flush-collapse${this.number(i + 1)}`)
        button.setAttribute('data-bs-target', `#flush-collapse${this.number(i + 1)}`)
        let acc = document.createElement('div')
        acc.id = `flush-collapse${this.number(i + 1)}`
        acc.classList.add('accordion-collapse')
        acc.classList.add('collapse')
        acc.setAttribute('aria-labelledby', `flush-headinge${this.number(i + 1)}`)
        acc.setAttribute('data-bs-parent', '#accord-categories')
        let accBody = document.createElement('div')
        let ul = document.createElement('ul')
        ul.classList.add('list-unstyled')
        if (data.brands.length > 0) {
            for (let b = 0; b < data.brands.length; b++) {
                let li = document.createElement('li')
                let a = document.createElement('a')
                a.href = "javascript:void(0)"
                a.id = data.brands[b]
                a.onclick = this.loadProduct
                a.appendChild(document.createTextNode(data.brands[b].toUpperCase()))
                li.appendChild(a)
                ul.appendChild(li)
            }
            accBody.appendChild(ul)
        }
        else
            accBody.appendChild(document.createTextNode('test'))
        accBody.classList.add('accordion-body')
        acc.appendChild(accBody)
        // button text
        button.appendChild(document.createTextNode(data.name.toUpperCase()))
        h2.appendChild(button)
        accordItem.appendChild(h2)
        accordItem.appendChild(acc)
        return accordItem
    }
    number = (n) => {
        return numberToEnglish(n).charAt(0).toUpperCase() + numberToEnglish(n).slice(1).trim()
    }
    loadProduct = (e) => {
        let category = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.firstChild.firstChild.innerText.toLowerCase()
        let label = document.getElementById('ctgry')
        new Case().cls()

        switch (category) {
            case 'case':
                new Case().fetchAll()
                break
            case 'cooling':
                new Cooling().fetchAll()
                break
            case 'display device':
                new Display().fetchAll()
                break;
        }
        label.innerText = category
    }
}
class Case {
    fetchAll = async () => {
        // get all products from firebase API
        let response = await App.GET('case.json').then(response => response.json())
        Object.keys(response).forEach(e => {
            CONTAINER.appendChild(ProductObj.generateCard(response[e].name, response[e].image_link[0], response[e]))
        })
        this.loadValue()
    }
    loadValue = () => {
        document.querySelectorAll('.btn.btn-primary').forEach(e => {
            e.addEventListener('click', () => {
                CONTAINER.innerHTML = ''
                let btn = document.createElement('button')
                btn.appendChild(document.createTextNode('Back'))
                btn.classList.add('btn')
                btn.classList.add('btn-primary')
                btn.addEventListener('click', this.return)
                CONTAINER.appendChild(btn)
                CONTAINER.appendChild(this.generateProduct(JSON.parse(e.getAttribute('data-value'))))
                CONTAINER.appendChild(this.generateDiv(JSON.parse(e.getAttribute('data-value'))))
            })
        })
    }
    generateProduct = (data) => {
        let row = this.generateRow()
        row.classList.add(`row-cols-${data.image_link.length}`)
        // append image based on length
        for (let i = 0; i < data.image_link.length; i++) {
            let img = document.createElement('img')
            img.src = data.image_link[i]
            img.loading = 'lazy'
            img.classList.add('img')
            img.classList.add('m-2')
            let col = document.createElement('div')
            col.classList.add('col')
            col.appendChild(img)
            row.appendChild(col)
        }
        return row
    }
    generateDiv = (data) => {
        let row = this.generateRow()
        row.classList.add('row-cols-2')
        let col = document.createElement('div')
        col.classList.add('col')
        let img = document.createElement('img')
        img.src = data.image_link[data.image_link.length - data.image_link.length]
        col.appendChild(img)
        let col2 = document.createElement('div')
        col2.classList.add('col')
        row.appendChild(col)
        row.appendChild(col2)
        return row
    }
    generateRow = () => {
        let row = document.createElement('div')
        row.classList.add('row')
        return row
    }
    cls = () => {
        CONTAINER.innerHTML = ''
    }
    return = (e) => {
        let category = e.target.parentElement.parentElement.firstChild.nextSibling.innerText
        this.cls()

        switch (category) {
            case 'case':
                new Case().fetchAll()
                break
            case 'cooling':
                new Cooling().fetchAll()
                break
            case 'display device':
                new Display().fetchAll()
                break;
        }
        // CONTAINER.appendChild(this.generateRow())

    }
}
class Cooling {
    fetchAll = async () => {
        // get all products from firebaseAPI
        let response = await App.GET('cooling.json').then(res => res.json())
        Object.keys(response).forEach(e => {
            CONTAINER.appendChild(ProductObj.generateCard(response[e].name, response[e].image_link[0], response[e]))
        })
        new Case().loadValue()
    }
}
class Display {
    fetchAll = async () => {
        // get all products from firebaseAPI
        let response = await App.GET('display.json').then(res => res.json())
        Object.keys(response).forEach(e => {
            CONTAINER.appendChild(ProductObj.generateCard(response[e].name, response[e].image_link[0], response[e]))
        })
        new Case().loadValue()
    }
}


let categories = [
    { name: 'case', brands: ['all'] },
    { name: 'cooling', brands: ['all'] },
    { name: 'display device', brands: ['all'] },
    { name: 'gpu', brands: [] },
    { name: 'input device', brands: [] },
    { name: 'mother board', brands: [] },
    { name: 'operating system', brands: [] },
    { name: 'processor', brands: [] },
    { name: 'power supply unit', brands: [] },
    { name: 'ram', brands: [] },
    { name: 'storage device', brands: [] },
    { name: 'others', brands: [] }
]
for (let i = 0; i < categories.length; i++) {
    document.getElementById('accord-categories').appendChild(new Products().appendAccordion(categories[i], i))
}
