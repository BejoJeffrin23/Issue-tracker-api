define({ "api": [
  {
    "group": "Issue",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/:issueId/getone",
    "title": "Fetch a particular issue",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>Id of the issue. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"Issue fetched successfully\",\n           \"status\": 200,\n           \"data\": {\n                       assignee: \"Ashok\"\n                       comments: []\n                       createdOn: \"2019-09-01T10:21:42.000Z\"\n                       description: \"Issue is solved\"\n                       issueId: \"Sg7SdDAC2_\"\n                       issueTitle: \"Issue\"\n                       productImage: [\"uploads\\1545465302072image\"]\n                       reporterName: \"Shiva\"\n                       status: \"Backlog\"\n                       watchers: []\n                   }\n           }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "Issue",
    "name": "GetApiV1UsersIssueidGetone"
  },
  {
    "group": "Issue",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/issues",
    "title": "Get All Issues",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"All issues fetched successfully\",\n           \"status\": 200,\n           \"data\": [{\n                       assignee: \"Ashok\"\n                       comments: []\n                       createdOn: \"2019-09-01T10:21:42.000Z\"\n                       description: \"Issue is solved\"\n                       issueId: \"Sg7SdDAC2_\"\n                       issueTitle: \"Issue\"\n                       productImage: [\"uploads\\1545465302072image\"]\n                       reporterName: \"Shiva\"\n                       status: \"Backlog\"\n                       watchers: []\n                   }]\n           }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "Issue",
    "name": "GetApiV1UsersIssues"
  },
  {
    "group": "Issue",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/create",
    "title": "Create Issue",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueTitle",
            "description": "<p>Title of the issue. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "description",
            "description": "<p>description of the issue. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "status",
            "description": "<p>status of the issue. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "productImage",
            "description": "<p>Image of the issue. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"Issue created successfully\",\n           \"status\": 200,\n           \"data\": {\n                       assignee: \"Ashok\"\n                       comments: []\n                       createdOn: \"2019-09-01T10:21:42.000Z\"\n                       description: \"Issue is solved\"\n                       issueId: \"Sg7SdDAC2_\"\n                       issueTitle: \"Issue\"\n                       productImage: [\"uploads\\1545465302072image\"]\n                       reporterName: \"Shiva\"\n                       status: \"Backlog\"\n                       watchers: []\n                   }\n           }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "Issue",
    "name": "PostApiV1UsersCreate"
  },
  {
    "group": "Issue",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/:issueId/delete",
    "title": "Delete an issue",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>Id of the issue. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"Issue deleted successfully\",\n           \"status\": 200,\n           \"data\": null\n           }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "Issue",
    "name": "PostApiV1UsersIssueidDelete"
  },
  {
    "group": "Issue",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/users/:issueId/comment",
    "title": "Comment on a particular issue",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>Id of the issue. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"Issue fetched successfully\",\n           \"status\": 200,\n           \"data\": {\n                       [{comment: \"hiiii\"\n                       date: 1567747292510\n                       name: \"Bejo jeffrin\"}]\n                   }\n           }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "Issue",
    "name": "PutApiV1UsersIssueidComment"
  },
  {
    "group": "Issue",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/users/:issueId/edit",
    "title": "Edit an issue",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>Id of the issue. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"Issue edited successfully\",\n           \"status\": 200,\n           \"data\": {\n                       assignee: \"Ashok\"\n                       comments: []\n                       createdOn: \"2019-09-01T10:21:42.000Z\"\n                       description: \"Issue is solved\"\n                       issueId: \"Sg7SdDAC2_\"\n                       issueTitle: \"Issue\"\n                       productImage: [\"uploads\\1545465302072image\"]\n                       reporterName: \"Shiva\"\n                       status: \"Backlog\"\n                       watchers: []\n                   }\n           }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "Issue",
    "name": "PutApiV1UsersIssueidEdit"
  },
  {
    "group": "Issue",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/users/:issueId/watch",
    "title": "Add as watcher on a particular issue",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>Id of the issue. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"Issue fetched successfully\",\n           \"status\": 200,\n           \"data\": {\n                      {\n                          watcher:\"Virat Kholi\"\n                      }\n                   }\n           }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "Issue",
    "name": "PutApiV1UsersIssueidWatch"
  },
  {
    "group": "User",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/users/allUsers",
    "title": "Get all Users data",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n        \"error\": false,\n        \"message\": \"All users fetched successfully\",\n        \"status\": 200,\n        \"data\": [{\n                \"userId\": \"-E9zxTYA8\",\n                \"firstName\": \"Pranav\",\n                \"lastName\": \"jeffrin\",\n                \"email\": \"someone@gmail.com\",\n                \"createdOn\": \"Date\",\n                 \"mobileNumber\": 2234435524,\n          \n            }]\n        }\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n     \"error\": true,\n     \"message\": \"Error Occured\",\n     \"status\": 500/404,\n     \"data\": null\n    }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "User",
    "name": "GetApiUsersAllusers"
  },
  {
    "group": "User",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/google",
    "title": "Login with Google",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n          \"error\": false,\n          \"message\": \"User created /Logged in successfully\",\n          \"status\": 201,\n          \"data\": {\n                     firstName: 'Bejo',\n                     lastName: 'Jeffrin',\n                     email: 'someone1@gmail.com'\n                  }\n              }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n           \"error\": true,\n           \"message\": \"Error Occured\",\n           \"status\": 500/404,\n           \"data\": null\n          }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "User",
    "name": "PostApiV1UsersGoogle"
  },
  {
    "group": "User",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/login",
    "title": "user login.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    {\n       \"error\": false,\n       \"message\": \"Login Successful\",\n       \"status\": 200,\n       \"data\": {\n           \"authToken\": \"eyJhbGciOiJIUertyuiopojhgfdwertyuVCJ9.MCwiZXhwIjoxNTIwNDI29tIiwibGFzdE5hbWUiE4In19.hAR744xIY9K53JWm1rQ2mc\",\n           \"userDetails\": {\n           \"mobileNumber\": 2234435524,\n           \"email\": \"someone@mail.com\",\n           \"lastName\": \"Sengar\",\n           \"firstName\": \"Rishabh\",\n           \"userId\": \"-E9zxTYA8\"\n       }\n   }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n           \"error\": true,\n           \"message\": \"Error message\",\n           \"status\": 500/404/403,\n           \"data\": null\n          }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "User",
    "name": "PostApiV1UsersLogin"
  },
  {
    "group": "User",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/logout",
    "title": "to logout user.",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Logged Out Successfully\",\n    \"status\": 200,\n    \"data\": null\n\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n           \"error\": true,\n           \"message\": \"Error message\",\n           \"status\": 500/404/403,\n           \"data\": null\n          }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "User",
    "name": "PostApiV1UsersLogout"
  },
  {
    "group": "User",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/signup",
    "title": "SignUp User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>First name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>lastName of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "number",
            "description": "<p>mobile number of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n          \"error\": false,\n          \"message\": \"User created successfully\",\n          \"status\": 200,\n          \"data\": {\n                  \"mobileNumber\": 2234435524,\n                  \"email\": \"someone@mail.com\",\n                  \"lastName\": \"Sengar\",\n                  \"firstName\": \"Rishabh\",\n                  \"userId\": \"-E9zxTYA8\"\n                  \"createdOn\": \"date\"\n                  }\n              }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n           \"error\": true,\n           \"message\": \"Error message\",\n           \"status\": 500/404/403,\n           \"data\": null\n          }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "User",
    "name": "PostApiV1UsersSignup"
  }
] });
