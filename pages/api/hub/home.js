import { PrismaClient } from '@prisma/client'
import { getLoginSession } from "../../../lib/auth";


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

  /* Tribe Owner Data */
  var tribe_owner_data = {};
  if(!tribe_data?.OwnerSteamID) {
    tribe_owner_data = null;
  } else {
    tribe_owner_data = await prisma.player_data.findFirst({where: {
      steamid: BigInt(tribe_data?.OwnerSteamID)
    }, select: {playername: true}})
  }

  const tribe_members_data = await prisma.wtribes_playerdata.findMany({where: {
    TribeID: parseInt(w_player_data.TribeID)
  }, select: {CharacterName: true, isOwnerInTribe: true, isAdminInTribe: true}})

  const tribe_data_internal = await prisma.tribe_data.findFirst({where: {
    tribeid: parseInt(w_player_data.TribeID)
  }})

  const player_tokens = await prisma.player_renamer_player_tokens.findFirst({
    where: { SteamID: BigInt(user.steamid)},
    select: { Tokens: true }
  })

  const dino_tokens = await prisma.advanced_dino_colors_player_tokens.findFirst({
    where: { SteamID: BigInt(user.steamid)},
    select: { Tokens: true }
  })

  const player_permission_groups = await prisma.players.findFirst({
    where: { SteamId: BigInt(user.steamid)},
    select: { PermissionGroups: true, TimedPermissionGroups: true }
  })

  const tribe_permission_groups = await prisma.tribepermissions.findFirst({
    where: { TribeId: BigInt(w_player_data.TribeID) },
    select: { PermissionGroups: true, TimedPermissionGroups: true }
  })

  const permission_array = player_permission_groups.PermissionGroups.concat(player_permission_groups.TimedPermissionGroups)

  const points = await prisma.arkshopplayers.findFirst({
    where: { SteamId: BigInt(user.steamid) },
    select: { Points: true, TotalSpent: true }
  })

  const pvp_status = await prisma.pvpve_tribes.findFirst({
    where: { TribeID: parseInt(w_player_data.TribeID) },
    select: { bPVP: true }
  })


  /* Invite Notifications */
  const invites = await prisma.active_invites.findMany({
    where: { steamid_requested: BigInt(user.steamid) }
  })

  var all_invites = [];
  for(var i in invites) {
      /* Get Tribe Information from API */
      const tribe_data_internal = await prisma.tribe_data.findFirst({where: {
        tribeid: parseInt(invites[i].tribeid_requester)
      }})

      const safe_tribe_data = JSON.parse(JSON.stringify(tribe_data_internal, (key, value) => typeof value === 'bigint' ? value.toString() : value ));
      

    all_invites.push({
      tribeid_requester: invites[i].tribeid_requester,
      tribe: safe_tribe_data
    });
  }

  /* Request Notifications */
  const requests = await prisma.active_requests.findMany({
    where: { tribeid_request_to: parseInt(w_player_data.TribeID) }
  })

  
  var all_requests = [];
  for(var i in requests) {
    /* Get Tribe Information from API */
    const survivor = await prisma.player_data.findFirst({where: {
      steamid: BigInt(requests[i].steamid_requester)
    }})

    const safe_survivor = JSON.parse(JSON.stringify(survivor, (key, value) => typeof value === 'bigint' ? value.toString() : value ));
    

  all_requests.push({
    survivor: safe_survivor
  });
}




  /* Return All Required Data */
  res.status(200).json({
      is_banned: true,
      player: {
          username: player_data.playername,
          playerId: parseInt(player_data.playerid.toString())
      },
      tribe: {
          tribeId: w_player_data?.TribeID,
          tribeName: tribe_data?.TribeName,
          tribeOwner: tribe_owner_data?.playername,
          tribeMembers: tribe_members_data,
          tribeLocation: tribe_data_internal?.map,
          tribeCreationDate: tribe_data_internal?.creation_date,
          permissionsGroups:  tribe_permission_groups?.PermissionGroups,
          timedPermissionGroups:  tribe_permission_groups?.TimedPermissionGroups
      },
      notifications: {
          join_requests: all_requests,
          invites: all_invites,
          chat_msgs: {
            error: "Unsupported by Shadowmane API v2.0, Please wait for ShadowmaneAPI v2.1"
          }
      },
      extra_data: {
        points: points?.Points,
        points_spent: points?.TotalSpent,
        dino_tokens: dino_tokens?.Tokens,
        player_rename_tokens: player_tokens?.Tokens,
        groups: permission_array.toString().replace("Default,",""),
        pvp_status: pvp_status?.bPVP
      }
  })
}
