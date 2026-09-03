import Member from '../models/Member.js';
import User from '../models/User.js';

export const applyMembership = async (req, res, next) => {
  try {
    const { fullName, dob, gender, phone, email, address, wardNumber, occupation, education, skills, interests, emergencyContact, profilePhoto } = req.body;

    const existingMember = await Member.findOne({ email });
    if (existingMember) {
      return res.status(400).json({ success: false, message: 'A membership application already exists for this email' });
    }

    const member = await Member.create({
      user: req.user ? req.user._id : null,
      fullName,
      dob,
      gender,
      phone,
      email,
      address,
      wardNumber,
      occupation,
      education,
      skills: Array.isArray(skills) ? skills : (skills || '').split(',').map(s => s.trim()).filter(Boolean),
      interests: Array.isArray(interests) ? interests : (interests || '').split(',').map(i => i.trim()).filter(Boolean),
      emergencyContact,
      profilePhoto,
      status: 'pending',
    });

    if (req.user) {
      await User.findByIdAndUpdate(req.user._id, { memberId: member._id });
    }

    res.status(201).json({
      success: true,
      message: 'Your membership application has been submitted successfully.',
      member,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyMembership = async (req, res, next) => {
  try {
    const member = await Member.findOne({
      $or: [{ user: req.user._id }, { email: req.user.email }],
    });

    if (!member) {
      return res.status(404).json({ success: false, message: 'No membership application found' });
    }

    res.json({ success: true, member });
  } catch (error) {
    next(error);
  }
};

export const getAllMembers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    const wardNumber = req.query.wardNumber;
    const search = req.query.search;

    const query = {};
    if (status) query.status = status;
    if (wardNumber) query.wardNumber = Number(wardNumber);
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { memberCode: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await Member.countDocuments(query);
    const members = await Member.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      success: true,
      count: members.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
      members,
    });
  } catch (error) {
    next(error);
  }
};

export const updateMemberStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, rejectionReason } = req.body;

    const member = await Member.findById(id);
    if (!member) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }

    member.status = status;
    if (status === 'approved') {
      if (!member.memberCode) {
        const count = await Member.countDocuments({ status: 'approved' });
        const year = new Date().getFullYear();
        const codeNum = String(count + 1).padStart(4, '0');
        member.memberCode = `BYC-${year}-${codeNum}`;
      }
      member.approvedAt = new Date();
      member.idCardIssued = true;

      // Link to User if email matches
      const matchedUser = await User.findOne({ email: member.email });
      if (matchedUser) {
        member.user = matchedUser._id;
        matchedUser.memberId = member._id;
        await matchedUser.save();
      }
    } else if (status === 'rejected') {
      member.rejectionReason = rejectionReason || 'Application rejected by BYC administration';
    }

    await member.save();

    res.json({
      success: true,
      message: `Member status updated to ${status}`,
      member,
    });
  } catch (error) {
    next(error);
  }
};
