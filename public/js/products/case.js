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
                let btn = document.createElement('button')
                btn.appendChild(document.createTextNode('Back'))
                btn.classList.add('btn')
                btn.classList.add('btn-primary')
                btn.addEventListener('click', () => {
                    parent.innerHTML = ''
                    parent.appendChild(this.generateRow())
                    this.fetchAll()
                })
                parent.appendChild(btn)
                parent.appendChild(this.generateProduct(JSON.parse(e.getAttribute('data-value'))))
                parent.appendChild(this.generateDiv(JSON.parse(e.getAttribute('data-value'))))

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

}

new Case().fetchAll()
