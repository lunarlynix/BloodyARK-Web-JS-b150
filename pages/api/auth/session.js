import { fetchUserById } from "../../../lib/user";
import { getLoginSession } from "../../../lib/auth";

export default async(req, res) => {
    try {
        const session = await getLoginSession(req)
        const user = session;
        if(!user) {
            res.status(403).json({user: null});
            return;
        }
        const { steamid, personaname, avatarfull } = user
        res.status(200).json({ user: {id: steamid, username: personaname, avatar: avatarfull }})
    } catch (err) {
        res.status(500).end('Authentication token is invalid, please log in')
    }
}