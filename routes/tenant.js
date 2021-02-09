const express = require('express');
const router = express.Router();
const con = require('../database/database');
const moment = require('moment');


router.get('/', (req, res) => {
    const query = 'SELECT * FROM tenant'
    con.query(query, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    });
});



router.get('/search/:name', (req, res) => {
    const name = req.params.name;
    const query = `SELECT * FROM tenant WHERE name LIKE '%${name}%' OR last_name LIKE '%${name}%'`
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
    const query = `SELECT * FROM tenant WHERE id =${id}`
    con.query(query, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result[0])
        }
    });
});


router.post('/', (req, res) => {
    const { name, last_name, birth_date, dni, vehicle_registration_number, phone, email, address } = req.body
    const query = `Insert into tenant (name, last_name, birth_date, dni, vehicle_registration_number, phone, email, address)  values ('${name}', '${last_name}', '${birth_date}', '${dni}', '${vehicle_registration_number}', '${phone}', '${email}', '${address}')`
    con.query(query, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            console.log(result)
            res.json(result.insertId)
        }
    });
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const { name, last_name, birth_date, dni, vehicle_registration_number } = req.body
    const query = `UPDATE tenant SET name = '${name}', last_name = '${last_name}', birth_date = '${birth_date}', dni = '${dni}', vehicle_registration_number = '${vehicle_registration_number}' WHERE (id = '${id}');`
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
    const deleteMedicalInfo = `Delete medical_info from medical_info where medical_tenant_id = ${id}`
    const deleteFamilyMember = `Delete family_member from family_member where member_tenant_id = ${id}`
    const query = `Delete tenant from tenant where id = ${id}`
    con.query(deleteMedicalInfo, (err, result) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            con.query(deleteFamilyMember, (err, result) => {
                if (err) {
                    res.send(err).status(500)
                } else {
                    con.query(query, (err, result) => {
                        if (err) {
                            res.send(err).status(500)
                        } else {
                            res.send(result)
                        }
                    })
                }
            })
        }
    })
})



module.exports = router;
