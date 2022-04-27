const inventoryManager = document.querySelector('.inventory-manager')
const reviewInventory = document.querySelector('.review-inventory')
const firstForm = document.querySelector('#first-form')
const reviewInventoryForm = document.querySelector('#review-inventory')

let inventory = [{
    item_name: "+5 Dexterity Vest",
    sell_in: 10,
    quality: 20,
    date_added: 'today',
    category: "",
}, {
    item_name: "Aged Brie",
    sell_in: 2,
    quality: 0,
    date_added: 'today',
    category: "",
}, {
    item_name: "Elixir of the Mongoose",
    sell_in: 5,
    quality: 7,
    date_added: 'today',
    category: "",
}, {
    item_name: "Sulfuras, Hand of Ragnaros",
    sell_in: 0,
    quality: 80,
    date_added: 'today',
    category: "",
}, {
    item_name: "Backstage passes to a TAFKAL80ETC concert",
    sell_in: 15,
    quality: 20,
    date_added: 'today',
    category: "",
}, {
    item_name: "Conjured Mana Cake",
    sell_in: 3,
    quality: 6,
    date_added: 'today',
    category: "",
}]

firstForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const item = {
        item_name: formData.get("item-entry"),
        sell_in: formData.get("sell-in"),
        quality: formData.get("quality"),
        date_added: formData.get("date-entered"),
        category: 'none'
    }
    console.log(item)
    assignCategory(item)
    checkQuality(item)
    inventory = [...inventory, item]
    return inventory


})


function assignCategory(item) {
    if (item.item_name.includes("Aged Brie")) {
        item.category = "Aged Brie"
    } else if (item.item_name.includes("Sulfuras")) {
        item.category = "Sulfuras"
    } else if (item.item_name.includes("Backstage passes")) {
        item.category = "Backstage passes"
    } else if (item.item_name.includes("Conjured")) {
        item.category = "Conjured"
    }
    return item
}

function checkQuality(item) {
    if (item.category === "Sulfuras") {
        item.quality = 80
    } else if (item.quality >= 50) {
        item.quality = 50
    } else if (item.quality <= 0) {
        item.quality = 0
    }
    return item
}