import Volunteer from '../models/Volunteer.js';

export const applyVolunteer = async (req, res, next) => {
  try {
    const { fullName, email, phone, address, wardNumber, skills, interests, availability, preferredActivities, shortBio } = req.body;

    const volunteer = await Volunteer.create({
      fullName,
      email,
      phone,
      address,
      wardNumber,
      skills: Array.isArray(skills) ? skills : (skills || '').split(',').map(s => s.trim()).filter(Boolean),
      interests: Array.isArray(interests) ? interests : (interests || '').split(',').map(i => i.trim()).filter(Boolean),
      availability: availability || 'anytime',
      preferredActivities: Array.isArray(preferredActivities) ? preferredActivities : [preferredActivities].filter(Boolean),
      shortBio,
    });

    res.status(201).json({
      success: true,
      message: 'Volunteer application submitted successfully',
      volunteer,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllVolunteers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const activity = req.query.activity;
    const search = req.query.search;
    const status = req.query.status;

    const query = {};
    if (status) query.status = status;
    if (activity) query.preferredActivities = activity;
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { skills: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await Volunteer.countDocuments(query);
    const volunteers = await Volunteer.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      success: true,
      count: volunteers.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
      volunteers,
    });
  } catch (error) {
    next(error);
  }
};

export const updateVolunteerStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const volunteer = await Volunteer.findByIdAndUpdate(id, { status }, { new: true });
    if (!volunteer) {
      return res.status(404).json({ success: false, message: 'Volunteer not found' });
    }

    res.json({ success: true, volunteer });
  } catch (error) {
    next(error);
  }
};
