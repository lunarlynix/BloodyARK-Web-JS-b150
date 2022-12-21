import { PrismaClient } from '@prisma/client'
import { getLoginSession } from "../../../lib/auth";

const prisma = new PrismaClient()

export default async function handler(
  req,
  res
) {
  const session = await getLoginSession(req)
  const user = session;
  if(!user) {
      res.status(403).json({user: null});
      return;
  }

  const player_data = await prisma.player_data.findFirst({where: {
    steamid: BigInt(user.steamid)
  }})

  if(!player_data) {
    res.status(403).json({error: 'No data found!', error_id: 300});
    return;
  }

  res.status(200).send(JSON.parse(JSON.stringify(player_data, (key, value) =>
  typeof value === 'bigint'
      ? value.toString()
      : value // return everything else unchanged
    ))
   );
}
