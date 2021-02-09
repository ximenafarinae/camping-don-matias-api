const express = require('express');
const tenantRouter = require('./routes/tenant');
const medicalInfoRouter = require('./routes/medicalInfo');
const familyMemberRouter = require('./routes/familyMember');
const stayRouter = require('./routes/stay');
const priceRouter = require('./routes/price');

const app = express();

app.use(express.json());
app.use('/tenant', tenantRouter);
app.use('/medicalInfo', medicalInfoRouter);
app.use('/familyMember', familyMemberRouter);
app.use('/stay', stayRouter);
app.use('/price', priceRouter);
app.set('PORT', 3000);


app.listen(app.get('PORT'), () => {
    console.log('Server en puerto', app.get('PORT'))
});
