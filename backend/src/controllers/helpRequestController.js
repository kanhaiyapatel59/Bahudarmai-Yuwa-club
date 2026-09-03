import HelpRequest from '../models/HelpRequest.js';

export const createHelpRequest = async (req, res, next) => {
  try {
    const { requesterName, contactPhone, location, wardNumber, category, urgency, description, supportingImage } = req.body;

    const count = await HelpRequest.countDocuments();
    const year = new Date().getFullYear();
    const ticketNo = `HELP-${year}-${String(count + 101).padStart(4, '0')}`;

    const helpRequest = await HelpRequest.create({
      ticketNo,
      requesterName,
      contactPhone,
      location,
      wardNumber,
      category,
      urgency: urgency || 'medium',
      description,
      supportingImage,
      status: 'pending',
    });

    res.status(201).json({
      success: true,
      message: 'Your help request has been submitted. Keep your ticket number for tracking.',
      ticketNo: helpRequest.ticketNo,
      helpRequest,
    });
  } catch (error) {
    next(error);
  }
};

export const trackHelpRequest = async (req, res, next) => {
  try {
    const { ticketNo } = req.params;
    const helpRequest = await HelpRequest.findOne({ ticketNo }).populate('assignedVolunteer', 'fullName phone availability');

    if (!helpRequest) {
      return res.status(404).json({ success: false, message: 'Ticket number not found' });
    }

    res.json({ success: true, helpRequest });
  } catch (error) {
    next(error);
  }
};

export const getAllHelpRequestsAdmin = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, category, urgency, status } = req.query;
    const query = {};

    if (category) query.category = category;
    if (urgency) query.urgency = urgency;
    if (status) query.status = status;

    const total = await HelpRequest.countDocuments(query);
    const requests = await HelpRequest.find(query)
      .populate('assignedVolunteer', 'fullName phone')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      success: true,
      count: requests.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: Number(page),
      requests,
    });
  } catch (error) {
    next(error);
  }
};

export const updateHelpRequestStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, assignedVolunteer, adminNotes } = req.body;

    const updateFields = {};
    if (status) updateFields.status = status;
    if (assignedVolunteer) updateFields.assignedVolunteer = assignedVolunteer;
    if (adminNotes !== undefined) updateFields.adminNotes = adminNotes;

    const helpRequest = await HelpRequest.findByIdAndUpdate(id, updateFields, { new: true })
      .populate('assignedVolunteer', 'fullName phone');

    if (!helpRequest) {
      return res.status(404).json({ success: false, message: 'Help request not found' });
    }

    res.json({ success: true, helpRequest });
  } catch (error) {
    next(error);
  }
};
