const buttonClick = document.getElementById('click_button');
const myForm = document.getElementById('my_form');
const mySelect = document.getElementById('myselect');
const myInput = document.getElementById('myinput');
const myDiv = document.getElementById('mydiv');

buttonClick.addEventListener('click', () => {
    alert('Me diste click');
});

myForm.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Formulario enviado');
});

mySelect.addEventListener('change', () => {
    console.log('valor: ' + mySelect.id)
});

myInput.addEventListener('input', () => {
    console.log('valor: ' + myInput.value)
});

myDiv.addEventListener('mouseover', () => {
    myDiv.classList.add('mouseover');
});

myDiv.addEventListener('mouseout', () => {
    myDiv.classList.remove('mouseover');
});

//eventos keyup y keydown//
const myBody = document.getElementById('body');
const mykeyUp = document.getElementById('key_up');
const myH1 = mykeyUp.querySelector("h1");


myBody.addEventListener('keydown', function(event) {

    if(event.key === 'a'){
        mykeyUp.classList.add('keyDownColor');
        mykeyUp.classList.remove('keyUpColor');
        myH1.textContent = "suelte la tecla a";
    }
    
});

myBody.addEventListener('keyup', function(event) {

    if(event.key === 'a'){
        mykeyUp.classList.add('keyUpColor');
        mykeyUp.classList.remove('keyDownColor');
        myH1.textContent = "presione  la tecla a";
    }
   
});

//eventos focus y blur//
const myBoton1 = document.getElementById('boton_1');
myBoton1.addEventListener('focus', function(){
    console.log("entro")
    myBoton1.classList.add('button1')
    myBoton1.classList.remove('button2')
});

myBoton1.addEventListener('blur', function(){
    console.log("salio")
    myBoton1.classList.add('button2')
    myBoton1.classList.remove('button1')
});



