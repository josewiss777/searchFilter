//Register imports
import phones from './db.js';

//Register variables and selectors
const brand = document.querySelector('#brand')
const color = document.querySelector('#color')
const priceMin = document.querySelector('#priceMin')
const priceMax = document.querySelector('#priceMax')
const divResult = document.querySelector('#divResult')
const divAlert = document.querySelector('#divAlert')
const searchPhones = {
    brand: '',
    color: '',
    priceMin: '',
    priceMax: ''
}

//Register events
document.addEventListener('DOMContentLoaded', () => {
    showPhones(phones); //Recibe phones porque en el if de la funcion filterPhone debe recibir un parametro (result)
})
brand.addEventListener('change', e => {
    searchPhones.brand = e.target.value;
    filterPhone();
})
color.addEventListener('change', e => {
    searchPhones.color = e.target.value;
    filterPhone();
})
priceMin.addEventListener('change', e => {
    searchPhones.priceMin = parseInt(e.target.value);
    filterPhone();
})
priceMax.addEventListener('change', e => {
    searchPhones.priceMax = parseInt(e.target.value);
    filterPhone();
})

//Register functions
function showPhones(phones) {
    cleanResult();
    phones.forEach( (phone) => {  
        const{ brand, model, color, price, id } = phone;
        const divCard = document.createElement('div')
        divCard.classList.add('card')
        const imgCard = document.createElement('img')
        imgCard.src = `./img/phone${id}.webp`
        imgCard.alt= 'Telefono celular'
        const divBrandModel = document.createElement('div')
        divBrandModel.classList.add('brandModel')
        const pBrand = document.createElement('p')
        const pModel = document.createElement('p')
        pBrand.textContent = `${brand} -`
        pModel.textContent = `${model}`
        divBrandModel.append(pBrand, pModel)
        const pColor = document.createElement('p')
        const pPrice = document.createElement('p')
        pColor.textContent = `${color}`
        pPrice.textContent = `$ ${price.toLocaleString('en-US')}` 
    
        divResult.appendChild(divCard)
        divCard.insertBefore(imgCard, divCard.children[0])
        divCard.insertBefore(divBrandModel, divCard.children[1])
        divCard.insertBefore(pColor, divCard.children[2])
        divCard.insertBefore(pPrice, divCard.children[3])        
    })
}

function filterPhone() { 
    const result = phones.filter(filterBrand).filter( filterColor ).filter( filterPriceMin ).filter( filterPriceMax ); //Aplica filter sobre la db(phones) y llama la funcion filterBrand
    console.log(result)
    if( result.length > 0 ) {
        cleanError()
        showPhones(result)
    } else {
        showError();
    }
}

function filterBrand(phone) {
    const { brand } = searchPhones;
    if( brand ) { //Si el usuario selecciona algo en el campo brand...
        return phone.brand === brand //Retorna los iguales entredel campo seleccionado y la db 
    } else { 
        return phone;  //Si el usuario no selecciona nada en ese campo devuelve todas las opciones que tenga brand...
    }
}

function filterColor(phone) {
    const { color } = searchPhones;
    if( color ) { 
        return phone.color === color 
    } else { 
        return phone;  
    }
}

function filterPriceMin(phone) {
    const { priceMin } = searchPhones;
    if( priceMin ) { 
        return phone.price >= priceMin 
    } else { 
        return phone;  
    }
}

function filterPriceMax(phone) {
    const { priceMax } = searchPhones;
    if( priceMax ) { 
        return phone.price <= priceMax 
    } else { 
        return phone;  
    }
}

function showError() {
    cleanResult();
    cleanError();
    const pAlert = document.createElement('p')
    pAlert.textContent = 'No se encontraron resultados'
    pAlert.classList.add('alert')
    divResult.appendChild(pAlert)
}

function cleanResult() {
    while(divResult.firstChild) {
        divResult.removeChild(divResult.firstChild)
    }
}

function cleanError() {
    while(divAlert.firstChild) {
        divAlert.removeChild(divAlert.firstChild)
    }
}