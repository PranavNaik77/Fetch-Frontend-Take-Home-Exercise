import { COMMON_ARG, FETCH_API } from "../constants";

export const checkLogin = async () => {
    return fetch(FETCH_API, COMMON_ARG)
    .then(response => {
        if (response.status !== 401) {
            return response;
        } else {
            throw new Error("Logged Out");
        }
    }).catch(e => {
        throw e;
    });
}

export const login = async (username, email) => {
    const payload = {
        name: username,
        email: email
    }
    return fetch(FETCH_API + '/auth/login', {
        ...COMMON_ARG,
        method: 'POST',
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
    }).catch(e => {
        throw e;
    });
};

export const logout = async () => {
    return fetch(FETCH_API + '/auth/logout', {
        ...COMMON_ARG,
        method: 'POST'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
    }).catch(e => {
        throw e;
    });
};