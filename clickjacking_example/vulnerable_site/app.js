const express = require('express');
const helmet = require('helmet'); // Importar Helmet
const app = express();
const port = 3002; // Puerto para el sitio vulnerable

app.use(helmet.frameguard({ action: 'deny' })); // Previene Clickjacking

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Sitio Vulnerable - Reclama tu Premio</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          background-color: #f0f0f0;
          color: #333;
        }
        .container {
          background-color: #fff;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        h1 {
          color: #28a745;
        }
        p {
          margin-bottom: 20px;
        }
        .prize-button {
          background-color: #28a745; /* Verde */
          color: white;
          padding: 15px 30px;
          font-size: 24px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .prize-button:hover {
          background-color: #218838;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>¡Felicidades! Has ganado un premio.</h1>
        <p>Haz clic en el botón de abajo para reclamar tu premio exclusivo.</p>
        <button class="prize-button" onclick="alert('¡Premio Reclamado! (Simulado)')">Reclamar Premio</button>
      </div>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Sitio Vulnerable ejecutándose en http://localhost:${port}`);
});