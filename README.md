# To_Do_List_Nodejs


This project is for **educational** porpuses only. 

## Project features

-   CSS
-   Html
-   Js
-   NodeJs


### Authors

Justinas: [Github](https://github.com/Belute)

#### How To Use


- Open integrated terminal for backend directory and rename it backend

- Open integrated terminal for frontend directory and rename it frontend

- In backend terminal type npm install nodemon

- In backend terminal type npm run start

- In frontend terminal type npm install

- In frontend terminal type npm run start

##### How To Use

```css
.btn-danger {

    position: fixed;
    right: 5%;
    height: 30px;

    vertical-align: middle;
    padding: 0px;
    position: absolute;
}
```
```js
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



```
```html
   <div id="todolist">
        <div class="container todo-container">
            <div class="list-heading">
                <h1>TodoList</h1>
            </div>
            <div class="alert messages"></div>
            <div class="add-new">
                <div class="input-group mb-3">
                    <input type="text" id="new-todo" class="form-control" placeholder="Ką padaryti?" data-mode="add">
                    <button class="btn btn-outline-secondary" type="button" id="add-new-todo" data-edit-label="Redaguoti" data-add-label="Pridėti">Pridėti</button>
                </div>
            </div>
            <div id="todos"></div>
            <div class="actions">
                <button class="btn btn-secondary" id="mass-delete">Trinti pasirinktus</button>
            </div>
            <div id="myProgress">
                <div id="myBar"></div>
            </div>
        </div>
```
