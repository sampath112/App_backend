const express = require('express');
const UserProfile = require('../models/UserProfile');
const router = express.Router();

// Create Profile (Public)
router.post('/', async (req, res) => {
  try {
    const profile = new UserProfile(req.body);
    await profile.save();
    res.status(201).json(profile);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

// Get All Profiles (Public)
router.get('/', async (req, res) => {
  try {
    const { employmentStatus, qualification, sort } = req.query;
    let query = {};

    if (employmentStatus) query.employmentStatus = employmentStatus;
    if (qualification) query.qualification = qualification;

    const profiles = await UserProfile.find(query).sort({ name: sort === 'asc' ? 1 : -1 });
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const profile = await UserProfile.findByIdAndDelete(req.params.id);

    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found' });
    }

    res.json({ msg: 'Profile deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;