require('dotenv').config();

module.exports.test = (req, res) => {
    return res.send({message: 'working'});
};

module.exports.add_user = (req, res) => {
    User.findOne({email: req.params.email}, (err, user) => {
        if (err) return res.status(404).json({message: 'error'});
        if (user) return res.json({message: 'user already exists'});
        else {
            let user = new User({
                email: req.body.email,
                googleId: req.body.googleId,
                name: req.body.name
            });

            user.save()
                .then((user) => {
                    return res.json({message: 'user created'})
                })
                .catch((err) => {
                    return res.status(404).json({message: 'error'});
                })
        }
    });
}

module.exports.complete_user_profile = (req, res) => {
    User.findOne({email: req.params.email}, (err, user) => {
        if (err) return res.status(404).json({message: 'error'});
        if (user) {
            let userDetails = {
                imageUrl: req.body.imageUrl,
                phone: req.body.phone,
                username: req.body.username,
                wallet: {
                    budget: req.body.budget,
                    spent: 0
                }
            };

            User.updateOne({email: user.email}, userDetails, (err, userUpdated) => {
                if (err) return res.status(404).json({message: 'error'});
                return res.json({message: 'user profile completed'});
            });
        }
        else return res.json({message: 'profile not found'});
    });
}

module.exports.add_offline_transaction = (req, res) => {
    User.findOne({email: req.params.email}, (err, user) => {
        if(err) return res.status(404).json({message: 'error'});
        if(user){
            let newTransaction = new Transaction({
                type: req.body.type,
                amount: req.body.amount,
                userId: user._id
            });

            newTransaction.save()
                .then((transaction) => {
                    let updateContent = {
                        wallet: {
                            budget: user.wallet.budget,
                            spent: user.wallet.spent + Number(req.body.amount)
                        }
                    };

                    User.updateOne({email: user.email}, updateContent, (err, dataUpdated) => {
                        if(err) return res.status(404).json({message: 'error'});
                        return res.json({message: 'transaction recorded'});
                    });
                })
                .catch((err) => {
                    return res.status(404).json({message: 'error'});
                });
        }
        else return res.status(400).json({message: 'no user found'});
    })
}

module.exports.user_profile = (req, res) => {
    User.findOne({email: req.params.email}, (err, user) => {
        if(err) return res.status(404).json({message: 'error', user: ''});
        if(user){
            res.json({message: 'success', user: user})
        }
        else return res.status(400).json({message: 'no user found', user: ''});
    })
}

module.exports.edit_user_budget = (req, res) => {
    User.findOne({email: req.params.email}, (err, user) => {
        if(err) return res.status(404).json({message: 'error'});
        if(user){
            let newBudget = {
                wallet: {
                    budget: req.body.budget,
                    spent: user.wallet.spent
                }
            }

            User.updateOne({email: user.email}, newBudget, (err,updatedBudget) => {
                if(err) return res.status(404).json({message: 'error'});
                return res.json({message: 'budget updated'});
            })
        }
        else return res.status(400).json({message: 'no user found'});
    })
}

module.exports.transactions_in_last_month = (req, res) => {
    User.findOne({email: req.params.email}, (err, user) => {
        if(err) return res.status(404).json({message: 'error', transactions: ''});
        if(user){
            let today = new Date;
            let monthago = new Date(today.setDate(today.getDate() - 30))

            Transaction.find({created_at: {$gt: monthago}}, (err, transactions) => {
                if(err) return res.status(404).json({message: 'error'});
                return res.json({message: 'success', transactions:  transactions})
            });
        }
        else return res.status(400).json({message: 'no user found', transactions: ''});
    })
}

