import { status } from "../../../../src/Judge0";

export default async function handler(req, res) {
    const out = await status(req.query.id);
    res.status(200).json(out);
}
  