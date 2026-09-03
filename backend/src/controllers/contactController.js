import ContactMessage from '../models/ContactMessage.js';

export const sendContactMessage = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    const contactMsg = await ContactMessage.create({ name, email, phone, subject, message });

    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! Your message has been received by BYC.',
      contactMsg,
    });
  } catch (error) {
    next(error);
  }
};

export const getContactMessagesAdmin = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const total = await ContactMessage.countDocuments();
    const messages = await ContactMessage.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      success: true,
      count: messages.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: Number(page),
      messages,
    });
  } catch (error) {
    next(error);
  }
};

export const markMessageRead = async (req, res, next) => {
  try {
    const message = await ContactMessage.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    if (!message) return res.status(404).json({ success: false, message: 'Message not found' });
    res.json({ success: true, message });
  } catch (error) {
    next(error);
  }
};
