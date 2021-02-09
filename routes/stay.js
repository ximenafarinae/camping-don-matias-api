const express = require('express');
const router = express.Router();
const con = require('../database/database');

router.get('/', (req, res) => {
    const query = 'SELECT * FROM stay'
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
    const query = `SELECT * FROM stay where stay_tenant_id =${id}`
    con.query(query, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    });
});

router.post('/', (req, res) => {
    const queryTenantId = `SELECT id FROM tenant ORDER BY id DESC LIMIT 1`
    con.query(queryTenantId, (err, result) => {
        if (err) throw err
        const { check_in, check_out, price } = req.body
        const query = `Insert into stay (check_in, check_out, stay_tenant_id, price)  values ('${check_in}', '${check_out}', '${result[0].id}', '${price}')`
        con.query(query, (err, result) => {
            if (err) {
                res.send(err)
            } else {
                res.send(result)
            }
        });
    })

})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const { check_in, check_out, stay_tenant_id, price } = req.body
    const query = `UPDATE stay SET check_in = '${check_in}', check_out = '${check_out}', stay_tenant_id = '${stay_tenant_id}' price = '${price}' WHERE (stay_tenant_id = '${id}');`
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
    const query = `Delete stay from medical_info where stay_tenant_id = ${id}`
    con.query(query, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    });
});



module.exports = router;