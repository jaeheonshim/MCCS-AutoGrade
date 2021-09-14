import connectDB from "../../../src/mongodb";
import CodeChallenge from "../../../src/schemas/CodeChallenge"

export default async function handler(req, res) {
    connectDB();
    const challenges = await CodeChallenge.find();
    res.status(200).json(challenges);
}
  