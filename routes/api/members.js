const express = require('express');
const router = express.Router();
const members = require('../../Members');
// Gets all members
router.get('/', (req, res) => res.json(members));

// Get a single member
router.get('/:id', (req, res) => {
  const FOUND = members.some((member) => member.id === +req.params.id);

  if (FOUND) {
    // get the specific member in the object using req.params
    res.json(members.filter((member) => member.id === +req.params.id));
  } else {
    res
      .status(400)
      .json({ msg: `No member with the id of ${req.params.id} is found` });
  }
});

module.exports = router;
