let nav = [
    { Title: 'Home', Location: '../index.html' },
    { Title: 'Brands', Location: './brands.html' },
    { Title: 'Products', Location: './products.html' },
]
// pass nav object to navBarObject to append Links to Navigation initiator
NavBarInitiator.appendLI(nav)
// add ACTIVE class to current page
document.getElementById('products').classList.add('active')

// products container
const CONTAINER = document.querySelector('.col-10>h1+.row')
class Products {
    constructor() {
        this.products = []
        this.start = 0
        this.end = 10
        this.page = 1
    }
    appendAccordion = (data, i) => {
        let accordItem = document.createElement('div')
        let h2 = document.createElement('h2')
        h2.classList.add('accordion-header')
        h2.id = `flush-heading${this.number(i + 1)}`
        accordItem.classList.add('accordion-item')
        let button = document.createElement('button')
        // append classes to accordion button
        button.classList.add('accordion-button')
        button.classList.add('collapsed')
        button.type = 'button'
        // append attributes to accordion button
        button.setAttribute('data-bs-toggle', 'collapse')
        button.setAttribute('aria-expanded', 'false')
        button.setAttribute('aria-controls', `flush-collapse${this.number(i + 1)}`)
        button.setAttribute('data-bs-target', `#flush-collapse${this.number(i + 1)}`)
        // create accordion body wrapper
        let acc = document.createElement('div')
        acc.id = `flush-collapse${this.number(i + 1)}`
        // add classes to accordion div inside accordion
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
        // append body to accordion
        acc.appendChild(accBody)
        // button text
        button.appendChild(document.createTextNode(data.name.toUpperCase()))
        // append button to h2
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
        // get H1 element to apped the category name
        let label = document.getElementById('ctgry')
        this.cls()
        this.fetchSwitch(category)
        label.innerText = category
    }
    fetchSwitch = (category) => {
        // category.split(' ')[0].charAt(0) + category.split(' ')[1].charAt(0) --- this function gets the first letter of splitted string

        // array of categories with more than one word
        let categoriesWithMoreThanOneWord = categories.filter(e => e.name.split(' ').length > 1).map(a => a.name)
        // array of categories with one word
        let oneWordCategories = categories.filter(e => e.name.split(' ').length == 1).map(a => a.name)

        if (categoriesWithMoreThanOneWord.includes(category)) {
            this.fetchPerCategory(category.split(' ')[0].charAt(0) + category.split(' ')[1].charAt(0))
        } else if (oneWordCategories.includes(category)) {
            this.fetchPerCategory(category)
        }
    }
    fetchPerCategory = async (obj) => {
        // get all products from firebase API
        let response = await App.GET(`${obj}.json`)
        Object.keys(response).forEach(e => {
            CONTAINER.appendChild(ProductObj.generateCard(response[e].name, response[e].image_link[0], response[e]))
        })
        this.loadValue()
    }
    returnElements = async () => {
        let condition1 = categories.filter(e => e.name.split(' ').length > 1).map(a => a.name)
        let condition2 = categories.filter(e => e.name.split(' ').length == 1).map(a => a.name)
        let response
        let p = []
        for (let c = 0; c < condition1.length; c++) {
            response = await App.GET(`${condition1[c].split(' ')[0].charAt(0) + condition1[c].split(' ')[1].charAt(0)}.json`)
            for (let e = 0; e < Object.keys(response).length; e++) {
                p.push(ProductObj.generateCard(response[Object.keys(response)[e]].name, response[Object.keys(response)[e]].image_link[0], response[Object.keys(response)[e]]))
            }
        }

        for (let d = 0; d < condition2.length; d++) {
            response = await App.GET(`${condition2[d]}.json`)
            for (let e = 0; e < Object.keys(response).length; e++) {
                p.push(ProductObj.generateCard(response[Object.keys(response)[e]].name, response[Object.keys(response)[e]].image_link[0], response[Object.keys(response)[e]]))
            }
        }
        return p
    }
    manipulateDOM(a, b, c) {
        this.returnElements().then(response => {
            if (CONTAINER.parentElement.children.length > 2)
                CONTAINER.parentElement.children[2].remove()
            for (let h = a; h < b; h++) {
                CONTAINER.appendChild(response[h])
            }
            this.insertAfter(CONTAINER, prod.generatePagination(c))
            this.loadValue()
        })
    }
    loadValue = () => {
        // back button
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
                CONTAINER.appendChild(this.generateDiv())
            })
        })
    }
    generateProduct = (data) => {
        let row = this.generateRow()
        // append image based on length
        let img = document.createElement('img')
        img.src = data.image_link[0]
        let count = 0
        img.addEventListener('click', () => {
            console.log(count)
            console.log(data.image_link[count++])
            if (count < data.image_link.length)
                img.src = data.image_link[count]
            else
                count = 0
        })
        img.style.height = 'fit-content'
        img.style.width = '400px'
        img.classList.add('border')
        img.classList.add('rounded')
        row.appendChild(img)

        return row
    }
    generateRow = () => {
        let row = document.createElement('div')
        row.classList.add('row')
        return row
    }
    generateDiv = (data) => {
        let row = this.generateRow()
        row.classList.add('row-cols-2')
        let col = document.createElement('div')
        col.classList.add('col')
        row.appendChild(col)
        return row
    }
    return = (e) => {
        let category = e.target.parentElement.parentElement.firstChild.nextSibling.innerText
        this.cls()
        if (category == 'All Products') {
            this.manipulateDOM(this.page)
        }
        this.fetchSwitch(category)
    }
    cls = () => {
        CONTAINER.innerHTML = ''
    }
    generatePagination = (active) => {
        let li_ = []
        let nav = document.createElement('nav')
        nav.setAttribute('aria-label', 'Page navigation example')
        nav.id = 'pagination'
        let ul = document.createElement('ul')
        ul.classList.add('pagination')
        ul.classList.add('justify-content-end')
        let values = [
            { inner: 1, start: 0, end: 10, active: true },
            { inner: 2, start: 10, end: 20, active: false },
            { inner: 3, start: 20, end: 30, active: false },
            { inner: 4, start: 30, end: 40, active: false },
            { inner: 5, start: 40, end: 50, active: false }]

        values.forEach(c => c.inner == active ? c.active = true : c.active = false)
        for (let b = 0; b < values.length; b++) {
            let li = document.createElement('li')
            li.classList.add('page-item')
            let a = document.createElement('a')
            a.href = '#'
            a.setAttribute('data-start', values[b].start)
            a.setAttribute('data-end', values[b].end)
            if (values[b].active) {
                a.classList.add('active')
            }
            a.onclick = this.changePage
            a.classList.add('page-link')
            a.appendChild(document.createTextNode(values[b].inner))
            li.appendChild(a)
            li_.push(li)
        }
        li_.forEach(d => {
            ul.appendChild(d)
        })
        nav.appendChild(ul)
        return nav
    }
    changePage = (e) => {
        this.cls()
        prod.manipulateDOM(parseInt(e.target.getAttribute('data-start')), parseInt(e.target.getAttribute('data-end')), e.target.innerText)
    }
    insertAfter = (referenceNode, newNode) => {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
}
let prod = new Products()
// categories object
let categories = [
    { name: 'case', brands: ['all', 'ROG'] },
    { name: 'cooling', brands: ['all', 'ROG'] },
    { name: 'display', brands: ['all'] },
    { name: 'gpu', brands: ['all'] },
    { name: 'input', brands: ['all'] },
    { name: 'mother board', brands: ['all'] },
    { name: 'processor', brands: ['all'] },
    { name: 'power supply unit', brands: ['all'] },
    { name: 'ram', brands: ['all'] },
    { name: 'storage device', brands: ['all'] }
]
for (let i = 0; i < categories.length; i++) {
    document.getElementById('accord-categories').appendChild(prod.appendAccordion(categories[i], i))
}
document.getElementById('ctgry').innerText = 'All Products'

prod.manipulateDOM(0, 10, 1)



