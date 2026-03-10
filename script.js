const products = [
    { id: 1, name: "Zelda: BOTW", price: 59.99, category: "game", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400" },
    { id: 2, name: "Minecraft", price: 29.99, category: "game", img: "https://images.unsplash.com/photo-1587573089734-09cb69c0f2b4?w=400" },
    { id: 3, name: "GTA V", price: 39.99, category: "game", img: "https://images.unsplash.com/photo-1580234797602-22c37b2a6230?w=400" },
    { id: 4, name: "Classic PSP", price: 120.00, category: "hardware", img: "https://images.unsplash.com/photo-1526509429168-2e43f01f65c1?w=400" }
];

function renderStore(filter = 'all') {
    const store = document.getElementById("store");
    store.innerHTML = "";
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
                    <h3>${p.name}</h3><p class="price-tag">$${p.price.toFixed(2)}</p>
                    <button class="n-btn-primary" onclick="addToCart('${p.name}', ${p.price})">Add to Bag</button>
                </div>
            </div>`;
    });
}

function addToCart(n, p) {
    if (localStorage.getItem("loggedIn") !== "true") { alert("Sign in first!"); toggleAuth(); return; }
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
    document.getElementById("cartItemsList").innerHTML = cart.map(i => { total += i.p; return `<div style="display:flex; justify-content:space-between;"><span>${i.n}</span><span>$${i.p}</span></div>`}).join('');
    document.getElementById("cartTotal").innerText = `Total: $${total.toFixed(2)}`;
}

// MINI-GAME LOGIC
let isPlaying = false;
let score = 0;

function toggleGame() { document.getElementById("gameModal").style.display = document.getElementById("gameModal").style.display === "block" ? "none" : "block"; resetGame(); }

function startGame() {
    if(isPlaying) return;
    isPlaying = true; score = 0;
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

function resetGame() { 
    isPlaying = false; 
    document.getElementById("startBtn").style.display = "block"; 
    document.getElementById("obstacle").classList.remove("obstacle-move"); 
}

function jump() {
    const p = document.getElementById("player");
    if(!p.classList.contains("animate-jump")) {
        p.classList.add("animate-jump");
        setTimeout(() => p.classList.remove("animate-jump"), 500);
    }
}

window.addEventListener("keydown", (e) => { if(e.code === "Space") jump(); });
document.getElementById("gameCanvasContainer").addEventListener("touchstart", jump);

// Auth
function signup() { 
    const u = document.getElementById("username").value; 
    const p = document.getElementById("password").value;
    if(u && p) { localStorage.setItem("user", JSON.stringify({u,p})); alert("Created!"); }
}
function login() {
    const s = JSON.parse(localStorage.getItem("user"));
    const u = document.getElementById("username").value;
    const p = document.getElementById("password").value;
    if(s && u === s.u && p === s.p) { localStorage.setItem("loggedIn", "true"); checkAuth(); toggleAuth(); }
}
function logout() { localStorage.removeItem("loggedIn"); checkAuth(); }
function checkAuth() {
    const l = localStorage.getItem("loggedIn") === "true";
    document.getElementById("loginForm").style.display = l ? "none" : "block";
    document.getElementById("userInfo").style.display = l ? "block" : "none";
    document.getElementById("userLabel").innerText = l ? JSON.parse(localStorage.getItem("user")).u : "Sign In";
}

renderStore(); updateCartUI(); checkAuth();
