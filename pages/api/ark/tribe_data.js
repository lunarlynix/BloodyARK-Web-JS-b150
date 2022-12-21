import { PrismaClient } from '@prisma/client'
import { getLoginSession } from "../../../lib/auth";

const prisma = new PrismaClient()

export default async function handler(
  req,
  res
) {
  if(!req.query.TribeID) {
      res.status(403).json({error: 'Access Denied!'});
      return;
  }

  const tribe_data = await prisma.wtribes_tribedata.findFirst({where: {
    TribeID: parseInt(req.query.TribeID)
  }})

  if(!tribe_data) {
    res.status(403).json({error: 'No data found!', error_id: 300});
    return;
  }

  res.status(200).send(JSON.parse(JSON.stringify(tribe_data, (key, value) =>
  typeof value === 'bigint'
      ? value.toString()
      : value // return everything else unchanged
    ))
   );
}
