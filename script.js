const products = [
    // --- GAMES (10 Items) ---
    { id: 1, name: "Zelda: Breath of the Wild", price: 59.99, category: "game", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400" },
    { id: 2, name: "Minecraft", price: 29.99, category: "game", img: "https://images.unsplash.com/photo-1587573089734-09cb69c0f2b4?w=400" },
    { id: 3, name: "Grand Theft Auto V", price: 39.99, category: "game", img: "https://images.unsplash.com/photo-1580234797602-22c37b2a6230?w=400" },
    { id: 4, name: "Cyberpunk 2077", price: 49.99, category: "game", img: "https://images.unsplash.com/photo-1605898960710-9aa96030999a?w=400" },
    { id: 5, name: "Super Mario Odyssey", price: 59.99, category: "game", img: "https://images.unsplash.com/photo-1566577134770-3d85bb3a9cc4?w=400" },
    { id: 6, name: "Elden Ring", price: 59.99, category: "game", img: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400" },
    { id: 7, name: "Animal Crossing", price: 59.99, category: "game", img: "https://images.unsplash.com/photo-1585620384013-ad928019d014?w=400" },
    { id: 8, name: "Pokemon Scarlet", price: 59.99, category: "game", img: "https://images.unsplash.com/photo-1635208860605-87037f59c58b?w=400" },
    { id: 9, name: "Stardew Valley", price: 14.99, category: "game", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400" },
    { id: 10, name: "Mario Kart 8 Deluxe", price: 59.99, category: "game", img: "https://images.unsplash.com/photo-1590123554486-42790930f305?w=400" },

    // --- HARDWARE (10 Items) ---
    { id: 11, name: "Classic PSP", price: 120.00, category: "hardware", img: "https://images.unsplash.com/photo-1526509429168-2e43f01f65c1?w=400" },
    { id: 12, name: "GameBoy Advance", price: 89.99, category: "hardware", img: "https://images.unsplash.com/photo-1531525645387-7f14be13bc3f?w=400" },
    { id: 13, name: "Nintendo Switch OLED", price: 349.99, category: "hardware", img: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400" },
    { id: 14, name: "PS5 Console", price: 499.99, category: "hardware", img: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400" },
    { id: 15, name: "Xbox Series X", price: 499.99, category: "hardware", img: "https://images.unsplash.com/photo-1621259182978-f09e5e2ca1ff?w=400" },
    { id: 16, name: "Pro Controller", price: 69.99, category: "hardware", img: "https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=400" },
    { id: 17, name: "Classic NES Mini", price: 99.00, category: "hardware", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400" },
    { id: 18, name: "Gaming Headset", price: 79.99, category: "hardware", img: "https://images.unsplash.com/photo-1546435770-a3e4265029b6?w=400" },
    { id: 19, name: "Joy-Con Neon Pair", price: 79.99, category: "hardware", img: "https://images.unsplash.com/photo-1612033448550-9d6f9c17f07d?w=400" },
    { id: 20, name: "Steam Deck", price: 399.00, category: "hardware", img: "https://images.unsplash.com/photo-1635350330162-4b360742f96e?w=400" }
];

function renderStore(filter = 'all') {
    const store = document.getElementById("store");
    store.innerHTML = "";
    document.querySelectorAll('.cat-btn').forEach(btn => {
        const isMatch = btn.getAttribute('onclick').includes(`'${filter}'`);
        btn.classList.toggle('active', isMatch);
    });
    const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
    filtered.forEach((p) => {
        store.innerHTML += `
            <div class="card">
                <img src="${p.img}" alt="${p.name}">
                <div class="card-info">
                    <h3>${p.name}</h3>
                    <p class="price-tag">$${p.price.toFixed(2)}</p>
                    <button class="n-btn-primary" onclick="addToCart('${p.name}', ${p.price})">Add to Bag</button>
                </div>
            </div>`;
    });
}

function filterProducts() {
    const query = document.getElementById("searchBar").value.toLowerCase();
    const store = document.getElementById("store");
    store.innerHTML = "";
    products.filter(p => p.name.toLowerCase().includes(query)).forEach(p => {
        store.innerHTML += `<div class="card"><img src="${p.img}"><div class="card-info"><h3>${p.name}</h3><p class="price-tag">$${p.price.toFixed(2)}</p><button class="n-btn-primary" onclick="addToCart('${p.name}', ${p.price})">Add to Bag</button></div></div>`;
    });
}

function addToCart(n, p) {
    if (localStorage.getItem("loggedIn") !== "true") { alert("Please sign in to add items!"); toggleAuth(); return; }
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ n, p });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
}

function updateCartUI() { document.getElementById("cartCount").innerText = (JSON.parse(localStorage.getItem("cart")) || []).length; }
function toggleAuth() { const d = document.getElementById("authDropdown"); d.style.display = d.style.display === "block" ? "none" : "block"; }
function toggleCart() { const m = document.getElementById("cartModal"); m.style.display = m.style.display === "block" ? "none" : "block"; if(m.style.display==="block") renderCart(); }

function renderCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;
    document.getElementById("cartItemsList").innerHTML = cart.map(i => { total += i.p; return `<div style="display:flex; justify-content:space-between; padding:5px 0;"><span>${i.n}</span><span>$${i.p}</span></div>`}).join('');
    document.getElementById("cartTotal").innerText = `Total: $${total.toFixed(2)}`;
}

// GAME LOGIC
let isPlaying = false, score = 0;
function toggleGame() { document.getElementById("gameModal").style.display = document.getElementById("gameModal").style.display === "block" ? "none" : "block"; resetGame(); }
function startGame() {
    if(isPlaying) return; isPlaying = true; score = 0;
    document.getElementById("startBtn").style.display = "none";
    document.getElementById("obstacle").classList.add("obstacle-move");
    let checkDead = setInterval(() => {
        let pTop = parseInt(window.getComputedStyle(document.getElementById("player")).getPropertyValue("bottom"));
        let oLeft = parseInt(window.getComputedStyle(document.getElementById("obstacle")).getPropertyValue("left"));
        if(oLeft < 90 && oLeft > 50 && pTop <= 40) {
            alert("Game Over! Score: " + Math.floor(score));
            resetGame(); clearInterval(checkDead);
        } else { score += 0.1; document.getElementById("score").innerText = "Score: " + Math.floor(score); }
    }, 10);
}
function resetGame() { isPlaying = false; document.getElementById("startBtn").style.display = "block"; document.getElementById("obstacle").classList.remove("obstacle-move"); }
function jump() { const p = document.getElementById("player"); if(!p.classList.contains("animate-jump")) { p.classList.add("animate-jump"); setTimeout(() => p.classList.remove("animate-jump"), 500); } }
window.addEventListener("keydown", (e) => { if(e.code === "Space") jump(); });

// Auth Functions
function signup() { 
    const u = document.getElementById("username").value; 
    const p = document.getElementById("password").value;
    if(u && p) { localStorage.setItem("user", JSON.stringify({u,p})); alert("Account created! You can now login."); }
}
function login() {
    const s = JSON.parse(localStorage.getItem("user"));
    const u = document.getElementById("username").value;
    const p = document.getElementById("password").value;
    if(s && u === s.u && p === s.p) { localStorage.setItem("loggedIn", "true"); checkAuth(); toggleAuth(); } else { alert("Wrong credentials!"); }
}
function logout() { localStorage.removeItem("loggedIn"); checkAuth(); }
function checkAuth() {
    const l = localStorage.getItem("loggedIn") === "true";
    document.getElementById("loginForm").style.display = l ? "none" : "block";
    document.getElementById("userInfo").style.display = l ? "block" : "none";
    if(l) document.getElementById("displayUser").innerText = JSON.parse(localStorage.getItem("user")).u;
    document.getElementById("userLabel").innerText = l ? "Sign Out" : "Sign In";
}

renderStore(); updateCartUI(); checkAuth();
