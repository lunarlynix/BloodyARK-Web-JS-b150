// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default function handler(
  req,
  res
) {
    res.status(200).json(
    {
       pagename: 'BloodyARK',
       headertext: "The perfect Ark: Survival Evolved experience. This server was established in 2017 and is still running strong as one of the biggest unofficial ark communities." 
    }
    )
}
