const socket = io();

socket.on('productsUpdated', (products) => {
    let infoProducts = ''
    products.forEach((p) => {
        infoProducts += `<img class="thumbnails" src={{thumbnails}} alt="">
            <h2 class="title">{{title}}</h2>
            <p class="category">{{category}}</p>
            <p class="price">{{price}}</p>`
    });
    products.innerHTML = infoProducts
})