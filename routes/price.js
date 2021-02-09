const express = require('express');
const router = express.Router();
const con = require('../database/database');

router.get('/', (req, res) => {
    const query = 'SELECT * FROM price'
    con.query(query, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM price where id =${id}`
    con.query(query, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    });
});

router.post('/', (req, res) => {
    const price = req.body
    const query = `Insert into price (price)  values ('${price}')`
    con.query(query, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    });
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const price = req.body
    const query = `UPDATE price SET price = '${price}' WHERE (id = '${id}');`
    con.query(query, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id
    const query = `Delete price from price where id = ${id}`
    con.query(query, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    });
});



module.exports = router;