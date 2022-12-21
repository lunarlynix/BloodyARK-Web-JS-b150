import passport from "passport"
import nextConnect from "next-connect";
import withPassport from "../../../lib/withPassport";
import SteamStrategy from "../../../lib/steam";

const { STEAMAPI_URL, STEAMAPI_KEY } = process.env

passport.use(new SteamStrategy({
  returnURL: 'https://bloody-ark.com/api/auth/steam/callback',
    realm: STEAMAPI_URL,
    apiKey: STEAMAPI_KEY
  },
  function(identifier, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
  
      // To keep the example simple, the user's Steam profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Steam account with a user record in your database,
      // and return that user instead.
      profile.identifier = identifier;
      return done(null, profile);
    });
  }
  ));

const handler = nextConnect()
    .use(passport.initialize())
    .get(async (req, res) => {
    try {
        passport.authenticate('steam')(req, res, (...args) => {})
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
})

export default withPassport(handler);