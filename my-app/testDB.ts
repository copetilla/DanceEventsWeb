const mongoose = require('mongoose');

// Reemplaza la URI con la URI de tu base de datos MongoDB
const mongoURI = 'mongodb+srv://copetilla:O4iZ145l3wchw9Gp@groove.tflmuz6.mongodb.net/?retryWrites=true&w=majority&appName=Groove' // Cambia esta URI a la de tu base de datos

// Función para conectar a la base de datos
async function connectToDatabase() {
    try {
        // Establecer la conexión
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conexión a la base de datos exitosa');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    } finally {
        // Cerrar la conexión después de probar
        mongoose.connection.close();
    }
}

// Llamar a la función para conectar a la base de datos
connectToDatabase();