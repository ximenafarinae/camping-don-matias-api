const express = require('express');
const router = express.Router();
const con = require('../database/database');

router.get('/', (req, res) => {
    const query = 'SELECT * FROM medical_info'
    con.query(query, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result[0])
        }
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM medical_info where medical_tenant_id =${id}`
    con.query(query, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result[0])
        }
    });
});

router.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM medical_info where id =${id}`
    con.query(query, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result[0])
        }
    });
});

router.post('/:id', (req, res) => {
    const id = req.params.id
    const { health_insurance, pre_existing_diseases, diseases_detail, allergies, allergies_detail, emergency_contact_complete_name, emergency_contact_number } = req.body
    const query = `Insert into medical_info (health_insurance, pre_existing_diseases, diseases_detail, allergies, allergies_detail, medical_tenant_id, emergency_contact_complete_name, emergency_contact_number)  values ('${health_insurance}', '${pre_existing_diseases}', '${diseases_detail}','${allergies}', '${allergies_detail}','${id}','${emergency_contact_complete_name}', '${emergency_contact_number}')`
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
    const { health_insurance, pre_existing_diseases, diseases_detail, allergies, allergies_detail } = req.body
    const query = `UPDATE medical_info SET health_insurance = '${health_insurance}', pre_existing_diseases = '${pre_existing_diseases}', diseases_detail = '${diseases_detail}', allergies = '${allergies}', allergies_detail = '${allergies_detail}' WHERE (medical_tenant_id = '${id}');`
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
    const query = `Delete medical_info from medical_info where medical_tenant_id = ${id}`
    con.query(query, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    });
});



module.exports = router;