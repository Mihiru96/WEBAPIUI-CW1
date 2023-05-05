import { Filter, Search } from '@mui/icons-material';
import { Typography, Grid, FormControl, InputLabel, Select, MenuItem, Button, Card, Paper, CardActionArea, CardMedia, CardContent, CardActions, TextField } from '@mui/material';
import { Container } from '@mui/system';
import { DatePicker, DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { enqueueSnackbar } from 'notistack';
import React, { useContext, useEffect, useState } from 'react'
import { getAllPackages, searchAllHolidayPackage } from "../../Apis/Package.api";
import { MsgError, Success } from '../../Common/Constant';
import AuthContext from '../../Store/AuthManager';
import FullPageSpinner from '../Layout/FullPageSpinner';
import TopNavigation from '../Layout/TopNavigation';

const styles = {
    form: {
        backgroundColor: "#08ee65",
        color: "white",
        textAlign: "center",
        fontSize: "10px",
    },
};

export default function BookPackage() {
    const [isLoading, setIsLoading] = useState(true);
    const [PackageData, setPackageData] = useState([]);
    const [PackageSearchData, setPackageSearchData] = useState([]);
    const [startDate, setstartDate] = useState(dayjs(new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + (new Date().getDate())));
    const [endDate, setendDate] = useState(dayjs(new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + (new Date().getDate() + 1)));
    const [headsPerPackage, setHeadsPerPackage] = useState('');
    const [flightID, setFlightID] = useState('');
    const [packageFilter, setPackageFilter] = useState('');
    const [price, setPrice] = useState('');
    const [hotelID, setHotelID] = useState('');
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        getAllPackages(authCtx.token)
            .then((result) => {
                setIsLoading(false);
                if (result.status === 200) {
                    setPackageData(result.data);
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

    const OnstartDateChange = (date) => {
        setstartDate(new Date(new Date(date).toISOString()));
    }

    const OnendDateChange = (date) => {
        setendDate(new Date(new Date(date).toISOString()));
    }

    const onChangeHeadsPerPackage = (event, child) => {
        setHeadsPerPackage(event.target.value);
    };

    const onChangeFlightID = (event, child) => {
        setFlightID(event.target.value);
    };

    const onChangePackageFilter = (event, child) => {
        setPackageFilter(event.target.value);
    };

    const searchAllPackage = () => {
        let PackageSearchObject = {
            startDate: startDate,
            endDate: endDate,
            headsPerPackage: headsPerPackage,
            flightID: flightID
        }
        console.log(PackageSearchObject)
        searchAllPackage(PackageSearchObject, authCtx.token)
            .then((result) => {
                setIsLoading(false);
                if (result.status === 200) {
                    setPackageSearchData(result.data)
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

    const uniquestartDate = [...new Map(PackageData.map(item => [item['startDate'], item])).values()];
    const uniqueendDate = [...new Map(PackageData.map(item => [item['endDate'], item])).values()];
    const uniqueflightID = [...new Map(PackageData.map(item => [item['FlightID'], item])).values()];

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
                            <InputLabel id="demo-simple-select-label">FlightID</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={flightID}
                                onChange={onChangeFlightID}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {
                                    uniqueflightID.map((FlightID) => (
                                        <MenuItem key={flightID.id} value={flightID.flightID}>{flightID.flightID}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xl={3} lg={3} md={3} sm={3}>
                        <FormControl sx={{ width: "100%" }}>
                            <InputLabel id="demo-simple-select-label">hotel ID</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={hotelID}
                                onChange={onChangehotelID}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {
                                    uniquehotelID.map((hotelID) => (
                                        <MenuItem key={hotelID.id} value={hotelID.hotelID}>{hotelID.hotelID}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xl={3} lg={3} md={3} sm={3}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                value={startDate}
                                onChange={(newValue) => {
                                    OnstartDateChange(newValue);
                                }}
                                slotProps={{
                                    textField: {
                                        helperText: ""

                                    },
                                }}
                                label="start Date"
                                sx={{ width: "370px" }}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xl={3} lg={3} md={3} sm={3}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                value={endDate}
                                onChange={(newValue) => {
                                    OnendDateChange(newValue);
                                }}
                                slotProps={{
                                    textField: {
                                        helperText: ""

                                    },
                                }}
                                label="end Date"
                                sx={{ width: "370px" }}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xl={3} lg={3} md={3} sm={3}>
                        <FormControl sx={{ width: "100%" }}>
                            <InputLabel id="demo-simple-select-label">Heads Per Package</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={headsPerPackage}
                                onChange={onChangeheadsPerPackage}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem value="Less Than 10"><em>Economy Package</em></MenuItem>
                                <MenuItem value="More Than 10"><em>Luxury Package</em></MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xl={3} lg={3} md={3} sm={3}>
                        <FormControl sx={{ width: "100%" }}>
                            <InputLabel id="demo-simple-select-label">Flight Info</InputLabel>
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
                                    uniqueAirlines.map((FlightID) => (
                                        <MenuItem key={flightID.id} value={flightID.airline}>{flightID.airline}</MenuItem>
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
                            onClick={searchAllPackage}
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
                                value={PackageFilter}
                                onChange={onChangePackageFilter}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {
                                    uniqueAirlines.map((flightID) => (
                                        <MenuItem key={flightID.id} value={flightID.airline}>{flightID.airline}</MenuItem>
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
                        PackageSearchData.map(fPackage =>
                            <Grid item xl={4} lg={4} md={3} sm={3}>
                                <Card>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {flightID.flightID}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <b>hotelID</b> : {PackageData.hotelID}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <b>headsPerPackage</b> : {PackageData.headsPerPackage}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <b>start Date</b> : {PackageData.startDate}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <b>end Date</b> : {PackageData.endDate}
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
