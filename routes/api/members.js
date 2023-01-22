const express = require('express');
const router = express.Router();
const members = require('../../Members');
const uuid = require('uuid');
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

// Create a member
router.post('/', (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    age: req.body.age,
  };

  if (!newMember.name || !newMember.age) {
    return res.status(400).json({ msg: 'Please include a name and age' });
  }

  members.push(newMember);
  res.json(members);
});

// Update a member
router.put('/:id', (req, res) => {
  const FOUND = members.some((member) => member.id === +req.params.id);

  if (FOUND) {
    const updMember = req.body;
    members.forEach((member, index) => {
      if (member.id === +req.params.id) {
        members[index] = updMember;
        res.send(members);
      }
    });
  } else {
    res
      .status(400)
      .json({ msg: `No member with the id of ${req.params.id} is found` });
  }
});

// Delete a member
router.delete('/:id', (req, res) => {
  const FOUND = members.some((member) => member.id === +req.params.id);

  if (FOUND) {
    // get the specific member in the object using req.params
    members.forEach((member, index) => {
      if (member.id === +req.params.id) {
        members.splice(index, 1);
        res.json({
          msg: 'Member deleted',
          members,
        });
      }
    });
  } else {
    res
      .status(400)
      .json({ msg: `No member with the id of ${req.params.id} is found` });
  }
});
module.exports = router;
