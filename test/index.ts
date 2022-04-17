try {
  require('dotenv').config()
}catch (e){}

import {TradeBot} from "../bot/TradeBot";
import { OperationTypes } from "../types";

(async () => {
  const awaitTime = (ms: number) => {
    return new Promise((resolve) => {
      setTimeout(() => {resolve(true)}, ms)
    })
  } 
  const tradeBot = new TradeBot(process.env.TINKOFF_SANDBOX_API_KEY || '')


  console.info(`${new Date()} Waiting initialization...`)
  
  while (!tradeBot.exchangeClient.isAccountInitialized){
    await awaitTime(10)
  }

  console.info(`${new Date()} Starting tests...`)

  tradeBot.trader.sendOrder({ ticker: 'AAPL', lots: 5, operation: OperationTypes.buy, price: 200 })


})()

