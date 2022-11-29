class Case {
    fetchAll = async () => {
        // get all products from firebase API
        let response = await App.GET('case.json').then(response => response.json())
        Object.keys(response).forEach(e => {
            document.querySelector('.container>.row').appendChild(this.generateColumn(response[e].name, response[e].image_link[0], response[e]))
        })
        this.loadValue()
    }
    generateColumn = (text, image_link, data) => {
        let column = document.createElement('div')
        column.classList.add('col')
        column.classList.add('m-2')
        let div = document.createElement('div')
        div.classList.add('card')
        let image = document.createElement('img')
        image.classList.add('card-img-top')
        image.classList.add('img-fluid')
        image.src = image_link
        let body = document.createElement('div')
        body.classList.add('card-body')
        let h5 = document.createElement('h5')
        h5.classList.add('card-title')
        h5.innerText = text
        let btn = document.createElement('button')
        btn.appendChild(document.createTextNode('View'))
        btn.setAttribute('data-value', `${JSON.stringify(data)}`)
        btn.classList.add('btn')
        btn.classList.add('btn-primary')
        body.appendChild(h5)
        body.appendChild(btn)
        div.appendChild(image)
        div.appendChild(body)
        column.appendChild(div)
        return column
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
        // append image based on length
        for (let i = 0; i < data.image_link.length; i++) {
            let img = document.createElement('img')
            img.src = data.image_link[i]
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
