const adminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Use bcrypt for hashed passwords
  });
  
  module.exports = mongoose.model('Admin', adminSchema);
  