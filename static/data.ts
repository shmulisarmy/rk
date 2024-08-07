type MenuItem = {
    name: string
    image: string,
    price: number,
}

type MenuSection = Record<string, MenuItem>

let menu: Record<string, MenuSection> = {};


menu = {
    "Appetizers": {
        "Crispy Shrimp": {
            name: "Crispy Shrimp",
            image: "https://rollingkosher.pythonanywhere.com/static/images/appetizers/crispy-shrimp.jpg",
            price: 8.99
        },
        "Crispy Noodles": {
            name: "Crispy Noodles",
            image: "https://rollingkosher.pythonanywhere.com/static/images/appetizers/crispy-noodles.jpg",
            price: 8.99
        },
        "Crispy Calamari": {
            name: "Crispy Calamari",
            image: "https://rollingkosher.pythonanywhere.com/static/images/appetizers/crispy-calamari.jpg",
            price: 8.99
        },
        "Crispy Chicken Wings": {
            name: "Crispy Chicken Wings",
            image: "https://rollingkosher.pythonanywhere.com/static/images/appetizers/crispy-chicken-wings.jpg",
            price: 8.99
        },
        "Crispy Chicken Nuggets": {
            name: "Crispy Chicken Nuggets",
            image: "https://rollingkosher.pythonanywhere.com/static/images/appetizers/crispy-chicken-nuggets.jpg",
            price: 8.99
        }
    }
}



fetch("/api/menu")
.then(response => response.json())
.then(data => menu = data)