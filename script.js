const products = [
    { id: 1, name: "The Legend of Zelda: BOTW", price: 59.99, category: "game", img: "Zelda.jpg" },
    { id: 2, name: "Minecraft", price: 29.99, category: "game", img: "MInecraft.jpg" },
    { id: 3, name: "GTA V", price: 39.99, category: "game", img: "GTA V.jpg" },
    { id: 4, name: "Cyberpunk 2077", price: 49.99, category: "game", img: "CYBERPUNK.jpg" },
    { id: 5, name: "Classic PSP", price: 120.00, category: "hardware", img: "PSP Classic.jpg" },
    { id: 6, name: "GBA Purple", price: 89.99, category: "hardware", img: "GBA.jpg" }
];

function renderStore(filter = 'all') {
    const store = document.getElementById("store");
    store.innerHTML = "";
    
    // UI Update for Buttons
    document.querySelectorAll('.cat-btn').forEach(btn => {
        const isMatch = btn.getAttribute('onclick').includes(`'${filter}'`);
        btn.classList.toggle('active', isMatch);
    });

    const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
    filtered.forEach((p, i) => {
        store.innerHTML += `
            <div class="card" style="animation-delay: ${i * 0.1}s">
                <img src="${p.img}">
                <div class="card-info">
                    <h3>${p.name}</h3>
                    <p class="price-tag">$${p.price.toFixed(2)}</p>
                    <button class="n-btn-primary" onclick="addToCart('${p.name}', ${p.price})">Add to Bag</button>
                </div>
            </div>`;
    });
}

function addToCart(name, price) {
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    if (!loggedIn) {
        alert("Please Sign In to add items to your bag!");
        toggleAuth();
        return;
    }
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
}

function toggleAuth() {
    const d = document.getElementById("authDropdown");
    d.style.display = (d.style.display === "block") ? "none" : "block";
}

function toggleCart() {
    const m = document.getElementById("cartModal");
    m.style.display = (m.style.display === "block") ? "none" : "block";
    if (m.style.display === "block") renderCartItems();
}

function renderCartItems() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const list = document.getElementById("cartItemsList");
    const totalEl = document.getElementById("cartTotal");
    let total = 0;
    list.innerHTML = cart.map(item => {
        total += item.price;
        return `<div style="display:flex; justify-content:space-between; padding:5px 0;"><span>${item.name}</span><span>$${item.price}</span></div>`;
    }).join('') || "<p>Your bag is empty!</p>";
    totalEl.innerText = `Total: $${total.toFixed(2)}`;
}

function updateCartUI() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cartCount").innerText = cart.length;
}

function signup() {
    const u = document.getElementById("username").value;
    const p = document.getElementById("password").value;
    if(u && p) { localStorage.setItem("user", JSON.stringify({u,p})); alert("Account created!"); }
}

function login() {
    const saved = JSON.parse(localStorage.getItem("user"));
    const u = document.getElementById("username").value;
    const p = document.getElementById("password").value;
    if(saved && u === saved.u && p === saved.p) {
        localStorage.setItem("loggedIn", "true");
        toggleAuth();
        checkAuth();
    } else { alert("Invalid login!"); }
}

function logout() { localStorage.removeItem("loggedIn"); checkAuth(); }

function checkAuth() {
    const logged = localStorage.getItem("loggedIn") === "true";
    const saved = JSON.parse(localStorage.getItem("user"));
    document.getElementById("loginForm").style.display = logged ? "none" : "block";
    document.getElementById("userInfo").style.display = logged ? "block" : "none";
    document.getElementById("userLabel").innerText = logged ? saved.u : "Sign In";
}

function filterProducts() {
    const q = document.getElementById("searchBar").value.toLowerCase();
    document.querySelectorAll(".card").forEach(c => {
        c.style.display = c.querySelector("h3").innerText.toLowerCase().includes(q) ? "block" : "none";
    });
}

renderStore();
updateCartUI();
checkAuth();