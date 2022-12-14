import React, {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import axios from 'axios';

// This component will display the detailed information about a specific Coin, along with the Comments associated with it.
// Shows current price, pricing info, supply statistics, and coin description
// Comment section allows a user to leave a comment on a certain coin, and displays other existing comments.

const CoinDetail = (props) => {
    const {id} = useParams();

    const navigate = useNavigate();

    // Storing the various pieces of Coin information from the API calls.
    const [coin, setCoin] = useState({})
    const [coinDesc, setCoinDesc] = useState([])
    const [coinImage, setCoinImage] = useState("")
    const [coinMarketData, setCoinMarketData] = useState([])
    const [coinATH, setCoinATH] = useState([])
    const [coin24L, setCoin24L] = useState([])
    const [coin24H, setCoin24H] = useState([])
    const [coinPrice, setCoinPrice] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    // Storing the Comment information from the API calls.
    const [name, setName] = useState("")
    const [comment, setComment] = useState("")
    const [coinIdentity, setCoinIdentity] = useState("")

    // List cointaining all of the Comments
    const [comments, setComments] = useState([])

    //Will ensure errors get displayed when submission doesn't meet requirements.
    const [errors, setErrors] = useState([]);

    // Formats pricing to look nice
    const dollarUS = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumSignificantDigits: 6,
    });

    // Formatting numbers that aren't pricing
    const numberUS = Intl.NumberFormat("en-US");

    // Function that will return Green or Red depending on whether % change is positive/negative
    const dailyChange = (change) => {
        if (change > 0) {return "green"}
        else {return "red"}
    }

    // Handler when the form is submitted
    const onSubmitHandler = (e) => {
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
                refreshPage();
            })
            .catch((err)=> {
                console.log(err); 
                setErrors(err.response.data.errors);
            });
    }

    // Handler to delete a comment
    const deleteComment = (id) => {
        axios.delete('http://localhost:8000/api/comment/' + id)
            .then(res => {
                refreshPage();
            })
            .catch(err => console.log(err))
    }

    // Refreshes page
    const refreshPage = ()=>{
        window.location.reload();
    }

    // Makes the API call to get the Coin information for the selected coin
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

    // API call to the server to get the comments for the selected coin
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

    // This code will remove the hyperlinks from a text string.
    const parseDesc = (desc) => {
        let string = desc.replace(/(<([^>]+)>)/ig, '');
        return string;
    }


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
                    <p>{parseDesc(coinDesc.en)}</p>
                    
                </div>
                }
            </div>
            <div className="flex white">
                <div className="coin-details">
                    <h2>Comments</h2>
                    <div className="white margin-top">
                        <table className="table table-dark">
                            <thead>
                                <tr className="white">
                                    <th className="">Name:</th>
                                    <th className="">Comment:</th>
                                    <th className="">Commented At:</th>
                                    <th className="">Actions:</th>
                                </tr>
                            </thead>

                            {/* Beginning the dynamic population of the table using the data from the API */}
                            <tbody>
                                {
                                    comments.map((comment, index)=>{
                                    return <tr className="white" key={index}>
                                        <td className=''> {comment.name}</td>
                                        <td className=''> {comment.comment}</td>
                                        <td className=''>{comment.createdAt}</td>
                                        <td>
                                            <button className="btn btn-secondary" onClick={() => navigate(`/comment/edit/${comment._id}`)}>
                                                Edit
                                            </button>
                                            <button className="btn btn-danger" value={comment._id} onClick={() => deleteComment(`${comment._id}`)}>
                                                Delete
                                            </button>
                                        </td>

                                        </tr>                       
                                    })
                                }
                            </tbody>
                        </table>
                    </div>

                    {/* Form to add a new comment for a coin */}
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