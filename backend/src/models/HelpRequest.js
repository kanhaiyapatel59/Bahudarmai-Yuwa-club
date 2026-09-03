import mongoose from 'mongoose';

const helpRequestSchema = new mongoose.Schema(
  {
    ticketNo: {
      type: String,
      required: true,
      unique: true,
    },
    requesterName: {
      type: String,
      required: [true, 'Name is required'],
    },
    contactPhone: {
      type: String,
      required: [true, 'Contact phone is required'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
    },
    wardNumber: {
      type: Number,
      required: [true, 'Ward number is required'],
    },
    category: {
      type: String,
      enum: ['blood', 'medical', 'education', 'food', 'disaster', 'financial', 'other'],
      required: true,
    },
    urgency: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium',
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    supportingImage: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['pending', 'under_review', 'assigned', 'in_progress', 'resolved', 'rejected'],
      default: 'pending',
    },
    assignedVolunteer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Volunteer',
      default: null,
    },
    adminNotes: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

export default mongoose.model('HelpRequest', helpRequestSchema);
