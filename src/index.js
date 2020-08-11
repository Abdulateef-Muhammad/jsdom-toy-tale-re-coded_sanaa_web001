let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
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
      let toyCollection = document.querySelector('.toy-collection');
      for(const toy in object.toys) {
        let card = createAndAppend('div', toyCollection, undefined, undefined, 'card');
        createAndAppend('h2', card, toy['name']);
        let img = createAndAppend('img', card);
        img.setAttribute('src', toy['toy-avatar']);
        createAndAppend('p', card, `${toy['likes']} Likes`);
        createAndAppend('button', card, 'Like <3', undefined, 'like-btn');
      }
    });
});


function createAndAppend(element, parent, content, id, className) {
  let newElement = document.createElement(element);
  if(content) newElement.innerHTML = content;
  if(id) newElement.id = id;
  if(className) newElement.classList.add(className);
  return parent.appendChild(newElement);
}