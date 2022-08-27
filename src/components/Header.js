import React from 'react'
import { AppBar, Container, Toolbar, Typography, Select, MenuItem, createTheme, ThemeProvider  } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useHistory } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';

const useStyles = makeStyles(() => ({
 title: {
    flex: 1,
    color: "gold",
    fontFamily: "Jost",
    fontWeight: "bold",
    cursor: "pointer",

 }
}));



const Header = () => {
    const history = useHistory();
    const classes = useStyles();
    const { currency, setCurrency } = CryptoState();
    const darkTheme = createTheme({
        palette:{
            primary:{
                main: "#fff",
            },
            type: "dark",
        }
    });
    return (
<ThemeProvider theme={darkTheme}>
    <AppBar color='transparent' position='static'>
        <Container>
            <Toolbar>
                <Typography onClick={() => history.push("/")} className={classes.title} variant='h6'>
                    Crypto Tracker
                </Typography>
                <Select variant='outlined' style={{ 
                    width: 100,
                    height: 40,
                    marginRight: 15,
                    fontFamily: "Jost",

                 }}
                 value={currency}
                 onChange={(e) => setCurrency(e.target.value)}
                 >
                    <MenuItem value={ 'NGN'}>NGN</MenuItem>
                    <MenuItem value={ 'USD' }>USD</MenuItem>
                </Select>
            </Toolbar>
        </Container>
    </AppBar>
</ThemeProvider>
  )
}

export default Header