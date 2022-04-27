const inventoryManager = document.querySelector('.inventory-manager')
const reviewInventory = document.querySelector('.review-inventory')
const inventoryManagerForm = document.querySelector('#inventory-manager')

let inventory = [{
    name: "+5 Dexterity Vest",
    sell_in: 10,
    quality: 20,
    category: "",
}, {
    name: "Aged Brie",
    sell_in: 2,
    quality: 0,
    category: "",
}, {
    name: "Elixir of the Mongoose",
    sell_in: 5,
    quality: 7,
    category: "",
}, {
    name: "Sulfuras, Hand of Ragnaros",
    sell_in: 0,
    quality: 80,
    category: "",
}, {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sell_in: 15,
    quality: 20,
    category: "",
}, {
    name: "Conjured Mana Cake",
    sell_in: 3,
    quality: 6,
    category: "",
}]




inventoryManagerForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const item = {
        name: formData.get("item-entry"),
        sell_in: formData.get("sell-in"),
        quality: formData.get("quality"),
    }
    inventory = [...inventory, item]
    console.log(inventory)
    console.log(item)
})

const reviewInventoryForm = document.querySelector('#review-inventory')
reviewInventoryForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const viewInventory = formData.get("view-inventory-calendar")
    console.log(viewInventory)
})