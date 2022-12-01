class Cooling {
    fetchAll = async () => {
        let response = await App.GET('cooling.json').then(res => res.json())
        Object.keys(response).forEach(e => {
            document.querySelector('.container>.row').appendChild(ProductObj.generateCard(response[e].name, response[e].image_link[0], response[e]))
        })
    }

}

new Cooling().fetchAll()