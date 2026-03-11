const products = [
    { id: 1, name: "Zelda: Breath of the Wild", price: 3200, category: "game", img: "images/Zelda.jpg", desc: "An epic open-world adventure across the kingdom of Hyrule." },
    { id: 2, name: "Minecraft", price: 1500, category: "game", img: "images/Minecraft.jpg", desc: "Build, explore, and survive in a blocky, infinite world." },
    { id: 3, name: "Grand Theft Auto V", price: 1800, category: "game", img: "images/GTA V.jpg", desc: "Action-packed open world set in the city of Los Santos." },
    { id: 4, name: "Cyberpunk 2077", price: 2200, category: "game", img: "images/CYBERPUNK.jpg", desc: "A futuristic RPG in the neon-lit Night City." },
    { id: 5, name: "Super Mario Odyssey", price: 2800, category: "game", img: "images/mario.jpg", desc: "A massive 3D adventure spanning multiple kingdoms." },
    { id: 6, name: "Classic PSP", price: 4500, category: "hardware", img: "images/PSP Classic.jpg", desc: "The legendary handheld for portable gaming." },
    { id: 7, name: "GameBoy Advance", price: 3500, category: "hardware", img: "images/GBA.jpg", desc: "A retro classic for fans of 32-bit pixel art." },
    { id: 8, name: "Nintendo Switch OLED", price: 16500, category: "hardware", img: "images/switch.jpg", desc: "Vibrant OLED screen for handheld and TV play." },
    { id: 9, name: "PS5 Console", price: 30500, category: "hardware", img: "images/ps5.jpg", desc: "Powerful next-gen console with 4K gaming." },
    { id: 10, name: "Xbox Series X", price: 28000, category: "hardware", img: "images/xbox.jpg", desc: "The fastest, most powerful Xbox ever built." }
];

function renderStore(filter = 'all') {
    const store = document.getElementById("store");
    if(!store) return;
    store.innerHTML = "";
    
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('onclick').includes(`'${filter}'`));
    });

    const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
    filtered.forEach(p => {
        store.innerHTML += `
            <div class="card">
                <img src="${p.img}" onerror="this.src='https://via.placeholder.com/400?text=No+Image'">
                <div class="card-info">
                    <h3>${p.name}</h3>
                    <p class="price-tag">₱${p.price.toLocaleString()}</p>
                    <p class="product-desc">${p.desc}</p>
                    <button class="n-btn-primary" onclick="addToCart('${p.name}', ${p.price})">Add to Bag</button>
                </div>
            </div>`;
    });
}

function addToCart(n, p) {
    if (localStorage.getItem("loggedIn") !== "true") { alert("Please Sign In first!"); toggleAuth(); return; }
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ n, p });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
}

function updateCartUI() {
    const count = (JSON.parse(localStorage.getItem("cart")) || []).length;
    if(document.getElementById("cartCount")) document.getElementById("cartCount").innerText = count;
}

function renderCartPage() {
    const list = document.getElementById("cartPageList");
    const totalDisp = document.getElementById("cartPageTotal");
    if(!list) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    if(cart.length === 0) {
        list.innerHTML = "<h3>Your bag is empty.</h3>";
        totalDisp.innerText = "Total: ₱0";
        return;
    }

    list.innerHTML = cart.map((item, index) => {
        total += item.p;
        return `
            <div class="cart-item-row">
                <div><strong>${item.n}</strong><br><span style="color:var(--n-red)">₱${item.p.toLocaleString()}</span></div>
                <button onclick="removeItem(${index})" style="color:red; background:none; border:none; cursor:pointer; font-weight:bold;">Remove</button>
            </div>`;
    }).join('');
    totalDisp.innerText = `Total: ₱${total.toLocaleString()}`;
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartPage();
    updateCartUI();
}

function clearBag() { localStorage.removeItem("cart"); renderCartPage(); updateCartUI(); }
function toggleAuth() { const d = document.getElementById("authDropdown"); if(d) d.style.display = d.style.display === "block" ? "none" : "block"; }
function signup() { const u = document.getElementById("username").value; const p = document.getElementById("password").value; if(u && p) { localStorage.setItem("user", JSON.stringify({u,p})); alert("Account created!"); } }
function login() { const s = JSON.parse(localStorage.getItem("user")); const u = document.getElementById("username").value; const p = document.getElementById("password").value; if(s && u === s.u && p === s.p) { localStorage.setItem("loggedIn", "true"); checkAuth(); toggleAuth(); } else { alert("Login failed!"); } }
function logout() { localStorage.removeItem("loggedIn"); checkAuth(); location.reload(); }

function checkAuth() {
    const l = localStorage.getItem("loggedIn") === "true";
    const loginForm = document.getElementById("loginForm");
    if(loginForm) {
        loginForm.style.display = l ? "none" : "block";
        document.getElementById("userInfo").style.display = l ? "block" : "none";
        if(l) document.getElementById("displayUser").innerText = JSON.parse(localStorage.getItem("user")).u;
        document.getElementById("userLabel").innerText = l ? "Sign Out" : "Sign In";
    }
}

function filterProducts() {
    const q = document.getElementById("searchBar").value.toLowerCase();
    const store = document.getElementById("store");
    if(!store) return;
    store.innerHTML = "";
    products.filter(p => p.name.toLowerCase().includes(q)).forEach(p => {
        store.innerHTML += `
            <div class="card">
                <img src="${p.img}">
                <div class="card-info">
                    <h3>${p.name}</h3>
                    <p class="price-tag">₱${p.price.toLocaleString()}</p>
                    <p class="product-desc">${p.desc}</p>
                    <button class="n-btn-primary" onclick="addToCart('${p.name}', ${p.price})">Add to Bag</button>
                </div>
            </div>`;
    });
}

renderStore(); updateCartUI(); checkAuth();

