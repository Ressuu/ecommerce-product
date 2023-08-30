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

showCart();
