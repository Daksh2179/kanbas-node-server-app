export default function Hello(app) {
    app.get('/Hello', (req, res) => {
        res.send('Life is good!')
      })
      app.get('/', (req, res) => {
        res.send('Welcome to Full Stack Development!')
      })   
}