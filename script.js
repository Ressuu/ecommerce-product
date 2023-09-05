const cartContainer = document.querySelector(".main-cart-container");

function showCart() {
  cartIcon = document.querySelector(".cart-img");
  cart = document.querySelector(".cart");

  cartIcon.addEventListener("click", () => {
    if (cart.classList.contains("none-cart")) {
      cart.classList.remove("none-cart");
    } else {
      cart.classList.add("none-cart");
    }
  });
}

function increaseAndDecrease() {
  let increase = document.querySelector(".increase");
  let decrease = document.querySelector(".decrease");
  let value = document.querySelector(".value");
  let i = 1;

  increase.addEventListener("click", () => {
    i++;
    value.textContent = i;
  });

  decrease.addEventListener("click", () => {
    if (i > 1) {
      i--;
      value.textContent = i;
    }
  });
}

// function addAndDeleteCartItems() {
//   let itemName = "Fall Limited Edition Sneakers";
//   let itemPrice = 125;
//   let quantity = 1;
//   const cartContainer = document.querySelector(".main-cart-container");
//   let deleteIcons = document.querySelectorAll(".item-in-cart-delete");

//   let itemElement = document.createElement("div");
//   itemElement.className = "item-in-cart";

//   itemElement.innerHTML = `
//     <div class="item-in-cart-img">
//       <img src="./images/image-product-1-thumbnail.jpg" alt="" />
//     </div>
//     <div class="middle-section-in-cart">
//       <div class="item-in-cart-name">
//         <p></p>
//       </div>
//       <div class="item-in-cart-price">
//         <p>.00 x</p>
//         <span>00</span>
//       </div>
//     </div>
//     <div class="item-in-cart-delete">
//       <img src="./images/icon-delete.svg" alt="" />
//     </div>
//   `;
//   cartContainer.appendChild(itemElement);

//   cartContainer.style.display = "block";

//   deleteIcons = document.querySelectorAll(".item-in-cart-delete");

//   emptyCart.style.display = "none";
//   cartContainer.style.overflowY = "auto";
// }

function addOrUpdateCartItem(itemName, itemPrice, quantity) {
  const cartContainer = document.querySelector(".main-cart-container");
  const existingCartItems = cartContainer.querySelectorAll(
    ".item-in-cart-name p"
  );

  let existingCartItem = Array.from(existingCartItems).find(
    (cartItem) => cartItem.textContent === itemName
  );

  if (existingCartItem) {
    existingCartItem = existingCartItem.closest(".item-in-cart");

    const quantityElement = existingCartItem.querySelector(
      ".item-in-cart-price .quantity"
    );
    const currentQuantity = parseInt(quantityElement.textContent, 10);
    const updatedQuantity = currentQuantity + quantity;
    quantityElement.textContent = updatedQuantity.toString();

    const totalPriceElement = existingCartItem.querySelector(
      ".item-in-cart-price .total-to-pay"
    );
    totalPriceElement.textContent = `$${itemPrice * updatedQuantity}.00`;
  } else {
    let itemElement = document.createElement("div");

    itemElement.className = "item-in-cart";

    itemElement.innerHTML = `
        <div class="item-in-cart-img">
          <img src="./images/image-product-1-thumbnail.jpg" alt="" />
        </div>
        <div class="middle-section-in-cart">
          <div class="item-in-cart-name">
            <p>${itemName}</p>
          </div>
          <div class="item-in-cart-price">
            <p>$${itemPrice}.00 x <span class="quantity">${quantity}</span></p>
            <span class="total-to-pay">$${itemPrice * quantity}.00</span>
          </div>
        </div>
        <div class="item-in-cart-delete">
          <img src="./images/icon-delete.svg" alt="" />
        </div>
      `;

    let deleteIcon = itemElement.querySelector(".item-in-cart-delete img");
    deleteIcon.addEventListener("click", () => {
      itemElement.remove();
      showEmptyCartMessage();
    });

    cartContainer.appendChild(itemElement);
  }
  showEmptyCartMessage();
}

function showEmptyCartMessage() {
  let cartItems = document.querySelectorAll(".item-in-cart");
  let emptyCartMessage = document.querySelector(".no-item-in-cart");

  if (cartItems.length === 0) {
    emptyCartMessage.style.display = "block";
  } else {
    emptyCartMessage.style.display = "none";
  }
}

let addToCartButton = document.querySelector(".add-to-cart-button button");
addToCartButton.addEventListener("click", () => {
  const itemName = document.querySelector(".model h1").textContent;
  const itemPrice = parseFloat(
    document.querySelector(".price-after-sale p").textContent.slice(1)
  );
  const quantity = parseInt(document.querySelector(".value").textContent);

  addOrUpdateCartItem(itemName, itemPrice, quantity);
});

showCart();
increaseAndDecrease();
