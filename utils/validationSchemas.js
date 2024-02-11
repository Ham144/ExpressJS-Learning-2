export const createUserValidationSchema = {
    userName: {
        isLength: {
            options: { //options ya bukan option 
                min: 5,
                max: 32,
            },
            errorMessage: "username at least 5 to 32"
        },
        notEmpty: {
            errorMessage: "Username must not be empty"
        },
        isString: {
            errorMessage: "username should be string"
        }
    },
    age: {
        notEmpty: true,
    }
}