const inventoryManager = document.querySelector('.inventory-manager')
const reviewInventory = document.querySelector('.review-inventory')


const inventoryManagerForm = document.querySelector('#inventory-manager')
inventoryManagerForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const itemEntry = formData.get("item-entry")
    const sellIn = formData.get("sell-in")
    const quality = formData.get("quality")
    const dateAdded = formData.get("date-added-calendar")
})

const reviewInventoryForm = document.querySelector('#review-inventory')
reviewInventoryForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const viewInventory = formData.get("view-inventory-calendar")
})