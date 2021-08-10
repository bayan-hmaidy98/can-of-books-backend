const userModel = require('../models/user.model');

const getbooks = (req, res) => {

    const { email } = req.query;

    userModel.find({ email: email }, (err, user) => {
        if (err) {
            res.send(err)
        } else {
            res.json(user)
        }
    });
}

module.exports = getbooks;
