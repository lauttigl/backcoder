
const socket = io();


let addProductForm = document.querySelector("#addProductForm");
let deleteProductForm = document.querySelector("#deleteProductForm")

addProductForm.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const newProd = {
      title: title.value,
      description: description.value,
      price: parseInt(price.value),
      code: code.value,
      stock: parseInt(stock.value),
      category: category.value
    }
    
    fetch('/api/products', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: newProd
    })
    .then(response => response.json())
    .then(product => {
      console.log(product);
    })
    .then(result => {
      console.log(result);
     
    })
    .catch(error => {
      console.error(error);
     socket.emit('addProduct', newProd)
    });
  });

  deleteProductForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const pid = document.querySelector("#pid").value

    fetch(`/api/products/${pid}`, {
      method: "DELETE"
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      socket.emit("productDeleted");
    })
    .catch((error) => {
      console.error(error);
    })
  })
 
  
