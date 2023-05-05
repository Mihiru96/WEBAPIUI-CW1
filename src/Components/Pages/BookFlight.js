import { Filter, Search } from '@mui/icons-material';
import { Typography, Grid, FormControl, InputLabel, Select, MenuItem, Button, Card, Paper, CardActionArea, CardMedia, CardContent, CardActions, TextField } from '@mui/material';
import { Container } from '@mui/system';
import { DatePicker, DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { enqueueSnackbar } from 'notistack';
import React, { useContext, useEffect, useState } from 'react'
import { getAllFlights, searchAllFlights } from "../../Apis/Flight.api";
import { MsgError, Success } from '../../Common/Constant';
import AuthContext from '../../Store/AuthManager';
import FullPageSpinner from '../Layout/FullPageSpinner';
import TopNavigation from '../Layout/TopNavigation';
import FlightImg from "../../Assets/Images/emirates.png";

const styles = {
    form: {
        backgroundColor: "#08ee65",
        color: "white",
        textAlign: "center",
        fontSize: "10px",
    },
};

export default function BookFlight() {
    const [isLoading, setIsLoading] = useState(true);
    const [flightData, setFlightData] = useState([]);
    const [flightSearchData, setFlightSearchData] = useState([]);
    const [departure, setDeparture] = useState('');
    const [arrival, setArrival] = useState('');
    const [departureDate, setDepartureDate] = useState(dayjs(new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + (new Date().getDate())));
    const [arrivalDate, setArrivalDate] = useState(dayjs(new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + (new Date().getDate() + 1)));
    const [bussClass, setBussClass] = useState('');
    const [airline, setAirline] = useState('');
    const [airlineFilter, setAirlineFilter] = useState('');
    const [price, setPrice] = useState('');
    const [duration, setDuration] = useState('');
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        getAllFlights(authCtx.token)
            .then((result) => {
                setIsLoading(false);
                if (result.status === 200) {
                    setFlightData(result.data);
                    console.log(result.data)
                }
                else {
                }
            })
            .catch((err) => {
                setIsLoading(false);
                enqueueSnackbar(MsgError, {
                    variant: Error,
                });
            });

    }, []);

    const onChangeDeparture = (event, child) => {
        setDeparture(event.target.value);
    };

    const onChangeArrival = (event, child) => {
        setArrival(event.target.value);
    };

    const OnDepartDateChange = (date) => {
        setDepartureDate(new Date(new Date(date).toISOString()));
    }

    const OnArrvDateChange = (date) => {
        setArrivalDate(new Date(new Date(date).toISOString()));
    }

    const onChangeBussClass = (event, child) => {
        setBussClass(event.target.value);
    };

    const onChangeAirline = (event, child) => {
        setAirline(event.target.value);
    };

    const onChangeAirlineFilter = (event, child) => {
        setAirlineFilter(event.target.value);
    };

    const searchFlights = () => {
        let flightSearchObject = {
            departureDestination: departure,
            arrivalDestination: arrival,
            depatureDate: departureDate,
            arrivalDate: arrivalDate
        }
        console.log(flightSearchObject)
        searchAllFlights(flightSearchObject, authCtx.token)
            .then((result) => {
                setIsLoading(false);
                if (result.status === 200) {
                    setFlightSearchData(result.data)
                } else {
                    enqueueSnackbar(result.message, {
                        variant: Error,
                    });
                }
            })
            .catch((err) => {
                setIsLoading(false);
                enqueueSnackbar(MsgError, {
                    variant: Error,
                });
            });
    }

    const uniqueDepDestinations = [...new Map(flightData.map(item => [item['departureDestination'], item])).values()];
    const uniqueArrivalDestinations = [...new Map(flightData.map(item => [item['arrivalDestination'], item])).values()];
    const uniqueAirlines = [...new Map(flightData.map(item => [item['airline'], item])).values()];

    return (
        <>
            {isLoading && <FullPageSpinner />}
            <Container maxWidth={"xl"} sx={{ pt: 9, height: "90%", pb: "75px" }}>
                <TopNavigation />
                <Grid item xs={12} sx={{ pt: 10, display: "flex" }}>
                    <Typography
                        variant=""
                        component=""
                        sx={{ color: "#B0B0B0", fontSize: "20px", fontWeight: "bold" }}
                    >
                        Search Flight
                    </Typography>
                </Grid>
                <Grid container direction={"row"} xl={12} lg={12} md={12} sm={3} spacing={1} paddingTop={2} paddingBottom={2} >
                    <Grid item xl={3} lg={3} md={3} sm={3}>
                        <FormControl sx={{ width: "100%" }}>
                            <InputLabel id="demo-simple-select-label">Departure Destination</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={departure}
                                onChange={onChangeDeparture}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {
                                    uniqueDepDestinations.map((flightDep) => (
                                        <MenuItem key={flightDep.id} value={flightDep.departureDestination}>{flightDep.departureDestination}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xl={3} lg={3} md={3} sm={3}>
                        <FormControl sx={{ width: "100%" }}>
                            <InputLabel id="demo-simple-select-label">Arrival Destination</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={arrival}
                                onChange={onChangeArrival}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {
                                    uniqueArrivalDestinations.map((flightDep) => (
                                        <MenuItem key={flightDep.id} value={flightDep.arrivalDestination}>{flightDep.arrivalDestination}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xl={3} lg={3} md={3} sm={3}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                value={departureDate}
                                onChange={(newValue) => {
                                    OnDepartDateChange(newValue);
                                }}
                                slotProps={{
                                    textField: {
                                        helperText: ""

                                    },
                                }}
                                label="Departure Date"
                                sx={{ width: "370px" }}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xl={3} lg={3} md={3} sm={3}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                value={arrivalDate}
                                onChange={(newValue) => {
                                    OnArrvDateChange(newValue);
                                }}
                                slotProps={{
                                    textField: {
                                        helperText: ""

                                    },
                                }}
                                label="Arrival Date"
                                sx={{ width: "370px" }}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xl={3} lg={3} md={3} sm={3}>
                        <FormControl sx={{ width: "100%" }}>
                            <InputLabel id="demo-simple-select-label">Business Class</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={bussClass}
                                onChange={onChangeBussClass}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem value="EconomyClass"><em>Economy Class</em></MenuItem>
                                <MenuItem value="BusinessClass"><em>Business Class</em></MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xl={3} lg={3} md={3} sm={3}>
                        <FormControl sx={{ width: "100%" }}>
                            <InputLabel id="demo-simple-select-label">Airlines</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={airline}
                                onChange={onChangeAirline}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {
                                    uniqueAirlines.map((flightDep) => (
                                        <MenuItem key={flightDep.id} value={flightDep.airline}>{flightDep.airline}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xl={2} lg={2} md={2} sm={2} margin={2}>
                        <Button
                            variant="contained"
                            startIcon={<Search />}
                            sx={{ backgroundColor: "green" }}
                            onClick={searchFlights}
                        >
                            Search
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ pt: 5, pb: 3, display: "flex" }}>
                    <Typography
                        variant=""
                        component=""
                        sx={{ color: "#B0B0B0", fontSize: "20px", fontWeight: "bold" }}
                    >
                        Flight Results
                    </Typography>
                </Grid>
                <Grid container direction={"row"} xl={12} lg={12} md={12} sm={3} spacing={1} >
                    <Grid item xl={3} lg={4} md={3} sm={3}>
                        <TextField
                            label="Price"
                            name="Price"
                            value={price}
                            sx={{ width: '100%' }}
                            onChange={(e) => {
                                setPrice(e.target.value)
                            }}
                        />
                    </Grid>
                    <Grid item xl={3} lg={4} md={3} sm={3}>
                        <TextField
                            label="Duration"
                            name="Duration"
                            value={duration}
                            sx={{ width: '100%' }}
                            onChange={(e) => {
                                setDuration(e.target.value)
                            }}
                        />
                    </Grid>
                    <Grid item xl={3} lg={3} md={3} sm={3}>
                        <FormControl sx={{ width: "100%" }}>
                            <InputLabel id="demo-simple-select-label">Airlines</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={airlineFilter}
                                onChange={onChangeAirlineFilter}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {
                                    uniqueAirlines.map((flightDep) => (
                                        <MenuItem key={flightDep.id} value={flightDep.airline}>{flightDep.airline}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xl={2} lg={2} md={2} sm={2} margin={2}>
                        <Button
                            variant="contained"
                            startIcon={<Filter />}
                            sx={{ backgroundColor: "green" }}
                        >
                            Filter
                        </Button>
                    </Grid>
                    {
                        flightSearchData.map(flight =>
                            <Grid item xl={4} lg={4} md={3} sm={3}>
                                <Card>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={FlightImg}
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {flight.flightNo}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <b>Departure Destination</b> : {flight.departureDestination}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <b>Arrival Destination</b> : {flight.arrivalDestination}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <b>Departure Date</b> : {flight.depatureDate}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <b>Arrival Date</b> : {flight.arrivalDate}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="small" color="primary">
                                            Add to cart
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    }
                </Grid>
            </Container>

        </>
    )
}
