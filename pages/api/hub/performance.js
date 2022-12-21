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

  const w_player_data = await prisma.wtribes_playerdata.findFirst({where: {
    SteamID: BigInt(user.steamid)
  }})

  const player_performance_data = await prisma.advancedachievements_playerdata.findFirst({
    where: { SteamID: BigInt(user.steamid) },
    select: {
      SteamID: false,
      PlayerName: false,
      TribeName: false,
      TribeID: false,
      PlayTime: true,
      PlayerKills: true,
      DinoKills: true,
      WildDinoKills: true,
      DinosTamed: true,
      DeathByPlayer: true,
      DeathByDino: true,
      DeathByWildDino: true, 
    }
  });
  
  const player_daily_performance_data = await prisma.advancedachievements_daily_playerdata.findFirst({
    where: { SteamID: BigInt(user.steamid) },
    select: {
      SteamID: false,
      PlayerName: false,
      TribeName: false,
      TribeID: false,
      PlayTime: true,
      PlayerKills: true,
      DinoKills: true,
      WildDinoKills: true,
      DinosTamed: true,
      DeathByPlayer: true,
      DeathByDino: true,
      DeathByWildDino: true, 
    }
  });

  const tribe_performance = await prisma.advancedachievements_tribedata.findFirst({ 
    where: { TribeID: parseInt(w_player_data.TribeID) },
    select: { TribeName: true, DamageScore: true}
  });

  const player_score_data = await prisma.advancedachievements_playerdata_custom.findFirst({
    where: { steam_id: BigInt(user.steamid) },
  });

  const player_daily_score_data = await prisma.advancedachievements_daily_playerdata_custom.findFirst({
    where: { steam_id: BigInt(user.steamid) },
  });
  
  const safe_daily_performance_data = JSON.parse(JSON.stringify(player_daily_performance_data, (key, value) => typeof value === 'bigint' ? value.toString() : value ));
  const safe_performance_data = JSON.parse(JSON.stringify(player_performance_data, (key, value) => typeof value === 'bigint' ? value.toString() : value ));
  const safe_tribe_performance_data = JSON.parse(JSON.stringify(tribe_performance, (key, value) => typeof value === 'bigint' ? value.toString() : value ));
  const safe_score_data = JSON.parse(JSON.stringify(player_score_data, (key, value) => typeof value === 'bigint' ? value.toString() : value ));
  const safe_daily_score_data = JSON.parse(JSON.stringify(player_daily_score_data, (key, value) => typeof value === 'bigint' ? value.toString() : value ));


  /* Return All Required Data */
  res.status(200).send({
    daily_performance: safe_daily_performance_data,
    performance: safe_performance_data,
    score_data: safe_score_data,
    daily_score_data: safe_daily_score_data,
    tribe_performance: safe_tribe_performance_data
  });
}
