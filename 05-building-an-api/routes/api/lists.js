const express = require('express');
const router = express.Router();
const lists = require('../../controllers/Lists')

router.route('/api/lists').get(lists.getLists).post(lists.createList);
router.route('/api/lists/:urlId').patch(lists.updateList).delete(lists.deleteList);

module.exports = router;