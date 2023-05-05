import React, { useState, useRef, useEffect, useContext } from "react";
import {
    Container,
    Grid,
    Paper,
    Typography,
    Switch,
    FormControlLabel,
    Box,
    Alert,
    Select,
    MenuItem,
} from "@mui/material";
import TopNavigation from "../Layout/TopNavigation";
import AuthContext from "../../Store/AuthManager";
function Packages() {
    const authCtx = useContext(AuthContext);

    const logOutHandler = () => {
        authCtx.logout();
    }
    return (
        <Container maxWidth="xl" sx={{ pt: 9, height: "100%" }}>
            <TopNavigation />
            <>Home
                <button onClick={logOutHandler}>Log out</button></>
        </Container>

    )
}
export default Packages;