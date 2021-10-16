const api = require('./api');
const symbol = process.env.SYMBOL;
const coin = process.env.COIN
const profitability = parseFloat(process.env.PROFITABILITY)

async function buy(lowestSell){

    //Achar quantidade que vou comprar 
    //minha carteira dividia pelo valor do bitcoin
    var myWalletUSD = await myWallet()
    console.log(`VALOR EM DOLARES = ${myWalletUSD}`)
    var quantity = parseFloat((myWalletUSD - (myWalletUSD * 0.05)) / lowestSell).toFixed(5)
    
    console.log(`Quantidade = ${quantity}`)
    const buyOrder = await api.newOrder(symbol, quantity);
    
    console.log("MINHA CARTEIRA ___")
    console.log(await api.accountInfo())
    
    await sell(lowestSell)
    return true
}

async function sell(lowestSell){
    console.log('Posicionando venda futura...');
    const price =  parseFloat(lowestSell + (lowestSell * profitability)).toFixed(2);

    const account = await api.accountInfo();
    const coins = account.balances.filter(b=> symbol.indexOf(b.asset) !== -1);
    var quantityBTC = parseFloat(coins.find(c => c.asset === 'BTC').free)
    

    quantityBTC = quantityBTC.toString(); //If it's not already a String
    quantityBTC = quantityBTC.slice(0, (quantityBTC.indexOf("."))+6); //With 3 exposing the hundredths place
    
    console.log("*************")
    console.log(`Comprou por = ${lowestSell}`)
    console.log(`Vendendo por = ${price}`)
    global.lastPrice = price;
    console.log(`Quantidade btc = ${quantityBTC}`)
    console.log("*************")

    const sellOrder = await api.newOrder(symbol, quantityBTC
        , price, 'SELL', 'LIMIT');
    console.log(`orderId: ${sellOrder.orderId}`);
    console.log(`status: ${sellOrder.status}`);
}


async function myWallet(){

    const account = await api.accountInfo();

    const coins = account.balances

    const result = coins.find(a => a.asset === 'BUSD')
    const myMoney = parseFloat(coins.find(c => c.asset === coin).free)

    console.log(`Tenho ${myMoney} em Dollares`)
    return myMoney
}

module.exports = { buy, myWallet, sell }