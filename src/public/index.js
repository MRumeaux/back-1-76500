const socket = io();

const listedProducts = document.getElementById('prods-container')

socket.on('realtimeProducts', (prods) => {
    let infoProducts = ''
    prods.forEach((p) => {
        infoProducts += `<img class="thumbnails" src=${p.thumbnails} alt="">
            <h2 class="title">${p.title}</h2>
            <p class="category">${p.category}</p>
            <p class="price">${p.price}</p> </br>`
    });
    listedProducts.innerHTML = infoProducts
})