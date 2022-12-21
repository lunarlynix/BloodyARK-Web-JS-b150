import passport from "passport";
import redirect from "micro-redirect";
import { fetchUserById } from "./user";
import SteamStrategy from "../lib/steam"

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

passport.serializeUser((user, done) => {
  const { id } = user
  done(null, {id});
});
 
 passport.deserializeUser(async (id, done) => {
  const user = await fetchUserById(id);
  done(null, user);
});

// export middleware to wrap api/auth handlers
export default fn => (req, res) => {
    if (!res.redirect) {
      // passport.js needs res.redirect:
      // https://github.com/jaredhanson/passport/blob/1c8ede/lib/middleware/authenticate.js#L261
      // Monkey-patch res.redirect to emulate express.js's res.redirect,
      // since it doesn't exist in micro. default redirect status is 302
      // as it is in express. https://expressjs.com/en/api.html#res.redirect
      res.redirect = (location) => redirect(res, 302, location)
    }
  
    // Initialize Passport and restore authentication state, if any, from the
    // session. This nesting of middleware handlers basically does what app.use(passport.initialize())
    // does in express.
    passport.initialize()(req, res, () =>
    passport.session()(req, res, () =>
      // call wrapped api route as innermost handler
      fn(req, res)
    )
  )
}