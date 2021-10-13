const api = require('./api');
const actions = require('./actions');
const symbol = process.env.SYMBOL;
const profitability = parseFloat(process.env.PROFITABILITY)
const coin = process.env.COIN
const goodBuy = process.env.GOODBUY

setInterval(async () => {
    
    let buy = 0, sell = 0;

    const result = await api.depth(symbol);
    console.log(result)
    if(result.bids && result.bids.length){
        console.log(`Highest Buy: ${result.bids[0][0]}`)
        buy = parseFloat(result.bids[0][0])
    }
        

    if(result.asks && result.asks.length){
        console.log(`Lowest Sell: ${result.asks[0][0]}`)
        sell = parseFloat(result.asks[0][0])
    }

    //**************** */
    console.log(`Minha carteira...`)
    console.log(await api.accountInfo())
    await actions.buy(sell);
    

    //const buyOrder = await api.newOrder(symbol, 0.0018);

    
    //console.log(`Nova carteiraaa...`)
    //console.log(await api.accountInfo());
    //************ */

    /*if(sell && sell < goodBuy){
        console.log('Hora de comprar!!');
        const account = await api.accountInfo();
        const coins = account.balances.filter(b=> symbol.indexOf(b.asset) !== -1);
        console.log('POSICAO DA CARTEIRA');
        console.log(coins)

        console.log('VERIFICANDO SE TENHO GRANA');
        const walletCoin = parseFloat(coins.find(c => c.asset === coin).free)

        if(sell <= walletCoin){
            console.log('Temos grana vamos comprar....');
            const buyOrder = await api.newOrder(symbol, 1);
            console.log(`orderId: ${buyOrder.orderId}`)
            console.log(`status: ${buyOrder.status}`)


            if(buyOrder.status === 'FILLED'){
                console.log('Posicionando venda futura...');
                const price =  parseFloat(sell * profitability).toFixed(8);
                console.log(`Vendendo por ${price} (${profitability})`);
                const sellOrder = await api.newOrder(symbol, 1, price, 'SELL', 'LIMIT');
                console.log(`orderId: ${sellOrder.orderId}`);
                console.log(`status: ${sellOrder.status}`);
            }
            
        }
    }else if(buy && buy > 1000){
        console.log('Hora de vender')
    }else{
        console.log('esperando mercado se mexer')

    }*/

}, process.env.CRAWLER_INTERVAL)