import Donation from '../models/Donation.js';

export const recordDonation = async (req, res, next) => {
  try {
    const { donorName, donorEmail, donorPhone, amount, cause, paymentMethod, transactionReference, notes } = req.body;

    const donation = await Donation.create({
      donorName,
      donorEmail,
      donorPhone,
      amount,
      cause: cause || 'general',
      paymentMethod: paymentMethod || 'bank_transfer',
      transactionReference,
      notes,
      status: 'pending', // Default to pending verification
    });

    res.status(201).json({
      success: true,
      message: 'Donation record submitted successfully. Thank you for supporting BYC!',
      donation,
    });
  } catch (error) {
    next(error);
  }
};

export const getDonationStats = async (req, res, next) => {
  try {
    const completedDonations = await Donation.find({ status: 'completed' });
    const totalAmount = completedDonations.reduce((sum, d) => sum + d.amount, 0);
    const count = completedDonations.length;

    // Cause breakdown
    const causeBreakdown = await Donation.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: '$cause', totalAmount: { $sum: '$amount' }, count: { $sum: 1 } } },
    ]);

    res.json({
      success: true,
      totalAmount,
      count,
      causeBreakdown,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllDonationsAdmin = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, cause, status } = req.query;
    const query = {};

    if (cause) query.cause = cause;
    if (status) query.status = status;

    const total = await Donation.countDocuments(query);
    const donations = await Donation.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      success: true,
      count: donations.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: Number(page),
      donations,
    });
  } catch (error) {
    next(error);
  }
};

export const updateDonationStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const donation = await Donation.findByIdAndUpdate(id, { status, notes }, { new: true });
    if (!donation) {
      return res.status(404).json({ success: false, message: 'Donation record not found' });
    }

    res.json({ success: true, donation });
  } catch (error) {
    next(error);
  }
};
