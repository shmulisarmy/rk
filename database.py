import json
import sqlite3


db_path = 'main.db'


def get_menu_options():
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Get categories
    cursor.execute("SELECT id, name FROM categories")
    categories = cursor.fetchall()

    menu = {}
    for category_id, category_name in categories:
        # Get menu items for each category
        cursor.execute("SELECT id, name, image, price FROM menu_items WHERE category_id = ?", (category_id,))
        items = cursor.fetchall()

        menu[category_name] = {}
        for item_id, name, image, price in items:
            menu[category_name][name] = ({
                "id": item_id,
                "name": name,
                "image": image,
                "price": price
            })

    conn.close()
    return json.dumps(menu, indent=4)



print(get_menu_options())
