const api = require('./api');
const symbol = process.env.SYMBOL;
const coin = process.env.COIN

async function buy(lowestSell){

    //Achar quantidade que vou comprar 
    //minha carteira dividia pelo valor do bitcoin
    var myWalletUSD = await myWallet()
    console.log(`VALOR EM DOLARES = ${myWalletUSD}`)
    var quantity = parseFloat((myWalletUSD / 4) / lowestSell).toFixed(5)
    
    console.log(`Quantidade = ${quantity}`)
    const buyOrder = await api.newOrder(symbol, quantity);
    
    console.log("MINHA CARTEIRA ___")
    console.log(await api.accountInfo())
    
    return true
}


async function myWallet(){

    const account = await api.accountInfo();

    const coins = account.balances

    const result = coins.find(a => a.asset === 'BUSD')
    const myMoney = parseFloat(coins.find(c => c.asset === coin).free)

    console.log(`Tenho ${myMoney} em Dollares`)
    return myMoney
}

module.exports = { buy, myWallet }