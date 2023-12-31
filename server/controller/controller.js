const Userdb = require('../model/model');
// var userdb = require('../model/model');

// create and save user
exports.create = (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({ message: "content can not be empty" });
        return;
    }

    // new user
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status,
    })

    // save user
    user
        .save()
        .then(data => {
             res.send(data);
            //res.redirect('/add-user');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "some error occured"
            });
        });

}

// Retrieve and return users
exports.find = (req, res) => {
    if (req.query.id) {
            const id = req.query.id;
            Userdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: `Not Found user at ${id}` });
                }
                else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "some error occured"
                })
            })
            
    } else {
        Userdb.find()
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "some error occured"
            })
        })
    }
}

// update new user
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "content can not be empty" });
        return;
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(400).send({ message: `content update user at ${id}` });
            }
            else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "some error occured while update"
            })
        })

}

// delete a user
exports.delete = (req, res) => {
    const id = req.params.id;
    Userdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `content Delete user at ${id}` });
            }
            else {
                res.send({
                    message: "User Deleted Successfully"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "some error occured while Delete"
            })
        })
}