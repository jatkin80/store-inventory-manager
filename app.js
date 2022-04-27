const inventoryManager = document.querySelector('.inventory-manager')
const reviewInventory = document.querySelector('.review-inventory')
const inventoryManagerForm = document.querySelector('#inventory-manager')
const reviewInventoryForm = document.querySelector('#review-inventory')


let inventory = [{
    item_name: "+5 Dexterity Vest",
    sell_in: 10,
    quality: 20,
    date_added: 'today',
    category: "clothing",
}, {
    item_name: "Aged Brie",
    sell_in: 2,
    quality: 0,
    date_added: 'today',
    category: "cheese",
}, {
    item_name: "Elixir of the Mongoose",
    sell_in: 5,
    quality: 7,
    date_added: 'today',
    category: "elixir",
}, {
    item_name: "Sulfuras, Hand of Ragnaros",
    sell_in: 0,
    quality: 80,
    date_added: 'today',
    category: "sulfuras",
}, {
    item_name: "Backstage passes to a TAFKAL80ETC concert",
    sell_in: 15,
    quality: 20,
    date_added: 'today',
    category: "tickets",
}, {
    item_name: "Conjured Mana Cake",
    sell_in: 3,
    quality: 6,
    date_added: 'today',
    category: "conjured",
}]




inventoryManagerForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const item = {
        item_name: formData.get("item-entry"),
        sell_in: formData.get("sell-in"),
        quality: formData.get("quality"),
        date_added: formData.get("date-added-calendar"),
        category: 'none'
    }
    assignCategory(item)
    checkQuality(item)
    inventory = [...inventory, item]
    return inventory

})

reviewInventoryForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const table = document.createElement('table')
    reviewInventory.append(table)
    const tableRows = document.createElement('tr')
    tableRows.innerHTML = `
    <th>Item<th>
      <td>Item</td>
      <th>Sell-In</th>
<td>Sell In</td>
<th>Quality<th>
<td>Quality</td>
  `
    table.append(tableRows)

    return table

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



function addData() {


    const div = document.createElement('div')
    const table = document.createElement('table')
    div.append(table)
    const tableRows = document.createElement('tr')


    tableRows.innerHTML = `
    <th>Item<th>
      <td>Item</td>
      <th>Sell-In</th>
<td>Sell In</td>
<th>Quality<th>
<td>Quality</td>
  `
    table.append(tableRows)
    return addToInventory

}






function displayInventory(item) {
    const inventoryDisplay = document.querySelector(".review-inventory")
    const inventoryGrid = document.createElement("table")


    inventoryGrid.textContent = `
  <th>Inventory as of ${dateAdded}</th>
  <tr>${item.name}</tr>
  <tr>${item.sell_in} </tr>
  <tr>${item.quality} </tr>
  `
    inventoryDisplay.append(inventoryGrid)

}