import React, { useEffect, useState, useContext, useMemo } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import { DataGrid, GridToolbarContainer, GridToolbarExportContainer, GridPrintExportMenuItem, GridCsvExportMenuItem } from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import { useSnackbar } from "notistack";
import FullPageSpinner from "../../Components/Layout/FullPageSpinner";
import { TextField, Grid } from "@mui/material";
import { addFlight, deleteFlight, getAllFlights, updateFlight } from "../../Apis/Flight.api";
import { Error, MsgError, Success } from "../../Common/Constant";
import TopNavigation from "../Layout/TopNavigation";
import AuthContext from '../../Store/AuthManager';
import ConfirmationPopup from "../Layout/ConfirmationPopup";
import AddIcon from '@mui/icons-material/Add';
import HotelEditPopup from "../HotelEditPopup";
import { addHotel, getAllHotels, updateHotel } from "../../Apis/Hotel.api";
import HotelAddPopup from "../HotelAddPopup";
const styles = {
    button: {
        backgroundColor: "#08ee65",
        color: "white",
        textAlign: "center",
        fontSize: "10px",
    },

    buttonDisabled: {
        backgroundColor: "#cfcfcf",
        color: "white",
        textAlign: "center",
        fontSize: "10px",
    },
    viewButton: {
        backgroundColor: "#7D0F14",
        color: "white",
        textAlign: "center",
        fontSize: "10px",
    },
    moreButton: {
        backgroundColor: "#5a5959",
        color: "white",
        textAlign: "center",
        fontSize: "10px",
    },
    convertItem: {
        color: "#B1001D"
    },
    convertededItem: {
        color: "#5a5959"
    }
};

const Hotels = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [refreshGrid, setRefreshgrid] = useState(1);
    const [hotelName, setHotelName] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [gridData, setGridData] = useState([]);
    const [editHotelData, setEditHotelData] = useState();
    const [selectedHotelName, setSelectedHotelName] = useState("");
    const [editPopupOpen, setEditPopupOpen] = useState(false);
    const [deletePopupOpen, setDeletePopupOpen] = useState(false);
    const [addHotelPopupOpen, setAddHotelPopupOpen] = useState(false);
    const authCtx = useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();

    const gridColumns = [
        {
            field: "hotelName",
            width: 300,
            renderHeader: () => (
                <strong>
                    {'Hotel Name'}
                </strong>
            ),
        },
        {
            field: "destination",
            width: 200,
            renderHeader: () => (
                <strong>
                    {'Destination'}
                </strong>
            ),
        },
        {
            field: "starRating",
            width: 200,
            renderHeader: () => (
                <strong>
                    {'Star Rating'}
                </strong>
            ),
        },
        {
            field: "basePrice",
            width: 300,
            renderHeader: () => (
                <strong>
                    {'Starting From (LKR)'}
                </strong>
            ),
        },
        {
            field: "isActive",
            width: 100,
            renderCell: (params) => {
                if (params.row.isActive != true) {
                    return (
                        <Chip
                            label="REJECTED"
                            sx={{
                                backgroundColor: "#F08080",
                                color: "#B22222",
                                fontSize: "10px",
                                borderRadius: "5px !important",
                            }}
                            size="small"
                        />
                    );
                }
                else {
                    return (
                        <Chip
                            label="ACTIVE"
                            sx={{
                                backgroundColor: "#a6f7b5",
                                color: "#0e8100",
                                fontSize: "10px",
                                borderRadius: "5px !important",
                            }}
                            size="small"
                        />
                    );
                }
            },
            renderHeader: () => (
                <strong>
                    {'Status'}
                </strong>
            ),
        },
        {
            field: "edit",
            headerName: "",
            width: 100,
            sortable: false,
            renderCell: (params) => {
                return (<Button
                    sx={{ backgroundColor: "black", color: "white", height: "30px" }}
                    tabIndex={params.hasFocus ? 0 : -1}
                    onClick={() => { editHotelHandler(params) }}
                >
                    EDIT
                </Button>)
            },
        },
        {
            field: "delete",
            headerName: "",
            width: 100,
            sortable: false,
            renderCell: (params) => {
                return (<Button
                    sx={{ backgroundColor: "red", color: "white", height: "30px" }}
                    tabIndex={params.hasFocus ? 0 : -1}
                    onClick={() => { deletePopupHandler(params) }}
                >
                    DELETE
                </Button>)
            },
        }
    ];

    useEffect(() => {
        getAllHotels(authCtx.token)
            .then((result) => {
                setIsLoading(false);
                if (result.status === 200) {
                    setFilteredData(result.data);
                    setGridData(result.data);
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

    }, [refreshGrid])

    useEffect(() => {
        if (hotelName.trim()) {
            const filterHotelDetailTimer = setTimeout(() => {
                if (hotelName.trim()) {
                    const result = gridData.filter((item) =>
                        item.hotelName.toLowerCase().includes(hotelName.toLowerCase())
                    );
                    setFilteredData(result);
                } else {
                    setFilteredData([...gridData]);
                }
            }, 250);

            return () => {
                clearTimeout(filterHotelDetailTimer);
            };
        }
        else {
            setFilteredData([...gridData])
        }

    }, [hotelName]);

    const filterChangeHandler = (e) => {
        setHotelName(e.target.value);
    };

    const editHotelHandler = (params) => {
        const hotel = gridData.filter((item) =>
            item.hotelName === params.row.hotelName);

        setEditHotelData(hotel);
        setEditPopupOpen(true);
    }

    const deletePopupHandler = (params) => {
        setSelectedHotelName(params.row.hotelName);
        setDeletePopupOpen(true);
    }

    const onHotelEdit = (hotelData) => {
        setEditPopupOpen(false);
        setIsLoading(true);
        updateHotel(hotelData, authCtx.token)
            .then((result) => {
                setIsLoading(false);
                if (result.status === 200) {
                    setRefreshgrid(refreshGrid + 1)
                    enqueueSnackbar(result.message, {
                        variant: Success,
                    });
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

    const onHotelAdd = (hotelData) => {
        setAddHotelPopupOpen(false);
        setIsLoading(true);
        addHotel(hotelData, authCtx.token)
            .then((result) => {
                setIsLoading(false);
                if (result.status === 200) {
                    setRefreshgrid(refreshGrid + 1)
                    enqueueSnackbar(result.message, {
                        variant: Success,
                    });
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

    const deleteFlightHandler = () => {
        setDeletePopupOpen(false);
        setIsLoading(true);
        let hotelObject = {
            'hotelName': selectedHotelName
        };
        deleteFlight(hotelObject, authCtx.token)
            .then((result) => {
                setIsLoading(false);
                if (result.status === 200) {
                    setRefreshgrid(refreshGrid + 1)
                    enqueueSnackbar(result.message, {
                        variant: Success,
                    });
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

    const addHotelPopupOpenHandler = () => {
        setAddHotelPopupOpen(true);
    }

    return (
        <>
            {isLoading && <FullPageSpinner />}
            <Container maxWidth={"xl"} sx={{ pt: 9, height: "90%", pb: "75px" }}>
                <TopNavigation />
                <Grid item xs={12} lg={12} sx={{ pt: 10, display: "flex" }}>
                    <Grid item xs={8} sx={{ display: "flex", width: "100%" }}>
                        <Grid>
                            <Typography
                                variant=""
                                component=""
                                sx={{ color: "#B0B0B0", fontSize: "20px", fontWeight: "bold" }}
                            >
                                Hotel List
                            </Typography>
                        </Grid>
                        <Grid paddingLeft={3} paddingBottom={2}>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                sx={{ backgroundColor: "green" }}
                                onClick={addHotelPopupOpenHandler}
                            >
                                Add New Hotel
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container direction={"row"} item xs={4} lg={4}>
                        <Grid container direction={"row"} item xs={12} lg={12}>
                            <TextField
                                sx={{ marginBottom: "20px", height: "20px", width: "300px" }}
                                label="Filter by Hotel Name"
                                size="small"
                                variant="outlined"
                                fullWidth={false}
                                onChange={filterChangeHandler}
                                value={hotelName}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <div style={{ display: "flex", height: "500px", paddingTop: "15px" }}>
                    <div style={{ flexGrow: 1 }}>
                        <DataGrid
                            rows={filteredData}
                            columns={gridColumns}
                            getRowId={(row) => row._id}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 10,
                                    },
                                },
                            }}
                            pageSizeOptions={[10, 15]}
                            sx={{ color: "black" }} />
                    </div>
                </div>
            </Container>
            {
                editPopupOpen ? (
                    <HotelEditPopup
                        title="HOTEL EDIT POPUP"
                        data={editHotelData}
                        isOpen={editPopupOpen}
                        onClose={setEditPopupOpen}
                        onEdit={onHotelEdit}
                    />
                ) : (
                    <></>
                )
            }
            {
                addHotelPopupOpen ? (
                    <HotelAddPopup
                        title="HOTEL ADD POPUP"
                        isOpen={addHotelPopupOpen}
                        onClose={setAddHotelPopupOpen}
                        onAdd={onHotelAdd}
                    />
                ) : (
                    <></>
                )
            }
            {deletePopupOpen ? (
                <ConfirmationPopup
                    msg="Are you sure you want to delete hotel?"
                    isOpen={deletePopupOpen}
                    onClose={setDeletePopupOpen}
                    onYes={deleteFlightHandler}
                />
            ) : (
                <></>
            )}
        </>
    );
};
export default Hotels;
