export async function sleep(milliseconds: number) {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

type Brands = 'AMAZON' | 'TARGET'

export async function freakOut(brand: Brands){
    while(true) {
        if (brand === 'AMAZON') {
            console.log("AMAZON!!!")
            console.log("https://www.amazon.com.au/Sony-PlayStation-5-Console/dp/B08HHV8945")
        } else {
            console.log("TARGET!!!")
            console.log("https://www.target.com.au/playstation-5")
        }

        console.log("\x07")
        await sleep(100)
    }
}