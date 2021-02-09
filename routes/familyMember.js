const express = require('express');
const router = express.Router();
const con = require('../database/database');


router.get('/', (req, res) => {
    const query = 'SELECT * FROM family_member'
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
    const query = `SELECT * FROM family_member where member_tenant_id =${id}`
    con.query(query, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    });
});

router.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM family_member where id =${id}`
    con.query(query, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result[0])
        }
    });
});

router.post('/:id', (req, res) => {
    const id = req.params.id;
    const { name, last_name, dni, age } = req.body
    const query = `Insert into family_member (name, last_name, dni, age, member_tenant_id)  values ('${name}', '${last_name}', '${dni}', '${age}', '${id}')`
    con.query(query, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    });


});

router.put('/:id', (req, res) => {
    const id = req.params.id
    const { name, last_name, dni, age, member_tenant_id } = req.body
    const query = `UPDATE family_member SET name = '${name}', last_name = '${last_name}', dni = '${dni}', age = '${age}', member_tenant_id = ${member_tenant_id} WHERE (id = '${id}');`
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
    const query = `Delete family_member from family_member where id = ${id}`
    con.query(query, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    });
});

module.exports = router;
