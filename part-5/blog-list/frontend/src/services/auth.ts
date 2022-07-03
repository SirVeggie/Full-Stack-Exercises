import axios from 'axios';

export async function login(username: string, password: string) {
    const res = await axios.post('api/login', { username, password });
    const token = res.data.token;
    
    if (token) {
        console.log(`Logged in as ${username}`);
    }
    
    return { username, token };
}