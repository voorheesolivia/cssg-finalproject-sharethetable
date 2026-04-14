function signUp() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  const message = document.getElementById("message");

  if (!user || !pass) {
    message.innerText = "Fill in all fields";
    return;
  }

  if (localStorage.getItem("user_" + user)) {
    message.innerText = "Account already exists";
    return;
  }

  localStorage.setItem("user_" + user, pass);
  message.innerText = "Account created";
}

function signIn() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  const message = document.getElementById("message");

  const stored = localStorage.getItem("user_" + user);

  if (stored === pass) {
    localStorage.setItem("loggedInUser", user);
    window.location.href = "calendar.html";
  } else {
    message.innerText = "Invalid login";
  }
}

let cart = [];

function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  const list = document.getElementById("cart-list");
  const totalDisplay = document.getElementById("total");

  if (!list || !totalDisplay) return;

  list.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - $${item.price}
      <button class="button" onclick="removeFromCart(${index})">Remove</button>
    `;
    list.appendChild(li);
  });

  totalDisplay.textContent = "Total: $" + total;
}

document.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("loggedInUser");

  const welcome = document.getElementById("welcome");
  if (welcome && user) {
    welcome.textContent = "Welcome, " + user;
  }

  const boxes = document.querySelectorAll(".mybox");

  boxes.forEach(box => {
    box.addEventListener("click", () => {
      if (!box.classList.contains("booked")) {
        box.classList.add("booked");
        box.dataset.user = user;
        box.innerHTML = "Booked by<br>" + user;
      } else {
        if (box.dataset.user === user) {
          box.classList.remove("booked");
          box.dataset.user = "";
          box.innerHTML = "Open Shift";
        }
      }
    });
  });
});