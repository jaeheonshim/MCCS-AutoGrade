import connectDB from "../../../src/mongodb";
import CodeChallenge from "../../../src/schemas/CodeChallenge";

export default async function handler(req, res) {
    connectDB();

    const id = req.query.id;
    const challenge = await CodeChallenge.find({_id: id});
    if(challenge.length > 0) {
        res.status(200).json(challenge[0]);
    } else {
        res.status(404).end();
    }
}