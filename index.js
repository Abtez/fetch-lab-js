document.querySelector('#form').addEventListener('submit', handleSubmit)

const url = 'http://localhost:3000/posts'

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
    <button class='like'>Like</button>
    <button class='dislike'>Dislike</button>
    </div>
    `
    const main = document.getElementById('main')
    main.appendChild(card)
}


function loadData(){
    fetch(url).then(res => res.json())
    .then(posts => posts.forEach(post => {
        renderOnePost(post)        
    }))
}
loadData()

function addPost(articleObj){
    console.log(articleObj);
    fetch(url, {method: 'POST', headers: {
        'Content-type': 'application/json'
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














