function sliders() { 
const slider1 = document.querySelector('#slider-1');
const item1 = document.querySelector('#item-1');

const slider2 = document.querySelector('#slider-2');
const item2 = document.querySelector('#item-2');

const slider3 = document.querySelector('#slider-3');
const item3 = document.querySelector('#item-3');


item2.style.transform= 'translateX(-500px)';
item3.style.transform= 'translateX(-500px)';


function OcultarItem1(){
    item1.style.visibility = 'hidden'
    item1.style.opacity = '0';
    item1.style.transition = '2s';
    item1.style.filter= 'blur(5px)';
    item1.style.filter= 'grayscale(60%)';
    item1.style.transform= 'translateX(-500px)';
    
}
function mostrarItem1(){
    item1.style.visibility = 'visible';
    item1.style.opacity = '1';
    item1.style.transition = '1s';
    item1.style.filter= 'blur(0px)}';
    item1.style.filter= 'grayscale(0%)';
    item1.style.transform= 'translateX(0px)';
}

function OcultarItem2(){
    item2.style.visibility = 'hidden'
    item2.style.opacity = '0';
    item2.style.transition = '2s';
    item2.style.filter= 'blur(5px)';
    item2.style.filter= 'grayscale(60%)';
    item2.style.transform= 'translateX(-500px)';
    
}
function mostrarItem2(){
    item2.style.visibility = 'visible';
    item2.style.opacity = '1';
    item2.style.transition = '1s';
    item2.style.filter= 'blur(0px)}';
    item2.style.filter= 'grayscale(0%)';
    item2.style.transform= 'translateX(0px)';
        
}

function OcultarItem3(){
    item3.style.visibility = 'hidden'
    item3.style.opacity = '0';
    item3.style.transition = '2s';
    item3.style.filter= 'blur(5px)';
    item3.style.filter= 'grayscale(60%)';
    item3.style.transform= 'translateX(-500px)';
    
}
function mostrarItem3(){
    item3.style.visibility = 'visible'
    item3.style.opacity = '1';
    item3.style.transition = '1s';
    item3.style.filter= 'blur(0px)}';
    item3.style.filter= 'grayscale(0%)';
    item3.style.transform= 'translateX(0px)';
}


slider3.addEventListener('click', e => {
    
    OcultarItem1();
    OcultarItem2();
    mostrarItem3();
})

slider2.addEventListener('click', e => {
    OcultarItem1();
    OcultarItem3();
    mostrarItem2();

})

slider1.addEventListener('click', e => {
    OcultarItem2();
    OcultarItem3();
    mostrarItem1();
})

    setInterval(() => {

            OcultarItem1();
            mostrarItem2();
            OcultarItem3();
    },5000)

    setInterval(() => {

            OcultarItem1();
            mostrarItem3();
            OcultarItem2();
    },10000)

    setInterval(() => {

            OcultarItem3();
            mostrarItem1();
            OcultarItem2();
    },15000)

}

export default sliders;

