import { format, parseISO } from "date-fns"
const today = format( new Date(), "D", { useAdditionalDayOfYearTokens: true } )
console.log(today)
const entryForm = document.querySelector('#entry-form')
const reviewInventory = document.querySelector('.review-inventory')


let inventory = [
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


entryForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const formdata = new FormData( event.target )
    const item = {
        name: formdata.get( "item-entry" ),
        sellIn: formdata.get( "sell-in" ),
        quality: formdata.get( "quality" ),
        dateAdded: format( parseISO( formdata.get( "date-added" ) ), "D", { useAdditionalDayOfYearTokens: true })
    }

    console.log (item)
    inventory.push(item)
    inventory.forEach(item => {
        addToPage(createList(qualityCheck(sellIn(item))))
    })
    event.target.reset()
})

function createList ( item )
{
const tableHead=document.querySelector("#data")
    const listItem = document.createElement("tbody")
    listItem.classList.add("item-listing")
    listItem.innerHTML = `
        <tr>
            <td>${item.name}</td>
            <td>${item.quality}</td>
            <td>${item.sellIn}</td>
        </tr>
    `
    tableHead.append(listItem)
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

function qualityCheck ( item )
{
    const qualityTime = today - item.dateAdded
    if (item.name.includes("Aged Brie")) {
        item.quality = +item.quality + (qualityTime)
        return item
    } else if (item.name.includes("Sulfuras")) {
        item.quality = 80
        return item
    } else if (item.name.includes("Conjured")) {
        item.quality = +item.quality - double(qualityTime)
        return item
    } else if (item.name.includes("Backstage pass")) {
        if (item.sellIn > 10) {
            item.quality = +item.quality + (qualityTime)
            return item
        } else if (item.sellIn <= 10 && item.sellIn > 5) {
            item.quality = +item.quality + double(qualityTime)
            return item
        } else if (item.sellIn <= 5 && item.sellIn > 0) {
            item.quality = +item.quality + triple(qualityTime)
            return item
        } else {
            item.quality = 0
            return item
        }
    } else {
        item.quality = +item.quality - (qualityTime)
        return item
    }
}

function double(number) {
    return number * 2
}

function triple(number) {
    return number * 3
}