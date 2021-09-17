const mongoose = require("mongoose");

const codeChallengeSchema = new mongoose.Schema({
    name: String,
    description: String,
    shortDescription: String
});

const CodeChallenge = mongoose.models.CodeChallenge || mongoose.model("CodeChallenge", codeChallengeSchema);
export default CodeChallenge;