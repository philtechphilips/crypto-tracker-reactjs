import { Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Carousel from './Carousel';
const useStyles = makeStyles(() => ({
    banner:{
        backgroundImage: "url(./banner2.jpg)",
    },
    bannerContainer: {
        height: 400,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around",
    },
    tagline: {
        display: "flex",
        height: "40%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
    }
}))
const Banner = () => {
    const classes = useStyles();
  return (
    <div className={classes.banner}>
        <Container className={classes.bannerContainer}>
            <div className={classes.tagline}>
                <Typography
                variant='h2'
                style={{ 
                    fontWeight: "bold",
                    marginBottom: 15,
                    fontFamily: "Jost",
                 }}
                >
                    Crypto Tracker
                </Typography>
                <Typography
                variant='subtitle2'
                style={{ 
                    color: "darkgrey",
                    textTransform: "capitalize",
                    fontFamily: "Jost",
                 }}
                >
                    We give you all info regarding your favourite Crpto Currency
                </Typography>
            </div>
            <Carousel />
        </Container>
    </div>
  )
}

export default Banner