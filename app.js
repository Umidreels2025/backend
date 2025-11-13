const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const app = express();
app.use(cors());
app.use(express.json());

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://test-backend-a-default-rtdb.firebaseio.com'
});

const db = admin.database();

app.get('/', (req, res) => {
  res.send('Umidjon Node.js + Firebase backend ishlayapti!');
});

app.get('/api/users', async (req, res) => {
  try {
    const snapshot = await db.ref('users').once('value');
    const data = snapshot.val();
    res.json(data || { xabar: "Hozircha foydalanuvchilar yo‘q" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server ${PORT}-portda ishlayapti`));
