import productController from '/js/controllers/product.js';

console.log('🆗: Módulo PageAlta cargado.');

class PageAlta {

    static form
    static fields
    static btnCreate
    static btnUpdate
    static btnCancel

    static validators = { 
        'id': /^.*$/i,
        'nombre': /^[a-z0-9áéíóúñ'".,-_\s]{2,30}$/i,
        'price': /^[0-9]{1,30}$/i,
        'stock': /^[0-9]{1,3}$/i,
        'marca': /^[a-z0-9áéíóúñ'".,-_\s]{2,40}$/i,
        'category': /^[a-z0-9áéíóúñ'".,-_\s]{2,50}$/i,
        'description': /^[A-Za-z0-9áéíóúñç\d\s,;!¡#$.()'"°-]{2,80}$/i,
        'detalles': /^[A-Za-z0-9áéíóúñç\d\s,;!¡#$.()'"°-]{5,2000}$/i,
        'ageSince': /^[0-9]{1,3}$/i,
        'ageUntil': /^[0-9]{1,3}$/i,
        'img': /.(gif|jpeg|jpg|png)$/i,
    };

    static emptyForm() {
        PageAlta.fields.forEach(field => field.value = '');
    }

    static completeForm(product) {
        PageAlta.fields.forEach(field => {
            if(field.id !== 'img' && field.id !=='delivery' ){
                field.value = product[field.id];
            }
        });
    }

    static validate(value, validator) {
        return validator.test(value);
    }

    static validateForm() {
        let allValidated = true;
        const productToSave = {};
        console.log('\n\n');


        for (const field of PageAlta.fields) {
            let validated = true
            if(field.id !== 'delivery'){
                validated = PageAlta.validate(field.value, PageAlta.validators[field.id]);
                console.log(field.id, validated);
            }
            if (!validated) {
                allValidated = false;
                break;
            } else {
                if (field.id === 'img') {
                    productToSave[field.id] = field.files[0];
                } else {
                    productToSave[field.id] = field.value;
                }
                // productToSave[field.id] = field.value;
            }
        }
        console.log('allValidated:', allValidated);
        if (!allValidated) {
            return false;
        }
        return productToSave;
    }

    static async saveProduct(product) {
        const savedProduct = await productController.saveProduct(product);
        const products = await productController.getProducts();
        console.log(`Ahora hay ${products.length} productos`);    
        PageAlta.renderTemplateTable(products);
        return savedProduct;
    }

    static async updateProduct(product) {
        const updatedProduct = await productController.updateProduct(product.id, product);
        const products = await productController.getProducts();
        console.log(`Ahora hay ${products.length} productos`);    
        PageAlta.renderTemplateTable(products);
        return updatedProduct;
    }

    static async addFormEvents() {
        
        PageAlta.form.addEventListener('submit', async e => {
            e.preventDefault();

            const productToSave = PageAlta.validateForm();
            if (productToSave) {
                const savedProduct = await PageAlta.saveProduct(productToSave);
                console.log('savedProduct:', savedProduct);
                PageAlta.emptyForm();
            }
        });

        this.btnCancel.addEventListener('click', e => {
            PageAlta.emptyForm();
            PageAlta.btnCreate.disabled = false;
            PageAlta.btnUpdate.disabled = true;
            PageAlta.btnCancel.disabled = true;
        });

        this.btnUpdate.addEventListener('click', async e => {
            const productToSave = PageAlta.validateForm();
            if (productToSave) {
                const updatedProduct = await PageAlta.updateProduct(productToSave);
                console.log('updatedProduct:', updatedProduct);
            }
            PageAlta.emptyForm();
            PageAlta.btnCreate.disabled = false;
            PageAlta.btnUpdate.disabled = true;
            PageAlta.btnCancel.disabled = true;
        });
    }

    static async renderTemplateTable(products) {
        const hbsFile = await fetch('templates/products-table.hbs').then(r => r.text());
        const template = Handlebars.compile(hbsFile);
        const html = template({ products });
        document.querySelector('.products-table-container').innerHTML = html;
    }

    static async addTableEvents() {
        const deleteProduct = async (e) => {
            if (!confirm('¿Estás seguro de querer eliminar el producto?')) {
                return;
            }
            const row = e.target.closest('tr');
            const id = row.dataset.id;
            const deletedProduct = await productController.deleteProduct(id);
            console.log('Producto eliminado:', deletedProduct);
            // row.remove();
            const products = await productController.getProducts();
            console.log(`Aún quedan ${products.length} productos`);    
            PageAlta.renderTemplateTable(products);
        };

        const editProduct = async e => {
            const row = e.target.closest('tr');
            const id = row.dataset.id;
            const name = row.querySelector('.cell-name').innerHTML;
            const price = row.querySelector('.cell-price').innerHTML;
            const stock = row.querySelector('.cell-stock').innerHTML;
            const marca = row.querySelector('.cell-marca').innerHTML;
            const category = row.querySelector('.cell-category').innerHTML;
            const description = row.querySelector('.cell-description').innerHTML;
            const detalles = row.querySelector('.cell-detalles').innerHTML;
            const ageSince = row.querySelector('.cell-AgeSince').innerHTML;
            const ageUntil = row.querySelector('.cell-AgeUntil').innerHTML;
            const img = row.querySelector('.cell-img').innerHTML;
            const productToEdit = {};
            productToEdit.id = id;
            productToEdit.nombre = name;
            productToEdit.price = price;
            productToEdit.stock = stock;
            productToEdit.marca = marca;
            productToEdit.category = category;
            productToEdit.description = description;
            productToEdit.detalles = detalles;
            productToEdit.ageSince = ageSince;
            productToEdit.ageUntil = ageUntil;
            productToEdit.img = img;

            PageAlta.completeForm(productToEdit);
            PageAlta.btnCreate.disabled = true;
            PageAlta.btnUpdate.disabled = false;
            PageAlta.btnCancel.disabled = false;
        };

        document.querySelector('.products-table-container').addEventListener('click', e => {
            if (e.target.classList.contains('btn-delete')) {
                deleteProduct(e);
                return;
            }

            if (e.target.classList.contains('btn-edit')) {
                const element = document.querySelector('.container-all')
                const topPos = element.getBoundingClientRect().top
                
                window.scroll({
                top: topPos,
                behavior: 'smooth'
                });
                
                editProduct(e);
                return;
            }
        });
    }

    static async init () {
        console.log('PageAlta.init()');

        
        PageAlta.form = document.getElementById('form-alta-producto');
        PageAlta.fields = PageAlta.form.querySelectorAll('input, textarea');
        PageAlta.btnCreate = PageAlta.form.querySelector('#btn-create');
        PageAlta.btnUpdate = PageAlta.form.querySelector('#btn-update');
        PageAlta.btnCancel = PageAlta.form.querySelector('#btn-cancel');

        PageAlta.addFormEvents();
    
        const products = await productController.getProducts();
        console.log(`Se encontraron ${products.length} productos`);
        
        await PageAlta.renderTemplateTable(products);
        PageAlta.addTableEvents();
    }
}

let formulario = document.querySelector('form');

/* Variables que traen el input */
const _nombre = document.querySelector('#nombre');
const _price = document.querySelector('#price');
const _selectMarca = document.querySelector('#marca');
const _selectAgeSince = document.querySelector('#ageSince');
const _selectAgeUntil = document.querySelector('#ageUntil');
const _selectStock = document.querySelector('#stock');
const _selectCategoria = document.querySelector('#category');
const _description = document.querySelector('#description');
const _detalles = document.querySelector('#detalles');
const _Envio = document.querySelector('#delivery');
const MensajeError = document.querySelectorAll('.error');
const _foto = document.querySelector('#img');


/* variables de validación */
let validadorNombre = /^[a-z0-9áéíóúñ'".,-_\s]{2,30}$/i;
let validadorPrice = /^[1-9]+([.][1-9]*)?$/;

/* Funcion que agrega el mensaje de error */
const setCustomValidityNombre = mensaje => {
    MensajeError[0].innerHTML = mensaje
    };

const setCustomValidityPrecio = mensaje => {
    MensajeError[1].innerHTML = mensaje
};

const setCustomValidityStock = mensaje => {
    MensajeError[2].innerHTML = mensaje
};

const setCustomValidityMarca = mensaje => {
    MensajeError[3].innerHTML = mensaje
};

const setCustomValidityCategoria = mensaje => {
    MensajeError[4].innerHTML = mensaje
};

const setCustomValidityComentarioCorto = mensaje => {
    MensajeError[5].innerHTML = mensaje
};

const setCustomValidityComentarioLargo = mensaje => {
    MensajeError[6].innerHTML = mensaje
};

const setCustomValidityAgeSince = mensaje => {
    MensajeError[7].innerHTML = mensaje
};

const setCustomValidityAgeUntil = mensaje => {
    MensajeError[8].innerHTML = mensaje
};

const setCustomValidityFoto = mensaje => {
    MensajeError[9].innerHTML = mensaje
};


// Funciones
let caracteresEspeciales = '#$%&/()=?¡!*+<>'


function validarInputNombre(nombre) {
    nombre = nombre.trim()
    let mensaje = ''
    if (!validadorNombre.test(nombre)) {
        if (nombre.length < 2) {
            MensajeError[0].style.opacity = "1"
            mensaje = '* Debes colocar un nombre'
        }
        else if (nombre.indexOf(caracteresEspeciales)) {
            MensajeError[0].style.opacity = "1"
            mensaje = '* No se permiten caracteres especiales.'
        }
        
        setCustomValidityNombre(mensaje)
        return null
    } else {
        MensajeError[0].style.opacity = "0"
        MensajeError[0].style.transition = "all 1s"
    }

    setCustomValidityNombre(mensaje)
    return encodeURIComponent(nombre)
};


function validarInputPrecio(price) {
    price = price.trim()
    let mensaje = ''
    if (!validadorPrice.test(price)) {
        if (price <= '1') {
            MensajeError[1].style.opacity = "1"
            mensaje = '* El valor debe ser mayor que 0'
        }
        setCustomValidityPrecio(mensaje)
        return null
    }else{
        MensajeError[1].style.opacity = "0"
        MensajeError[1].style.transition = "all 1s"
    }

    setCustomValidityPrecio(mensaje)
    return encodeURIComponent(price)
};

function validarSelectStock(stock) {
    let mensaje = ''
    if (stock <= '0') {
            MensajeError[2].style.opacity = "1"
            mensaje = '* El stock debe ser mayor que 0'
    } else {
        MensajeError[2].style.opacity = "0"
        MensajeError[2].style.transition = "all 1s"
    }

    setCustomValidityStock(mensaje)
    return encodeURIComponent(stock)
};

function validarSelectMarca(mark) {
    mark = mark.trim();
    let mensaje = '';
    if (mark.length < 2) {
            MensajeError[3].style.opacity = "1"
            mensaje = '* Debes colocar la marca del producto'
    } else {
        MensajeError[3].style.opacity = "0"
        MensajeError[3].style.transition = "all 1s"
    }
    setCustomValidityMarca(mensaje)
    return encodeURIComponent(mark)
};

function validarSelectCategoria(category) {
    category = category.trim();
    let mensaje = '';
    if (category.length < 2) {
            MensajeError[4].style.opacity = "1"
            mensaje = '* Debes asignarle una categoria al producto'
    } else {
        MensajeError[4].style.opacity = "0"
        MensajeError[4].style.transition = "all 1s"
    }
    setCustomValidityCategoria(mensaje)
    return encodeURIComponent(category)
};

function validarInputComentarioCorto(comentario) {
    comentario = comentario.trim()
    let mensaje = ''

    if (comentario.length < 2) {
            MensajeError[5].style.opacity = "1"
            
            mensaje = 'Se debe colocar almenos una palabra'
    } else if (comentario.length > 80) {
        MensajeError[5].style.opacity = "1"
        mensaje = 'Solo se admiten hasta 80 caracteres'
    }else {
        MensajeError[5].style.opacity = "0"
        MensajeError[5].style.transition = "all 1s"
    }

    setCustomValidityComentarioCorto(mensaje)
    return encodeURIComponent(comentario)
};

function validarInputComentarioLargo(comentario) {
    comentario = comentario.trim()
    let mensaje = ''

    if (comentario.length < 2) {
            MensajeError[6].style.opacity = "1"
            mensaje = '* Se debe colocar almenos una palabra'
    }  
    else if (comentario.length > 2000) {
        MensajeError[6].style.opacity = "1"
        mensaje = 'Solo se admiten hasta 2000 caracteres'
    }else {
        MensajeError[6].style.opacity = "0"
        MensajeError[6].style.transition = "all 2s"
    }

    setCustomValidityComentarioLargo(mensaje)
    return encodeURIComponent(comentario)
};




function validarAgeSince(since) {
    let mensaje = ''
    if (since <= '0') {
            MensajeError[7].style.opacity = "1"
            mensaje = '* La edad debe ser mayor de 0'
    } else {
        MensajeError[7].style.opacity = "0"
        MensajeError[7].style.transition = "all 1s"
    }
    setCustomValidityAgeSince(mensaje)
    return encodeURIComponent(since)
};


_foto.setAttribute('accept',"image/png,image/jpeg")
function validarFoto(select) {
    let mensaje = '';
    if (_foto.validationMessage === 'Selecciona un archivo.') {
            MensajeError[9].style.opacity = "1"
            mensaje = '* Debes adjuntar una imagen'
    }else {
        MensajeError[9].style.opacity = "0"
        MensajeError[9].style.transition = "all 1s"
    }


    setCustomValidityFoto(mensaje)
    return encodeURIComponent(select)
};


/* Evento que muestra la validacion */
_nombre.addEventListener('blur', e => {
    console.log(validarInputNombre(_nombre.value))
    formulario.reportValidity()
});

_price.addEventListener('blur', e => {
    console.log(validarInputPrecio(_price.value))
    formulario.reportValidity()
});

_selectStock.addEventListener('blur', e => {
    console.log(validarSelectStock(_selectStock.value))
    formulario.reportValidity()
});

_selectMarca.addEventListener('blur', e => {
    console.log(validarSelectMarca(_selectMarca.value))
    formulario.reportValidity()
});

_selectCategoria.addEventListener('blur', e => {
    console.log(validarSelectCategoria(_selectCategoria.value))
    formulario.reportValidity()
});

_description.addEventListener('blur', e => {
    console.log(validarInputComentarioCorto(_description.value))
    formulario.reportValidity()
});

_Envio.addEventListener('input', e => {
    let envioConCargo = _Envio.value
    console.log(envioConCargo)
    if(envioConCargo === ''){
        envioConCargo = 'on'
    }
    console.log(envioConCargo)
    });

_detalles.addEventListener('blur', e => {
    console.log(validarInputComentarioLargo(_detalles.value))
    formulario.reportValidity()
});

_selectAgeSince.addEventListener('blur', e => {
    console.log(validarAgeSince(_selectAgeSince.value))
    formulario.reportValidity()
});

_selectAgeUntil.addEventListener('blur', e => {
    console.log((_selectAgeUntil.value))
    formulario.reportValidity()
});

_foto.addEventListener('change', e => {
    console.log(validarFoto(_foto.value))
    formulario.reportValidity()
});


export default PageAlta;
