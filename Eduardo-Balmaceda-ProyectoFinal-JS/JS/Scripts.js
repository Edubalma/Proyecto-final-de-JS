const tbody = document.querySelector('.tbody')
let carrito = []
//creo una funcion para que cuando haga clic en el boton, agrege ese item al carrito
function addToCarritoItem(e){
  const button = e.target
  const item = button.closest('.card');
  const itemTitle = item.querySelector('.card-title').textContent; 
  const itemPrice = item.querySelector('.precio').textContent; 
  const itemImg = item.querySelector('.card-img-top').src;
  //creo una constante donde guardamos titulo, precio, imagen y cantidad
  const newItem = {
    title: itemTitle,
    precio: itemPrice,
    img: itemImg,
    cantidad: 1
  }

  addItemCarrito(newItem)//dentro de la variable global "carrito" le agrego el "newItem" para que vaya guardando cada vez que ocurra este proceso
}
function addItemCarrito(newItem){

  const alert = document.querySelector('.alert')
  setTimeout( function(){
    alert.classList.add('hide')
  }, 2000)
    alert.classList.remove('hide')
        
  //dentro de InputElemento voy alamcenado los elemnto que voy agregando al carrito, y en cantidad muestra las veces que lo agregue, si agrego 2 bebidas me va a mostrar 2.
  const InputElemnto = tbody.getElementsByClassName('input__elemento')
  for(let i =0; i < carrito.length ; i++){
    if(carrito[i].title.trim() === newItem.title.trim()){
      carrito[i].cantidad ++;
      const inputValue = InputElemnto[i]
      inputValue.value++;
      CarritoTotal()
      return null;
    }
  }
  carrito.push(newItem)
  renderCarrito()
} 
//uso la funcion renderCarrito para que me muestre en "carrito" los productos que voy agregando
function renderCarrito(){
  tbody.innerHTML = ''
  carrito.map(item => {
    const tr = document.createElement('tr')
    tr.classList.add('ItemCarrito')
    const Content = `
    
    <th scope="row">1</th>
            <td class="table__productos">
              <img src=${item.img}  alt="">
              <h6 class="title">${item.title}</h6>
            </td>
            <td class="table__price"><p>${item.precio}</p></td>
            <td class="table__cantidad">
              <input type="number" min="1" value=${item.cantidad} class="input__elemento">
              <button class="delete btn btn-danger">x</button>
            </td>`
    tr.innerHTML = Content;
    tbody.append(tr)

    tr.querySelector(".delete").addEventListener('click', removeItemCarrito)
    tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)
  })
  
  CarritoTotal()
}
//la funcion "CarritoTotal" hacemos la sumatoria de los elemntos agregados al carrito
function CarritoTotal(){
  let Total = 0;
  const itemCartTotal = document.querySelector('.itemCartTotal')
  carrito.forEach((item) => {
    const precio = Number(item.precio.replace("$", ''))
    Total = Total + precio*item.cantidad
  })
  itemCartTotal.innerHTML = `Total $${Total}`
  addLocalStorage()
}
//la funcion removeItemCarrito nos permite borrar del carrito el item que queremos borrar
function removeItemCarrito(e){
  const buttonDelete = e.target
  const tr = buttonDelete.closest(".ItemCarrito")
  const title = tr.querySelector('.title').textContent;
  for(let i=0; i<carrito.length ; i++){

    if(carrito[i].title.trim() === title.trim()){
      carrito.splice(i, 1)
    }
  }
  //llamamos al Alert "producto eliminado"
  const alert = document.querySelector('.remove')
  setTimeout( function(){
    alert.classList.add('remove')
  }, 2000)
    alert.classList.remove('remove')

  tr.remove()
  CarritoTotal()
}
//la funcion sumaCantidad aumenta manualmente la cantidad de item agregados y en el valor total los va sumando al valos final
function sumaCantidad(e){
  const sumaInput  = e.target
  const tr = sumaInput.closest(".ItemCarrito")
  const title = tr.querySelector('.title').textContent;
  carrito.forEach(item => {
    if(item.title.trim() === title){
      sumaInput.value < 1 ?  (sumaInput.value = 1) : sumaInput.value;
      item.cantidad = sumaInput.value;
      CarritoTotal()
    }
  })
}
//la funcion addLocalStorage hace que si recargamos la pagina no se pierda lo que teniamos agregado al carrito
function addLocalStorage(){
  localStorage.setItem('carrito', JSON.stringify(carrito))
}

const loadStorageCarrito = ()=>{
  const storage = JSON.parse(localStorage.getItem('carrito'));
  if(storage){
    carrito = storage;
    renderCarrito()
  }
}
window.onload=() =>{
  const inject = document.getElementById('inject');
  console.log(inject)
  inject.innerHTML='';
  let products = ''
  

// Utilizo fetch para tomar la api bebidas.json y tomo los valores de precio, nombre e imagen 
  fetch('./api/bebidas.json')
  .then(response =>
    response.json()
  )
  .then(result=>{
    console.log(result)
    result.map(item=>{
      products += '<div class="col d-flex justify-content-center mb-4">';
        products += '<div class="card shadow mb-1 bg-dark rounded" style="width: 15rem;">';
          products += '<h5 class="card-title pt-2 text-center text-primary">' + item.nombre + '</h5>';
          products += '<img src="'+ item.img + '" class="card-img-top" alt="...">';
          products += '<div class="card-body">';
            products += '<h5 class="text-primary">Precio: <span class="precio">$ ' + item.precio + '</span></h5>';
            products += '<div class="d-grid gap-2">';
              products += '<button  class="btn btn-primary button">Añadir a Carrito</button>';
              products += '</div>';
              products += '</div>';
              products += '</div>';
              products += '</div>';
    })
    inject.innerHTML=products
    const Clickbutton = document.querySelectorAll('.button')


Clickbutton.forEach(btn => {
btn.addEventListener('click', addToCarritoItem)
})
  })
  .catch(error=>console.log(error))
  loadStorageCarrito();
}
//llamamos al Alert "agregue un elemento al carrito"
  this.document.getElementById("boton1").addEventListener("click",function(){
    if (carrito.length === 0){
      const alert = document.querySelector('.validation')
      console.log(alert)
      setTimeout( function(){
        alert.classList.add('validation')
      }, 2000)
        alert.classList.remove('validation')
      return false;
    } 
    //llamamos al Alert "gracias por su compra"
    const alert = document.querySelector('.buy')
    console.log(alert)
    setTimeout( function(){
      alert.classList.add('buy')
    }, 2000)
      alert.classList.remove('buy')
  })



