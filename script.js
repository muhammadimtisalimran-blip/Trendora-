const products=[
{name:'Essential Oversized Tee',cat:'Clothing',price:1899,icon:'👕'},
{name:'Everyday Hoodie',cat:'Clothing',price:3499,icon:'🧥'},
{name:'MagSafe Phone Stand',cat:'Accessories',price:1299,icon:'📱'},
{name:'Wireless Earbuds',cat:'Electronics',price:3999,icon:'🎧'},
{name:'Fast Charging Adapter',cat:'Electronics',price:2199,icon:'⚡'},
{name:'Minimal Desk Art',cat:'Art',price:1499,icon:'🎨'},
{name:'Phone Case — Urban',cat:'Accessories',price:899,icon:'📲'},
{name:'Canvas Print',cat:'Art',price:2499,icon:'🖼️'}
];
const money=n=>'Rs. '+n.toLocaleString();
function getCart(){return JSON.parse(localStorage.getItem('trendoraCart')||'[]')}
function saveCart(c){localStorage.setItem('trendoraCart',JSON.stringify(c));updateCount()}
function updateCount(){document.querySelectorAll('#cartCount').forEach(x=>x.textContent=getCart().reduce((a,b)=>a+b.qty,0))}
function add(i){let c=getCart(),p=products[i],x=c.find(v=>v.name===p.name);x?x.qty++:c.push({...p,qty:1});saveCart(c);alert(p.name+' added to cart.')}
function render(){let box=document.getElementById('products');if(!box)return;let q=(document.getElementById('search')?.value||'').toLowerCase(),f=document.getElementById('filter')?.value||'All';box.innerHTML=products.map((p,i)=>({...p,i})).filter(p=>(f==='All'||p.cat===f)&&p.name.toLowerCase().includes(q)).map(p=>`<article class="product"><div class="pic">${p.icon}</div><div class="info"><small>${p.cat}</small><h3>${p.name}</h3><p class="price">${money(p.price)}</p><button class="add" onclick="add(${p.i})">Add to Cart</button></div></article>`).join('')}
function renderCart(){let box=document.getElementById('cartItems');if(!box)return;let c=getCart();box.innerHTML=c.length?c.map((p,i)=>`<div class="cart-row"><span>${p.icon} ${p.name} × ${p.qty}</span><b>${money(p.price*p.qty)}</b><button onclick="removeItem(${i})">Remove</button></div>`).join(''):'<p>Your cart is empty. <a href="shop.html">Start shopping.</a></p>';let t=c.reduce((a,p)=>a+p.price*p.qty,0);document.getElementById('cartTotal').textContent=t?`Total: ${money(t)}`:''}
function removeItem(i){let c=getCart();c.splice(i,1);saveCart(c);renderCart()}
function sendMessage(e){e.preventDefault();document.getElementById('formMsg').textContent='Thanks! Your message is ready to be connected to your business email/WhatsApp.';e.target.reset()}
document.addEventListener('DOMContentLoaded',()=>{updateCount();render();renderCart();document.getElementById('search')?.addEventListener('input',render);document.getElementById('filter')?.addEventListener('change',render);let cat=new URLSearchParams(location.search).get('cat');if(cat&&document.getElementById('filter')){document.getElementById('filter').value=cat;render()}});