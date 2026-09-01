
const express = require('express');
const helmet = require('helmet'); // Importar Helmet
const app = express();
const port = 3000;

app.use(helmet()); // Usar Helmet para aplicar cabeceras de seguridad, incluyendo X-XSS-Protection

app.get('/', (req, res) => {
  const userInput = req.query.input || 'No se proporcionó entrada';
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Demostración de Vulnerabilidad XSS</title>
      <style>
        body {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          background-color: #f0f2f5;
          color: #1c1e21;
          margin: 20px;
          line-height: 1.6;
        }
        h1 {
          color: #1877f2;
        }
        .container {
          background-color: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
          max-width: 600px;
          margin: 20px auto;
        }
        form {
          margin-top: 20px;
          display: flex;
          gap: 10px;
        }
        input[type="text"] {
          flex-grow: 1;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
        }
        button[type="submit"] {
          background-color: #1877f2;
          color: white;
          padding: 10px 15px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          font-weight: bold;
        }
        button[type="submit"]:hover {
          background-color: #166fe5;
        }
        .example-text {
          margin-top: 20px;
          padding: 10px;
          background-color: #e7f3ff;
          border-left: 5px solid #1877f2;
          border-radius: 4px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Demostración de Vulnerabilidad XSS</h1>
        <p>Tu entrada: ${userInput}</p>
        <form>
          <input type="text" name="input" placeholder="Introduce algo...">
          <button type="submit">Enviar</button>
        </form>
        <p class="example-text">Intenta introducir: <code>&lt;script&gt;alert('¡XSS!')&lt;/script&gt;</code></p>
      </div>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Servidor XSS ejecutándose en http://localhost:${port}`);
});
