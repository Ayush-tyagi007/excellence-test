const { candidateModel } = require('../model/candidate');
const { testScoreModel } = require('../model/test_score');

const responses = require('../module/responses');

exports.addCandidate = function (req, res) {
    let { name, address, email } = req.body;
    candidateModel.create({ name, address, email })
        .then(user => responses.success(res, user))
        .catch(err => responses.sendError(res, err))
}

exports.addCandidateScore = async function (req, res) {
    try {
        let { score, candidate_id } = req.body;

        if (!score) {
            responses.parameterMissing(res, {}, "score is missing");
        } else if (score > 10) {
            responses.parameterMissing(res, {}, "score can't be greater then 10");
        } else if (!candidate_id) {
            responses.parameterMissing(res, {}, "candidate id is missing");
        } else {
            let candidateData = await candidateModel.findById(candidate_id)
            if (candidateData) {
                let test = await testScoreModel.findOne({ candidate_id })
                if (test) {
                    let updated_details;
                    let { first_round_score, second_round_score, third_round_score } = test;
                    if (third_round_score) {
                        responses.parameterMissing(res, test, "candidate already complete all rounds");
                    } else if (second_round_score) {
                        updated_details = { third_round_score: score };
                    } else if (first_round_score) {
                        updated_details = { second_round_score: score };
                    }

                    let score = await testScoreModel.findOneAndUpdate({ candidate_id }, updated_details, { new: true })
                    responses.success(res, score)
                } else {
                    let score = testScoreModel.create({ candidate_id, first_round_score: score })
                    responses.success(res, score)
                }
            } else {
                responses.parameterMissing(res, {}, "invalid candidate id");
            }
        }
    } catch (err) {
        responses.sendError(res, err)
    }
}

exports.highestCandidateScore = function (req, res) {
    testScoreModel.aggregate([
        {
            "$group": {
                "_id": "$_id",
                "candidate_id": { "$first": "$candidate_id" },
                "highestScore": {
                    "$sum": {
                        "$add": [
                            '$first_round_score', '$second_round_score', '$third_round_score'
                        ]
                    }
                }
            }
        },
        { $sort: { highestScore: -1 } },
        { $limit: 1 },
        {
            $lookup: {
                from: 'candidates',
                localField: 'candidate_id',
                foreignField: '_id',
                as: 'candidateDetail'
            }
        },
        { $unwind: "$candidateDetail" }

    ])
        .then(highestScore => responses.success(res, highestScore))
        .catch(err => responses.sendError(res, err))
}


exports.averageCandidateScore = function (req, res) {
    testScoreModel.aggregate([
        {
            $group: {
                _id: "$_id",
                "candidate_id": { "$first": "$candidate_id" },
                average: {
                    "$avg": {
                        "$avg": [
                            '$first_round_score', '$second_round_score', '$third_round_score'
                        ]
                    }
                }
            },
        },
        {
            $lookup: {
                from: 'candidates',
                localField: 'candidate_id',
                foreignField: '_id',
                as: 'candidateDetail'
            }
        },
        { $unwind: "$candidateDetail" }
    ])
        .then(highestScore => responses.success(res, highestScore))
        .catch(err => responses.sendError(res, err))
}
