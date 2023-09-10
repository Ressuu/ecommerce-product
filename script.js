const cartContainer = document.querySelector(".main-cart-container");

// Show cart when click on cart icon
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

// Increase and decrease quantity on website
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

// Add order to cart or update quantity, price in cart

function addOrUpdateCartItem(itemName, itemPrice, quantity) {
  let cartContainer = document.querySelector(".main-cart-container");
  let existingCartItems = cartContainer.querySelectorAll(
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

// Showing message when cart is empty

function showEmptyCartMessage() {
  let cartItems = document.querySelectorAll(".item-in-cart");
  let emptyCartMessage = document.querySelector(".no-item-in-cart");
  let quantityInCart = document.querySelector(".quantity-in-cart");

  if (cartItems.length === 0) {
    emptyCartMessage.style.display = "block";
    quantityInCart.style.display = "none";
  } else {
    emptyCartMessage.style.display = "none";
    quantityInCart.style.display = "flex";
  }
}

// Add items to cart

let addToCartButton = document.querySelector(".add-to-cart-button button");
addToCartButton.addEventListener("click", () => {
  const itemName = document.querySelector(".model h1").textContent;
  const itemPrice = parseFloat(
    document.querySelector(".price-after-sale p").textContent.slice(1)
  );
  const quantity = parseInt(document.querySelector(".value").textContent);

  addOrUpdateCartItem(itemName, itemPrice, quantity);
  updateQuantityNumber();
});

document.addEventListener("DOMContentLoaded", function () {
  let nextImage = document.querySelector(".next-image");
  let previousImage = document.querySelector(".previous-image");
  let closeImage = document.querySelector(".close-fullscreen-container svg");

  let photo = [
    "./images/image-product-1.jpg",
    "./images/image-product-2.jpg",
    "./images/image-product-3.jpg",
    "./images/image-product-4.jpg",
  ];

  let mainThumbnail = document.querySelector(".main-thumbnail img");
  let smallThumbnails = document.querySelectorAll(".small-thumbnail img");
  let fullscreenContainer = document.querySelector(".fullscreen-container");
  let fullscreenImage = document.querySelector(".fullscreen-image");
  let currentImageIndex = 0;

  smallThumbnails.forEach((smallThumbnail, index) => {
    smallThumbnail.addEventListener("click", function () {
      let newSrc = this.getAttribute("data-src");
      mainThumbnail.src = newSrc;
      mainThumbnail.setAttribute("data-index", index.toString());
      currentImageIndex = index;
      console.log("Current Image Index:", currentImageIndex); // Dodaj tę linię
    });
  });

  mainThumbnail.addEventListener("click", function () {
    fullscreenImage.src = this.src;
    fullscreenContainer.style.display = "flex";
    currentImageIndex = parseInt(mainThumbnail.getAttribute("data-index"));
  });

  function showNextImage(event) {
    event.stopPropagation();
    if (currentImageIndex < photo.length - 1) {
      currentImageIndex++;
      fullscreenImage.src = photo[currentImageIndex];
    }
  }

  function showPreviousImage(event) {
    event.stopPropagation();
    if (currentImageIndex > 0) {
      currentImageIndex--;
      fullscreenImage.src = photo[currentImageIndex];
    }
  }

  nextImage.addEventListener("click", showNextImage);
  previousImage.addEventListener("click", showPreviousImage);
  closeImage.addEventListener("click", () => {
    fullscreenContainer.style.display = "none";
  });
});

// Update how many items you have in cart

function updateQuantityNumber() {
  let quantityInCart = document.querySelector(".quantity-in-cart p");
  let cartContainer = document.querySelector(".main-cart-container");
  let quantityNumber = cartContainer.querySelector(".item-in-cart .quantity");
  quantityNumber = quantityNumber.textContent;
  quantityInCart.textContent = quantityNumber;
}

showCart();
increaseAndDecrease();
