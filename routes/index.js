var express = require('express');
var router = express.Router();
const validation = require('./../validations/CreditCard')

/* GET home page. */
/*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

router.post('/creditCard', async function (req, res) {
  let body = req.body
  try {
    await validation.validateCreditCard(body)
  } catch (e) {
    res.status(400)
    res.json(e.message)
    return;
  }
  res.status(200)
  res.json({
    statusCode: 200,
    message: 'success'
  })
})

module.exports = router;
