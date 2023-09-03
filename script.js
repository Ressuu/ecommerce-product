const cartContainer = document.querySelector(".main-cart-container");
let emptyCart = document.querySelector(".no-item-in-cart");

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

function addAndDeleteCartItems() {
  let itemName = "Fall Limited Edition Sneakers";
  let itemPrice = 125;
  let quantity = 1;
  const cartContainer = document.querySelector(".main-cart-container");
  let deleteIcons = document.querySelectorAll(".item-in-cart-delete");

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
        <p>$${itemPrice}.00 x ${quantity}</p>
        <span>$${itemPrice * quantity}.00</span>
      </div>
    </div>
    <div class="item-in-cart-delete">
      <img src="./images/icon-delete.svg" alt="" />
    </div>
  `;
  cartContainer.appendChild(itemElement);

  cartContainer.style.display = "block";

  deleteIcons = document.querySelectorAll(".item-in-cart-delete");

  deleteIcons.forEach((deleteIcon) => {
    deleteIcon.addEventListener("click", (event) => {
      let itemToDelete = event.target.closest(".item-in-cart");
      if (itemToDelete) {
        itemToDelete.remove();
        if (cartContainer.querySelector(".item-in-cart") === null) {
          emptyCart.style.display = "block";
        }
      }
    });
  });

  emptyCart.style.display = "none";
  cartContainer.style.overflowY = "auto";
}

let addToCartButton = document.querySelector(".add-to-cart-button button");
addToCartButton.addEventListener("click", addAndDeleteCartItems);

showCart();
increaseAndDecrease();
