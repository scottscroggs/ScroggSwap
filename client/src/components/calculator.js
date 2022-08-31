import React, {useState} from 'react'
import axios from 'axios';

const Calculator = () => {
    const [coin1, setCoin1] = useState({})
    const [coin2, setCoin2] = useState({})

    const [coin1Price, setCoin1Price] = useState("")
    const [coin2Price, setCoin2Price] = useState("")

    const [inputAmount, setInputAmount] = useState("")
    const [outputAmount, setOutputAmount] = useState("")

    const [showResults, setShowResults] = useState(false)

    const exchangeCalculate = (coin1Price,coin2Price,inputAmount) => {
        console.log('Coin 1 Price is: ' + coin1Price)
        console.log('Coin 2 Price is: ' + coin2Price)
        console.log('User has entered: ' + inputAmount)
        setOutputAmount((coin1Price / coin2Price * inputAmount).toFixed(2))
        console.log(inputAmount + ' of Coin1 is equivalent of ' + outputAmount + ' of Coin2')
        setShowResults(true);
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();

        axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coin1}&vs_currencies=usd&include_market_cap=false&include_24hr_change=false&include_last_updated_at=true`)
        .then(res1=>{
            console.log(res1.data[`${coin1}`]["usd"]);
            setCoin1Price(res1.data[`${coin1}`]["usd"]);
        })
        .catch((err)=> {
            console.log(err); 
        });

        axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coin2}&vs_currencies=usd&include_market_cap=false&include_24hr_change=false&include_last_updated_at=true`)
        .then(res2=>{
            console.log(res2.data[`${coin2}`]["usd"]);
            setCoin2Price(res2.data[`${coin2}`]["usd"]);
        })
        .catch((err)=> {
            console.log(err); 
        });
        
        exchangeCalculate(coin1Price,coin2Price,inputAmount);
    }

    return (
        <div className="wrapper">
            <div className="white">
                <h2>Exchange Rate Calculator</h2>
                <p>This tool will provide an exchange rate between various cryptocurrencies using their USD value.</p>
                <p>Prices are estimates based on data provided by CoinGecko. <br></br> Actual rates may vary and doesn't reflect actual order books.</p>
            </div>
            <div className="calculator">
                <div className="coin-left">
                    <form className="form">
                        <p>
                            <label className="white">Select Coin 1:</label><br/>
                            <select className="form-select" onChange = {(e)=>setCoin1(e.target.value)}>
                                <option value="">--Select a coin--</option>
                                <option value="bitcoin">BTC - Bitcoin</option>
                                <option value="ethereum">ETH - Ethereum</option>
                                <option value="ripple">XRP - Ripple</option>
                                <option value="litecoin">LTC - Litecoin</option>
                                <option value="monero">XMR - Monero</option>
                                <option value="stellar">XLM - Stellar</option>
                                <option value="solana">SOL - Solana</option>
                            </select>
                        </p>
                        <p>
                            <label className="white">Enter Amount:</label><br/>
                            <input className="form-control" type="text" onChange = {(e)=>setInputAmount(e.target.value)}/>
                        </p>
                    </form>
                </div>


                <div className="coin-right">
                    <form className="form" onSubmit={onSubmitHandler}>
                        <p>
                            <label className="white">Select Coin 2:</label><br/>
                            <select className="form-select" onChange = {(e)=>setCoin2(e.target.value)}>
                                <option value="">--Select a coin--</option>
                                <option value="bitcoin">BTC - Bitcoin</option>
                                <option value="ethereum">ETH - Ethereum</option>
                                <option value="ripple">XRP - Ripple</option>
                                <option value="litecoin">LTC - Litecoin</option>
                                <option value="monero">XMR - Monero</option>
                                <option value="stellar">XLM - Stellar</option>
                                <option value="solana">SOL - Solana</option>
                            </select>
                        </p>
                        <input className="btn btn-primary btn-wide" type="submit" value="Calculate"/>

                    </form>
                </div>
            </div>

            <div className="flex">
                {showResults &&
                    <div className="results">
                        <p>{inputAmount} {coin1} is equivalent to {outputAmount} {coin2}</p>
                        <p>Price of Coin 1: ${coin1Price} </p>
                        <p>Price of Coin 2: ${coin2Price}</p>
                        <p></p>
                    </div>
                }
            </div>       
        </div>
    )
}

export default Calculator;