export function getUserId() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? user.id : null;
}

export function getAccessToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? user.accessToken : "";
}

export function getRefreshToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? user.refreshToken : "";
}

export function getMetadata() {
    return { 'authorization': getAccessToken() };
}