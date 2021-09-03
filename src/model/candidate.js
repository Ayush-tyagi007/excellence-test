const { mongoose, conn, autoIncrement } = require("../module/connection");

const candidateSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    createdAt: { type: Number, default: new Date().getTime() },
});

candidateSchema.plugin(autoIncrement.plugin, {
    model: 'candidate',
    field: '_id',
    startAt: 100000,
    incrementBy: 1
});

exports.candidateModel = conn.model("candidate", candidateSchema);