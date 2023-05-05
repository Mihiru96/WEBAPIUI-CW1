import ResponseDto from "../Components/Dtos/ResponseDto";

export const getAllPackages = async (token) => {
    let headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
    const options = {
        method: "GET",
        mode: "cors",
        headers: headers
    };

    return fetch(`${process.env.REACT_APP_WEB_API}/package/getAllPackage`, options)
        .then((res) => {
            console.log(res)
            if (res.status === 200) {
                return res.json().then((data) => {
                    console.log(data)
                    let response = new ResponseDto(null, res.status, null, data.packages, null);
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

export const updatePackage = async (packages,token) => {
    let headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
    const options = {
        method: "PUT",
        mode: "cors",
        headers: headers,
        body: JSON.stringify(packages),
    };

    return fetch(`${process.env.REACT_APP_WEB_API}/package/updatePackage`, options)
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

export const addPackage = async (packages,token) => {
    let headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
    const options = {
        method: "POST",
        mode: "cors",
        headers: headers,
        body: JSON.stringify(packages),
    };

    return fetch(`${process.env.REACT_APP_WEB_API}/package/addPackage`, options)
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

export const deletepackage = async (packages,token) => {
    let headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
    const options = {
        method: "DELETE",
        mode: "cors",
        headers: headers,
        body: JSON.stringify(packages),
    };

    return fetch(`${process.env.REACT_APP_WEB_API}/package/deletePackage`, options)
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

export const searchAllPackage = async (packages, token) => {
    let headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
    const options = {
        method: "POST",
        mode: "cors",
        headers: headers,
        body: JSON.stringify(packages),
    };

    return fetch(`${process.env.REACT_APP_WEB_API}/packages/searchHolidayPackages`, options)
        .then((res) => {
            console.log(res)
            if (res.status === 200) {
                return res.json().then((data) => {
                    console.log(data)
                    let response = new ResponseDto(null, res.status, null, data.packages, null);
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