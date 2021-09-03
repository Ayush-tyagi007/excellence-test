const { mongoose, conn, autoIncrement } = require("../module/connection");

const test_scoreSchema = mongoose.Schema({
    candidate_id: { type: Number, ref: "candidate", required: true },
    first_round_score: { type: Number, required: true },
    second_round_score: { type: Number, required: false },
    third_round_score: { type: Number, required: false },
});

test_scoreSchema.plugin(autoIncrement.plugin, {
    model: 'test_score',
    field: '_id',
    startAt: 100000,
    incrementBy: 1
});

exports.testScoreModel = conn.model("test_score", test_scoreSchema);