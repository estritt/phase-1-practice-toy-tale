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
  const toyForm = document.querySelector('.add-toy-form');
  toyForm.addEventListener('submit', (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': "application/json"
      },
      body: JSON.stringify({
        'name': e.target.name.value,
        'image': e.target.image.value,
        'likes': 0
      })
    })
    .then(res => res.json())
    .then(newToy => renderToy(newToy))
  })
  }); 
  fetch('http://localhost:3000/toys')
  .then((response) => response.json())
  .then(allToys => allToys.forEach(oneToy => renderToy(oneToy)));
  // const likeBtns = document.querySelectorAll('.like-button');
});

function renderToy(oneToy) {
  const newToy = document.createElement('div');
    newToy.classList.add('card');
    const newToyH2 = document.createElement('h2');
    newToyH2.textContent = oneToy.name;
    const newToyImg = document.createElement('img');
    newToyImg.src = oneToy.image;
    newToyImg.classList.add('toy-avatar');
    const newToyP = document.createElement('p');
    newToyP.textContent = oneToy.likes;
    const newToyBtn = document.createElement('button');
    newToyBtn.classList.add('like-button');
    newToyBtn.id = oneToy.id;
    newToyBtn.addEventListener('click', e => handleLike(e.target));
    newToy.append(newToyH2, newToyImg, newToyP, newToyBtn);
    document.getElementById('toy-collection').append(newToy);
}

function handleLike(clickedBtn) {
  console.log('click!')
  const id = clickedBtn.id;
  const newNumberOfLikes = parseInt(clickedBtn.previousSibling.textContent) + 1;
  fetch(`http://localhost:3000/toys/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': "application/json"
    },
    body: JSON.stringify({
      'likes': newNumberOfLikes
    })
  })
  .then(resp => resp.json())
  .then(likedToy => 
    {
      document.getElementById(likedToy.id).previousSibling.textContent++; //why can I not access clickedBtn, id, or newNumberOfLikes from in here? 
    }
  );
}