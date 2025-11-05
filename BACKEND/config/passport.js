const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('./db');

function initPassport(passport) {
  passport.use(new LocalStrategy(
    { usernameField: 'username', passwordField: 'password', passReqToCallback: true },
    (req, username, password, done) => {
      const inputRole = req.body.role;

      db.query('SELECT * FROM user WHERE username = ?', [username], (err, results) => {
        if (err) return done(err);
        if (!results.length) {
          console.log('❌ User not found:', username);
          return done(null, false, { message: 'User not found' });
        }

        const user = results[0];

        if (user.role.toLowerCase() !== inputRole.toLowerCase()) {
          console.log('❌ Role mismatch:', user.role, '≠', inputRole);
          return done(null, false, { message: 'Role mismatch: access denied' });
        }

        if (!password) {
          return done(null, false, { message: 'Password required' });
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) return done(err);
          return isMatch
            ? done(null, user)
            : done(null, false, { message: 'Wrong password' });
        });
      });
    }
  ));

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => {
    db.query('SELECT * FROM user WHERE id = ?', [id], (err, results) => {
      if (err) return done(err);
      if (!results.length) return done(null, false);
      done(null, results[0]);
    });
  });
}

module.exports = initPassport;