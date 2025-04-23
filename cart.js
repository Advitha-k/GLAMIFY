// cart.js (updated version with View in Detail button redirecting to cart.html)

window.onload = function () {
  const cartIcon = document.getElementById("cart-icon");
  const cartPopup = document.getElementById("cart-popup");
  const cartCount = document.getElementById("cart-count");
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  function saveCart() {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  function increaseQty(index) {
    cartItems[index].quantity += 1;
    saveCart();
    updateCartPopup();
  }

  function decreaseQty(index) {
    if (cartItems[index].quantity > 1) {
      cartItems[index].quantity -= 1;
    } else {
      cartItems.splice(index, 1);
    }
    saveCart();
    updateCartPopup();
  }

  function removeItem(index) {
    cartItems.splice(index, 1);
    saveCart();
    updateCartPopup();
  }

  function showAddedPopup() {
    const popup = document.getElementById("added-popup");
    if (!popup) return;
    popup.style.display = "block";
    popup.style.opacity = "1";

    setTimeout(() => {
      popup.style.opacity = "0";
    }, 1500);

    setTimeout(() => {
      popup.style.display = "none";
    }, 2000);
  }

  function updateCartPopup() {
    let total = 0;
    let content = `
      <div id="cart-inner" style="padding: 5px;">
      <p style="margin: 0 0 10px; font-weight: bold;">
        🛒 ${cartItems.length} item(s)
      </p>
      <hr style="border: none; border-top: 1px solid #ddd;">`;

    cartItems.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      content += `
        <div style="display: flex; gap: 10px; margin-bottom: 15px; align-items: center;">
          <img src="${item.img}" alt="${item.name}" style="width: 50px; height: 50px; border-radius: 8px; object-fit: cover;">
          <div style="flex-grow: 1;">
            <strong>${item.name}</strong><br>
            <div style="display: flex; align-items: center; gap: 5px; margin-top: 5px;">
              <button onclick="decreaseQty(${index});event.stopPropagation();" style="border: none; background-color: #eee; padding: 2px 8px; border-radius: 4px; cursor: pointer;">−</button>
              <span>Qty: ${item.quantity}</span>
              <button onclick="increaseQty(${index});event.stopPropagation();" style="border: none; background-color: #eee; padding: 2px 8px; border-radius: 4px; cursor: pointer;">+</button>
              <span style="margin-left: auto;">| $${itemTotal.toFixed(2)}</span>
            </div>
          </div>
          <button onclick="removeItem(${index});event.stopPropagation();" style="background: none; border: none; color: #f58c8c; font-size: 18px; cursor: pointer;">✖</button>
        </div>`;
    });

    content += `
      <div style="margin-top: 10px; font-weight: bold; text-align: right;">
        Total: $${total.toFixed(2)}
      </div>

      <div style="text-align: center; margin-top: 10px;">
        <button onclick="window.location.href='cart.html'" style="padding: 8px 15px; background-color: #f58c8c; color: white; border: none; border-radius: 6px; cursor: pointer;">
          View in Detail
        </button>
      </div>
      </div>`;

    cartPopup.innerHTML = content;

    const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = totalQty;

    const cartInner = document.getElementById("cart-inner");
    if (cartInner) {
      cartInner.addEventListener("click", function (e) {
        e.stopPropagation();
      });
    }
  }

  window.removeItem = removeItem;
  window.increaseQty = increaseQty;
  window.decreaseQty = decreaseQty;

  addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {
      const name = button.getAttribute("data-name");
      const price = parseFloat(button.getAttribute("data-price"));
      const img = button.getAttribute("data-img");

      const existing = cartItems.find(item => item.name === name);
      if (existing) {
        existing.quantity += 1;
      } else {
        cartItems.push({ name, price, quantity: 1, img });
      }

      saveCart();
      updateCartPopup();
      showAddedPopup();
    });
  });

  cartIcon.addEventListener("click", () => {
    cartPopup.style.display = cartPopup.style.display === "block" ? "none" : "block";
  });

  document.addEventListener("click", (event) => {
    if (!cartIcon.contains(event.target) && !cartPopup.contains(event.target)) {
      cartPopup.style.display = "none";
    }
  });

  updateCartPopup();
};
