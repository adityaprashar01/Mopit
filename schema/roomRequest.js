const roomRequestSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reg_no: { type: String, required: true },
    roomNo: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Done', 'Canceled'], default: 'Pending' },
  });
  
  module.exports = mongoose.model('RoomRequest', roomRequestSchema);
  