const socket = io();

const addProductForm = document.getElementById("addProductForm");

addProductForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(addProductForm);
    const product = {
        title: formData.get("title"),
        description: formData.get("description"),
        price: formData.get("price"),
        code: formData.get("code"),
        stock: formData.get("stock"),
        category: formData.get("category"),
    };
    socket.emit("addProduct", product);
    addProductForm.reset();
});

socket.on("newProduct", (product) => {
    console.log(product);
});


