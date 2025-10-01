import mongoose from 'mongoose';

//quick helper to bail out requests early on bad ids
export const isValidObjectId = (value) => mongoose.Types.ObjectId.isValid(value);