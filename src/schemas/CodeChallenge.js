const mongoose = require("mongoose");

const codeChallengeSchema = new mongoose.Schema({
    name: String,
    description: String
});

console.log(mongoose.models);
const CodeChallenge = mongoose.models.CodeChallenge || mongoose.model("CodeChallenge", codeChallengeSchema);
export default CodeChallenge;