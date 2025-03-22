import mongoose, { Document } from 'mongoose';

export interface ISurvey extends Document {
  name: string;
  gender: string;
  nationality: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  pincode: string;
  message: string;
  createdAt: Date;
}

const surveySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['male', 'female']
  },
  nationality: {
    type: String,
    required: [true, 'Nationality is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required']
  },
  streetAddress: {
    type: String,
    required: [true, 'Street address is required']
  },
  city: {
    type: String,
    required: [true, 'City is required']
  },
  state: {
    type: String,
    required: [true, 'State is required']
  },
  pincode: {
    type: String,
    required: [true, 'Pincode is required']
  },
  message: {
    type: String,
    required: [true, 'Message is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default  mongoose.model<ISurvey>('Survey', surveySchema);