import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { NavLink, useNavigate } from "react-router-dom";
import LogoImg from "../../Assets/Images/logo-colored.png";
import AuthContext from "../../Store/AuthManager";

const pages = [
    { name: "Flights", link: "/flights", role: "Backoffice Staff" },
    { name: "Hotels", link: "/hotels", role: "Backoffice Staff" },
    { name: "Holiday Packages", link: "/packages", role: "Backoffice Staff" },
    { name: "Book Flight", link: "/bookflight", role: "Travel Agent" },
    { name: "Book Package", link: "/bookPackage", role: "Travel Agent" },
];

const TopNavigation = () => {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    const openUserMenuHandler = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const closeUserMenuHandler = () => {
        setAnchorElUser(null);
    };

    const logoutHandler = () => {
        authCtx.logout();
        setAnchorElUser(null);
        //navigate("/Login", { replace: true });
    };

    const noneLink = {
        textDecoration: "none",
        color: "#000"
    };

    const navLinkStyle = {
        color: "#000",
        textDecoration: "none",
        textTransform: "uppercase",
        display: "inline-block",
        padding: "24px 30px 25px",
        fontSize: "14px",
    };

    const navLinkSelectedStyle = {
        color: "#000",
        /* textDecoration: "underline", */
        textDecoration: "none",
        textTransform: "uppercase",
        display: "inline-block",
        padding: "24px 30px 25px",
        backgroundColor: "#bab5b6",
        fontSize: "14px",
    };

    const rolePages = pages.filter(user => user.role === authCtx.role)

    //styles
    const styles = {
        topNavImg: {
            paddingTop: "15px",
            paddingBottom: "15px",
        },
    };

    return (
        <AppBar position="fixed" style={{ backgroundColor: "#ffffff" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ minHeight: "56px !important" }}>
                    <img src={LogoImg} style={styles.topNavImg} />

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "flex" },
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {pages.map((page) => (
                            <NavLink
                                key={page.name}
                                to={page.link}
                                style={({ isActive }) =>
                                    isActive ? navLinkSelectedStyle : navLinkStyle
                                }
                            >
                                {page.name}
                            </NavLink>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton onClick={openUserMenuHandler} sx={{ p: 0 }}>
                            <Avatar src="/broken-image.jpg" />
                        </IconButton>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={closeUserMenuHandler}
                        >
                            <MenuItem onClick={logoutHandler}>
                                <Typography textAlign="center">Log out</Typography>
                            </MenuItem>
                        </Menu>
                        {/* </Tooltip> */}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default TopNavigation;
