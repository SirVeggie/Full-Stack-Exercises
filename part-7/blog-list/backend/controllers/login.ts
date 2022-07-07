import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Router } from 'express';
import { User } from '../models/user';

export const loginRouter = Router();

loginRouter.post('/', async (req, res) => {
    const { username, password } = req.body;
    
    const user = await User.findOne({ username });
    if (user === null || !await bcrypt.compare(password, user.passHash))
        return res.status(401).json({ error: 'invalid username or password' });
    
    const tokenUser = {
        username: user.username,
        id: user.id
    }
    
    const token = jwt.sign(tokenUser, process.env.JWT_SECRET ?? '', { expiresIn: '1h' });
    res.json({ token, username: user.username, name: user.name });
});