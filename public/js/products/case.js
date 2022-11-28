class Case {
    fetchAll = async () => {
        let response = await App.GET('case.json').then(response => response.json())
        Object.keys(response).forEach(e => {
            console.log(response[e])
            document.querySelector('.container>.row').appendChild(new Case().generateColumn(response[e].name, response[e].image_link[0]))
        })
    }
    generateColumn = (text, image_link) => {
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
        btn.classList.add('btn')
        btn.classList.add('btn-primary')
        body.appendChild(h5)
        body.appendChild(btn)
        div.appendChild(image)
        div.appendChild(body)
        column.appendChild(div)
        return column
    }
}
new Case().fetchAll()
