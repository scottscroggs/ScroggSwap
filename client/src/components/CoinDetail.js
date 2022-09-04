import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios';

const CoinDetail = (props) => {
    const {id} = useParams();
    const [coin, setCoin] = useState({})
    const [coinDesc, setCoinDesc] = useState([])
    const [coinImage, setCoinImage] = useState("")
    const [coinMarketData, setCoinMarketData] = useState([])
    const [coinATH, setCoinATH] = useState([])
    const [coin24L, setCoin24L] = useState([])
    const [coin24H, setCoin24H] = useState([])
    const [coinPrice, setCoinPrice] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    // Comment State
    const [name, setName] = useState("")
    const [comment, setComment] = useState("")
    const [coinIdentity, setCoinIdentity] = useState("")

    const [comments, setComments] = useState([])

    const [errors, setErrors] = useState([]);

    
    const dollarUS = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumSignificantDigits: 6,
    });

    const numberUS = Intl.NumberFormat("en-US");

    const dailyChange = (change) => {
        if (change > 0) {return "green"}
        else {return "red"}
    }

    //handler when the form is submitted
    const onSubmitHandler = (e) => {
        //prevent default behavior of the submit
        e.preventDefault();
        console.log(coin)
        //make a post request to create a new record
        axios.post('http://localhost:8000/api/comment', {
            name,    // this is shortcut syntax for name: name,
            comment,
            coin:id
        })
            .then(res=>{
                console.log(res);
                console.log(res.data);
                // navigate('/');
            })
            .catch((err)=> {
                console.log(err); 
                setErrors(err.response.data.errors);
            });
    }

    useEffect(()=>{
        axios.get('https://api.coingecko.com/api/v3/coins/' + id +'?localization=false')
        .then(res=>{
            setCoin(res.data)
            setCoinIdentity(res.data.id)
            setCoinDesc(res.data.description)
            setCoinImage(res.data.image)
            setCoinMarketData(res.data.market_data)
            setCoinATH(res.data.market_data.ath)
            setCoinPrice(res.data.market_data.current_price)
            setCoin24L(res.data.market_data.low_24h)
            setCoin24H(res.data.market_data.high_24h)
            setIsLoaded(true)
        })
        .catch((err)=> {
            console.log(err); 
        });
	}, [])

    useEffect(()=>{
        console.log("Coin Identity:"+id)
        axios.get("http://localhost:8000/api/comment/"+id)
        .then((res)=>{
            console.log(res.data);
            setComments(res.data);
	})
        .catch((err)=>{
            console.log(err);
        })
    }, [])

    return (
        <div>
            <div className="flex white">
                {isLoaded &&
                <div className="coin-details">
                    <div className="flex space-between">
                        <div className="flex">
                            <img className="coin-img-medium" src={coinImage["large"]} alt="Coin logo"></img>
                            <div className="left">
                                <p className="rank-badge">Rank #{coin.market_cap_rank}</p>
                                <h1>{coin.name} ({coin.symbol.toUpperCase()})</h1>
                            </div>
                        </div>

                        <div className="price">
                            <h1>{dollarUS.format(coinPrice.usd)}</h1>
                        </div>
                    </div>
                    
                    <div className="flex space-around">
                        <div className="info-block">
                            <h2 className="left">Supply Statistics</h2>
                            <table className="table table-dark">
                                <tbody>
                                    <tr>
                                        <td className="left table-space">Circulating Supply:</td>
                                        <td>{numberUS.format(coinMarketData.circulating_supply)}</td>
                                    </tr>
                                    <tr>
                                        <td className="left table-space">Total Supply:</td>
                                        <td>{numberUS.format(coinMarketData.total_supply)}</td>
                                    </tr>
                                    <tr>
                                        <td className="left table-space">Max Supply:</td>
                                        <td>{numberUS.format(coinMarketData.max_supply)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <div className="info-block">
                            <h2 className="left">Price Information</h2>
                            <table className="table table-dark">
                                <tbody>
                                    <tr>
                                        <td className="left table-space">Price Change (24hr):</td>
                                        <td className={dailyChange(coinMarketData.price_change_percentage_24h)}>{coinMarketData.price_change_percentage_24h.toFixed(2)}%</td>
                                    </tr>
                                    <tr>
                                        <td className="left table-space">24hr Low/High:</td>
                                        <td>{dollarUS.format(coin24L.usd)} - {dollarUS.format(coin24H.usd)}</td>
                                    </tr>
                                    <tr>
                                        <td className="left table-space">All Time High</td>
                                        <td>{dollarUS.format(coinATH.usd)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        

                    </div>
                    <h2>Description</h2>
                    <p>{coinDesc.en}</p>
                    
                </div>
                }
            </div>
            <div className="flex white">
                <div className="coin-details">
                    <h2>Comments</h2>
                    <div>
                    <div className="white">
                        <table className="table">
                            <thead>
                                <tr className="white">
                                    <th className="largeText">Commenter Name:</th>
                                    <th className="largeText">Comment:</th>
                                    <th className="largeText">Available Actions:</th>
                                </tr>
                            </thead>

                            {/* Beginning the dynamic population of the table using the data from the API */}
                            <tbody>
                                {
                                    comments.map((comment, index)=>{
                                    return <tr className="white" key={index}>
                                        <td className=''> {comment.name}</td>
                                        <td className=''> {comment.comment}</td>

                                        <td>
                                            <button className="btn btn-secondary">
                                                Details
                                            </button>

                                            <button className="btn btn-warning">
                                                Edit
                                            </button>
                                        </td>

                                        </tr>                       
                                    })
                                }
                            </tbody>

                        </table>
                    </div>
                    </div>


                    <form className="form" onSubmit={onSubmitHandler}>
                        <p>
                            <label>Name:</label><br/>
                            <input className="form-control" type="text" onChange = {(e)=>setName(e.target.value)}/>
                            {errors.name ? <p className="text-danger">{errors.name.message}</p> : null}
                        </p>

                        <p>
                            <label>Comment:</label><br/>
                            <input className="form-control" type="text" onChange = {(e)=>setComment(e.target.value)}/>
                            {errors.name ? <p className="text-danger">{errors.comment.message}</p> : null}
                        </p>

                        <p>
                            <input type="hidden" value={id}></input>
                        </p>

                        <input className="btn btn-primary btn-wide" type="submit" value="Submit"/>
                    </form>
                </div>
            </div>
            
        </div>
    )
}

export default CoinDetail;