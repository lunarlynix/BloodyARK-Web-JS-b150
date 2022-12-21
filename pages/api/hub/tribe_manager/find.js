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

  if(!w_player_data) {
    res.status(403).json({error: 'Internal Player data error', error_code: 1002});
    return;
  }

  const tribe_data_internal = await prisma.tribe_data.findMany({where: {
    isListed: 1
  }})

  const safe_tribe_data = JSON.parse(JSON.stringify(tribe_data_internal, (key, value) => typeof value === 'bigint' ? value.toString() : value ));

  /* Return All Required Data */
  res.status(200).json(safe_tribe_data)
}
