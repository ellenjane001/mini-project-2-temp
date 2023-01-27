const firebaseAPI = 'https://techmart-96763-default-rtdb.asia-southeast1.firebasedatabase.app/'

// APP - object with functions as its properties
let App = {
    // SEND data to API
    POST: async (url = '', data = {}) => {
        let requestFetch = async (url) => {
            console.log('** beforeSend request fetch **');
            return await fetch(url, {
                method: 'POST',
                // mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
        }
        const req = await requestFetch(`${firebaseAPI}${url}`)
        const json = await req.json()
        return json
    },
    // GET all data in API
    GET: async (url = '') => {
        let requestFetch = async (url) => {
            return await fetch(url, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
        const req = await requestFetch(`${firebaseAPI}${url}`)
        const json = await req.json()
        return json
    },
    createElementsWithClass: (element, classes = [], attributes = []) => {
        let el = document.createElement(element)
        if (classes.length > 0) {
            for (c in classes)
                el.classList.add(classes[c])
        }
        if (attributes.length > 0) {
            for (attr in attributes) {
                if (attributes[attr].length > 1) {
                    attributes[attr].forEach(b => {
                        el.setAttribute(attributes[attr].a[b], attributes[attr].v[b])
                    })
                } else {
                    el.setAttribute(attributes[attr].a, attributes[attr].v)
                }
            }
        }
        return el
    }
}