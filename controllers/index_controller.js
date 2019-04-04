require('dotenv').config();

module.exports.test = (req, res) => {
    return res.send({message: 'working'});
};