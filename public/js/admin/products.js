NavBarInitiator.appendLI([
    { Title: 'Dashboard', Location: './dashboard.html' },
    { Title: 'Products', Location: './products.html' },
    { Title: 'Users', Location: './users.html' }
])
document.getElementById('products').classList.add('active')

const Products = {
    index: async () => {
        const myModal = new bootstrap.Modal(document.getElementById('addProductModal'))
        document.getElementById('addProduct').addEventListener('click', () => {
            myModal.show()
        })
        Products.appendModalBody()
        document.querySelector('.modal-body').appendChild(await Products.appendModalBody())
    },
    getCategories: async () => {
        try {
            let results = await App.GET('.json')
            return await results
        } catch (err) {
            console.error(err)
            return false
        }
    },
    getOptions: (data) => {
        let html = ''
        for (d in data) {
            html += `<option value="${data[d]}">${data[d]}</option>`
        }
        return html
    },
    appendModalBody: async () => {
        let form = App.createElementsWithClass('form',['d-flex','gap-2'])
        let select = App.createElementsWithClass('select', [], [{ a: 'name', v: 'category' }, { a: 'id', v: 'select-ctgry' }])
        let label = App.createElementsWithClass('label', [], [{ a: 'for', v: 'select-ctgry' }])
        label.innerText = 'Select Category'
        let categories = await Products.getCategories()
        select.innerHTML = Products.getOptions(Object.keys(categories))
        form.appendChild(label)
        form.appendChild(select)
        return form
    }
}

Products.index()