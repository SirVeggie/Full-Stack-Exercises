import axios from 'axios';

const baseUrl = '/api/users';

export async function getAllUsers() {
    const request = axios.get(baseUrl);
    const response = await request;
    return response.data;
}
