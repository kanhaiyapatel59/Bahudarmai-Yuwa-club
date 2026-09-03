import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Member from '../models/Member.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'byc_super_secret_jwt_key_2026_nepal', {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    // Default self-registration to member role
    const assignedRole = role && ['member'].includes(role) ? role : 'member';

    const user = await User.create({
      name,
      email,
      password,
      role: assignedRole,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        languagePreference: user.languagePreference,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email }).select('+password').populate('memberId');

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    if (!user.isActive) {
      return res.status(403).json({ success: false, message: 'Your account has been deactivated. Contact BYC support.' });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        languagePreference: user.languagePreference,
        member: user.memberId,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate('memberId');
    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        languagePreference: user.languagePreference,
        member: user.memberId,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateLanguagePreference = async (req, res, next) => {
  try {
    const { lang } = req.body;
    if (!['en', 'ne'].includes(lang)) {
      return res.status(400).json({ success: false, message: 'Invalid language preference' });
    }

    req.user.languagePreference = lang;
    await req.user.save();

    res.json({ success: true, languagePreference: req.user.languagePreference });
  } catch (error) {
    next(error);
  }
};
