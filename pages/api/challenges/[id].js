import connectDB from "../../../src/mongodb";
import CodeChallenge from "../../../src/schemas/CodeChallenge";
import Code from "../../code/[id]";

export default async function handler(req, res) {
    connectDB();

    if(req.method == "POST") {
        const body = req.body;
        if(!body.name || !body.description) {
            res.status(500).end("Name and Description must not be blank");
            return;
        }
        
        if(!req.query.id) {
            res.status(500).end("Missing ID");
            return;
        }

        let challenge;
        
        if(req.query.id === "new") {
            challenge = [new CodeChallenge()];
        } else {
            challenge = await CodeChallenge.find({_id: req.query.id});
        }

        if(challenge.length > 0) {
            challenge[0].name = body.name;
            challenge[0].description = body.description;
            challenge[0].shortDescription = body.shortDescription;
            challenge[0].defaultCode = body.defaultCode;
            challenge[0].save();
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    } else if(req.method == "DELETE") {
        CodeChallenge.deleteOne({_id: req.query.id}, function(err) {
            if(!err) res.status(200).end();
            else res.status(500).end();
        });
    } else {
        const id = req.query.id;
        const challenge = await CodeChallenge.find({_id: id});
        if(challenge.length > 0) {
            res.status(200).json(challenge[0]);
        } else {
            res.status(404).end();
        }
    }
}