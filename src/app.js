import { format, parseISO } from "date-fns"
const today = format( new Date(), "D", { useAdditionalDayOfYearTokens: true } )
console.log( today )
const entryForm = document.querySelector( "#entry-form" )
const tableBody = document.querySelector( "#data" )

let items = [ {
    name: "+5 Dexterity Vest",
    sellIn: 10,
    quality: 20,
    date_added: today,
}, {
    name: "Aged Brie",
    sellIn: 2,
    quality: 0,
    date_added: today,
}, {
    name: "Elixir of the Mongoose",
    sellIn: 5,
    quality: 7,
    date_added: today,
}, {
    name: "Sulfuras, Hand of Ragnaros ",
    sellIn: 0,
    quality: 80,
    date_added: today,
}, {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 15,
    quality: 20,
    date_added: today,
}, {
    name: "Conjured Mana Cake",
    sellIn: 3,
    quality: 6,
    date_added: today,
} ]
createItemList( items )

entryForm.addEventListener( "submit", ( event ) =>
{
    event.preventDefault()
    tableBody.innerHTML = ""
    const formData = new FormData( event.target )
    const item = {
        name: formData.get( "item-entry" ),
        sellIn: +formData.get( "sell-in" ),
        quality: +formData.get( "quality" ),
        dateAdded: format( parseISO( formData.get( "date-added" ) ),
            "D", { useAdditionalDayOfYearTokens: true } ),
    }
    items = [ ...items, item ]
    normalDegrade( item )
    createItemList( item )
} )

function createItemList ( item )
{
    tableBody.innerHTML = ""
    items.map( item =>
    {
        const tableRow = document.createElement( "tr" )
        tableRow.innerHTML = `
        <td>${ item.name }</td>
        <td>${ item.sellIn }</td>
        <td>${ item.quality }</td>
    `
        return tableRow
    } )
        .forEach( ( tableRow ) =>
        {
            tableBody.append( tableRow )
        } )
}

function qualityCheck ( item )
{
    if ( item.category === "Sulfuras" )
    {
        item.quality = 80
    } else if ( item.quality >= 50 )
    {
        item.quality = 50
    } else if ( item.quality <= 0 )
    {
        item.quality = 0
    }
    return item
}

function normalDegrade ( item )
{
    item.sellIn = item.sellIn - ( today - item.dateAdded )
    item.quality = qualityCheck( item.quality - ( today - item.dateAdded ) )
    return item
}

function sulfuras ( item )
{
    item.quality = 80
}

function conjured ( item )
{
    item.sellIn = item.sellIn - ( today - item.dateAdded )
    item.quality = qualityCheck( item.quality - double( today - item.dateAdded ) )
    return item
}

function agedBrie ( item )
{
    item.sellIn = item.sellIn - ( today - item.dateAdded )
    item.quality = qualityCheck( item.quality + ( today - item.dateAdded ) )
    return item
}

function backstagePasses ( item )
{
    const newSellIn = item.sellIn - ( today - item.dateAdded )
    if ( item.sellIn > 10 && newSellIn > 10 )
    {
        item.sellIn = newSellIn
        item.quality = qualityCheck( item.quality + ( today - item.dateAdded ) )
        return item
    } else if ( ( item.sellIn <= 10 && item.sellIn > 5 ) &&
        ( newSellIn <= 10 && newSellIn > 5 ) )
    {
        item.sellIn = newSellIn
        item.quality = qualityCheck( item.quality + double( today - item.dateAdded ) )
        return item
    } else if ( ( item.sellIn <= 5 && item.sellIn > 0 ) &&
        ( newSellIn <= 5 && newSellIn > 0 ) )
    {
        item.sellIn = newSellIn
        item.quality = qualityCheck( item.quality + triple( today - item.dateAdded ) )
        return item
    } else if ( item.sellIn <= 0 || newSellIn <= 0 )
    {
        item.sellIn = newSellIn
        item.quality = 0
        return item
    } else if ( item.sellIn > 10 && ( newSellIn <= 10 && newSellIn > 5 ) )
    {
        item.quality = qualityCheck( item.quality +
            ( item.sellIn - 10 ) + double( 10 - newSellIn ) )
        item.sellIn = newSellIn
        return item
    } else if ( item.sellIn > 10 && ( newSellIn <= 5 && newSellIn > 0 ) )
    {
        item.quality = qualityCheck( item.quality +
            ( item.sellIn - 10 ) + 10 + triple( 5 - newSellIn ) )
        item.sellIn = newSellIn
        return item
    } else if ( ( item.sellIn <= 10 && item.sellIn > 5 ) &&
        ( newSellIn <= 5 && newSellIn > 0 ) )
    {
        item.quality = qualityCheck( item.quality + double( item.sellIn - 5 ) +
            triple( 5 - newSellIn ) )
        item.sellIn = newSellIn
        return item
    } else return item
}

function bigDegrade ( item )
{
    if ( item.name.includes( "Aged Brie" ) )
    {
        return agedBrie( item )
    } else if ( item.name.includes( "Sulfuras" ) )
    {
        return sulfuras( item )
    } else if ( item.name.includes( "Conjured" ) )
    {
        return conjured( item )
    } else if ( item.name.includes( "Backstage pass" ) )
    {
        return backstagePasses( item )
    } else
    {
        return normalDegrade( item )
    }
}

function double ( number )
{
    return number * 2
}

function triple ( number )
{
    return number * 3
}
