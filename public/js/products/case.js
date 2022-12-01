class Case {
    fetchAll = async () => {
        // get all products from firebase API
        let response = await App.GET('case.json').then(response => response.json())
        Object.keys(response).forEach(e => {
            document.querySelector('.container>.row').appendChild(ProductObj.generateCard(response[e].name, response[e].image_link[0], response[e]))
        })
        this.loadValue()
    }
    loadValue = () => {
        document.querySelectorAll('.btn.btn-primary').forEach(e => {
            e.addEventListener('click', () => {
                let parent = document.querySelector('.container.text-center.p-3')
                parent.innerHTML = ''
                parent.appendChild(this.generateProduct(JSON.parse(e.getAttribute('data-value'))))
            })
        })
    }
    generateProduct = (data) => {
        let row = document.createElement('div')
        row.classList.add('row')
        row.classList.add('row-cols-3')
        // append image based on length
        for (let i = 0; i < data.image_link.length; i++) {
            let img = document.createElement('img')
            img.src = data.image_link[i]
            img.loading = 'lazy'
            img.classList.add('img-fluid')
            let col = document.createElement('div')
            col.classList.add('col')
            col.appendChild(img)
            row.appendChild(col)
        }
        return row
    }
}

new Case().fetchAll()
