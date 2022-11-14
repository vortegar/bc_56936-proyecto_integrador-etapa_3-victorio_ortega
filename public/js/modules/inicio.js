import productController from '/js/controllers/product.js';
import cartProducts from '/js/modules/cartProducts.js';
import sliders from '/js/modules/sliderproducts.js';

// console.log(cartProducts)

console.log('🆗: Módulo PageInicio cargado.');



class PageInicio {

    
    static async renderTemplateCards(products) {
        const hbsFile = await fetch('templates/inicio.hbs').then(r => r.text());
        const template = Handlebars.compile(hbsFile);
        const html = template({ products });
        document.querySelector('.cards-container').innerHTML = html;
    }
    
    static async init () {
        console.log('PageInicio.init()');

        cartProducts();
        sliders();
        
        const products = await productController.getProducts();
        console.log(`Se encontraron ${products.length} productos`);
        
        await PageInicio.renderTemplateCards(products)

    }
}


export default PageInicio;
