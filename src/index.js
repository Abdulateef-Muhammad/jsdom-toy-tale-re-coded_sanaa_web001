let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.querySelector("#new-toy-btn");
    const toyFormContainer = document.querySelector(".container");
    let toyCollection = document.querySelector('#toy-collection');
    addBtn.addEventListener("click", () => {
        // hide & seek with the form
        addToy = !addToy;
        if (addToy) {
            toyFormContainer.style.display = "block";
        } else {
            toyFormContainer.style.display = "none";
        }
    });

    let toysSource = 'http://localhost:3000/toys';

    fetch(toysSource)
        .then(function(response) {
            return response.json();
        })
        .then(function(object) {
            console.log(toyCollection);
            let toys = object;
            console.log(toys);
            for (const toy of toys) {
                let card = createAndAppend('div', toyCollection, undefined, undefined, 'card');
                createAndAppend('h2', card, toy['name']);
                let img = createAndAppend('img', card);
                img.setAttribute('src', toy['image']);
                createAndAppend('p', card, `${toy['likes']} Likes`);
                createAndAppend('button', card, 'Like', toy['id'], 'like-btn');
            }

            let likeButtons = document.getElementsByClassName('like-btn');
            for (let i = 0; i < likeButtons.length; i++) {
                console.log(likeButtons[i]);
                likeButtons[i].addEventListener('click', function(e) {
                    let likes = e.target.previousElementSibling;
                    let morelike = parseInt(likes.innerText) + 1;
                    let patchUrl = `http://localhost:3000/toys/${likeButtons[i].id}`;

                    let data = {
                        "likes": morelike
                    }
                    console.log(data)
                    let configObject = {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: "application/json"
                        },
                        body: JSON.stringify(data)
                    };

                    fetch(patchUrl, configObject)
                        .then(function(response) {
                            return response.json();
                        })
                        .then(function(json) {
                            likes.innerHTML = morelike + ' Likes';
                        });
                });

            }

        });

    document.addEventListener('submit', function(e) {

        e.preventDefault();

        let name = e.target.getElementsByTagName('input')[0].value;
        let imageUrl = e.target.getElementsByTagName('input')[1].value;

        let data = {
            "name": name,
            "image": imageUrl,
            "likes": 0
        }
        console.log(data);
        let configObject = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json"
            },
            body: JSON.stringify(data)
        };
        fetch(toysSource, configObject)
            .then(function(response) {
                return response.json();
            })
            .then(function(addedToy) {
                let newToy = createAndAppend('div', toyCollection, undefined, undefined, 'card');
                createAndAppend('h2', newToy, addedToy['name']);
                let img = createAndAppend('img', newToy);
                img.setAttribute('src', addedToy['image']);
                createAndAppend('p', newToy, `${addedToy['likes']} Likes`);
                createAndAppend('button', newToy, 'Like', addedToy['id'], 'like-btn');

                let likeButtons = document.getElementById(addedToy['id']);
                console.log(likeButtons);
                likeButtons.addEventListener('click', function() {
                    let likes = likeButtons.previousElementSibling;
                    let morelike = parseInt(likes.innerText) + 1;
                    let patchUrl = `http://localhost:3000/toys/${addedToy['id']}`;

                    let data = {
                        "likes": morelike
                    }
                    console.log(data)
                    let configObject = {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: "application/json"
                        },
                        body: JSON.stringify(data)
                    };

                    fetch(patchUrl, configObject)
                        .then(function(response) {
                            return response.json();
                        })
                        .then(function(json) {
                            console.log(likes);
                            likes.innerHTML = morelike + ' Likes';
                        });

                });


            });

    });


});


function createAndAppend(element, parent, content, id, className) {
    let newElement = document.createElement(element);
    if (content) newElement.innerHTML = content;
    if (id) newElement.id = id;
    if (className) newElement.classList.add(className);
    return parent.appendChild(newElement);
}