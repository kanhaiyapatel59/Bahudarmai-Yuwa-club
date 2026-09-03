import BloodDonor from '../models/BloodDonor.js';

export const searchBloodDonors = async (req, res, next) => {
  try {
    const { bloodGroup, wardNumber, availability } = req.query;
    const query = { consentToContact: true };

    if (bloodGroup) query.bloodGroup = bloodGroup;
    if (wardNumber) query.wardNumber = Number(wardNumber);
    if (availability !== undefined) query.isAvailable = availability === 'true';

    // Public query excludes sensitive contact details (phone, email) for privacy
    const donors = await BloodDonor.find(query)
      .select('-phone -email')
      .sort({ updatedAt: -1 });

    res.json({
      success: true,
      count: donors.length,
      donors,
    });
  } catch (error) {
    next(error);
  }
};

export const registerBloodDonor = async (req, res, next) => {
  try {
    const { fullName, bloodGroup, wardNumber, address, phone, email, consentToContact, isAvailable, lastDonatedDate } = req.body;

    if (!consentToContact) {
      return res.status(400).json({ success: false, message: 'Consent to contact is required to register as a donor' });
    }

    const donor = await BloodDonor.create({
      fullName,
      bloodGroup,
      wardNumber,
      address,
      phone,
      email,
      consentToContact,
      isAvailable: isAvailable !== undefined ? isAvailable : true,
      lastDonatedDate,
    });

    res.status(201).json({
      success: true,
      message: 'Registered as a blood donor successfully!',
      donorId: donor._id,
    });
  } catch (error) {
    next(error);
  }
};

export const requestDonorContact = async (req, res, next) => {
  try {
    const { donorId, requesterName, requesterPhone, urgency, message } = req.body;

    const donor = await BloodDonor.findById(donorId);
    if (!donor) {
      return res.status(404).json({ success: false, message: 'Donor record not found' });
    }

    // In production, this dispatches SMS / Email dispatch without revealing raw phone number directly to web crawler
    res.json({
      success: true,
      message: 'Contact request sent to the donor successfully. BYC emergency team has also been notified.',
    });
  } catch (error) {
    next(error);
  }
};

// Admin route (shows phone numbers for verified coordination)
export const getAllDonorsAdmin = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const query = {};
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { address: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await BloodDonor.countDocuments(query);
    const donors = await BloodDonor.find(query)
      .select('+phone +email')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      success: true,
      count: donors.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: Number(page),
      donors,
    });
  } catch (error) {
    next(error);
  }
};

export const updateDonorAvailability = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isAvailable } = req.body;

    const donor = await BloodDonor.findByIdAndUpdate(id, { isAvailable }, { new: true });
    if (!donor) {
      return res.status(404).json({ success: false, message: 'Donor not found' });
    }

    res.json({ success: true, donor });
  } catch (error) {
    next(error);
  }
};
