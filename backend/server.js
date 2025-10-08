const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());


app.get('/api/vendegek', (req, res) => {
    db.query('SELECT * FROM vendegek', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

app.get('/api/szobak', (req, res) => {
    db.query('SELECT sznev, agyak_szama FROM szobak', (err, results) => {
      if (err) return res.status(500).json({error: err});
      res.json(results);
    });
  });
  
  app.get('/api/kihasznaltsag', (req, res) => {
    const sql = `
      SELECT s.sznev, 
             COUNT(DISTINCT v.vsorsz) AS vendegek, 
             SUM(DATEDIFF(f.tavozas, f.erkezes)) AS vendegejszakak
      FROM foglalas f
        JOIN szobak s ON f.szazon = s.szazon
        JOIN vendegek v ON f.vsorsz = v.vsorsz
      GROUP BY s.sznev
      ORDER BY vendegejszakak, vendegek
    `;




    app.get('/api/szoba/:id/foglaltsag', (req, res) => {
        const szobaId = req.params.id;
        const sql = `
          SELECT v.vnev, f.erkezes, f.tavozas
          FROM foglalas f
            JOIN vendegek v ON f.vsorsz = v.vsorsz
          WHERE f.szazon = ?
          ORDER BY v.vnev
        `;
        db.query(sql, [szobaId], (err, results) => {
          if (err) return res.status(500).json({error: err});
          res.json(results);
        });
      });
      

    db.query(sql, (err, results) => {
      if (err) return res.status(500).json({error: err});
      res.json(results);
    });
  });
  

  


const PORT = 3001;
app.listen(PORT, () => console.log(`Backend fut a ${PORT} porton`));