export const createUserValidationSchema = {
    userName: {
        isLength: {
            options: { //options ya bukan option 
                min: 5,
                max: 32,
            },
            errorMessage: "username at least 5 to 32"
        },
        isString: {
            errorMessage: "username should be string"
        }
    },
    password: {
        notEmpty : {
            errorMessage: "Password is required"
        }
    },
    age: {
        notEmpty: true
    }
}