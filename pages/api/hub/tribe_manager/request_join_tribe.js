import { PrismaClient } from '@prisma/client'
import { getLoginSession } from "../../../../lib/auth";


const prisma = new PrismaClient()


export default async function handler(req, res) {
  
  const session = await getLoginSession(req)
  const user = session;
  if(!user) {
      res.status(403).json({error: 'Unauthorized access', error_code: 1500});
      return;
  }

  const player_data = await prisma.player_data.findFirst({where: {
    steamid: BigInt(user.steamid)
  }})

  if(!player_data) {
    res.status(403).json({error: 'Player data error', error_code: 1001});
    return;
  }

  const w_player_data = await prisma.wtribes_playerdata.findFirst({where: {
    SteamID: BigInt(user.steamid)
  }})

  /* Check if the user is already in a tribe */

  const dev_tribe_bypass = true // Used for debug only, if used in a production enviroment this may cause all the ark servers to crash!
  if(w_player_data.TribeID && dev_tribe_bypass != true) {
    res.status(403).json({error: 'Player already inside of a tribe! You must leave your previous tribe before joining a new one!', error_code: 4832});
    return;
  }

  /* Check if the user already made a request */

  const user_requests = await prisma.active_requests.count({
    where: { steamid_requester: BigInt(user.steamid) }
  })

  const dev_duplicate_requests_bypass = false  // Used for debug only, if used in a production enviroment this may cause all the ark servers to crash!
  if(user_requests > 0 && dev_duplicate_requests_bypass != true) {
    res.status(403).json({error: 'You already have sent a request to this tribe or another one!', error_code: 4822});
    return;
  }

  /* Create Request if all checks PASS */

  const request = await prisma.active_requests.create({
    data: {
      steamid_requester: BigInt(user.steamid),
      tribeid_request_to: parseInt(req.query.tribe_id)
    },
  })

  // DEBUG ONLY
  
  //const safe_request = JSON.parse(JSON.stringify(request, (key, value) => typeof value === 'bigint' ? value.toString() : value ));
  //res.status(200).json(safe_request); 

  // PRODUCTION

  res.redirect("/hub/tribe_manager");
}
