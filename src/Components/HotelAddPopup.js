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
    Switch
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

const HotelAddPopup = ({ title, isOpen, onClose, data, onAdd }) => {
    const [hotelName, setHotelName] = useState("")
    const [destination, setDestination] = useState("");
    const [starRating, setStarRating] = useState("");
    const [basePrice, setBasePrice] = useState("");
    const [hasPool, setHasPool] = useState(false);
    const [hasKidsPlayArea, setHasKidsPlayArea] = useState(false);
    const [hasGym, setHasGym] = useState(false);
    const [hasBeachAccess, setHasBeachAccess] = useState(false);
    const [deluxeFullBoardPrice, setDelixeFullBoardPrice] = useState();
    const [deluxeHalfBoardPrice, setDeluxeHalfBoardPrice] = useState();
    const [deluxeBandB, setdeluxeBandB] = useState();
    const [deluxeAvlRooms, setDeluxeAvlRoom] = useState();
    const [superDeluxeFullBoardPrice, setSuperDelixeFullBoardPrice] = useState();
    const [superDeluxeHalfBoardPrice, setSuperDelixeHalfBoardPrice] = useState();
    const [superDeluxeBandB, setSuperDelixeBandB] = useState();
    const [superDeluxeAvlRooms, setSuperDelixeAvlRoom] = useState();
    const [suiteFullBoardPrice, setSuiteFullBoardPrice] = useState();
    const [suiteHalfBoardPrice, setSuiteHalfBoardPrice] = useState();
    const [suiteBandB, setSuiteBandB] = useState();
    const [suiteAvlRooms, setSuiteAvlRoom] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const authCtx = useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();

    const onUpdateHandler = () => {
        let hotelObject = {
            hotelName: hotelName,
            destination: destination,
            starRating: starRating,
            basePrice: basePrice,
            hasPool: hasPool,
            hasKidsPlayArea: hasKidsPlayArea,
            hasGym: hasGym,
            hasBeachAccess: hasBeachAccess,
            deluxeFullboardPrice: deluxeFullBoardPrice,
            deluxeHalfboardPrice: deluxeHalfBoardPrice,
            deluxeBedAndBreakfastPrice: deluxeBandB,
            deluxeAvlRooms: deluxeAvlRooms,
            superDeluxeFullboardPrice: superDeluxeFullBoardPrice,
            superDeluxeHalfboardPrice: superDeluxeHalfBoardPrice,
            superDeluxeBedAndBreakfastPrice: superDeluxeBandB,
            superDeluxeAvlRooms: superDeluxeAvlRooms,
            suiteFullboardPrice: suiteFullBoardPrice,
            suiteHalfboardPrice: suiteHalfBoardPrice,
            suiteBedAndBreakfastPrice: suiteBandB,
            suiteAvlRooms: suiteAvlRooms,

        }

        onAdd(hotelObject);
    }
    return (
        <iframe id="printf">
            <Modal
                title={title}
                isOpen={isOpen}
                onClose={onClose}
                button1={"Close"}
                button2={"Add"}
                hideButton2={false}
                onSave={onUpdateHandler}
            >
                <Box sx={{ height: "550px", width: "800px", p: 1 }}>
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
                                    <Grid item xs={12} lg={6}>
                                        <TextField
                                            label="Hotel Name"
                                            name="HotelName"
                                            value={hotelName}
                                            onChange={(e) => {
                                                setHotelName(e.target.value)
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <TextField
                                            label="Destination"
                                            name="Destination"
                                            value={destination}
                                            onChange={(e) => {
                                                setDestination(e.target.value)
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container direction={"row"} item lg={12} spacing={2}>
                                    <Grid item xs={12} lg={6}>
                                        <TextField
                                            label="Star Rating"
                                            name="StarRating"
                                            value={starRating}
                                            onChange={(e) => {
                                                setStarRating(e.target.value)
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <TextField
                                            label="Base Price (LKR)"
                                            name="BasePrice"
                                            value={basePrice}
                                            onChange={(e) => {
                                                setBasePrice(e.target.value)
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container direction={"row"} item lg={12} spacing={2}>
                                    <Grid item lg={3}>
                                        <Typography variant="subtitle1">Has Pool</Typography>
                                    </Grid>
                                    <Grid item lg={3}>
                                        <Typography variant="subtitle1">Has Gym</Typography>
                                    </Grid>
                                    <Grid item lg={3}>
                                        <Typography variant="subtitle1">Has Kids Play Area</Typography>
                                    </Grid>
                                    <Grid item lg={3}>
                                        <Typography variant="subtitle1">Has Beach Access</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container direction={"row"} item lg={12} spacing={2}>
                                    <Grid item lg={3}>
                                        <Switch sx={{ color: "#B1001D !important" }}
                                            checked={hasPool}
                                            onChange={() => setHasPool((prev) => !prev)}
                                        />
                                    </Grid>
                                    <Grid item lg={3}>
                                        <Switch sx={{ color: "#B1001D !important" }}
                                            checked={hasGym}
                                            onChange={() => setHasGym((prev) => !prev)}
                                        />
                                    </Grid>
                                    <Grid item lg={3}>
                                        <Switch sx={{ color: "#B1001D !important" }}
                                            checked={hasKidsPlayArea}
                                            onChange={() => setHasKidsPlayArea((prev) => !prev)}
                                        />
                                    </Grid>
                                    <Grid item lg={3}>
                                        <Switch sx={{ color: "#B1001D !important" }}
                                            checked={hasBeachAccess}
                                            onChange={() => setHasBeachAccess((prev) => !prev)}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container direction={"row"} item lg={12} spacing={2}>
                                    <Grid item lg={12}>
                                        <Typography variant="subtitle1">Deluxe Rooms</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container direction={"row"} item lg={12} spacing={2}>
                                    <Grid item xs={12} lg={3}>
                                        <TextField
                                            label="Fullboard Price (LKR)"
                                            name="price"
                                            value={deluxeFullBoardPrice}
                                            onChange={(e) => {
                                                setDelixeFullBoardPrice(e.target.value)
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} lg={3}>
                                        <TextField
                                            label="Halfboard Price (LKR)"
                                            name="price"
                                            value={deluxeHalfBoardPrice}
                                            onChange={(e) => {
                                                setDeluxeHalfBoardPrice(e.target.value)
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} lg={3}>
                                        <TextField
                                            label="B&B Price (LKR)"
                                            name="price"
                                            value={deluxeBandB}
                                            onChange={(e) => {
                                                setdeluxeBandB(e.target.value)
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} lg={3}>
                                        <TextField
                                            label="Available Rooms"
                                            name="price"
                                            value={deluxeAvlRooms}
                                            onChange={(e) => {
                                                setDeluxeAvlRoom(e.target.value)
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container direction={"row"} item lg={12} spacing={2}>
                                    <Grid item lg={12}>
                                        <Typography variant="subtitle1">Super Deluxe Rooms</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container direction={"row"} item lg={12} spacing={2}>
                                    <Grid item xs={12} lg={3}>
                                        <TextField
                                            label="Fullboard Price (LKR)"
                                            name="price"
                                            value={superDeluxeFullBoardPrice}
                                            onChange={(e) => {
                                                setSuperDelixeFullBoardPrice(e.target.value)
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} lg={3}>
                                        <TextField
                                            label="Halfboard Price (LKR)"
                                            name="price"
                                            value={superDeluxeHalfBoardPrice}
                                            onChange={(e) => {
                                                setSuperDelixeHalfBoardPrice(e.target.value)
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} lg={3}>
                                        <TextField
                                            label="B&B Price (LKR)"
                                            name="price"
                                            value={superDeluxeBandB}
                                            onChange={(e) => {
                                                setSuperDelixeBandB(e.target.value)
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} lg={3}>
                                        <TextField
                                            label="Available Rooms"
                                            name="price"
                                            value={superDeluxeAvlRooms}
                                            onChange={(e) => {
                                                setSuperDelixeAvlRoom(e.target.value)
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container direction={"row"} item lg={12} spacing={2}>
                                    <Grid item lg={12}>
                                        <Typography variant="subtitle1">Suite Rooms</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container direction={"row"} item lg={12} spacing={2}>
                                    <Grid item xs={12} lg={3}>
                                        <TextField
                                            label="Fullboard Price (LKR)"
                                            name="price"
                                            value={suiteFullBoardPrice}
                                            onChange={(e) => {
                                                setSuiteFullBoardPrice(e.target.value)
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} lg={3}>
                                        <TextField
                                            label="Halfboard Price (LKR)"
                                            name="price"
                                            value={suiteHalfBoardPrice}
                                            onChange={(e) => {
                                                setSuiteHalfBoardPrice(e.target.value)
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} lg={3}>
                                        <TextField
                                            label="B&B Price (LKR)"
                                            name="price"
                                            value={suiteBandB}
                                            onChange={(e) => {
                                                setSuiteBandB(e.target.value)
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} lg={3}>
                                        <TextField
                                            label="Available Rooms"
                                            name="price"
                                            value={suiteAvlRooms}
                                            onChange={(e) => {
                                                setSuiteAvlRoom(e.target.value)
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

export default HotelAddPopup;
