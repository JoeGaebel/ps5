import axios from 'axios'
import {freakOut, sleep} from "./utils";

async function isOutOfStock(): Promise<boolean> {
    let status = 0
    try {
        await axios.get('https://www.target.com.au/p/playstation-reg-5-console/64226187', {maxRedirects: 0})
    } catch (e) {
       status = e.response.status
    }
    console.log(`Status code: ${status}`)
    return status === 302
}



(async () => {
    let outOfStock: boolean = true
    let x = 0

    while(outOfStock) {
        try {
            outOfStock = await isOutOfStock()
            if (outOfStock) {
                console.log(`Nope... attempt: ${++x}`)
            }
        } catch (e) {
            console.log(`Hmm, I blew up. attempt ${++x}`, e)
        }

        await sleep(30000)
    }

    await freakOut('TARGET')
})()