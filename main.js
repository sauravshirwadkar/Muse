let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: "Gulab Agarbatti 50gm",
        tag: "gulabAgarbatti50gm",
        price: 25,
        inCart: 0
    },
    {
        name: "Gulab Agarbatti 250gm",
        tag: "gulabAgarbatti250gm",
        price: 100,
        inCart: 0
    },
    {
        name: "Kevada Agarbatti 50gm",
        tag: "kevadaAgarbatti50gm",
        price: 25,
        inCart: 0
    },
    {
        name: "Kevada Agarbatti 250gm",
        tag: "kevadaAgarbatti250gm",
        price: 100,
        inCart: 0
    },
    {
        name: "Chandan Agarbatti 50gm",
        tag: "chandanAgarbatti50gm",
        price: 25,
        inCart: 0
    },
    {
        name: "Chandan Agarbatti 250gm",
        tag: "chandanAgarbatti250gm",
        price: 100,
        inCart: 0
    },
    {
        name: "Sonchafa Agarbatti 50gm",
        tag: "sonchafaAgarbatti50gm",
        price: 25,
        inCart: 0
    },
    {
        name: "Sonchafa Agarbatti 250gm",
        tag: "sonchafaAgarbatti250gm",
        price: 100,
        inCart: 0
    },
    {
        name: "Mogra Agarbatti 50gm",
        tag: "mografaAgarbatti50gm",
        price: 25,
        inCart: 0
    },
    {
        name: "Mogra Agarbatti 250gm",
        tag: "mograAgarbatti250gm",
        price: 100,
        inCart: 0
    },
    {
        name: "Panadi Agarbatti 50gm",
        tag: "panadiAgarbatti50gm",
        price: 25,
        inCart: 0
    },
    {
        name: "Panadi Agarbatti 250gm",
        tag: "panadiAgarbatti250gm",
        price: 100,
        inCart: 0
    },
    {
        name: "Parijatak Agarbatti 50gm",
        tag: "parijatakAgarbatti50gm",
        price: 25,
        inCart: 0
    },
    {
        name: "Parijatak Agarbatti 250gm",
        tag: "parijatakAgarbatti250gm",
        price: 100,
        inCart: 0
    },
    {
        name: "Utna 50gm",
        tag: "utna50gm",
        price: 50,
        inCart: 0
    },
    {
        name: "Utna 250gm",
        tag: "utna250gm",
        price: 250,
        inCart: 0
    },
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

function removeItemFromList(product){ 
    // load existing data
    let cartItems = localStorage.getItem('productsInCart');
    
    cartItems = JSON.parse(cartItems); 
    delete cartItems[product.tag]
    if (Object.keys(cartItems).length === 0) return clearCart();

    // loop through items and calculate total price
    let totalCost = 0;
    Object.values(cartItems).forEach((item) => {
        totalCost += item.price * item.inCart;
    })
    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));

    localStorage.setItem("totalCost", totalCost);
}

function updateQuantity(product, quantity=1){ 
    // load existing data
    let cartItems = localStorage.getItem('productsInCart');

    cartItems = JSON.parse(cartItems); 

    cartItems[product.tag].inCart += quantity;

    const totalQuantity = +cartItems[product.tag].inCart
    if (totalQuantity < 1) return removeItemFromList(product);

    // loop through items and calculate total price
    let totalCost = 0;
    Object.values(cartItems).forEach((item) => {
        totalCost += item.price * item.inCart;
    })
    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));

    localStorage.setItem("totalCost", totalCost);
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

function clearCart(){
    localStorage.clear();
    location.reload();
    alert("Cart got cleared!");
}

function addItem() {
    $('.addItem').click(function (e) {
        // update the quantity count
        const item = this.dataset.key
        const cartItems = localStorage.getItem('productsInCart');
        selectedItem = JSON.parse(cartItems)[item];
        updateQuantity(selectedItem)

        // update display
        displayCart()
    })
}

function removeItem(){
    $('.removeItem').click(function (e) {
        // update the quantity count
        const item = this.dataset.key
        const cartItems = localStorage.getItem('productsInCart');
        selectedItem = JSON.parse(cartItems)[item];
        updateQuantity(selectedItem, -1)

        // update display
        displayCart()
    })
}

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem("totalCost");

    // console.log(cartItems);
    if(cartItems && productContainer){
        productContainer.innerHTML='';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="row">
                <div class="product m-2 text-center col-sm text-lead">
                    <span>${item.name}</span>
                </div>
                <div class="price">Rs.${item.price}.00</div>
                
                <div class="quantity">
                    <button  class="removeItem btn btn-link" data-key='${item.tag}'>
                        <ion-icon name="remove-outline"></ion-icon>
                    </button>
                    <span>${item.inCart}</span>
                    <button  class="addItem btn btn-link" data-key='${item.tag}'>
                        <ion-icon name="add-outline"></ion-icon>
                    </button>
                </div>
                
                <div class="total item-total">
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

        addItem();
        removeItem();
    }
}

displayCart();
onLoadCartNumbers();

