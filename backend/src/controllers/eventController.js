import Event from '../models/Event.js';
import EventRegistration from '../models/EventRegistration.js';

export const getEvents = async (req, res, next) => {
  try {
    const { category, status, search, page = 1, limit = 9 } = req.query;
    const query = {};

    if (category) query.category = category;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { 'title.en': { $regex: search, $options: 'i' } },
        { 'title.ne': { $regex: search, $options: 'i' } },
        { 'description.en': { $regex: search, $options: 'i' } },
        { 'description.ne': { $regex: search, $options: 'i' } },
      ];
    }

    const total = await Event.countDocuments(query);
    const events = await Event.find(query)
      .sort({ startDate: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      success: true,
      count: events.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: Number(page),
      events,
    });
  } catch (error) {
    next(error);
  }
};

export const getEventBySlug = async (req, res, next) => {
  try {
    const event = await Event.findOne({ slug: req.params.slug });
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    const registrationsCount = await EventRegistration.countDocuments({ event: event._id });

    res.json({
      success: true,
      event,
      registrationsCount,
    });
  } catch (error) {
    next(error);
  }
};

export const createEvent = async (req, res, next) => {
  try {
    const { title, description, category, bannerImage, startDate, endDate, location, organizer, status, isRegistrationRequired, maxParticipants, registrationDeadline, contactPhone } = req.body;

    const baseSlug = title.en ? title.en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : `event-${Date.now()}`;
    const slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    const event = await Event.create({
      slug,
      title,
      description,
      category,
      bannerImage: bannerImage || 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80',
      startDate,
      endDate,
      location,
      organizer,
      status: status || 'upcoming',
      isRegistrationRequired: isRegistrationRequired !== undefined ? isRegistrationRequired : true,
      maxParticipants: maxParticipants || 100,
      registrationDeadline,
      contactPhone,
    });

    res.status(201).json({ success: true, event });
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    res.json({ success: true, event });
  } catch (error) {
    next(error);
  }
};

export const deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    await EventRegistration.deleteMany({ event: req.params.id });
    res.json({ success: true, message: 'Event deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const registerForEvent = async (req, res, next) => {
  try {
    const { eventId, participantName, phone, email } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    if (event.status === 'completed' || event.status === 'cancelled') {
      return res.status(400).json({ success: false, message: 'Event registration is closed' });
    }

    const currentCount = await EventRegistration.countDocuments({ event: eventId, status: 'registered' });
    if (currentCount >= event.maxParticipants) {
      return res.status(400).json({ success: false, message: 'Event has reached maximum capacity' });
    }

    const registration = await EventRegistration.create({
      event: eventId,
      user: req.user ? req.user._id : null,
      participantName,
      phone,
      email,
    });

    res.status(201).json({
      success: true,
      message: 'Event registration successful!',
      registration,
    });
  } catch (error) {
    next(error);
  }
};

export const getEventParticipants = async (req, res, next) => {
  try {
    const registrations = await EventRegistration.find({ event: req.params.eventId }).populate('user', 'name email');
    res.json({ success: true, count: registrations.length, registrations });
  } catch (error) {
    next(error);
  }
};
