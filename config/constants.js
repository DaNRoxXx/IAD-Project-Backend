module.exports = { 
    HTTP:{
        CODES:{
            SUCCESS:200,
            CREATED:201,
            UPDATE:201,
            BAD_REQUEST: 400,
            UNAUTHORIZED: 403,
            NOT_FOUND:404,
            SERVER_ERROR: 500,
        },
        METHODS:{
            POST: "post",
            GET: "get",
            DELETE: "delete",
            PUT: "put"
        }
    },
    MESSAGES:{
        SIGNUP:{
            SUCCESS:"You have successfully signed up.",
            EXIST: "User already exists.",
            ERROR: "Error occurred please contact your web administrator"
        },
        LOGIN:{
           SUCCESS:"You have successfully logged in.",
           AUTH_FAILED: "User Authentication Failed!",
           INACTIVE: "Your account is deactivated, please login again."
        },
        GENERAL:{
            FIELDS_REQUIRED: "Input fields are missing or invalid, please provide the correct required fields."
        }
     }
}