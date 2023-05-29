var express = require('express');
var router = express.Router();
const db = require("../firebase");
const {doc, addDoc, getDocs, collection, query, where, updateDoc, deleteDoc} = require("firebase/firestore");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Messages' });
});

router.get('/all', async function(req, res, next) {
    const allDocData = [];
    const docs = await getDocs(collection(db, "MESSAGES"));
    docs.forEach((doc) => allDocData.push({data: doc.data(),
    id: doc.id}));
    res.json({result: allDocData});
});

router.post('/post', async function(req, res, next) {
    await addDoc(collection(db, "MESSAGES"), {
        name: req.body.name,
        message: req.body.message
    })
    res.send("Posted.")
});

router.put('/put', async function(req, res, next) {
    const messageId = req.body.messageId;
    const newMessage = req.body.newMessage;
    await updateDoc(doc(db, "MESSAGES", messageId), {
        message: newMessage
    });
    res.send("Updated.")
});

router.delete('/delete', async function(req, res, next) {
    const messageId = req.body.messageId;
    await deleteDoc(doc(db, "MESSAGES", messageId));
    res.send("Deleted.")
});

module.exports = router;
