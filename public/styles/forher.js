const products = [
  { name: "White Dress", price: 19.99 },
  { name: "Shoes", price: 29.99 },
  { name: "Bag", price: 14.99 },
];

const cart = [];
let cartTotal = 0.0;

// Function to add a product to the cart
function addToCart(productIndex) {
  const product = products[productIndex];
  cart.push(product);
  cartTotal += product.price;
  updateCartUI();
}

// Function to update the cart list and total price
function updateCartUI() {
  const cartList = document.getElementById("cart-list");
  const cartTotalElement = document.getElementById("cart-total");
  cartList.innerHTML = "";
  cart.forEach((product, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${product.name} - $${product.price}`;
    cartList.appendChild(listItem);
  });
  cartTotalElement.textContent = cartTotal.toFixed(2);
}
