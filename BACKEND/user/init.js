const bcrypt = require('bcrypt');
const db = require('../config/db');

const users = [
  { username: 'vikram', password: 'secure123', role: 'technician' },
  { username: 'manager01', password: 'manageMe', role: 'manager' },
  { username: 'techie02', password: 'techPass', role: 'technician' },
  { username: 'manager02', password: 'adminAccess', role: 'manager' },
  { username: 'guestUser', password: 'guest123', role: 'guest' }
];

users.forEach(({ username, password, role }) => {
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;
    db.query(
      'INSERT INTO user (username, password, role) VALUES (?, ?, ?)',
      [username, hash, role],
      (err) => {
        if (err) throw err;
        console.log(`✅ Inserted ${username} with role ${role}`);
      }
    );
  });
});