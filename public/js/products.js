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
                CONTAINER.appendChild(this.generateCard(response[e]))
            })
        this.loadProduct()
    }
    loadProduct = () => {
        // view product btn
        document.querySelector('.page-loading-status').style.display = 'none'
        document.querySelectorAll('.btn.btn-primary').forEach(e => {
            e.addEventListener('click', () => {
                CONTAINER.innerHTML = ''
                let btn = document.createElement('button')
                btn.appendChild(document.createTextNode('Back'))
                btn.classList.add('btn')
                btn.classList.add('btn-primary')
                // back button
                btn.addEventListener('click', this.return)
                let addToCartBtn = document.createElement('button')
                addToCartBtn.classList.add('btn')
                addToCartBtn.classList.add('btn-outline-primary')
                addToCartBtn.appendChild(document.createTextNode('Add to cart'))
                addToCartBtn.addEventListener('click', (e) => Cart.ADD(e.target.parentElement.parentElement))
                let btnGroup = document.createElement('div')
                btnGroup.classList.add('btn-group')
                btnGroup.setAttribute('role', 'group')
                // append buttons to button group
                btnGroup.appendChild(btn)
                btnGroup.appendChild(addToCartBtn)
                let row = this.generateRow()
                // create div with column class
                let col1 = this.generateColumn(4)
                let col2 = this.generateColumn(8)
                col1.appendChild(this.generateProduct(JSON.parse(e.getAttribute('data-value'))))
                col2.appendChild(this.generateProductDetails(JSON.parse(e.getAttribute('data-value')).name))
                col2.appendChild(this.generateIframe(JSON.parse(e.getAttribute('data-value')).specification))
                col2.appendChild(btnGroup)
                row.appendChild(col1)
                row.appendChild(col2)
                CONTAINER.appendChild(row)
            })
        })
    }
    generateProductDetails = (data) => {
        let h3 = document.createElement('h3')
        h3.innerText = data
        return h3
    }
    generateIframe = (data) => {
        let iframe = document.createElement('iframe')
        iframe.src = data
        return iframe
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
        // append image to row
        row.appendChild(img)
        return row
    }
    generateRow = () => {
        let row = document.createElement('div')
        row.classList.add('row')
        return row
    }
    generateColumn = (size) => {
        let col = document.createElement('div')
        col.classList.add(`col-${size}`)
        return col
    }

    generateCard = (data) => {
        console.log(data)
        let column = document.createElement('div')
        let columnClasses = ['col', 'm-2']
        for (let a = 0; a < columnClasses.length; a++) {
            column.classList.add(columnClasses[a])
        }
        let div = document.createElement('div')
        div.classList.add('card')
        div.classList.add('border')
        div.classList.add('h-100')
        let image = document.createElement('img')
        image.classList.add('card-img-top')
        image.classList.add('img')
        image.src = data.image_link[0]
        let body = document.createElement('div')
        body.classList.add('card-body')
        let h5 = document.createElement('h5')
        h5.classList.add('card-title')
        h5.innerText = data.name
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
    return = (e) => {
        let category = document.getElementById('ctgry').innerText.toLowerCase()
        console.log(category)
        this.cls()
        this.fetchSwitch(category)
    }
    cls = () => {
        CONTAINER.innerHTML = ''
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
