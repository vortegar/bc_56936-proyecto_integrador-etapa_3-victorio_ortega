
console.log('🆗: Módulo PageContacto cargado.');

class PageContacto {

    static async init () {
        console.log('PageContacto.init()');
        
        let formulario = document.querySelector('form')

        /* Variables que traen el input */
        const _nombre = document.querySelector('#nombre');
        const _mail = document.querySelector('#mail');
        const _comentario = document.querySelector('#comentario');
        const MensajeError = document.querySelectorAll('.error');
        const DivContenedor = document.querySelectorAll('.Div_Error');
        
        
        /* variables de validación */
        let validadorNombre = /^[a-záéíóúñ'\s]{2,40}$/i;
        let validadorMail = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
        let validadorCometario = /^[A-Za-z0-9áéíóúñç\d\s,;!¡#$.()'"°-]{5,200}$/i;
        let caracteresEspeciales = '#$%&/()=?¡!*+<>';
        
        /* Funcion que agrega el mensaje de error */
        const setCustomValidityNombre = mensaje => {
            MensajeError[0].innerHTML = mensaje
            DivContenedor[0].classList.toggle('error', mensaje)
        }
        
        const setCustomValidityMail = mensaje => {
            MensajeError[1].innerHTML = mensaje
            DivContenedor[1].classList.toggle('error', mensaje)
        }
        
        const setCustomValidityComentario = mensaje => {
            MensajeError[2].innerHTML = mensaje
            DivContenedor[2].classList.toggle('error', mensaje)
        }
        
        function validarInputNombre(nombre) {
            nombre = nombre.trim()
            let mensaje = ''
        
            if (!validadorNombre.test(nombre)) {
                if (nombre.length < 3) {
                    MensajeError[0].style.opacity = "1";
                    mensaje = '* Debes color tu nombre completo';
                } else if (nombre.indexOf(caracteresEspeciales)) {
                    MensajeError[0].style.opacity = "1";
                    mensaje = '* No se admite numeros ni caracteres especiales';
                } 
                else {
                    MensajeError[0].style.opacity = "1";
                    mensaje = '* No se permiten mayusculas';
                } 
                setCustomValidityNombre(mensaje)
                return null
            } else {
                MensajeError[0].style.opacity = "0";
                MensajeError[0].style.transition = "all 1s";
            }
        
            setCustomValidityNombre(mensaje)
            return encodeURIComponent(nombre)
        }
        
        
        function validarInputMail(mail) {
            mail = mail.trim()
            let mensaje = '';
        
            if (!validadorMail.test(mail)) {
                if (mail.length < 3) {
                    MensajeError[1].style.opacity = "1";
                    mensaje = '* Debes color tu correo electronico';
                }else {
                    MensajeError[1].style.opacity = "1";
                    mensaje = '* Debes colocar un correo electronico valido';
                }
                setCustomValidityMail(mensaje)
                return null
            } else {
                MensajeError[1].style.opacity = "0";
                MensajeError[1].style.transition = "all 1s";
            }
        
            setCustomValidityMail(mensaje)
            return encodeURIComponent(mail)
        }
        
        function validarInputComentario(comentario) {
            comentario = comentario.trim()
            let mensaje = ''
        
            if (!validadorCometario.test(comentario)) {
                    MensajeError[2].style.opacity = "1";
                    mensaje = '* Debes colocar al menos una palabra';
            } else {
                MensajeError[2].style.opacity = "0";
                MensajeError[2].style.transition = "all 1s";
            }
        
            setCustomValidityComentario(mensaje)
            return encodeURIComponent(comentario)
        }
        
        
        /* Evento que muestra la validacion en consola */
        _nombre.addEventListener('blur', e => {
            console.log(validarInputNombre(_nombre.value))
            formulario.reportValidity()
        })
        
        _mail.addEventListener('blur', e => {
            console.log(validarInputMail(_mail.value))
            formulario.reportValidity()
        })
        
        _comentario.addEventListener('blur', e => {
            console.log(validarInputComentario(_comentario.value))
            formulario.reportValidity()
        })
        
        /* Evento que muestra la respuesta en consola cuando se acciona el boton de enviar */
        formulario.addEventListener('submit', e => {
            e.preventDefault()
        
            let valorNombre = validarInputNombre(_nombre.value)
            if (valorNombre) {
                console.log(`Nombre: "${valorNombre}"`)
            }
        
            let valorMail = validarInputMail(_mail.value)
            if (valorMail) {
                console.log(`E-mail: "${valorMail}"`)
            }
        
        })

    }
}

export default PageContacto;
