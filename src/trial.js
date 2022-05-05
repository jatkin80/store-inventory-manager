import { format, parseISO } from "date-fns"

const today = format(new Date(), "D", { useAdditionalDayOfYearTokens: true })

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

const reviewTable = document.querySelector("#review_table")
const entryForm= document.querySelector("#entry-form")

entryForm.addEventListener("submit", event => {
event.preventDefault()
reviewTable.innerHTML = ``
const formdata = new FormData(event.target)
const newItem = {
name: formdata.get( "item-entry" ),
sellIn: formdata.get( "sell-in" ),
quality: formdata.get( "quality" ),
dateAdded: format(parseISO(formdata.get("date-added")), "D", { useAdditionalDayOfYearTokens: true })
}
inventory.push(newItem)
inventory.forEach(item => {
addToPage(itemList(degradation(item)))
})

})

inventory.forEach(item => {
addToPage(itemList(degradation(item)))
})

function itemList(item) {
const addToTable = document.createElement("tr")
addToTable.classList.add("item-listing")
addToTable.innerHTML = `
<td>${item.name}</td>
<td>${item.sellIn}</td>
<td>${item.quality}</td>
`
return addToTable
}

function addToPage(itemList) {
reviewTable.append(itemList)
}

function qualityCheck(quality) {
if (quality > 50) {
return quality = 50
} else if (quality < 0) { return quality=0 } return quality } function standardDegradation(item) {
  item.sellIn=item.sellIn - (today - item.dateAdded) item.quality=qualityCheck(item.quality - (today - item.dateAdded))
  return item } function agedBrie(item) { item.sellIn=item.sellIn - (today - item.dateAdded)
  item.quality=qualityCheck(item.quality + (today - item.dateAdded)) return item } function sulfuras(item) {
  item.quality=80 return item } function conjured(item) { item.sellIn=item.sellIn - (today - item.dateAdded)
  item.quality=qualityCheck(item.quality - double(today - item.dateAdded)) return item } function backstagePass(item) {
  const newSellIn=item.sellIn - (today - item.dateAdded) if (item.sellIn> 10 && newSellIn > 10) {
  item.sellIn = newSellIn
  item.quality = qualityCheck(item.quality + (today - item.dateAdded))
  return item
  } else if ((item.sellIn <= 10 && item.sellIn> 5) && (newSellIn <= 10 && newSellIn> 5)) {
      item.sellIn = newSellIn
      item.quality = qualityCheck(item.quality + double(today - item.dateAdded))
      return item
      } else if ((item.sellIn <= 5 && item.sellIn> 0) && (newSellIn <= 5 && newSellIn> 0)) {
          item.sellIn = newSellIn
          item.quality = qualityCheck(item.quality + triple(today - item.dateAdded))
          return item
          } else if (item.sellIn <= 0 || newSellIn <=0) { item.sellIn=newSellIn item.quality=0 return item } else if
            (item.sellIn> 10 && (newSellIn <= 10 && newSellIn> 5)) {
              item.quality = qualityCheck(item.quality + (item.sellIn - 10) + double(10 - newSellIn))
              item.sellIn = newSellIn
              return item
              } else if (item.sellIn > 10 && (newSellIn <= 5 && newSellIn> 0)) {
                item.quality = qualityCheck(item.quality + (item.sellIn - 10) + 10 + triple(5 - newSellIn))
                item.sellIn = newSellIn
                return item
                } else if ((item.sellIn <= 10 && item.sellIn> 5) && (newSellIn <= 5 && newSellIn> 0)) {
                    item.quality = qualityCheck(item.quality + double(item.sellIn - 5) + triple(5 - newSellIn))
                    item.sellIn = newSellIn
                    return item
                    } else return item
                    }

                    function degradation(item) {
                    if (item.name.includes("Aged Brie")) {
                    return agedBrie(item)
                    } else if (item.name.includes("Sulfuras")) {
                    return sulfuras(item)
                    } else if (item.name.includes("Conjured")) {
                    return conjured(item)
                    } else if (item.name.includes("Backstage pass")) {
                    return backstagePass(item)
                    } else {
                    return standardDegradation(item)
                    }
                    }

                    function double(number) {
                    return number * 2
                    }

                    function triple(number) {
                    return number * 3
                    }
