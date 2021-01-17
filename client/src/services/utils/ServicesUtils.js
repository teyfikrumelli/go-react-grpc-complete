export function getHostName() {
    return process.env.REACT_APP_BASE_PATH
        ? process.env.REACT_APP_BASE_PATH
        : 'http://0.0.0.0:9000';
}