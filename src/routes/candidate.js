var candidate = require('../controller/candidate');

exports.default = function (app) {

    /* ********************* add candidate ******************* */
    app.route('/candidate/add').post(candidate.addCandidate);

    /* ********************* add candidate score ******************* */
    app.route('/candidate/score/add').post(candidate.addCandidateScore);

    /* ********************* get highest score ******************* */
    app.route('/candidate/score/highest').get(candidate.highestCandidateScore);

    /* ********************* get average score ******************* */
    app.route('/candidate/score/average').get(candidate.averageCandidateScore);

    return (app)
}