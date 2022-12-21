import { PrismaClient, Prisma } from '@prisma/client'
import { getLoginSession } from "../../../lib/auth";


const prisma = new PrismaClient()


export default async function handler(req, res) {
  
  const session = await getLoginSession(req)
  const user = session;
  if(!user) {
      res.status(403).json({error: 'Unauthorized access', error_code: 1500});
      return;
  }

  const search = req.query.search ? req.query.search : ""
  const ranking_data = await prisma.advancedachievements_playerdata.findMany({
    orderBy: req.query.sort_by ? JSON.parse(req.query.sort_by) : {},
    skip: 20 * (req.query.page ? req.query.page : 0), // Page ID
    take: 20,
    where: {
      PlayerName: {
        contains: search
      }
    },
    select: {
      SteamID: false,
      PlayerName: true,
      TribeName: true,
      TribeID: true,
      PlayTime: true,
      PlayerKills: true,
      DinoKills: true,
      WildDinoKills: true,
      DinosTamed: true,
      DeathByPlayer: true,
      DeathByDino: true,
      DeathByWildDino: true, 
    },
  });
  //const result = await prisma.$queryRaw`SELECT * FROM advancedachievements_playerdata WHERE PlayerName like "%${search}%"`
  
  const safe_ranking_data = JSON.parse(JSON.stringify(ranking_data, (key, value) =>
  typeof value === 'bigint'
      ? value.toString()
      : value // return everything else unchanged
    ));

    const current_page = (req.query.page ? req.query.page : 0);
    const pages = await prisma.advancedachievements_playerdata.count({});
    var next_page = null;
    var prev_page = null;
  
    if(current_page < Math.round(pages / 20)) {
      next_page = `https://bloody.gg/api/hub/rankings?page=${parseInt(current_page) + 1}&search=${search}`;
    }
  
    if(current_page > 0) {
      prev_page = `https://bloody.gg/api/hub/rankings?page=${parseInt(current_page) - 1}&search=${search}`;
    }

  /* Return All Required Data */
  res.status(200).send({
    pagination: {
      total_pages: Math.round(pages / 20),
      current_page: parseInt(current_page),
      next: next_page,
      prev: prev_page
    },
    ranking_data: safe_ranking_data
  });
}
