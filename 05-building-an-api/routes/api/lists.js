const express = require('express');
const router = express.Router();


router.route('/api/lists').get().post();
router.route('/api/lists/:urlId').patch().delete();

module.exports = router;