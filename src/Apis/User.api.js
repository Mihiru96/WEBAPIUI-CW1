import ResponseDto from "../Components/Dtos/ResponseDto";

export const login = async (User) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const options = {
        method: "POST",
        mode: "cors",
        headers: headers,
        body: JSON.stringify(User),
    };

    return fetch(`${process.env.REACT_APP_WEB_API}/user/login`, options)
        .then((res) => {
            console.log(res)
            if (res.status === 200) {
                return res.json().then((data) => {
                    console.log(data)
                    let response = new ResponseDto(null, res.status, data.message, null, data.token);
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

export const forgotPassword = async (User) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const options = {
        method: "POST",
        mode: "cors",
        headers: headers,
        body: JSON.stringify(User),
    };

    return fetch(`${process.env.REACT_APP_WEB_API}/user/forgotPassword`, options)
        .then((res) => {
            console.log(res)
            if (res.status === 200) {
                return res.json().then((data) => {
                    console.log(data)
                    let response = new ResponseDto(null, res.status, data.message, null, data.token);
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

export const resetPassword = async (User) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const options = {
        method: "POST",
        mode: "cors",
        headers: headers,
        body: JSON.stringify(User),
    };

    return fetch(`${process.env.REACT_APP_WEB_API}/user/resetPassword`, options)
        .then((res) => {
            console.log(res)
            if (res.status === 200) {
                return res.json().then((data) => {
                    console.log(data)
                    let response = new ResponseDto(null, res.status, data.message, null, data.token);
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