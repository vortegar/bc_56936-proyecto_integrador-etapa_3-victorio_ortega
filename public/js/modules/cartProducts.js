function cartProducts() {
// Elementos btn carrito
const iconCart = document.querySelector('.main-header__cart-button-container');
const showCart = document.querySelector('.main-header__show');
const btnClosecart = document.getElementById('close-cart');

let counterProductsCart = document.querySelector('.main-header__cart-button-container-container__counter');

async function renderProductsInCart (){
        const hbsFile = await fetch('templates/cart-products.hbs').then(r => r.text());
        const template = Handlebars.compile(hbsFile);
        const html = template({ productCarts : dataProducts });
        document.querySelector('.main-header__show__cart__products').innerHTML = html;
}

let dataProducts =  [];

// Abrir y cerrar carrito
iconCart.addEventListener('click',async (e)=> {

    await renderProductsInCart();

    const totalDelCarrito = document.querySelector('.main-header__show__cart__btns__buy__total');
    const montoTotalProduct = document.querySelectorAll('.main-header__show__cart__items__text-items__cost__total');
    if(dataProducts.length > 0){
        let totalCostoEnProductos = Array.from(montoTotalProduct).map((montototal) => Number(montototal.textContent)).reduce((previus,current)=> current+previus);
        totalDelCarrito.innerHTML = totalCostoEnProductos;
    }


    showCart.classList.toggle("main-header__show__active");
    btnClosecart.addEventListener('click', () => {    
        if (showCart.classList.contains("main-header__show__active")){
            showCart.classList.remove("main-header__show__active");
        }
    })
    
    if (showCart.classList.contains("main-header__show__active")){
        document.addEventListener('keydown', (e) =>{
        if (e.keyCode === 27){
            showCart.classList.remove("main-header__show__active")
            ;}
        })
        document.addEventListener('click', () => {
            if (showCart.classList.contains("main-header__show__active")){
                showCart.classList.remove("main-header__show__active");
            }
        }, true)
    }
    e.stopPropagation();
})

// let dataProducts =  [];

// Seleccionador de cards
window.addEventListener('click',  (e) =>{
        
    
    if(e.target.classList.contains('addCart')){
        
 // -- mesage de productos agregado
    const message = document.querySelector('.alert-add-product');
        
    let valor = 100;
    let decremento = true;
    message.style.display = 'block';

    let interval = setInterval(() => {
        if(message.style.display=== 'block'){
            if (decremento){
                valor--;
                message.style.opacity = valor / 100;
            }
            else if (valor == 0.1) {
                message.style.display='none'
        }}
    },10)
    setTimeout(() => {
        if(message.style.display='none'){
            clearInterval(interval);
    }},1000)

// 
    // variables cards
    const cards = document.querySelectorAll('.card');
    
    
    for (let i=0; i< cards.length; i++){

        if(e.target.id === cards[i].getAttribute("data-id")){
            const productTittle = cards[i].querySelector('.card__heading__title').textContent;
            const productImage = cards[i].querySelector('.card__image').src;
            let productQuantity =cards[i].querySelector('.card__Price__quantity');
            let productAmount =cards[i].querySelector('.card__Price__amount');

            productQuantity.textContent = Number(productQuantity.textContent) + 1;
            let productEncontrado = null;

            productEncontrado = dataProducts.find((product) => product.id === e.target.id);
            let totalDelProducto = Number(productAmount.textContent) * Number(productQuantity.textContent);
            
            

            if(productEncontrado != null){
                productEncontrado.productQuantity++;
                productEncontrado.totaldelproducto = totalDelProducto;

            }else{
                dataProducts.push({
                    id: e.target.id,
                    img: productImage,
                    tittle: productTittle,
                    productQuantity : Number(productQuantity.textContent),
                    price: Number(productAmount.textContent),
                    totaldelproducto : totalDelProducto
                    
                })
            }
        }   
    }}

    let totalProductosElegidos = document.querySelectorAll('.card__Price__quantity');

    counterProductsCart.classList.add('main-header__cart-button-container-container__counter-active');

    for(let i=0; i < totalProductosElegidos.length; i++){
        let totalProductsEnCarrito = Array.from(totalProductosElegidos).map((cantidad) => Number(cantidad.textContent)).reduce((previus,current)=> current+previus); 
        counterProductsCart.textContent = totalProductsEnCarrito;
    }}
)}



export default cartProducts;
