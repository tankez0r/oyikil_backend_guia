import app from './app.js';
const startApp = () => {
    const PORT = 3005 || process.env.PORT;
    app.listen(PORT, () => { console.log('El servidor esta listo para pedir peticiones en el puerto: ' + PORT); });

};

app.get('/', (request, response) => {
    response.send('<h1>Bienvenido a la api de guia telefonica de oyikil</h1>');
});

startApp();
