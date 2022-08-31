import React, {useEffect, useState} from 'react'
import axios from 'axios';

const Coins = () => {

    const [coin, setCoin] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)

    const dailyChange = (change) => {
        if (change > 0) {
            return "green"
        }
        else {
            return "red"
        }
    }

    const dollarUS = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumSignificantDigits: 6,
    });

    useEffect(()=>{
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d')
        .then(res=>{
            setCoin(res.data)
            console.log(coin)
            setIsLoaded(true)
        })
        .catch((err)=> {
            console.log(err); 
        });
	}, [])
    

    return (
        <div className="flex background">
            <div className="coins-list">
                <h2 className="white">Top Coins</h2>
                <p className="white">(Data provided by CoinGecko)</p>
                <table className="table table-dark table-hover">
                    <thead>
                        <tr>
                            <th className="">Rank:</th>
                            <th className="left">Name:</th>
                            <th className="">Current Price (USD):</th>
                            <th className="">24hr Change:</th>
                            <th className="">Market Cap:</th>
                        </tr>
                    </thead>
                    {isLoaded &&
                    <tbody>
                        {
                            coin.map((coin, index)=>{
                            return <tr className="coinRow" key={index}>
                                <td className=''> {coin.market_cap_rank}</td>
                                <td className='left'><img className="coin-img" src={coin.image}></img> {coin.name} • {coin.symbol.toUpperCase()}</td>
                                <td className=''> {dollarUS.format(coin.current_price)}</td>
                                <td className={dailyChange(coin.price_change_percentage_24h)}> {coin.price_change_percentage_24h.toFixed(2)}%</td>
                                <td className=''> {dollarUS.format(coin.market_cap)}</td>
                                </tr>                       
                            })
                        }
                    </tbody>
                    }
                </table>
            </div>
        </div>
    )
}

export default Coins;