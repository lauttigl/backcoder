import ProductManager from "./src/ProductManager.js";
const socket = io();


const manager = new ProductManager();


   
const addProductForm = document.querySelector("#addProductForm");

addProductForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  
  const newProd = {
    title: title.value,
    description: description.value,
    price: parseInt(price.value),
    code: code.value,
    stock: parseInt(stock.value),
    category: category.value
  }
  

 await fetch ('/api/products', {
    method: 'post',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(newProd)
 })

  const result = await manager.addProduct(product);
  console.log(result);
});



