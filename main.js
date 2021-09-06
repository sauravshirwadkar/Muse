let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: "Gulab Agarbatti 50gm",
        tag: "gulabAgarbatti50gm",
        price: 20,
        inCart: 0
    },
    {
        name: "Gulab Agarbatti 250gm",
        tag: "gulabAgarbatti250gm",
        price: 100,
        inCart: 0
    }
];

for (let i=0;i<carts.length;i++){
    carts[i].addEventListener('click', () => {
        console.log("Added to cart!");
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product){
    console.log("The Product clicked is", product);

    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers=parseInt(productNumbers);
    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers  + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);
}

function setItems(product){     
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems); 

    if(cartItems != null){
        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag] : product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag] : product
        }
    }
    
    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}


function totalCost(product){
    // console.log("Price is",product.price);
    let cartCost = localStorage.getItem("totalCost");
    
    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }
    
}


function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem("totalCost");

    console.log(cartItems);
    if(cartItems && productContainer){
        productContainer.innerHTML='';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="row">
                <div class="product m-2 text-center col-sm text-lead">
                    <button type="button" class="btn btn-danger">Remove</button>
                    <span>${item.name}</span>
                </div>
                <div class="price">Rs.${item.price}.00</div>
                
                <div class="quantity">
                    <ion-icon name="remove-outline"></ion-icon>
                    <span>${item.inCart}</span>
                    <ion-icon name="add-outline"></ion-icon>
                </div>
                <div class="total">
                    Rs.${item.inCart * item.price}.00
                </div>
            </div>
                `
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">Basket Total</h4>
            </div>    
            <h4 class="basketTotal">Rs.${cartCost}.00</h4>
        `
    }
}

displayCart();
onLoadCartNumbers();

