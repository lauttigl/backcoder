
const socket = io();



   
const addProductForm = document.querySelector("#addProductForm");

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
      return manager.addProduct(product);
    })
    .then(result => {
      console.log(result);
     
    })
    .catch(error => {
      console.error(error);
     
    });
  });
  


