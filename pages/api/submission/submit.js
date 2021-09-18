import { submission } from "../../../src/Judge0";

export default async function handler(req, res) {
    const code = req.body.code;
    const out = await submission(code, req.body.language);
    res.status(200).json(out);
}
  