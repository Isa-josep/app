const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://root:root@test.orozadd.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const userSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Ruta de registro
app.post('/register', async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const user = new User({ nombre, email, password });
    await user.save();
    res.status(201).send({ success: true, user });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

// Ruta de inicio de sesión
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(400).send({ success: false, message: 'Credenciales incorrectas' });
    }

    res.status(200).send({ success: true, user });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

// Ruta de verificación de usuarios
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send({ success: true, users });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
