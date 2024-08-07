function calculate_price() {
  const cart = JSON.parse(localStorage.getItem("cart") || "{}");
  return Object.entries(cart).reduce((total, [key, amount]) => {console.log(total); return total + getItem(key).price * amount}, 0)
}

function getItem(key){
    console.log(key)
    for (const [k, v] of Object.entries(menu)) {
        console.log(k, v)
        if (key in v) {
            return v[key]
        }
    }
}


function localStorageCartPlus(itemName) {
    const cart = JSON.parse(localStorage.getItem("cart") || "{}");
    if (cart[itemName]) {
        cart[itemName] += 1;
    } else {
        cart[itemName] = 1;
    }
    localStorage.setItem("cart", JSON.stringify(cart))
}

function localStorageCartMinus(itemName) {
    const cart = JSON.parse(localStorage.getItem("cart") || "{}");
    assert(cart[itemName], `${itemName} Item not in cart`);
        cart[itemName] -= 1;
    localStorage.setItem("cart", JSON.stringify(cart))
}


function isBetween8PMAnd6AM() {
    const now = new Date();
    const hours = now.getHours();

    return hours >= 20 || hours < 6;
}


function clearCart() {
    localStorage.setItem("previousCart", JSON.stringify(localStorage.getItem("cart")))
    localStorage.removeItem("cart")
}

function restoreCart() {
    localStorage.setItem("cart", JSON.parse(localStorage.getItem("previousCart")))
}

function makeOrder() {
    fetch("/order", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cart: JSON.parse(localStorage.getItem("cart")),
            time: document.querySelector("input[name=time]").value,
            phoneNumber: document.querySelector("input[name=phoneNumber]").value
        })
    })
    .then(response => response.text())
    .then(data => alert(data))
}