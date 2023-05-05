import React, { useState, useEffect, useContext } from "react";
import {
    Box,
    Typography,
    Button,
    Stack,
    Grid,
    Paper,
    List,
    ListItem,
    ListItemText,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Divider,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@mui/material";
import { useSnackbar } from "notistack";
import AuthContext from "../Store/AuthManager";
import TextField from "./UI/TextField";
import Modal from "./UI/Modal";
import FullPageSpinner from "./Layout/FullPageSpinner";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import "./FlightEditPopup.css";

const FlightEditPopup = ({ title, isOpen, onClose, data, onEdit }) => {
    console.log(data[0].arrivalDate)
    const [flightNo, setFlightNo] = useState(data[0].flightNo)
    const [departureDestination, setDepartureDestination] = useState(data[0].departureDestination);
    const [arrivalDestination, setArrivalDestination] = useState(data[0].arrivalDestination);
    const [departureDate, setDepartureDate] = useState("");
    const [arrivalDate, setArrivalDate] = useState("");
    const [airliine, setAirline] = useState(data[0].airline);
    const [transitTime, setTransitTime] = useState(data[0].transitTime);
    const [economyClassPrice, setEconomyClassPrice] = useState(data[0].economyClass.price);
    const [economyAvlTickets, setEconomyAvlTickets] = useState(data[0].economyClass.availableTickets);
    const [businessClassPrice, setBusinessClassPrice] = useState(data[0].businessClass.price);
    const [businessAvlTickets, setBusinessAvlTickets] = useState(data[0].businessClass.availableTickets);
    const [flightIsActive, setFlightIsActive] = useState(data.isActive);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setArrivalDate(dayjs(new Date(data[0].arrivalDate).getFullYear() + "-" + (new Date(data[0].arrivalDate).getMonth() + 1) + "-" + (new Date(data[0].arrivalDate).getDate()) + "T" + (new Date(data[0].arrivalDate).getHours()) + ":" + (new Date(data[0].arrivalDate).getMinutes()) + ":" + (new Date(data[0].arrivalDate).getSeconds()) + "." + (new Date(data[0].arrivalDate).getMilliseconds())));
        setDepartureDate(dayjs(new Date(data[0].depatureDate).getFullYear() + "-" + (new Date(data[0].depatureDate).getMonth() + 1) + "-" + (new Date(data[0].depatureDate).getDate()) + "T" + (new Date(data[0].depatureDate).getHours()) + ":" + (new Date(data[0].depatureDate).getMinutes()) + ":" + (new Date(data[0].depatureDate).getSeconds()) + "." + (new Date(data[0].depatureDate).getMilliseconds())));
    }, []);

    const authCtx = useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();

    const OnDepartDateChange = (date) => {
        setDepartureDate(new Date(new Date(date).toISOString()));
    }

    const OnArrvDateChange = (date) => {
        setArrivalDate(new Date(new Date(date).toISOString()));
    }

    const onUpdateHandler = () => {
        let flightObject = {
            id:data[0]._id,
            flightNo: flightNo,
            departureDestination: departureDestination,
            arrivalDestination: arrivalDestination,
            depatureDate: departureDate,
            arrivalDate: arrivalDate,
            airliine: airliine,
            transitTime: transitTime,
            economyPrice: economyClassPrice,
            economyAvlTickets: economyAvlTickets,
            businessPrice: businessClassPrice,
            businessAvlTickets: businessAvlTickets,
            isActive: flightIsActive
        }

        onEdit(flightObject);
    }
    return (
        <iframe id="printf">
            <Modal
                title={title}
                isOpen={isOpen}
                onClose={onClose}
                button1={"Close"}
                button2={"Edit"}
                hideButton2={false}
                onSave={onUpdateHandler}
            >
                <Box sx={{ height: "500px", width: "800px", p: 1 }}>
                    {isLoading && <FullPageSpinner isSubWrapper={true} />}
                    {!isLoading && <Box>
                        <Paper
                            variant="none"
                            sx={{
                                width: "800px",
                                justifyContent: "center",
                                border: "2px ",
                                borderRadius: "0px",

                            }}
                        >
                            <Grid container direction={"column"} items lg={12} spacing={2} paddingTop={2} paddingLeft={3} paddingBottom={2} >
                                <Grid container direction={"row"} item lg={12} spacing={2}>
                                    <Grid item xs={12} lg={12}>
                                        <TextField
                                            label="Flight No."
                                            name="FlightNo"
                                            value={flightNo}
                                            onChange={(e) => {
                                                setFlightNo(e.target.value)
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container direction={"row"} item lg={12} spacing={2}>
                                    <Grid item xs={12} lg={6}>
                                        <TextField
                                            label="Depart. Destination"
                                            name="DepartureDestination"
                                            value={departureDestination}
                                            onChange={(e) => {
                                                setDepartureDestination(e.target.value)
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <TextField
                                            label="Arrv. Destination"
                                            name="ArrivalDestination"
                                            value={arrivalDestination}
                                            onChange={(e) => {
                                                setArrivalDestination(e.target.value)
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container direction={"row"} item lg={12} spacing={2}>
                                    <Grid item lg={6}>
                                        <Typography variant="subtitle1">Departure Date</Typography>
                                    </Grid>
                                    <Grid item lg={6}>
                                        <Typography variant="subtitle1">Arrival Date</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container direction={"row"} item lg={12} spacing={2}>
                                    <Grid item lg={6}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DateTimePicker
                                                value={departureDate}
                                                onChange={(newValue) => {
                                                    OnDepartDateChange(newValue);
                                                }}
                                                slotProps={{
                                                    textField: {
                                                        helperText: ""

                                                    },
                                                }}
                                                sx={{ width: "370px" }}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item lg={6}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DateTimePicker
                                                value={arrivalDate}
                                                onChange={(newValue) => {
                                                    OnArrvDateChange(newValue);
                                                }}
                                                slotProps={{
                                                    textField: {
                                                        helperText: ""

                                                    },
                                                }}
                                                sx={{ width: "370px" }}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                </Grid>
                                <Grid container direction={"row"} item lg={12} spacing={2}>
                                    <Grid item xs={12} lg={6}>
                                        <TextField
                                            label="Airline"
                                            name="Airline"
                                            value={airliine}
                                            onChange={(e) => {
                                                setAirline(e.target.value)
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <TextField
                                            label="Transit time"
                                            name="TransitTime"
                                            value={transitTime}
                                            onChange={(e) => {
                                                setTransitTime(e.target.value)
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container direction={"row"} item lg={12} spacing={2}>
                                    <Grid item lg={12}>
                                        <Typography variant="subtitle1">Economy Class Tickets</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container direction={"row"} item lg={12} spacing={2}>
                                    <Grid item xs={12} lg={6}>
                                        <TextField
                                            label="Price"
                                            name="Price"
                                            value={economyClassPrice}
                                            onChange={(e) => {
                                                setEconomyClassPrice(e.target.value)
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <TextField
                                            label="Available Tickets"
                                            name="AvailableTickets"
                                            value={economyAvlTickets}
                                            onChange={(e) => {
                                                setEconomyAvlTickets(e.target.value)
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container direction={"row"} item lg={12} spacing={2}>
                                    <Grid item lg={12}>
                                        <Typography variant="subtitle1">Business Class Tickets</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container direction={"row"} item lg={12} spacing={2}>
                                    <Grid item xs={12} lg={6}>
                                        <TextField
                                            label="Price"
                                            name="Price"
                                            value={businessClassPrice}
                                            onChange={(e) => {
                                                setBusinessClassPrice(e.target.value)
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <TextField
                                            label="Available Tickets"
                                            name="AvailableTickets"
                                            value={businessAvlTickets}
                                            onChange={(e) => {
                                                setBusinessAvlTickets(e.target.value)
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>}
                </Box>
            </Modal>
        </iframe>
    );
};

export default FlightEditPopup;
