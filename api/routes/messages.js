var express = require('express');
var router = express.Router();
const db = require("../firebase");
const {addDoc, getDocs, collection} = require("firebase/firestore");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Messages' });
});

router.get('/all', async function(req, res, next) {
    const allDocData = [];
    const docs = await getDocs(collection(db, "MESSAGES"));
    docs.forEach((doc) => allDocData.push(doc.data()));
    res.json({result: allDocData});
});

router.post('/post', async function(req, res, next) {
    await addDoc(collection(db, "MESSAGES"), {
        name: req.body.name,
        message: req.body.message
    })
    res.send("Received.")
});

module.exports = router;
