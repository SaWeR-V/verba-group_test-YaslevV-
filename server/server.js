import express from 'express'
import cors from 'cors'
import { users } from './databases/users.js';



const app = express();
app.use(express.json());
const allowedOrigins = ['http://localhost:5173'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } 
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.post('/auth', async(req, res) => {
    const { login, password } = req.body;

    const user = users.find(user => user.login === login && user.password === password);

    if (!user) {
        return res.status(404).json({error: 'Попытка авторизации неудачна'})
    }
    else {
        return res.status(200).json({
            auth: 'success',
            name: user.login
        })
    }
});


const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
