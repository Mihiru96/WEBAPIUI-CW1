import ResponseDto from "../Components/Dtos/ResponseDto";

export const getAllFlights = async (token) => {
    let headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
    const options = {
        method: "GET",
        mode: "cors",
        headers: headers
    };

    return fetch(`${process.env.REACT_APP_WEB_API}/flight/getAllFlights`, options)
        .then((res) => {
            console.log(res)
            if (res.status === 200) {
                return res.json().then((data) => {
                    console.log(data)
                    let response = new ResponseDto(null, res.status, null, data.flights, null);
                    return response;
                });
            } else {
                return res.json().then((data) => {
                    console.log(data)
                    let response = new ResponseDto(null, res.status, data.message, null);
                    return response;
                });
            }
        })
        .catch((err) => console.log(err));
};

export const updateFlight = async (flight, token) => {
    let headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
    const options = {
        method: "PUT",
        mode: "cors",
        headers: headers,
        body: JSON.stringify(flight),
    };

    return fetch(`${process.env.REACT_APP_WEB_API}/flight/updateFlight`, options)
        .then((res) => {
            console.log(res)
            if (res.status === 200) {
                return res.json().then((data) => {
                    console.log(data)
                    let response = new ResponseDto(null, res.status, data.message, null, null);
                    return response;
                });
            } else {
                return res.json().then((data) => {
                    console.log(data)
                    let response = new ResponseDto(null, res.status, data.message, null);
                    return response;
                });
            }
        })
        .catch((err) => console.log(err));
};

export const addFlight = async (flight, token) => {
    let headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
    const options = {
        method: "POST",
        mode: "cors",
        headers: headers,
        body: JSON.stringify(flight),
    };

    return fetch(`${process.env.REACT_APP_WEB_API}/flight/addFlight`, options)
        .then((res) => {
            console.log(res)
            if (res.status === 200) {
                return res.json().then((data) => {
                    console.log(data)
                    let response = new ResponseDto(null, res.status, data.message, null, null);
                    return response;
                });
            } else {
                return res.json().then((data) => {
                    console.log(data)
                    let response = new ResponseDto(null, res.status, data.message, null);
                    return response;
                });
            }
        })
        .catch((err) => console.log(err));
};

export const deleteFlight = async (flight, token) => {
    let headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
    const options = {
        method: "DELETE",
        mode: "cors",
        headers: headers,
        body: JSON.stringify(flight),
    };

    return fetch(`${process.env.REACT_APP_WEB_API}/flight/deleteFlight`, options)
        .then((res) => {
            console.log(res)
            if (res.status === 200) {
                return res.json().then((data) => {
                    console.log(data)
                    let response = new ResponseDto(null, res.status, data.message, null, null);
                    return response;
                });
            } else {
                return res.json().then((data) => {
                    console.log(data)
                    let response = new ResponseDto(null, res.status, data.message, null);
                    return response;
                });
            }
        })
        .catch((err) => console.log(err));
};

export const searchAllFlights = async (flight, token) => {
    let headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
    const options = {
        method: "POST",
        mode: "cors",
        headers: headers,
        body: JSON.stringify(flight),
    };

    return fetch(`${process.env.REACT_APP_WEB_API}/flight/searchFlights`, options)
        .then((res) => {
            console.log(res)
            if (res.status === 200) {
                return res.json().then((data) => {
                    console.log(data)
                    let response = new ResponseDto(null, res.status, null, data.flights, null);
                    return response;
                });
            } else {
                return res.json().then((data) => {
                    console.log(data)
                    let response = new ResponseDto(null, res.status, data.message, null);
                    return response;
                });
            }
        })
        .catch((err) => console.log(err));
};