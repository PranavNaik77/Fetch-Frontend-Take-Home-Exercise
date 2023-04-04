import { COMMON_ARG, FETCH_API } from "../constants";

export const getDogIds = async (search) => {
    return fetch(FETCH_API + search, COMMON_ARG)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw response;
    }).catch(e => {
        throw e;
    });
};

export const getDogData = async (dogIds) => {
    return fetch(FETCH_API + '/dogs', {
        ...COMMON_ARG,
        method: 'POST',
        body: JSON.stringify(dogIds)
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw response;
    }).catch(e => {
        throw e;
    });
}

export const getBreeds = async () => {
    return fetch(FETCH_API+'/dogs/breeds', COMMON_ARG)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw response;
    }).catch(e => {
        throw e;
    });
}
export const getMatch = async (dogIds) => {
    return fetch(FETCH_API+'/dogs/match', {
        ...COMMON_ARG,
        method: 'POST',
        body: JSON.stringify(dogIds)
    }).then(response => {
        if(response.ok){
            return response.json();
        }
        throw response;
    }).catch(e => {
        throw e;
    })
}