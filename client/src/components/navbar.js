import React, {useEffect, useState} from 'react'
import axios from 'axios';

const Navbar = () => {


    return (
        <div>
            <div className="navbar">
                <div className="navbar-left">
                    <img src="https://pngimg.com/uploads/infinity_symbol/infinity_symblo_PNG12.png" width="100"></img>
                    <h1>Scrogg<span className="orange">Swap</span></h1>
                </div>
                <div className="navbar-right">
                    <a className="navbar-link" href="/coins">Coins</a>
                    <a className="navbar-link" href="/calculator">Calculator</a>
                </div>
            </div>

            
        </div>
    )
}

export default Navbar;