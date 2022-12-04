let nav = [
    { Title: 'Home', Location: '../index.html' },
    { Title: 'Brands', Location: './brands.html' },
    { Title: 'Products', Location: './products.html' },
]
NavBarInitiator.appendLI(nav)
document.getElementById('products').classList.add('active')

class Products {
    appendAccordion(data, i) {
        let accordItem = document.createElement('div')
        let h2 = document.createElement('h2')
        h2.classList.add('accordion-header')
        h2.id = `flush-heading${numberToEnglish(i + 1).charAt(0).toUpperCase() + numberToEnglish(i + 1).slice(1).trim()}`
        accordItem.classList.add('accordion-item')

        let button = document.createElement('button')
        button.classList.add('accordion-button')
        button.classList.add('collapsed')
        button.type = 'button'
        button.setAttribute('data-bs-toggle', 'collapse')
        button.setAttribute('aria-expanded', 'false')
        button.setAttribute('aria-controls', `flush-collapse${numberToEnglish(i + 1).charAt(0).toUpperCase() + numberToEnglish(i + 1).slice(1).trim()
            }`)
        button.setAttribute('data-bs-target', `#flush-collapse${numberToEnglish(i + 1).charAt(0).toUpperCase() + numberToEnglish(i + 1).slice(1).trim()
            }`)

        let acc = document.createElement('div')
        acc.id = `flush-collapse${numberToEnglish(i + 1).charAt(0).toUpperCase() + numberToEnglish(i + 1).slice(1).trim()}`
        acc.classList.add('accordion-collapse')
        acc.classList.add('collapse')
        acc.setAttribute('aria-labelledby', `flush-headinge${numberToEnglish(i + 1).charAt(0).toUpperCase() + numberToEnglish(i + 1).slice(1).trim()}`)
        acc.setAttribute('data-bs-parent', '#accord-categories')

        let accBody = document.createElement('div')
        let ul = document.createElement('ul')
        let li = document.createElement('li')
        accBody.appendChild(document.createTextNode('test'))
        accBody.classList.add('accordion-body')

        acc.appendChild(accBody)


        // button text
        button.appendChild(document.createTextNode(data.toUpperCase()))

        h2.appendChild(button)
        accordItem.appendChild(h2)
        accordItem.appendChild(acc)
        return accordItem
    }
}
let categories = [
    { name: 'case' },
    { name: 'cooling' },
    { name: 'display device' },
    { name: 'gpu' },
    { name: 'input device' },
    { name: 'mother board' },
    { name: 'operating system' },
    { name: 'processor' },
    { name: 'power supply unit' },
    { name: 'ram' },
    { name: 'storage device' },
    { name: 'others' }
]
for (let i = 0; i < categories.length; i++) {
    document.getElementById('accord-categories').appendChild(new Products().appendAccordion(categories[i].name, i))
}
