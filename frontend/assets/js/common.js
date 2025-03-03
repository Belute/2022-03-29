const url = 'http://localhost:5001'
const mainInput = document.querySelector('#new-todo')
const addButton = document.querySelector('#add-new-todo')
const messageDiv = document.querySelector('.messages')

const messages = (message, status) => {
    let klase = (status === 'success') ? 'alert-success' : 'alert-danger'
    messageDiv.innerHTML = message
    messageDiv.classList.remove('alert-success', 'alert-danger')
    messageDiv.classList.add('show', klase)

    setTimeout(() => {
        messageDiv.classList.remove('show')
    }, 8000)
}

const transferData = async (url, method = 'GET', data = {}) => {
    let options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if (method != 'GET')
        options.body = JSON.stringify(data)

    const resp = await fetch(url, options)

    return resp.json()
}

const getData = () => {

    transferData(url)
        .then(resp => {
            if (resp.status === 'success') {
                let html = '<ul>'
                let x = 0
                let y = 0
                resp.data.forEach(value => {
                    let done = value.done ? 'done' : ''


                    html += `<li class="clearfix" data-id="${value.id}">
                            <input id = "box" type="checkbox" onclick = "calcular() class="mass-delete" >
                            <a class="mark-done ${done}">${value.task}</a>
                            <a class="btn btn-danger float-end delete-todo">Trinti</a>
                            <a class="btn btn-primary float-end update-todo"><i class="fa fa-edit" style="font-size:24px"></i></a>
                        </li>`

                    if (value.done == true) {
                        x = x + 1
                    }




                })

                console.log(x)
                html += '</ul>'

                var elem = document.getElementById("myBar")
                elem.style.width = (100 * x / (resp.data.length)) * 5.35 + "px";
                elem.innerHTML = x + " " + "of" + "" + resp.data.length;
                console.log(resp.data.length)



                document.querySelector('#todos').innerHTML = html

                document.querySelectorAll('.mark-done').forEach(element => {
                    let id = element.parentElement.getAttribute('data-id')

                    element.addEventListener('click', () => {

                        transferData(url + '/mark-done/' + id, 'PUT')
                            .then(resp => {
                                if (resp.status === 'success') {
                                    getData()
                                }
                                messages(resp.message, resp.status)
                            })

                    })
                })

                document.querySelectorAll('.delete-todo').forEach(element => {
                    let id = element.parentElement.getAttribute('data-id')

                    element.addEventListener('click', () => {

                        transferData(url + '/delete-todo/' + id, 'DELETE')
                            .then(resp => {
                                if (resp.status === 'success') {
                                    getData()
                                }
                                messages(resp.message, resp.status)
                            })

                    })
                })

                document.querySelectorAll('.update-todo').forEach(element => {
                    let id = element.parentElement.getAttribute('data-id')

                    element.addEventListener('click', () => {

                        transferData(url + '/' + id)
                            .then(resp => {
                                if (resp.status === 'success') {
                                    mainInput.value = resp.data.task
                                    mainInput.classList.add('edit-mode')
                                    mainInput.setAttribute('data-mode', 'edit')
                                    addButton.textContent = addButton.getAttribute('data-edit-label')
                                    addButton.setAttribute('data-id', id)
                                } else {
                                    messages(resp.message, resp.status)
                                }
                            })

                    })
                })

            } else {
                let messages = document.querySelector('.messages')

                messages.innerHTML = resp.message
                messages.classList.add('show')
            }
        })

}

window.addEventListener('load', () => {
    getData()
})

addButton.addEventListener('click', () => {
    let task = mainInput.value
    let mode = mainInput.getAttribute('data-mode')
    let route = url + '/add-todo'
    let method = 'POST'

    if (task === '') {
        let messages = document.querySelector('.messages')
        messages.innerHTML = 'Įveskite užduotį'
        messages.classList.add('show')
        return
    }

    if (mode === 'edit') {
        let id = addButton.getAttribute('data-id')
        route = url + '/edit-todo/' + id
        method = 'PUT'
    }

    transferData(route, method, { task })
        .then(resp => {
            if (resp.status === 'success') {
                getData()
            }

            mainInput.value = ''
            mainInput.classList.remove('edit-mode')
            addButton.textContent = addButton.getAttribute('data-add-label')

            messages(resp.message, resp.status)
        })
})

document.querySelector('#mass-delete').addEventListener('click', () => {
    let ids = []

    document.querySelectorAll('.mass-delete:checked').forEach(element => {
        ids.push(element.parentElement.getAttribute('data-id'))
    })

    transferData(url + '/mass-delete', 'DELETE', { ids })
        .then(resp => {
            if (resp.status === 'success') {
                getData()
            }

            messages(resp.message, resp.status)
        })

})