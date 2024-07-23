function getTaskType() {
    const pathname = window.location.pathname;
    return pathname.includes('tutorial') ? 'tutorial' : 'task';
}

const urlParams = new URLSearchParams(window.location.search);
const participantId = urlParams.get('participantId');
const stage = urlParams.get('stage');
const condition = urlParams.get('condition');

// Insert the new code snippet right here
if (condition === 'control') {
    const shoppingCart = document.querySelector('.shopping-cart');
    if (shoppingCart) {
        shoppingCart.style.paddingRight = '0px'; // Remove padding-right
    }
}

let lastPageScrollPosition = 0;
let lastScrollPosition = 0;


document.addEventListener('DOMContentLoaded', async () => {
    const navHeight = document.querySelector('.navbar') ? document.querySelector('.navbar').offsetHeight : 0;
    document.body.style.paddingTop = `${navHeight}px`;
    const taskType = getTaskType();

    // Set initial scroll position
    lastPageScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    // Listen for scroll events on the page
    window.addEventListener('scroll', logPageScrollDelta);

    if (!participantId) {
        console.error('No participant ID provided');
        return; // Exit the function or handle this appropriately
    }
    try {
        const response = await fetch(`/api/products?participantId=${encodeURIComponent(participantId)}&stage=${stage}`);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const products = await response.json();
        displayProducts(products);
        logUserAction(participantId, stage, condition, { event: 'Products displayed' });
    } catch (error) {
        console.error("Failed to load products:", error);
        logUserAction(participantId, stage, condition, { error: 'Failed to load products', details: error.message });
    }
});

window.addEventListener('resize', () => {
    const navHeight = document.querySelector('.navbar') ? document.querySelector('.navbar').offsetHeight : 0;
    document.body.style.paddingTop = `${navHeight}px`;

    // Retrieve the new dimensions of the window
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Log the new dimensions
    logUserAction(participantId, stage, condition, { event: 'Window resized', width, height });
});

// Checkout function to advance state
async function completeCheckout() {
    try {
        // Convert the entire cart to a JSON object for logging
        const cartDetails = cart.map(item => ({
            title: item.title,
            imgUrl: item.imgUrl,
            rating: item.rating,
            price: item.price
        }));

        const totalPrice = calculateCartTotal();
        const totalRating = calculateTotalRating();
        const logMessage = {
            event: 'User completed checkout',
            items: cartDetails,
            totalPrice: totalPrice,
            totalRating: totalRating
        };


        // Log before attempting to advance state
        await logUserAction(participantId, stage, condition, logMessage);



        // Proceed with state advancement
        const response = await fetch(`/api/advance-state?participantId=${encodeURIComponent(participantId)}&stage=${encodeURIComponent(stage)}&condition=${encodeURIComponent(condition)}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        // Redirect based on the next stage
        if (response.ok && data.nextStage) {
            if (data.nextStage.includes('tutorial')) {
                window.location.href = `/tutorial-description?participantId=${participantId}&stage=${data.nextStage}&condition=${data.condition}`;
            } else {
                window.location.href = `/task-description?participantId=${participantId}&stage=${data.nextStage}&condition=${data.condition}`;
            }
        } else {
            // Handle case where there is no next stage
            window.location.href = '/';
        }
    } catch (error) {
        console.error("Failed to complete checkout:", error);
        // Log checkout failure
        await logUserAction(participantId, stage, condition, {
            error: 'Failed to complete checkout',
            message: error.message
        });
    }
}



function createStarRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += (i <= rating) ? '<i class="bi bi-star-fill"></i>' :
            ((i - rating === 0.5) ? '<i class="bi bi-star-half"></i>' : '<i class="bi bi-star"></i>');
    }
    return stars;
}

function displayProducts(products) {
    const container = document.getElementById('product-container');
    container.innerHTML = ''; // Clear existing content in the container

    products.forEach(product => {
        const card = document.createElement('div');
        let productUrl = `/product?title=${encodeURIComponent(product.title)}&participantId=${participantId}&stage=${stage}&condition=${condition}`;
        card.classList.add('card', 'm-2'); // Apply Bootstrap card styles
        card.innerHTML = `
            <div class="row m-0 g-0">
                <div class="col-5 m-0 g-0 img-container">
                    <img src="${product.imgUrl}" class="img-fluid rounded-start" alt="${product.title}">
                </div>
                <div class="col-7">
                    <div class="card-body">
                        <h5 class="card-title unclickable-link"><a href="${productUrl}">${product.title}</a></h5>
                        <h6 class="card-subtitle mb-2 text-muted">${product.category}</h6>
                        <div class="star-rating">${createStarRating(product.rating)} <span class="card-text">${product.rating}</span></div>
                        <p class="card-text">Price: $${product.price.toFixed(2)}</p>
                        <button class="btn btn-primary btn-sm add-to-cart-btn" data-title="${product.title}" onclick="addToCart('${product.title}', '${product.category}','${product.imgUrl}', ${product.rating}, ${product.price})">${getButtonLabel(product.title)}</button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    // Log that the products have been displayed
    const displayedProducts = products.map(product => ({
        title: product.title,
        category: product.category,
        rating: product.rating,
        price: product.price
    }));
    const logMessage = {
        event: 'Displayed products',
        products: displayedProducts
    };
    logUserAction(participantId, stage, condition, logMessage);
}

function getButtonLabel(title) {
    return cart.some(item => item.title === title) ? "Remove from Cart" : "Add to Cart";
}

function logScrollDelta() {
    const shoppingCart = document.getElementById('shopping-cart');
    const newScrollPosition = shoppingCart.scrollTop;
    const scrollDelta = newScrollPosition - lastScrollPosition;
    lastScrollPosition = newScrollPosition; // Update last scroll position

    // Log the scroll delta
    logUserAction(participantId, stage, condition, {
        event: 'Cart scrolled',
        scrollDelta: scrollDelta
    });
}

function toggleCart() {
    if (event) {
        event.preventDefault();
    }
    const shoppingCart = document.getElementById('shopping-cart');
    const closeCartItem = document.getElementById('close-cart-nav-item');
    const cartNavItem = document.querySelector('.nav-item:nth-child(1)'); // Select the cart nav item

    const isCartOpen = shoppingCart.style.display === 'block';
    shoppingCart.style.display = isCartOpen ? 'none' : 'block';
    document.body.style.overflow = isCartOpen ? 'auto' : 'hidden'; // Toggle body overflow based on cart state
    document.documentElement.style.overflow = isCartOpen ? 'auto' : 'hidden'; // Also prevent scrolling on <html>
    closeCartItem.style.display = isCartOpen ? 'none' : 'block';
    cartNavItem.style.display = isCartOpen ? 'block' : 'none';

    if (!isCartOpen) {
        shoppingCart.addEventListener('scroll', logScrollDelta);
        // Reset the scroll position when opening the cart to prevent jumping
        // shoppingCart.scrollTop = 0;
    } else {
        shoppingCart.removeEventListener('scroll', logScrollDelta);
    }

    // Log opening or closing the cart
    logCartAction(isCartOpen ? 'closed' : 'opened');
}


// Additional helper function to log cart opening/closing actions
function logCartAction(action) {
    const cartDetails = cart.map(item => ({
        title: item.title,
        imgUrl: item.imgUrl,
        rating: item.rating,
        price: item.price
    }));
    const logMessage = {
        event: `Cart ${action}`,
        totalItems: cart.length,
        totalPrice: calculateCartTotal(),
        cartDetails: cartDetails
    };
    logUserAction(participantId, stage, condition, logMessage);
}




let cart = [];

function addToCart(title, category, imgUrl, rating, price) {
    const existingItemIndex = cart.findIndex(item => item.title === title);
    let action, itemDetails = { title, category, imgUrl, rating, price: parseFloat(price) };

    if (existingItemIndex === -1) {
        // Item not in cart, add it
        cart.push(itemDetails);
        action = 'added';
    } else {
        // Item already in cart, remove it
        cart.splice(existingItemIndex, 1);
        action = 'removed';
    }

    // Update cart display
    updateCart();
    updateAddToCartButtons(); // Update buttons to reflect the new state of the cart

    // Log the action
    const logMessage = {
        event: `Item ${action} to cart`,
        itemDetails,
        cartState: {
            totalPrice: calculateCartTotal(),
            totalItems: cart.length,
            items: cart.map(item => ({
                title: item.title,
                category: item.category,
                imgUrl: item.imgUrl,
                rating: item.rating,
                price: item.price
            }))
        }
    };
    logUserAction(participantId, stage, condition, logMessage);
}


function removeFromCart(title) {
    const existingItemIndex = cart.findIndex(item => item.title === title);

    if (existingItemIndex !== -1) {
        // Item found in cart, remove it
        const [removedItem] = cart.splice(existingItemIndex, 1);

        // Update UI components
        updateCart();
        updateAddToCartButtons();

        
        // Reapply overflow hidden if the cart is visible
        if (document.getElementById('shopping-cart').style.display === 'block') {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        }
        

        // Log the action
        const logMessage = {
            event: 'Item removed from cart',
            itemDetails: removedItem,
            cartState: {
                totalPrice: calculateCartTotal(),
                totalItems: cart.length,
                items: cart.map(item => ({
                    title: item.title,
                    imgUrl: item.imgUrl,
                    rating: item.rating,
                    price: item.price
                }))
            }
        };
        logUserAction(participantId, stage, condition, logMessage);
    }
}


function updateAddToCartButtons() {
    const buttons = document.querySelectorAll('.add-to-cart-btn');
    buttons.forEach(button => {
        const title = button.getAttribute('data-title');
        const inCart = cart.some(item => item.title === title);
        button.textContent = inCart ? "Remove from Cart" : "Add to Cart";
        button.classList.toggle('btn-danger', inCart); // Toggle 'btn-danger' class if item is in cart
    });
}

function updateCart() {
    const container = document.getElementById('cart-items');
    container.innerHTML = ''; // Clear existing cart items

    // Ensure the cart is not undefined or null
    if (!cart) {
        console.error('Cart is undefined or null');
        return; // Exit the function to avoid further errors
    }

    cart.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('card', 'm-2');
        card.innerHTML = `
            <div class="row m-0 g-0">
                <div class="col-5 m-0 g-0 img-container">
                    <img src="${product.imgUrl}" class="img-fluid rounded-start" alt="${product.title}">
                </div>
                <div class="col-7">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${product.category}</h6>
                        <div class="star-rating">${createStarRating(product.rating)} <span>${product.rating}</span></div>
                        <p class="card-text">Price: $${parseFloat(product.price).toFixed(2)}</p>
                        <button class="btn btn-danger btn-sm" onclick="removeFromCart('${product.title}')">Remove from Cart</button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    updateCartTotal(); // Update the total cost and item count of the cart

    // Constructing cart details for the log message
    const cartDetails = cart.map(item => ({
        title: item.title,
        imgUrl: item.imgUrl,
        rating: item.rating,
        price: parseFloat(item.price)  // Ensure price is a number
    }));

    // Construct log message
    const logMessage = {
        event: "Cart updated",
        details: {
            totalItems: cart.length,
            totalPrice: calculateCartTotal(),  // Ensure this returns a number or string that represents a number
            cartDetails: cartDetails
        }
    };

    // Log the current state of the cart
    logUserAction(participantId, stage, condition, logMessage);
}




function updateCartTotal() {
    const total = cart.reduce((acc, product) => acc + product.price, 0);
    document.getElementById('cart-total').textContent = `$${total.toFixed(2)} `;
    document.getElementById('cart-total-nav').textContent = `$${total.toFixed(2)} `;
    const cartBadge = document.getElementById('cart-badge');
    cartBadge.textContent = cart.length; // Update the cart badge with the number of items in the cart
}

async function logUserAction(participantId, stage, condition, message) {
    const logData = {
        participantId,
        state: stage,
        condition,
        message
    };

    try {
        await fetch('/api/log', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(logData)
        });
        console.log('Log sent to server:', message);
    } catch (error) {
        console.error('Error logging user action:', error);
    }
}

function calculateCartTotal() {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2); // Ensures the total is a fixed-point number with two digits after the decimal.
}

function calculateTotalRating() {
    return cart.reduce((total, item) => total + item.rating, 0); // Sums up the ratings of all items in the cart.
}



function logPageScrollDelta() {
    const newScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDelta = newScrollPosition - lastPageScrollPosition;
    lastPageScrollPosition = newScrollPosition; // Update the last scroll position for the next event

    // Log the scroll delta
    logUserAction(participantId, stage, condition, {
        event: 'Page scrolled',
        scrollDelta: scrollDelta
    });
}

