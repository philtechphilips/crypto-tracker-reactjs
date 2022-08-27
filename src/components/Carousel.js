import { makeStyles } from '@material-ui/core'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext';
import { TrendingCoins } from "../config/api"
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
const useStyles = makeStyles((theme) => ({
    carousel: {
        height: "50%",
        display: "flex",
        alignItems: "center",
    },
    carouselItem:{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        textTransform: "uppercase",
        color: "#fff",
    }
}))
const Carousel = () => {
    const [trending, setTrending] = useState([])
    const classes = useStyles();
    const {currency, symbol} = CryptoState()
    const fetchTrendingCoins = async () =>{
        const { data } = await axios.get(TrendingCoins(currency));
        setTrending(data);
    }
    useEffect(() => {
      fetchTrendingCoins();
    }, [currency])
    console.log(trending)

    const responsive = {
        0: {
            items: 2
        },
        512: {
            items: 4
        }
    }
    
    const items = trending.map((coin) => {
        let profit = coin.price_change_percentage_24h >= 0;
        return(
            <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
                <img src={coin.image} height='80' style={{ narginBottom: 10 }}/>
                <span>{coin.symbol}
                &nbsp;
                <span style={{ color: profit > 0 ? "rgb(14, 203, 129)" : "red", fontWeight: 500, fontFamily: "Jost" }}>{profit && "+" }{coin.price_change_percentage_24h.toFixed(2)}%</span>
                </span>
                <span style={{ fontsize: 22, fontweight: 500 }}>
                    { symbol }{numberWithCommas(coin.current_price.toFixed(3))}
                </span>
            </Link>
        )
    })
  return (
    <div className={classes.carousel}>
        <AliceCarousel 
        mouseTracking
        infinite
        autoPlayInterval={1500}
        animationDuration={2000}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
        />
    </div>
  )
}

export default Carousel