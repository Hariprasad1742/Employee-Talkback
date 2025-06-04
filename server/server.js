const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // to handle JSON with images in base64

// Connect MongoDB
mongoose.connect('mongodb://localhost:27017/feedbackDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Appointment Schema
const appointmentSchema = new mongoose.Schema({
  name: String,
  phone: String,
  difficultyType: String,
  problem: String,
  image: String, // base64 string
}, { timestamps: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);

// API route to save appointment feedback
app.post('/api/appointment', async (req, res) => {
  try {
    const { name, phone, difficultyType, problem, image } = req.body;
    const newAppointment = new Appointment({ name, phone, difficultyType, problem, image });
    await newAppointment.save();
    res.status(201).json({ message: 'Feedback saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Doctors Schema
const doctorsSchema = new mongoose.Schema({
  name: String,
  phone: String,
  difficultyType: String,
  problem: String,
  image: String, // base64
}, { timestamps: true });

const Doctors = mongoose.model('Doctors', doctorsSchema);

// API route to save doctors feedback
app.post('/api/doctors', async (req, res) => {
  try {
    const { name, phone, difficultyType, problem, image } = req.body;
    const newDoctorFeedback = new Doctors({ name, phone, difficultyType, problem, image });
    await newDoctorFeedback.save();
    res.status(201).json({ message: 'Doctor feedback saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// LabReports Schema
const labReportsSchema = new mongoose.Schema({
  name: String,
  phone: String,
  difficultyType: String,
  problem: String,
  image: String, // base64 encoded
}, { timestamps: true });

const LabReports = mongoose.model('LabReports', labReportsSchema);

// API route for lab reports feedback
app.post('/api/labreports', async (req, res) => {
  try {
    const { name, phone, difficultyType, problem, image } = req.body;
    const newLabReport = new LabReports({ name, phone, difficultyType, problem, image });
    await newLabReport.save();
    res.status(201).json({ message: 'Lab report feedback saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


// Nurses Schema
const nursesSchema = new mongoose.Schema({
  name: String,
  phone: String,
  difficultyType: String,
  problem: String,
  image: String, // base64 encoded image
}, { timestamps: true });

const Nurses = mongoose.model('Nurses', nursesSchema);

// API route for nurses feedback
app.post('/api/nurses', async (req, res) => {
  try {
    const { name, phone, difficultyType, problem, image } = req.body;
    const newNurseFeedback = new Nurses({ name, phone, difficultyType, problem, image });
    await newNurseFeedback.save();
    res.status(201).json({ message: 'Nurses feedback saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


// PatientRooms Schema
const patientRoomsSchema = new mongoose.Schema({
  name: String,
  phone: String,
  difficultyType: String,
  problem: String,
  image: String, // base64 encoded image
}, { timestamps: true });

const PatientRooms = mongoose.model('PatientRooms', patientRoomsSchema);

// API route for patient rooms feedback
app.post('/api/patientrooms', async (req, res) => {
  try {
    const { name, phone, difficultyType, problem, image } = req.body;
    const newPatientRoomFeedback = new PatientRooms({ name, phone, difficultyType, problem, image });
    await newPatientRoomFeedback.save();
    res.status(201).json({ message: 'Patient room feedback saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


// Waiting Room Schema
const waitingRoomSchema = new mongoose.Schema({
  name: String,
  phone: String,
  difficultyType: String,
  problem: String,
  image: String, // base64 encoded image
}, { timestamps: true });

const WaitingRoom = mongoose.model('WaitingRoom', waitingRoomSchema);

// API route for waiting room feedback
app.post('/api/waitingroom', async (req, res) => {
  try {
    const { name, phone, difficultyType, problem, image } = req.body;
    const newWaitingRoomFeedback = new WaitingRoom({ name, phone, difficultyType, problem, image });
    await newWaitingRoomFeedback.save();
    res.status(201).json({ message: 'Waiting Room feedback saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
