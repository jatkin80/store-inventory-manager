import { format, parseISO } from "date-fns"

const today = format(new Date(), "D", { useAdditionalDayOfYearTokens: true })

let itemList = [
    {
        name: "+5 Dexterity Vest",
        sellIn: 10,
        quality: 20,
        dateAdded: today,
    },
    {
        name: "Aged Brie",
        sellIn: 2,
        quality: 0,
        dateAdded: today,
    },
    {
        name: "Elixir of the Mongoose",
        sellIn: 5,
        quality: 7,
        dateAdded: today,
    },
    {
        name: "Sulfuras, Hand of Ragnaros",
        sellIn: 0,
        quality: 80,
        dateAdded: today,
    },
    {
        name: "Backstage passes to a TAFKAL80ETC concert",
        sellIn: 15,
        quality: 20,
        dateAdded: today,
    },
    {
        name: "Conjured Mana Cake",
        sellIn: 3,
        quality: 6,
        dateAdded: today,
    }
]

const inventoryManager = document.querySelector('.inventory-manager')
const reviewInventory = document.querySelector('.review-inventory')
const firstForm = document.querySelector('#first-form')
const reviewInventoryForm = document.querySelector( '#review-inventory' )


firstForm.addEventListener("submit", event => {
    event.preventDefault()
    firstForm.innerHTML = ``
    const formdata = new FormData(event.target)
    const itemObject = {
        name: formdata.get("item-name"),
        sellIn: formdata.get("item-sell-in"),
        quality: formdata.get("item-quality"),
        dateAdded: format(parseISO(formdata.get("date-entered")), "D", { useAdditionalDayOfYearTokens: true })
    }
    itemList.push(itemObject)
    itemList.forEach(item => {
        addItemListingToPage(createListItem(qualityCheck(sellInDegradation(item))))
    })
    event.target.reset()
})

itemList.forEach(item => {
    addToPage(createItemListing(qualityDegradation(sellIn(item))))
})


function createListItem(item) {
    const listItem = document.createElement("tr")
   listItem.classList.add("item-listing")
    listItem.innerHTML = `
   <table>
        <td>${item.name}</td>
        <td>${item.sellIn}</td>
        <td>${item.quality}</td>
        </table>
    `
    return listItem
}


function addToPage(itemListing) {
    reviewInventory.append(itemListing)
}

function sellIn(item) {
    if (item.name.includes("Sulfuras")) {
        item.quality = 80
        return item
    } else {
        item.sellIn = item.sellIn - (today - item.dateAdded)
        return item
    }
}

function qualityCheck(item) {
    if (item.name.includes("Aged Brie")) {
        item.quality = +item.quality + (today - item.dateAdded)
        return item
    } else if (item.name.includes("Sulfuras")) {
        item.quality = 80
        return item
    } else if (item.name.includes("Conjured")) {
        item.quality = +item.quality - double(today - item.dateAdded)
        return item
    } else if (item.name.includes("Backstage pass")) {
        if (item.sellIn > 10) {
            item.quality = +item.quality + (today - item.dateAdded)
            return item
        } else if (item.sellIn <= 10 && item.sellIn > 5) {
            item.quality = +item.quality + double(today - item.dateAdded)
            return item
        } else if (item.sellIn <= 5 && item.sellIn > 0) {
            item.quality = +item.quality + triple(today - item.dateAdded)
            return item
        } else {
            item.quality = 0
            return item
        }
    } else {
        item.quality = +item.quality - (today - item.dateAdded)
        return item
    }
}

function double(number) {
    return number * 2
}

function triple(number) {
    return number * 3
}