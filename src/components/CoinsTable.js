import React, { useEffect } from 'react'
import { useState } from 'react'
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { Container, createTheme, LinearProgress, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';
export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
const CoinsTable = () => {
    const [coin, setCoin] = useState([])
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("")
    const {currency, symbol} = CryptoState();
    const [page, setPage] = useState(1);
    const history = useHistory();
    const fetchCoins = async () => {
        setLoading(true);
        const {data} = await axios.get(CoinList(currency));
        setCoin(data);
        setLoading(false);

    }


    useEffect(() => {
      fetchCoins();
    }, [currency])


    const handleSearch = () => {
        return coin.filter(
          (coins) =>
            coins.name.toLowerCase().includes(search) ||
            coins.symbol.toLowerCase().includes(search)
        );
      };
      const useStyles = makeStyles({
        row: {
          backgroundColor: "#16171a",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#131111",
          },
          fontFamily: "Montserrat",
        },
        pagination: {
          "& .MuiPaginationItem-root": {
            color: "gold",
          },
        },
      });
      const classes = useStyles();

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
        <Container style={{ textAlign: "center" }}>
            <Typography variant='h5' style={{ margin: 18 }}>
                CryptoCurrency Prices by Market Cap
            </Typography>
            <TextField label='Search For a Crypto Currency..'
             variant='outlined'
              style={{ marginBottom: 20, width:"100%" }}
              onChange={(e) => setSearch(e.target.value)}
              ></TextField>
              <TableContainer>
               { 
               loading ? (
                    <LinearProgress style={{ backgroundColor: "gold" }}></LinearProgress>
                ): <Table>
                    <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                        <TableRow>
                        {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {handleSearch().slice((page - 1) * 20, (page - 1) * 20 + 20).map(row => {
                              let profit = coin.price_change_percentage_24h > 0;
                              return (
                     <TableRow
                        onClick={() => history.push(`/coins/${row.id}`)}
                        className={classes.row}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                              )
                        })}
                    </TableBody>
                </Table>
            }
              </TableContainer>
              <Pagination count={(handleSearch()?.length / 20).toFixed(0)}
               style={{
                padding: 20,
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
              classes={{ ul: classes.pagination }}
              onChange={(_, value) => {
                setPage(value);
                window.scroll(0, 450);
              }}
              >

              </Pagination>
        </Container>
    </ThemeProvider>
  )
}

export default CoinsTable