const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('../libs/timeLib');
const passwordLib = require('../libs/generatePasswordLib');
const response = require('../libs/responseLib')
const logger = require('../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib');
const check = require('../libs/checkLib');
const token = require('../libs/tokenLib');
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage })

/* Models */
const UserModel = mongoose.model('UserModel')
const AuthModel = mongoose.model('AuthModel')
const IssueModel = mongoose.model('IssueModel')


// start user signup function 

let signUpFunction = (req, res) => {

    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                if (!validateInput.Email(req.body.email)) {
                    let apiResponse = response.generate(true, 'Email Does not met the requirement', 400, null)
                    reject(apiResponse)
                } else if (check.isEmpty(req.body.password)) {
                    let apiResponse = response.generate(true, '"password" parameter is missing"', 400, null)
                    reject(apiResponse)
                } else {
                    resolve(req)
                }
            } else {
                logger.error('Field Missing During User Creation', 'userController: createUser()', 5)
                let apiResponse = response.generate(true, 'One or More Parameter(s) is missing', 400, null)
                reject(apiResponse)
            }
        })
    }// end validate user input
    let createUser = () => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ email: req.body.email })
                .exec((err, retrievedUserDetails) => {
                    if (err) {
                        logger.error(err.message, 'userController: createUser', 10)
                        let apiResponse = response.generate(true, 'Failed To Create User', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(retrievedUserDetails)) {
                        console.log(req.body)
                        let newUser = new UserModel({
                            userId: shortid.generate(),
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email.toLowerCase(),
                            mobileNumber: req.body.mobileNumber,
                            password: passwordLib.hashpassword(req.body.password),
                            createdOn: time.now()
                        })
                        newUser.save((err, newUser) => {
                            if (err) {
                                console.log(err)
                                logger.error(err.message, 'userController: createUser', 10)
                                let apiResponse = response.generate(true, 'Failed to create new User', 500, null)
                                reject(apiResponse)
                            } else {
                                let newUserObj = newUser.toObject();


                                resolve(newUserObj)
                            }
                        })
                    } else {
                        logger.error('User Cannot Be Created.User Already Present', 'userController: createUser', 4)
                        let apiResponse = response.generate(true, 'User Already Present With this Email', 403, null)
                        reject(apiResponse)
                    }
                })
        })
    }// end create user function


    validateUserInput(req, res)
        .then(createUser)
        .then((resolve) => {
            delete resolve.password
            let apiResponse = response.generate(false, 'User created successfully', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

}// end user signup function 



// start of login function 
let loginFunction = (req, res) => {
    let findUser = () => {
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                console.log(req.body);
                UserModel.findOne({ email: req.body.email }, (err, userDetails) => {
                    /* handle the error here if the User is not found */
                    if (err) {
                        logger.error('Failed To Retrieve User Data', 'userController: findUser()', 10)
                        /* generate the error message and the api response message here */
                        let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(userDetails)) {
                        /* generate the response and the console error message here */
                        logger.error('No User Found', 'userController: findUser()', 7)
                        let apiResponse = response.generate(true, 'No User Details Found', 404, null)
                        reject(apiResponse)
                    } else {
                        /* prepare the message and the api response here */
                        logger.info('User Found', 'userController: findUser()', 10)
                        resolve(userDetails)
                    }
                });

            } else {
                let apiResponse = response.generate(true, '"email" parameter is missing', 400, null)
                reject(apiResponse)
            }
        })
    }
    let validatePassword = (retrievedUserDetails) => {
        return new Promise((resolve, reject) => {
            passwordLib.comparePassword(req.body.password, retrievedUserDetails.password, (err, isMatch) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'userController: validatePassword()', 10)
                    let apiResponse = response.generate(true, 'Login Failed', 500, null)
                    reject(apiResponse)
                } else if (isMatch) {
                    let retrievedUserDetailsObj = retrievedUserDetails.toObject()
                    delete retrievedUserDetailsObj.password
                    delete retrievedUserDetailsObj._id
                    delete retrievedUserDetailsObj.__v
                    delete retrievedUserDetailsObj.createdOn
                    delete retrievedUserDetailsObj.modifiedOn
                    resolve(retrievedUserDetailsObj)
                } else {
                    logger.info('Login Failed Due To Invalid Password', 'userController: validatePassword()', 10)
                    let apiResponse = response.generate(true, 'Wrong Password.Login Failed', 400, null)
                    reject(apiResponse)
                }
            })
        })
    }

    let generateToken = (userDetails) => {
        return new Promise((resolve, reject) => {
            token.generateToken(userDetails, (err, tokenDetails) => {
                if (err) {
                    console.log(err)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else {
                    tokenDetails.userId = userDetails.userId
                    tokenDetails.userDetails = userDetails
                    resolve(tokenDetails)
                }
            })
        })
    }
    let saveToken = (tokenDetails) => {
        return new Promise((resolve, reject) => {
            AuthModel.findOne({ userId: tokenDetails.userId }, (err, retrievedTokenDetails) => {
                if (err) {
                    console.log(err.message, 'userController: saveToken', 10)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(retrievedTokenDetails)) {
                    let newAuthToken = new AuthModel({
                        userId: tokenDetails.userId,
                        authToken: tokenDetails.token,
                        tokenSecret: tokenDetails.tokenSecret,
                        tokenGenerationTime: time.now()
                    })
                    newAuthToken.save((err, newTokenDetails) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails

                            }
                            console.log(responseBody)
                            resolve(responseBody)
                        }
                    })
                } else {
                    retrievedTokenDetails.authToken = tokenDetails.token
                    retrievedTokenDetails.tokenSecret = tokenDetails.tokenSecret
                    retrievedTokenDetails.tokenGenerationTime = time.now()
                    retrievedTokenDetails.save((err, newTokenDetails) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                }
            })
        })
    }

    findUser(req, res)
        .then(validatePassword)
        .then(generateToken)
        .then(saveToken)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Login Successful', 200, resolve)
            res.status(200)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log("errorhandler");
            console.log(err);
            res.status(err.status)
            res.send(err)
        })
}

// end of the login function 



//start Google login function

let GooglesignUpFunction = (req, res) => {

    let findUser = () => {
        console.log("findUser");
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                console.log("req body email is there");
                console.log(req.body);
                UserModel.findOne({ email: req.body.email }, (err, userDetails) => {
                    /* handle the error here if the User is not found */
                    if (err) {
                        console.log(err)
                        logger.error('Failed To Retrieve User Data', 'userController: findUser()', 10)
                        /* generate the error message and the api response message here */
                        let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                        reject(apiResponse)
                        /* if Company Details is not found */
                    } else if (check.isEmpty(userDetails)) {
                        /* generate the response and the console error message here */
                        return new Promise((resolve, reject) => {
                            UserModel.findOne({ email: req.body.email })
                                .exec((err, retrievedUserDetails) => {
                                    if (err) {
                                        logger.error(err.message, 'userController: createUser', 10)
                                        let apiResponse = response.generate(true, 'Failed To Create User', 500, null)
                                        reject(apiResponse)
                                    } else if (check.isEmpty(retrievedUserDetails)) {
                                        let newUser = new UserModel({
                                            userId: shortid.generate(),
                                            firstName: req.body.firstName,
                                            lastName: req.body.lastName,
                                            email: req.body.email.toLowerCase(),
                                            mobileNumber: req.body.mobileNumber,
                                            createdOn: time.now()
                                        })
                                        newUser.save((err, newUser) => {
                                            if (err) {
                                                logger.error(err.message, 'userController: createUser', 10)
                                                let apiResponse = response.generate(true, 'Failed to create new User', 500, null)
                                                reject(apiResponse)
                                            } else {
                                                let userDetails = newUser.toObject();
                                                delete userDetails.password
                                                delete userDetails._id
                                                delete userDetails.__v
                                                delete userDetails.createdOn
                                                delete userDetails.modifiedOn

                                                resolve(userDetails)
                                            }
                                        })
                                    } else {
                                        logger.error('User Cannot Be Created.User Already Present', 'userController: createUser', 4)
                                        let apiResponse = response.generate(true, 'User Already Present With this Email', 403, null)
                                        reject(apiResponse)
                                    }
                                })
                        })
                    } else {
                        /* prepare the message and the api response here */
                        logger.info('User Found', 'userController: findUser()', 10)
                        resolve(userDetails)
                    }
                });

            } else {
                let apiResponse = response.generate(true, '"email" parameter is missing', 400, null)
                reject(apiResponse)
            }
        })
    }

    let generateToken = (userDetails) => {
        console.log("generate token");
        return new Promise((resolve, reject) => {
            token.generateToken(userDetails, (err, tokenDetails) => {
                if (err) {
                    console.log(err)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else {
                    tokenDetails.userId = userDetails.userId
                    tokenDetails.userDetails = userDetails
                    resolve(tokenDetails)
                }
            })
        })
    }
    let saveToken = (tokenDetails) => {
        console.log("save token");
        return new Promise((resolve, reject) => {
            AuthModel.findOne({ userId: tokenDetails.userId }, (err, retrievedTokenDetails) => {
                if (err) {
                    console.log(err.message, 'userController: saveToken', 10)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(retrievedTokenDetails)) {
                    let newAuthToken = new AuthModel({
                        userId: tokenDetails.userId,
                        authToken: tokenDetails.token,
                        tokenSecret: tokenDetails.tokenSecret,
                        tokenGenerationTime: time.now()
                    })
                    newAuthToken.save((err, newTokenDetails) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails

                            }
                            resolve(responseBody)
                        }
                    })
                } else {
                    retrievedTokenDetails.authToken = tokenDetails.token
                    retrievedTokenDetails.tokenSecret = tokenDetails.tokenSecret
                    retrievedTokenDetails.tokenGenerationTime = time.now()
                    retrievedTokenDetails.save((err, newTokenDetails) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                }
            })
        })
    }



    findUser(req, res)
        .then(generateToken)
        .then(saveToken)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Login Successful', 200, resolve)
            res.status(200)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log("errorhandler");
            console.log(err);
            res.status(err.status)
            res.send(err)
        })
}
//end of Google login function







// start of log-out function

let logout = (req, res) => {
    AuthModel.findOneAndRemove({ userId: req.user.userId }, (err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'user Controller: logout', 10)
            let apiResponse = response.generate(true, `error occurred: ${err.message}`, 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            let apiResponse = response.generate(true, 'Already Logged Out or Invalid UserId', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Logged Out Successfully', 200, null)
            res.send(apiResponse)
        }
    })
} // end of the logout function.

// function to create issue
let createIssue = (req, res) => {
    const url = req.protocol + '://' + req.get("host");
    console.log(req.file)

    let newIssue = new IssueModel({

        issueId: shortid.generate(),
        issueTitle: req.body.issueTitle,
        reporterName: req.body.reporterName,
        status: req.body.status,
        description: req.body.description,
        assignee: req.body.assignee || ' ',
        createdOn: time.now(),
        productImage: req.file.path


    })

    newIssue.save((err, result) => {

        if (err) {
            console.log(err)
            logger.error(`Error occured : ${err}`, 'Database', 10)
            let apiResponse = response.generate(true, 'Failed to register issue', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            let apiResponse = response.generate(true, 'Issue not found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Issue registered', 200, result)
            res.send(apiResponse)
        }

    })

}
//end of create issue function


//function to get all users
let getAllUser = (req, res) => {
    UserModel.find()
        .select(' -__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'User Controller: getAllUser', 10)
                let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No User Found', 'User Controller: getAllUser')
                let apiResponse = response.generate(true, 'No User Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All User Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end get all users



//function to get all issues
let getallIssue = (req, res) => {
    IssueModel.find()
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                let apiResponse = response.generate(true, 'failed to find', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                let apiResponse = response.generate(true, 'failed to find', 404, null)

                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All issues fetched ', 200, result)
                res.send(apiResponse)
            }
        })
}
// end of get all issues function

//function to delete an issue 
let deleteIssue = (req, res) => {
    IssueModel.remove({ 'issueId': req.params.issueId }, (err, result) => {
        if (err) {
            let apiResponse = response.generate(true, 'error', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            let apiResponse = response.generate(true, 'no issue found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Issue deleted successfully', 200, result)
            res.send(apiResponse)
        }
    })
}
//end of delete issue function


//function to edit an issue
let editIssue = (req, res) => {
    let options = req.body;
    if (req.file) { options.productImage = req.file.path; }
    IssueModel.update({ 'issueId': req.params.issueId }, options, { multi: true })
        .exec(
            (err, result) => {
                if (err) {
                    console.log(err)
                    let apiResponse = response.generate(true, 'error', 500, null)
                    res.send(apiResponse)
                } else if (check.isEmpty(result)) {
                    let apiResponse = response.generate(true, 'issue not found', 404, null)
                    res.send(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'issue edited successfully', 200, result)
                    res.send(apiResponse)
                }
            }
        )
}
//end of edit issue function

//function to fetch a single issue
let viewSingleIssue = (req, res) => {
    IssueModel.findOne({ 'issueId': req.params.issueId })
        .exec((err, result) => {
            if (err) {
                console.log(err)
                let apiResponse = response.generate(true, 'error', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                let apiResponse = response.generate(true, 'issue not found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'Issue fetched successfully', 200, result)
                res.send(apiResponse)
            }
        })
}
//end of view single issue function 

//function to add comment to a function
let Comment = (req, res) => {
    IssueModel.findOne({ 'issueId': req.params.issueId })
        .exec((err, result) => {
            if (err) {
                console.log(err)
                let apiResponse = response.generate(true, 'error', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                let apiResponse = response.generate(true, 'issue not found', 404, null)
                res.send(apiResponse)
            } else {
                result.comments = result.comments.concat(req.body)
                console.log(req.body)
                console.log(result)
                result.save(function (err, result) {
                    if (err) {
                        console.log(err)
                        let apiResponse = response.generate(true, 'error at save', 500, null)
                        res.send(apiResponse)
                    } else {
                        let apiResponse = response.generate(false, 'comment successfull', 200, result)
                        res.send(apiResponse)
                    }
                })

            }
        })
}
//end of add comment function

// function to add user to watcher list
let Watch = (req, res) => {
    IssueModel.findOne({ 'issueId': req.params.issueId })
        .exec((err, result) => {
            if (err) {
                console.log(err)
                let apiResponse = response.generate(true, 'error', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                let apiResponse = response.generate(true, 'issue not found', 404, null)
                res.send(apiResponse)
            } else {
                result.watchers = result.watchers.concat(req.body)
                console.log(req.body)
                console.log(result)
                result.save(function (err, result) {
                    if (err) {
                        console.log(err)
                        let apiResponse = response.generate(true, 'error', 500, null)
                        res.send(apiResponse)
                    } else {
                        let apiResponse = response.generate(false, 'watcher added successfully', 200, result)
                        res.send(apiResponse)
                    }
                })

            }
        })
}
// end of add watcher function

module.exports = {

    signUpFunction: signUpFunction,
    loginFunction: loginFunction,
    logout: logout,
    getallIssue: getallIssue,
    createIssue: createIssue,
    deleteIssue: deleteIssue,
    editIssue: editIssue,
    viewSingleIssue: viewSingleIssue,
    GooglesignUpFunction: GooglesignUpFunction,
    getAllUser: getAllUser,
    Comment: Comment,
    Watch: Watch

}// end exports



