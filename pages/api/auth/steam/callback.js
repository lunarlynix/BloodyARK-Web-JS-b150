import passport from "passport";
import nextConnect from "next-connect";
import withPassport from "../../../../lib/withPassport";
import { setLoginSession } from "../../../../lib/auth";

import SteamStrategy from "../../../../lib/steam";

const { STEAMAPI_URL, STEAMAPI_KEY } = process.env

passport.use(new SteamStrategy({
    returnURL: 'https://bloody.gg/api/auth/steam/callback',
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

const authenticate = (req, res) => new Promise((resolve, reject) => {
    passport.authenticate('steam', {session: false}, (error, token) => {
        if(error) reject(error);
        else resolve(token);
    })(req, res)
})

const handler = nextConnect()
    .use(passport.initialize())
    .get(async (req, res) => {
    try {
        const user = await authenticate(req, res);
        //console.log(user);
        const session = {...user}
        const cookie = await setLoginSession(res, session)
        res.setHeader("Set-Cookie", cookie)
        res.redirect("/")
    } catch (err) {
        console.log("Why!?!!" + err);
        res.status(500).json({success: false, message: err.message })
    }
})

export default withPassport(handler);