const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

// ⚠️ IMPORTANT: do NOT require db eagerly
const DEV_MODE = process.env.NODE_ENV === "development";

function initPassport(passport) {
  // ============================
  // DEV MODE → DISABLE PASSPORT
  // ============================
  if (DEV_MODE) {
    console.log("PASSPORT: DEV MODE – strategy disabled");

    // Dummy serialize / deserialize to keep session happy
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) =>
      done(null, { id: 1, username: "demo", role: "admin" })
    );

    return; // 🚫 NOTHING BELOW RUNS
  }

  // ============================
  // PROD MODE → REAL AUTH
  // ============================
  const db = require("./db");

  passport.use(
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true,
      },
      (req, username, password, done) => {
        const inputRole = req.body.role;

        if (!username || !password) {
          return done(null, false, { message: "Username and password required" });
        }

        if (!inputRole) {
          return done(null, false, { message: "Role is required" });
        }

        db.query(
          "SELECT * FROM user WHERE username = ?",
          [username],
          (err, results) => {
            if (err) return done(err);

            if (!results.length) {
              return done(null, false, { message: "User not found" });
            }

            const user = results[0];

            // Role check
            if (user.role.toLowerCase() !== inputRole.toLowerCase()) {
              return done(null, false, {
                message: "Role mismatch: access denied",
              });
            }

            // Password check
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) return done(err);

              if (!isMatch) {
                return done(null, false, { message: "Wrong password" });
              }

              return done(null, user);
            });
          }
        );
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    db.query("SELECT * FROM user WHERE id = ?", [id], (err, results) => {
      if (err) return done(err);
      if (!results.length) return done(null, false);
      done(null, results[0]);
    });
  });
}

module.exports = initPassport;
