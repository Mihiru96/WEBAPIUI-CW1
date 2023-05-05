import ResponseDto from "../Components/Dtos/ResponseDto";

export const getAllHotels = async (token) => {
    let headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
    const options = {
        method: "GET",
        mode: "cors",
        headers: headers
    };

    return fetch(`${process.env.REACT_APP_WEB_API}/hotel/getAllHotels`, options)
        .then((res) => {
            console.log(res)
            if (res.status === 200) {
                return res.json().then((data) => {
                    console.log(data)
                    let response = new ResponseDto(null, res.status, null, data.hotels, null);
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

export const updateHotel = async (hotel,token) => {
    let headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
    const options = {
        method: "PUT",
        mode: "cors",
        headers: headers,
        body: JSON.stringify(hotel),
    };

    return fetch(`${process.env.REACT_APP_WEB_API}/hotel/updateHotel`, options)
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

export const addHotel = async (hotel,token) => {
    let headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
    const options = {
        method: "POST",
        mode: "cors",
        headers: headers,
        body: JSON.stringify(hotel),
    };

    return fetch(`${process.env.REACT_APP_WEB_API}/hotel/addHotel`, options)
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