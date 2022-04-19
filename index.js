document.querySelector('#form').addEventListener('submit', handleSubmit)

const url = 'http://localhost:3000/posts/'

function renderOnePost(post){
    let card = document.createElement('li')
    card.className = 'card'
    card.innerHTML = `
    <img src='${post.image}' class='img' >
    <div class='content'>
    <h4>${post.title}</h4>
    <p>${post.content}</p>
    </div>
    <div class='buttons'>
    <button class='edit'>Edit</button>
    <button class='delete'>Delete</button>
    </div>
    `
    const main = document.getElementById('main')
    main.appendChild(card)

    card.querySelector('.edit').addEventListener('click', () => {
        post.title = post.title + ' ' + 'Edited'
        post.content = post.content + ' ' + 'Edited'
        handleEdit(post)
    })
    card.querySelector('.delete').addEventListener('click', () => handleDelete(post.id))
}


function loadData(){
    fetch(url, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials' : true,
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods':'GET',
            'Access-Control-Allow-Headers':'application/json',
          },
    }).then(res => res.json())
    .then(posts => posts.forEach(post => {
        renderOnePost(post)        
    }))
}
loadData()

function addPost(articleObj){
    console.log(articleObj);
    fetch(url, {method: 'POST', headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Credentials' : true,
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'GET',
        'Access-Control-Allow-Headers':'application/json',
    },
    body: JSON.stringify(articleObj)
  })
  . then(res => res.json)
  .then(data => console.log(data))
}


function handleSubmit(e){
    e.preventDefault()
    let articleObj = {
        title: e.target.title.value,
        content: e.target.content.value,
        image: e.target.image.value,
    }
    renderOnePost(articleObj)
    addPost(articleObj)
}

function handleEdit(post){
    fetch(url + `${post.id}`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(post)
    }).then(res => res.json()).then(location.reload())
}

function handleDelete(id){
    fetch(url + `${id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
        },
    }).then(res => res.json()).then(location.reload())
}















