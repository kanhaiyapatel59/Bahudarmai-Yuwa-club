import Leadership from '../models/Leadership.js';

export const getLeadership = async (req, res, next) => {
  try {
    const members = await Leadership.find().sort({ order: 1, createdAt: 1 });
    res.json({ success: true, count: members.length, members });
  } catch (error) {
    next(error);
  }
};

export const createLeadershipMember = async (req, res, next) => {
  try {
    const member = await Leadership.create(req.body);
    res.status(201).json({ success: true, member });
  } catch (error) {
    next(error);
  }
};

export const updateLeadershipMember = async (req, res, next) => {
  try {
    const member = await Leadership.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!member) return res.status(404).json({ success: false, message: 'Member not found' });
    res.json({ success: true, member });
  } catch (error) {
    next(error);
  }
};

export const deleteLeadershipMember = async (req, res, next) => {
  try {
    const member = await Leadership.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ success: false, message: 'Member not found' });
    res.json({ success: true, message: 'Leadership member deleted' });
  } catch (error) {
    next(error);
  }
};
