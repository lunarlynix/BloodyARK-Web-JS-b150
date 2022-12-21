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

  const tribe_data = await prisma.wtribes_tribedata.findFirst({where: {
    TribeID: parseInt(w_player_data.TribeID)
  }})

  const tribe_owner_data = await prisma.player_data.findFirst({where: {
    steamid: BigInt(tribe_data.OwnerSteamID)
  }, select: {playername: true}})

  const tribe_members_data = await prisma.wtribes_playerdata.findMany({where: {
    TribeID: parseInt(w_player_data.TribeID)
  }, select: {CharacterName: true, isOwnerInTribe: true, isAdminInTribe: true}})

  const tribe_data_internal = await prisma.tribe_data.findFirst({where: {
    tribeid: parseInt(w_player_data.TribeID)
  }})

  /* Return All Required Data */
  res.status(200).json({
      tribe: {
          tribeId: w_player_data.TribeID,
          tribeName: tribe_data.TribeName,
          tribeOwner: tribe_owner_data.playername,
          tribeMembers: tribe_members_data,
          tribeLocation: tribe_data_internal.map,
          tribeCreationDate: tribe_data_internal.creation_date,
          tribeAcceptingMembers: tribe_data_internal.isListed
      },
      notifications: {
          join_requests: [],
          invites: []
      }
  })
}
