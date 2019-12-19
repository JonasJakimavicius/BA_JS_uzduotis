"use strict";

const tbody = document.querySelector('.mdc-data-table__content')
const submitBtn = document.querySelector('.mdc-button')
submitBtn.addEventListener('click', addComment);

Date.prototype.toDateInputValue = (function () {
    let local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
});


document.querySelector('#date-input').value = new Date().toDateInputValue();

function createElement(data) {
    let dataKeys = Object.keys(data);
    const row = document.createElement('tr');
    row.className = 'mdc-data-table__row';
    dataKeys.forEach((key) => {
        let col = document.createElement('td');
        col.classList = 'mdc-data-table__cell';
        col.textContent = data[key];
        row.appendChild(col);
    });

    tbody.append(row);
}

function render(data) {
    data.forEach(comment => createElement(comment));
}

function addComment(e) {
    e.preventDefault();
    let comment = {
        username:
        document.querySelector('input[name="username"]').value,
        email:
        document.querySelector('input[name="email"]').value,
        date:
        document.querySelector('input[name="date"]').value,
        comment:
        document.querySelector('textarea[name="comment"]').value,
    };


    fetch("http://localhost:3212/feedbacks", {
        method: 'POST',
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-type": "application/json"
        },
        body: JSON.stringify(comment)
    })
        .then((res) => res.json())
        .then((data) => createElement(data.body))
}

function getComments() {
    fetch("http://localhost:3212/feedbacks", {})
        .then((res) => res.json())
        .then((data) => render(data.body))
}

getComments();

