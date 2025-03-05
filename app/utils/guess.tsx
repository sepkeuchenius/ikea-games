const rotate = 10;
export function checkPrice(price: string, productIndex: number){
    if(prices.includes(price) && productIndex < prices.length && prices[productIndex] === price){
        return wordToGuess[(prices.indexOf(price) + rotate) % wordToGuess.length]
    }
    return null;
}

export const wordToGuess = [
    "A",
    "L",
    "L",
    "E",
    "W",
    "I",
    "E",
    "J",
    "O",
    "W",
    "A",
    "J",
    "O",
    "K",
    "O",
    "T",
    "S",
]

export const prices = [
    "209",
    "4999",
    "499",
    "1999",
    "2999",
    "179",
    "199",
    "249",
    "199",
    "399",
    "1499",
    "199",
    "599",
    "147",
    "379",
    "1499",
    "123",
]

export const productImages = [
    "https://www.ikea.com/nl/nl/images/products/malm-bedframe-hoog-met-2-bedlades-wit__1154393_pe886042_s5.jpg?f=xl",
    "https://www.ikea.com/nl/nl/images/products/strelitzia-plant-paradijsvogelbloem__0836980_pe778631_s5.jpg?f=xl",
    "https://www.ikea.com/nl/nl/images/products/tjena-doos-met-deksel-wit__0812710_pe772101_s5.jpg?f=xl",
    "https://www.ikea.com/nl/nl/images/products/frost-staand-droogrek-binnen-buiten-wit__0710879_pe727819_s5.jpg?f=xl",
    "https://www.ikea.com/nl/nl/images/products/sinnerlig-hanglamp-bamboe-handgemaakt__1101927_pe866502_s5.jpg?f=xl",
    "https://www.ikea.com/nl/nl/images/products/mariedamm-tafel-zwart-marmerpatroon__0916869_pe785444_s5.jpg?f=xl",
    "https://www.ikea.com/nl/nl/images/products/norden-klaptafel-berken__66396_pe179294_s5.jpg?f=xl",
    "https://www.ikea.com/nl/nl/images/products/ikea-365-beker-helder-glas__0713425_pe729518_s5.jpg?f=xl",
    "https://www.ikea.com/nl/nl/images/products/fornuft-lepel-roestvrij-staal__0714606_pe730141_s5.jpg?f=xl",
    "https://www.ikea.com/nl/nl/images/products/grejig-schoenenrek-grijs__0710739_pe727757_s5.jpg?f=xl",
    "https://www.ikea.com/nl/nl/images/products/ikea-365-koekenpan-roestvrij-staal-antiaanbaklaag__1275978_pe930770_s5.jpg?f=xl",
    "https://www.ikea.com/nl/nl/images/products/brogrund-doucheset-met-thermostaatmengkraan-verchroomd__0755271_pe748315_s5.jpg?f=xl",
    "https://www.ikea.com/nl/nl/images/products/uppdatera-bestekbakje-geel__1257457_pe925834_s5.jpg?f=xl",
    "https://www.ikea.com/nl/nl/images/products/tossberg-malskar-bureaustoel-gunnared-beige-wit__1200010_pe904812_s5.jpg?f=xl",
    "https://www.ikea.com/nl/nl/images/products/mittzon-bureau-zit-sta-elektrisch-eikenfineer-wit__1205828_pe907242_s5.jpg?f=xl",
    "https://www.ikea.com/nl/nl/images/products/koppla-verdeeldoos-4-voudig-m-2-usb-poort-wit__0605958_pe681926_s5.jpg?f=xl",
    "https://www.ikea.com/nl/nl/images/products/bror-open-kast-zwart__0675859_pe718506_s5.jpg?f=xl",
]