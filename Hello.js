export default function Hello(app) {
app.get('/hello', (_req, res) => {res.send('Life is good!')})
app.get('/', (req, res) => {
    res.send('Welcome to Full Stack Development!')})
}