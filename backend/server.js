const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;


app.use(cors());
app.use(bodyParser.json());

const dbPool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'fogado',
  port: 3307,
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get("/hettorpe", (req, res) => { 
    const sql = "SELECT szobak.sznev, szobak.agy FROM szobak";
    dbPool.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    })
  });

  app.get("/szobak", (req, res) => { 
    const sql = "SELECT szobak.sznev FROM szobak";
    dbPool.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    })
  });
  
  app.get("/kihasznaltsag", (req, res) => { 
    const sql = "SELECT szobak.sznev, foglalasok.vendeg, DATEDIFF(foglalasok.tav, foglalasok.erk) AS vendegejszakak FROM szobak INNER JOIN foglalasok ON szobak.szazon = foglalasok.fsorsz ORDER BY szobak.sznev"; 
    dbPool.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    })
  });
  
  app.get("/foglaltsag", (req, res) => { 
    const sql = "SELECT vendegek.vnev, foglalasok.erk, foglalasok.tav FROM vendegek INNER JOIN foglalasok ON vendegek.vsorsz = foglalasok.fsorsz ORDER BY vendegek.vnev";
    dbPool.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    })
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});