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
const CONTAINER = document.querySelector('.container>h1+.row')
const myModal = new bootstrap.Modal('#myModal', {
})
class Products {
    // nav for generating categories
    appendTabs = (data, i) => {
        let li = document.createElement('li')
        li.classList.add('nav-item')
        let a = document.createElement('a')
        a.classList.add('nav-link')
        a.href = 'javascript:void(0)'
        a.onclick = this.fetchItems
        a.innerText = data.name.toUpperCase()
        li.appendChild(a)
        return li
    }
    fetchItems = (e) => {
        this.cls()
        document.querySelector('.page-loading-status').style.display = 'block'
        this.fetchSwitch(e.target.innerText.toLowerCase())
        document.querySelector('.page-loading-status').style.display = 'none'
    }
    // load products per category - upon clicking the nav body
    loadProduct = (e) => {
        let category = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.firstChild.firstChild.innerText.toLowerCase()
        // get H1 element to apped the category name
        let label = document.getElementById('ctgry')
        this.cls()
        this.fetchSwitch(category)
        label.innerText = category
    }
    fetchSwitch = (category) => {
        document.getElementById('ctgry').innerText = category.toUpperCase()
        // category.split(' ')[0].charAt(0) + category.split(' ')[1].charAt(0) --- this function gets the first letter of splitted string
        // filter categories and return array of categories with more than one word
        let categoriesWithMoreThanOneWord = categories.filter(e => e.name.split(' ').length > 1).map(a => a.name)
        // filter categories and return array of categories with one word
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
            response[e]['key'] = e
            CONTAINER.appendChild(this.generateCard(response[e]))
        })
    }
    fetchPerItem = async (ctrgy, obj) => {
        let response = await App.GET(`${ctrgy}/${obj}.json`)
        return response
    }
    loadProducts = async (e) => {
        // view product btn
        document.querySelector('.page-loading-status').style.display = 'none'
        let id = e.target.getAttribute('data-value')
        let data = await this.fetchPerItem(document.getElementById('ctgry').innerText.toLowerCase(), id)

        CONTAINER.innerHTML = ''
        let btn = document.createElement('button')
        btn.appendChild(document.createTextNode('Back'))
        btn.classList.add('btn', 'btn-primary')
        // back button
        btn.addEventListener('click', this.return)
        let addToCartBtn = document.createElement('button')
        addToCartBtn.classList.add('btn', 'btn-outline-primary')
        addToCartBtn.setAttribute('data-value', JSON.stringify(data))
        addToCartBtn.appendChild(document.createTextNode('Add to cart'))
        addToCartBtn.addEventListener('click', this.showConfirmationModal)
        let btnGroup = document.createElement('div')
        btnGroup.classList.add('btn-group')
        btnGroup.setAttribute('role', 'group')
        // append buttons to button group
        this.appendElements(btnGroup, [btn, addToCartBtn])
        btnGroup.classList.add('p-2')
        let row = this.generateRow()
        // create div with column class
        let col1 = this.generateColumn(['col-4', 'd-flex', 'flex-column', 'align-items-center'])
        let col2 = this.generateColumn(['col-8', 'd-flex', 'flex-column', 'align-items-start', 'gap-2'])
        let span = document.createElement('span')
        span.style.fontSize = '10px'
        span.style.fontStyle = 'italic'
        span.classList.add('p-1')
        span.innerText = 'Click on the photo to view different pespective'
        this.appendElements(col1, [this.generateProduct(data), span, btnGroup])
        col2.appendChild(this.generateProductDetails(data.name))
        if (Object.keys(data).includes('price')) {
            col2.appendChild(this.generateProdPrice(data.price))
        }
        col2.appendChild(this.generateProdSpecification(data))
        this.appendElements(row, [col1, col2])
        CONTAINER.appendChild(row)

    }
    showConfirmationModal = (e) => {
        let countDiv = document.createElement('div')
        countDiv.classList.add('d-flex', 'gap-2', 'align-items-center', 'justify-content-center')
        let countLbl = document.createElement('label')
        countLbl.innerText = 'No. of items'
        let count = document.createElement('input')
        count.type = 'number'
        count.min = 1
        count.value = 1
        count.onfocus = (e) => e.target.value = ''
        count.classList.add('form-control-sm')
        this.appendElements(countDiv, [countLbl, count])
        document.getElementById('add-to-cart').setAttribute('data-value', e.target.getAttribute('data-value'))

        if (document.querySelector('#myModal .modal-body').children.length == 1) {
            document.querySelector('#myModal .modal-body').children[0].remove()
        }
        document.querySelector('#myModal .modal-body').appendChild(countDiv)
        myModal.show()
        this.addtoCart()
    }
    addtoCart = () => {
        document.getElementById('add-to-cart').addEventListener('click', (e) => Cart.ADD(e.target.getAttribute('data-value'), document.querySelector('input[class="form-control-sm"]').value))

    }
    generateProductDetails = (data) => {
        let h3 = document.createElement('h3')
        h3.innerText = data
        return h3
    }

    generateProdPrice = (data) => {
        let span = document.createElement('span')
        span.innerText = `Price: $${data} `
        span.classList.add('h5', 'text-bg-dark', 'p-2', 'border', 'rounded-start')
        return span
    }
    generateProdSpecification = (data) => {
        let div = document.createElement('div')
        let table = document.createElement('table')
        let thead = document.createElement('thead')
        let tr = document.createElement('tr')
        let td = document.createElement('td')
        let td2 = document.createElement('td')
        let tbody = document.createElement('tbody')
        let th = document.createElement('th')
        let th2 = document.createElement('th')

        table.classList.add('table')
        th.innerText = 'Product Specification'
        th.colSpan = 2
        if (Object.keys(data).includes('specs')) {
            for (let spec in data.specs) {
                let trBody = document.createElement('tr')
                let td2 = document.createElement('td')
                let td = document.createElement('td')
                td.innerText = spec
                td2.innerText = data.specs[spec]
                this.appendElements(trBody, [td, td2])
                tbody.appendChild(trBody)
            }
        } else {
            let trBody = document.createElement('tr')
            td.innerText = 'No Data'
            td.colSpan = 2
            td2.innerText = ''
            trBody.appendChild(td)
            tbody.appendChild(trBody)
        }
        this.appendElements(tr, [th, th2])
        thead.appendChild(tr)
        this.appendElements(table, [thead, tbody])
        div.appendChild(table)
        return div

    }

    generateProduct = (data) => {
        console.log(data)
        let row = this.generateRow()
        // append image based on length
        let img = document.createElement('img')
        img.src = data.image_link[0]
        let count = 0
        img.addEventListener('click', () => {
            if (count < data.image_link.length)
                img.src = data.image_link[count]
            else
                count = 0
        })
        img.style.height = 'fit-content'
        img.style.width = '400px'
        img.classList.add('border', 'rounded')
        // append image to row
        row.appendChild(img)
        return row
    }
    generateRow = () => {
        let row = document.createElement('div')
        row.classList.add('row')
        return row
    }
    generateColumn = (classes) => {
        let col = document.createElement('div')
        for (let i = 0; i < classes.length; i++) {
            col.classList.add(classes[i])
        }
        return col
    }

    generateCard = (data) => {
        let column = document.createElement('div')
        let columnClasses = ['col', 'm-2']
        for (let a = 0; a < columnClasses.length; a++) {
            column.classList.add(columnClasses[a])
        }
        let div = document.createElement('div')
        div.classList.add('card', 'border', 'h-100')
        let image = document.createElement('img')
        image.classList.add('card-img-top', 'img')
        image.src = data.image_link[0]
        let body = document.createElement('div')
        body.classList.add('card-body')
        let h5 = document.createElement('h5')
        h5.classList.add('card-title')
        h5.innerText = data.name
        let btn = document.createElement('button')
        btn.appendChild(document.createTextNode('View'))
        btn.setAttribute('data-value', data.key)
        btn.addEventListener('click', this.loadProducts)
        let btnClasses = ['btn', 'btn-primary']
        for (let b = 0; b < btnClasses.length; b++) {
            btn.classList.add(btnClasses[b])
        }
        this.appendElements(body, [h5, btn])
        this.appendElements(div, [image, body])
        column.appendChild(div)
        return column
    }
    return = (e) => {
        let category = document.getElementById('ctgry').innerText.toLowerCase()
        console.log(category)
        this.cls()
        this.fetchSwitch(category)
    }
    cls = () => {
        CONTAINER.innerHTML = ''
    }
    createElementWithClass = (element, classes = []) => {
        let el = document.createElement(element)
        if (classes.length > 0) {
            for (let c in classes) {
                el.classList.add(classes[c])
            }
        }
        return el
    }
    appendElements = (element, appends) => {
        for (a in appends) {
            element.appendChild(appends[a])
        }
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
    document.getElementById('categories').appendChild(prod.appendTabs(categories[i], i))
}
prod.fetchPerCategory('case')
document.getElementById('ctgry').innerText = 'case'.toUpperCase()
