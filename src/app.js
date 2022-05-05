import { format, parseISO } from "date-fns"
    const tableHead = document.querySelector( "#data" )
const today = format( new Date(), "D", { useAdditionalDayOfYearTokens: true } )
const reviewTable = document.querySelector("#review_table")
const entryForm = document.querySelector("#entry-form")
const generateTable=document.querySelector("#generate_table")

let items = []
let item = {}

entryForm.addEventListener( "submit", ( event ) =>
    {
    event.preventDefault()
    const formdata = new FormData( event.target )
   const dateAdded= format( parseISO( formdata.get( "date-added" ) ), "D", { useAdditionalDayOfYearTokens: true } )
    const item = {
        name: formdata.get( "item-entry" ),
        sellIn: +formdata.get( "sell-in" ),
        quality: +formdata.get( "quality" ),
        dateAdded: dateAdded,
        category: "none",
    }

    qualityCheck(item)
    items.push(item)
    return items
    })


function startingTable (item) {
    const tableRow = document.createElement("tr")
    if (item.name.includes('Sulfuras')) {
        tableRow.innerHTML = `
    <td>${item.name}</td>
    <td>${item.sellIn}</td>
    <td>80</td>
    <td>${item.dateAdded}</td>
    `
    tableHead.append(tableRow)
    } else {
        tableRow.innerHTML = `
        <td>${item.name}</td>
        <td>${item.sellIn}</td>
        <td>${item.quality}</td>
        `
        tableHead.append(tableRow)
    }

}
function createItemListing ( item )
{
        const tableRow = document.createElement( 'tr' )
        tableRow.innerHTML = `
        <td>${ item.name }</td>
        <td>${item.sellIn}</td>
        <td>${item.quality}</td>
    <td>${item.remainingSellIn}</td>
    <td>${item.currentQuality}</td>
    `
    tableHead.append(tableRow)
        return tableHead
}

generateTable.addEventListener( 'click', event =>
{
    tableHead.innerHTML = ``
    items.forEach( item =>
    {
        startingTable( item )
    } )
})


function qualityCheck(event) {

    tableHead.innerHTML=``
    items.forEach( item =>
    {
        const dateDifference= today-item.dateAdded
        item.remainingSellIn = item.sellIn - dateDifference
        if (item.name.includes('Aged Brie')) {
            item.currentQuality = (+item.quality) + dateDifference
        } else if (item.name.includes('Sulfuras')) {
            item.currentQuality = item.quality
            item.remainingSellIn = item.sellIn
        }else if (item.name.includes('Backstage passes')) {
            if ((+item.remainingSellIn) > 10) {
                item.currentQuality = (+item.quality) + dateDifference
            } else if ((+item.remainingSellIn) <= 10 && (+item.remainingSellIn) > 5) {
                item.currentQuality = (+item.quality) + ((+item.sellIn) - 10) + (2 * (10 - (+item.remainingSellIn)))
            } else if ((+item.remainingSellIn) <= 5) {
                item.currentQuality = (+item.quality) + ((+item.sellIn) - 10) + 10 + (3 * (5 - (+item.remainingSellIn)))
            }
            if ((+item.remainingSellIn) <= 0) {
                item.currentQuality = 0
            }
        } else if (item.name.includes('Conjured')) {
            item.currentQuality = item.quality - (2 * (+dateDifference))
        } else {
            item.currentQuality = item.quality - dateDifference
        }
        if ((+item.currentQuality) >= 50 && !item.name.includes('Sulfuras')) {
            item.currentQuality = 50
        }
        if ((item.currentQuality) <= 0) {
            item.currentQuality = 0
        }
        createItemListing(item)
    })
}



//  function getCategory(item) {
//  if (item.name.includes("Conjured")) {
//         item.category = "Conjured"
//     } else if (item.name.includes("Aged Brie")) {
//         item.category = "Aged Brie"
//     } else if (item.name.includes("Backstage passes")) {
//         item.category = "Backstage passes"
//     } else if (item.name.includes("Sulfuras")) {
//         item.category = "Sulfuras"
//         item.quality = 80
//     } else {
//         item.category = "none"
//     }
// }

// function updateSellIn ( item )
// {

//     if (item.category === "Sulfuras") {
//       return item.sellIn = 0
//     } else if (item.sellIn > 0) {
//         return item.sellIn = item.sell_in - today
//     } else {
//        return item.sellIn = 0
//     }
// }


// function qualityCheck(item) {
//     if (item.category === "Sulfuras") {
//         return item.quality = 80
//     } else if (item.category === "Aged Brie" && item.quality < 50) {
//         return item.quality
//     } else if (item.category === "Backstage passes" && item.quality < 50) {
//         return item.quality
//     } else if (item.quality > 50) {
//         return item.quality = 50
//     } else if (item.quality <= 0) {
//         return item.quality = 0
//     } else {
//         return item.quality
//     }
// }