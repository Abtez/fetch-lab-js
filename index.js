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















