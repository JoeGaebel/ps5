import cheerio from 'cheerio'
import axios from 'axios'
import {freakOut, sleep} from "./utils";

async function findOutStock(): Promise<boolean> {
    const response = await axios.get('https://www.amazon.com.au/Sony-PlayStation-5-Console/dp/B08HHV8945')
    const $ = cheerio.load(response.data)
    const availability = $('#availability > span').text().trim()
    console.log(availability)
    return Boolean(availability === 'Currently unavailable.')
}

(async () => {
    let outOfStock: boolean = true
    let x = 0

    while(outOfStock) {
        try {
            outOfStock = await findOutStock()
            if (outOfStock) {
                console.log(`Nope... attempt: ${++x}`)
            }
        } catch (e) {
            console.log(`Hmm, I blew up. attempt ${++x}`, e.response.status)
        }

        await sleep(60000)
    }

    await freakOut('AMAZON')
})()