const socket = io();

const form = document.getElementById('form')

const inputTitle = document.getElementById('title')
const inputDescription = document.getElementById('description')
const inputCode = document.getElementById('code')
const inputPrice = document.getElementById('price')
const inputStatus = document.getElementById('status')
const inputStock = document.getElementById('stock')
const inputCategory = document.getElementById('category')
const inputThumbnails = document.getElementById('thumbnails')

form.onsubmit = (e) => {
    e.prevenDefault()
    const title = inputTitle.value
    const description = inputDescription.value
    const code = inputCode.value
    const price = inputPrice.value
    const status = inputStatus.value
    const stock = inputStock.value
    const category = inputCategory.value
    const thumbnails = inputThumbnails.value
    socket.emit('newProd', { title, description, code, price, status, stock, category, thumbnails } )
}

socket.on('products', (products) => {
    let infoProducts = ''
    products.forEach((p) => {
        infoProducts += ``
    });
    products.innerHTML = infoProducts
})