const express = require('express');
const router = express.Router();
const userController = require("./../../app/controllers/userController");
const appConfig = require("./../../config/appConfig")
const auth = require("./../../app/middlewares/auth")
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
})

module.exports.setRouter = (app) => {

    //base url
    let baseUrl = `${appConfig.apiVersion}/users`;

    // defining routes.


    // params: firstName, lastName, email, mobileNumber, password
    app.post(`${baseUrl}/signup`, userController.signUpFunction);
    /**
        * @apiGroup User
        * @apiVersion 1.0.0
        * @api {post} /api/v1/users/signup SignUp User
        * 
        * @apiParam {String} firstName First name of the user. (body params) (required)
        * @apiParam {String} lastName lastName of the user. (body params) (required)
        * @apiParam {Number} number mobile number of the user. (body params) (required)
        * @apiParam {String} email email of the user. (body params) (required)
        * @apiParam {String} password password of the user. (body params) (required)
        *
        * @apiSuccess {object} myResponse shows error status, message, http status code, result.
        * 
        *  @apiSuccessExample {json} Success-Response:
        *  {
           "error": false,
           "message": "User created successfully",
           "status": 200,
           "data": {
                   "mobileNumber": 2234435524,
                   "email": "someone@mail.com",
                   "lastName": "Sengar",
                   "firstName": "Rishabh",
                   "userId": "-E9zxTYA8"
                   "createdOn": "date"
                   }
               }
        * @apiErrorExample {json} Error-Response:
        *
        * {
           "error": true,
           "message": "Error message",
           "status": 500/404/403,
           "data": null
          }
       */



    // params: email, password.
    app.post(`${baseUrl}/login`, userController.loginFunction);
    /**
    * @apiGroup User
    * @apiVersion  1.0.0
    * @api {post} /api/v1/users/login user login.
    *
    * @apiParam {string} email email of the user. (body params) (required)
    * @apiParam {string} password password of the user. (body params) (required)
    *
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
        {
           "error": false,
           "message": "Login Successful",
           "status": 200,
           "data": {
               "authToken": "eyJhbGciOiJIUertyuiopojhgfdwertyuVCJ9.MCwiZXhwIjoxNTIwNDI29tIiwibGFzdE5hbWUiE4In19.hAR744xIY9K53JWm1rQ2mc",
               "userDetails": {
               "mobileNumber": 2234435524,
               "email": "someone@mail.com",
               "lastName": "Sengar",
               "firstName": "Rishabh",
               "userId": "-E9zxTYA8"
           }
       }
    }
       @apiErrorExample {json} Error-Response:
        *
        * {
           "error": true,
           "message": "Error message",
           "status": 500/404/403,
           "data": null
          }
       */




    // auth token params: userId.
    app.post(`${baseUrl}/google`, userController.GooglesignUpFunction);
    /** 
        * @apiGroup User
        * @apiVersion 1.0.0
        * @api {post} /api/v1/users/google Login with Google
        * 
        * @apiSuccess {object} myResponse shows error status, message, http status code, result.

        * @apiSuccessExample {json} Success-Response:
        *  {
           "error": false,
           "message": "User created /Logged in successfully",
           "status": 201,
           "data": {
                      firstName: 'Bejo',
                      lastName: 'Jeffrin',
                      email: 'someone1@gmail.com'
                   }
               }
        * @apiErrorExample {json} Error-Response:
        *
        * {
           "error": true,
           "message": "Error Occured",
           "status": 500/404,
           "data": null
          }
        */




    app.post(`${baseUrl}/logout`, auth.isAuthorized, userController.logout);
    /**
    * @apiGroup User
    * @apiVersion  1.0.0
    * @api {post} /api/v1/users/logout to logout user.
    *    
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
        {
           "error": false,
           "message": "Logged Out Successfully",
           "status": 200,
           "data": null

       }
       * @apiErrorExample {json} Error-Response:
       *
       * {
           "error": true,
           "message": "Error message",
           "status": 500/404/403,
           "data": null
          }
   */

  app.get(`${baseUrl}/allUsers`, userController.getAllUser);
  /**
  * @apiGroup User
  * @apiVersion 1.0.0
  * @api {get} /api/users/allUsers Get all Users data
  * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
  *
  * @apiSuccess {object} myResponse shows error status, message, http status code, result.

  *  @apiSuccessExample {json} Success-Response:
  *  {
         "error": false,
         "message": "All users fetched successfully",
         "status": 200,
         "data": [{
                 "userId": "-E9zxTYA8",
                 "firstName": "Pranav",
                 "lastName": "jeffrin",
                 "email": "someone@gmail.com",
                 "createdOn": "Date",
                  "mobileNumber": 2234435524,
           
             }]
         }
     }
  * @apiErrorExample {json} Error-Response:
  *
  * {
     "error": true,
     "message": "Error Occured",
     "status": 500/404,
     "data": null
    }
 */

    app.post(`${baseUrl}/create`, upload.single('productImage'), userController.createIssue);
     /** 
     * @apiGroup Issue
     * @apiVersion 1.0.0
     * @api {post} /api/v1/users/create Create Issue
     * 
     * @apiParam {string} issueTitle Title of the issue. (body params) (required)
     * @apiParam {string} description description of the issue. (body params) (required)
     * @apiParam {string} status status of the issue. (body params) (required)
     * @apiParam {string} productImage Image of the issue. (body params) (required)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     *
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error": false,
            "message": "Issue created successfully",
            "status": 200,
            "data": {
                        assignee: "Ashok"
                        comments: []
                        createdOn: "2019-09-01T10:21:42.000Z"
                        description: "Issue is solved"
                        issueId: "Sg7SdDAC2_"
                        issueTitle: "Issue"
                        productImage: ["uploads\1545465302072image"]
                        reporterName: "Shiva"
                        status: "Backlog"
                        watchers: []
                    }
            }
     * @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/404,
	    "data": null
	   }
    */

    app.get(`${baseUrl}/issues`, userController.getallIssue);
     /** 
     * @apiGroup Issue
     * @apiVersion 1.0.0
     * @api {get} /api/v1/users/issues Get All Issues
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error": false,
            "message": "All issues fetched successfully",
            "status": 200,
            "data": [{
                        assignee: "Ashok"
                        comments: []
                        createdOn: "2019-09-01T10:21:42.000Z"
                        description: "Issue is solved"
                        issueId: "Sg7SdDAC2_"
                        issueTitle: "Issue"
                        productImage: ["uploads\1545465302072image"]
                        reporterName: "Shiva"
                        status: "Backlog"
                        watchers: []
                    }]
            }
     * @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/404,
	    "data": null
	   }
    */
    
    app.post(`${baseUrl}/:issueId/delete`, userController.deleteIssue);
      /** 
     * @apiGroup Issue
     * @apiVersion 1.0.0
     * @api {post} /api/v1/users/:issueId/delete Delete an issue
     *
     * @apiParam {string} issueId Id of the issue. (query params) (required)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error": false,
            "message": "Issue deleted successfully",
            "status": 200,
            "data": null
            }
     * @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/404,
	    "data": null
	   }
    */


    app.put(`${baseUrl}/:issueId/edit`, upload.single('productImage'), userController.editIssue);
      /** 
     * @apiGroup Issue
     * @apiVersion 1.0.0
     * @api {put} /api/v1/users/:issueId/edit Edit an issue
     * 
     * @apiParam {string} issueId Id of the issue. (query params) (required)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     *
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error": false,
            "message": "Issue edited successfully",
            "status": 200,
            "data": {
                        assignee: "Ashok"
                        comments: []
                        createdOn: "2019-09-01T10:21:42.000Z"
                        description: "Issue is solved"
                        issueId: "Sg7SdDAC2_"
                        issueTitle: "Issue"
                        productImage: ["uploads\1545465302072image"]
                        reporterName: "Shiva"
                        status: "Backlog"
                        watchers: []
                    }
            }
     * @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/404,
	    "data": null
	   }
    */

    

    app.get(`${baseUrl}/:issueId/getone`, userController.viewSingleIssue);
     /** 
     * @apiGroup Issue
     * @apiVersion 1.0.0
     * @api {get} /api/v1/users/:issueId/getone Fetch a particular issue
     * 
     * @apiParam {string} issueId Id of the issue. (query params) (required)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     *
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error": false,
            "message": "Issue fetched successfully",
            "status": 200,
            "data": {
                        assignee: "Ashok"
                        comments: []
                        createdOn: "2019-09-01T10:21:42.000Z"
                        description: "Issue is solved"
                        issueId: "Sg7SdDAC2_"
                        issueTitle: "Issue"
                        productImage: ["uploads\1545465302072image"]
                        reporterName: "Shiva"
                        status: "Backlog"
                        watchers: []
                    }
            }
     * @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/404,
	    "data": null
	   }
    */

    app.put(`${baseUrl}/:issueId/comment`, userController.Comment)
      /** 
     * @apiGroup Issue
     * @apiVersion 1.0.0
     * @api {put} /api/v1/users/:issueId/comment Comment on a particular issue
     * 
     * @apiParam {string} issueId Id of the issue. (query params) (required)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     *
     *
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error": false,
            "message": "Issue fetched successfully",
            "status": 200,
            "data": {
                        [{comment: "hiiii"
                        date: 1567747292510
                        name: "Bejo jeffrin"}]
                    }
            }
     * @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/404,
	    "data": null
	   }
    */


    app.put(`${baseUrl}/:issueId/watch`, userController.Watch)
      /** 
     * @apiGroup Issue
     * @apiVersion 1.0.0
     * @api {put} /api/v1/users/:issueId/watch Add as watcher on a particular issue
     * 
     * @apiParam {string} issueId Id of the issue. (query params) (required)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     *
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error": false,
            "message": "Issue fetched successfully",
            "status": 200,
            "data": {
                       {
                           watcher:"Virat Kholi"
                       }
                    }
            }
     * @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/404,
	    "data": null
	   }
    */


}
