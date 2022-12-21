import { connectToDatabase } from '../../lib/mongodb'


export default async function handler(req, res) {
    const { db } = await connectToDatabase();

    const servers = await db.collection("servers").find({}).project({ is_online: 1, players: 1, arkservers_api_key: 1 }).toArray();
    
    servers.forEach(async (server) => {
        const res = await fetch(`https://ark-servers.net/api/?object=servers&element=detail&key=${server.arkservers_api_key}`);
        const data = await res.json();

        await db.collection("servers").updateOne({ _id: server._id },
        {
            $set: { is_online: data.is_online, players: parseInt(data.players) }
        });

        console.log(`Players : ${data.players} , Online ${data.is_online}`);
    })

    res.status(200).json({status: 'completed'})
}
  