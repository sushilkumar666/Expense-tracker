// console.log('hello sushiliwa');
let listItem = document.querySelector('.list-group');
let expenseAmount = document.querySelector('.expenseAmount');
let description = document.querySelector('.description');
let dropdown = document.querySelector('#select1');
let submit = document.querySelector('.submit');
let form = document.querySelector('form');
// console.log(deleteIt);
// let deleteIt = document.querySelector('list-group');

listItem.addEventListener('click', onDelete)
listItem.addEventListener('click', onEdit)

form.addEventListener('submit', onSubmit);
// deleteIt.addEventListener('click', onDelete);

function onDelete(e) {
    var li = e.target.parentElement;
    if (e.target.classList.contains('delete')) {
        console.log('del');

        for (let i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i); // Get the key at index i
            var firstChildText = li.firstChild.textContent.split(" "); // Get the text content of the first child node
            console.log(firstChildText);


            // Check if the key is present in the text content
            if (firstChildText[1] == key)
                console.log('item remove frm bd');
            localStorage.removeItem(key); // Remove the item from localStorage

        }

        if (e.target.classList.contains('delete')) {
            listItem.removeChild(li); // Remove the <li> element from the DOM
        }
    }

}

function onEdit(e) {
    var li = e.target.parentElement;
    if (e.target.classList.contains('edit'))
        // console.log('edit');

        for (let i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i); // Get the key at index i
            var firstChildText = li.firstChild.textContent; // Get the text content of the first child node
            // console.log(firstChildText);
            // console.log('edit');

            // Check if the key is present in the text content
            if (firstChildText.indexOf(key) !== -1) {
                // let test = localStorage.getItem(key);
                // console.log(test);
                let data2 = JSON.parse(localStorage.getItem(key));
                let data = JSON.parse(data2);
                console.log(data);

                // console.log(data.expenseAmount);
                console.log(data.description);
                expenseAmount.value = parseInt(data.expenseAmount);
                description.value = data.description;
                dropdown.value = data.dropdown;
                console.log(data);

                localStorage.removeItem(key); // Remove the item from localStorage
            }
        }


    listItem.removeChild(li);
}


function onSubmit(e) {
    e.preventDefault();
    console.log(dropdown.value);
    let li = document.createElement('li');
    let deleteButton = document.createElement('button');
    let editButton = document.createElement('button');
    // dropdown.value = "choose category"


    li.className = 'list-group-item';
    deleteButton.className = 'btn btn-danger delete float-end ps-3 pe-3 btn-sm'
    editButton.className = 'btn me-2  btn-danger edit float-end btn-sm'

    li.appendChild(document.createTextNode(`${expenseAmount.value} ${description.value} ${dropdown.value} `))
    deleteButton.appendChild(document.createTextNode('X'))
    editButton.appendChild(document.createTextNode('Edit'));

    li.appendChild(deleteButton);
    li.appendChild(editButton);
    // console.log(dropdown.value);
    listItem.appendChild(li);
    let obj = {
        expenseAmount: expenseAmount.value,
        description: description.value,
        dropdown: dropdown.value,

    }
    let parseobj = JSON.stringify(JSON.stringify(obj));

    // backend code 
    localStorage.setItem(description.value, parseobj);

    expenseAmount.value = "";
    description.value = "";
    dropdown.value = "default";
}

