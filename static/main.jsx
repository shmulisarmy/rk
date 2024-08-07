



function MenuItem(key, item){
    return html`
    <div class="MenuItem">
    <img src="${item.image}" alt="" />
        <h2>${key}</h2>
        <p>$${item.price}</p>
        <button onclick=${(event) => localStorageCartPlus(key)}>Add to cart</button>
            
    </div>
    `
}
function MenuSection(name, items){
    return html`
    <div id="${name}" class="menuSection">
    <h1>${name}</h1>
    <div class="container">
    /${
        Object.keys(items).map(key => MenuItem(key, items[key])).join("")
    }
    </div>
    </div>
    `
}

const pages = {
    "menu": Menu,
    "cart": Cart,
    "home": Home
}


const blogs = [
    {
        title: "Blog 1",
        author: "Author 1",
        date: "2023-01-01",
        content: "This is the content of the first blog post",
        image: "https://rollingkosher.pythonanywhere.com/static/images/Burger.jpg",
        tags: ["tag1", "tag2", "tag3"]
    },
    {
        title: "Blog 2",
        author: "Author 2",
        date: "2023-01-02",
        content: "This is the content of the second blog post",
        image: "https://rollingkosher.pythonanywhere.com/static/images/Crispy%20Chicken%20Nuggets.jpg",
        tags: ["tag2", "tag3"]
    },
    {
        title: "Blog 3",
        author: "Author 3",
        date: "2023-01-03",
        content: "This is the content of the third blog post",
        image: "https://rollingkosher.pythonanywhere.com/static/images/Fries.jpg",
        tags: ["tag3", "tag4", "tag5"]
    },
    {
        title: "Blog 4",
        author: "Author 4",
        date: "2023-01-04",
        content: "This is the content of the fourth blog post",
        image: "https://rollingkosher.pythonanywhere.com/static/images/Crispy%20Chicken%20Sandwich.jpg",
        tags: ["tag1", "tag5"]
    },
    {
        title: "Blog 5",
        author: "Author 5",
        date: "2023-01-05",
        content: "This is the content of the fifth blog post",
        image: "https://rollingkosher.pythonanywhere.com/static/images/Sushi.jpg",
        tags: ["tag2", "tag6"]
    }
]


function Blog(blog){
    const {title, content, author, date, image, tags} = blog

    return html`
    <div class="blog">
    <img src="${image}" alt="" />
    <div class="content">
        <h1>${title}</h1>
        <h2>${author}</h2>
        <p>${date}</p>
        <p>${content}</p>
        <p class="tags">${tags}</p>
    </div>
</div>

    `
}

function Home(){
    return html`
    <header>
        <img src="https://rollingkosher.pythonanywhere.com/static/images/logo.png" alt="" />
    </header>
    <h1 class="title" style="text-align: center; font-size: 50px; font-weight: 100; padding: 20px 0;">The Truck thats always rolling!!</h1>
    <div class="home">
        /${blogs.map(Blog).join("")}
    </div>
    `
}

function Nav({showing}){
    const ref = createRef()
    return html`
    <nav ref_key=${ref}
        rerender-with="Nav"
    >


    <div class="pageLinks">
    /${
        Object.entries(pages).map(([key, value]) => html`<button onclick=${() => {showing = key; rerender("root", {showing})}}>${key}</button>`).join("")
    }
    </div>

    <div class="menu-sections">
    /${showing == "menu"?
        Object.keys(menu).map(key => html`<a href="#${key}">${key}</a>`).join("")
        : ""
    }
    
    </div>
    </nav>
    `
}

function Menu(){
    return html`<div id="menu">
    <h1 style="text-align: center; font-size: 50px; color: #111; font-family: 'Courier New', Courier, monospace; text-shadow: 1px 1px 2px #ccc;">Menu</h1>

    /${
        Object.keys(menu).map(key => MenuSection(key, menu[key])).join("")
    }
    </div>`
}
/**
 * 
 * @param {string} key 
 * @param {Function} updatePrice 
 * @returns {string} 
 * 
 * @description
 * 
 */

function CartItem(key, amount){
    assert(typeof key == "string", "key must be a string")
    assert(typeof amount == "number", "amount must be a number")
        const item = getItem(key)
        const { image, name, price } = item
        console.log(amount)
        


        return html`
        <div class="item">
            <img src=${image} alt="" />
            <h2>${name}</h2>
            <p>$${price}</p>
            <button onclick=${(event) => { localStorageCartPlus(key); rerender("cart", null)}} style="height: 20px; width: 20px;">+</button>
            <p>${amount}</p>
            <button onclick=${(event) =>{ localStorageCartMinus(key); rerender("cart", null)}} style="height: 20px; width: 20px;">-</button>
        </div>
    `
}

function Cart(placeHolder = null){
    const localStorageCart = JSON.parse(localStorage.getItem("cart") || "{}")
    return html`<div id="cart"
    ref_key="cart"
    rerender-with="Cart">
   <h1 style="text-align: center; font-size: 50px; color: #111; font-family: 'Courier New', Courier, monospace; text-shadow: 1px 1px 2px #ccc;">Cart</h1>
    <div class="container">

        /${Object.keys(localStorageCart).length != 0? Object.keys(localStorageCart).map(key => CartItem(key, localStorageCart[key])).join("")
        : html`<h1 class="empty-cart" style="text-align: center; font-size: 50px; color: #111; font-family: 'Courier New', Courier, monospace; text-shadow: 1px 1px 2px #ccc;">there is nothing in your cart would you like to 
            <span class="go-back-to-menu-span" style="color: green; cursor: pointer" onclick=${() => {rerender("root", {showing: "menu"})}}>
                add something?
            </span> 
            </h1>`
    }
    </div>
    <form >
        <label for="time">time</label>
        <input type="time" name="time" value="${new Date().toISOString().slice(11, 16)}" min="08:00" max="20:00" required>
        <br />
        <label for="phoneNumber">phone number</label>
        <input type="text" name="phoneNumber"  required>
        <br />
        <button onclick=${(event) => {
            event.preventDefault();
            makeOrder(); rerender("cart", null)
        }}>make order</button>
    </form>
    <button onclick=${(event) => {clearCart(); rerender("cart", null)}}>clear cart</button>
    <button onclick=${(event) => {restoreCart(); rerender("cart", null)}}>restore cart</button>
    
    <h3 style="text-align: center; font-size: 50px; color: #111; font-family: 'Courier New', Courier, monospace; text-shadow: 1px 1px 2px #ccc;">Total: $${calculate_price()}</h3>
    </div>`
}



function App({showing}){
    window.history.pushState({}, '', `/${showing}`)
    window.scrollTo(0,0)
    return html`
    <div id="root" ref_key="root"
        rerender-with="App"
        class=${isBetween8PMAnd6AM()? "nightmode": ""}
    >
        /${Nav({showing})}

        /${pages[showing]()}
    </div>
        
    `
}



const fullpathsplit = window.location.pathname.split("/")

root.outerHTML = App({showing: fullpathsplit[1] || "menu"})
activateAllsignals(root)