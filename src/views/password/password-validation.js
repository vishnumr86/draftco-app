const passwordValidators = {
    otp: {
        rules: [
            {
                test: (value) => {
                    return value==null || value.length != 0;
                },
                message: 'otp cannot be empty',
            }
        ],
        errors: [],
        valid: false,
        state: ''
    },
    password: {
        rules: [
            {
                test: (value) => {
                    return value.length != 0;
                },
                message: 'Password cannot be empty',
            },
            {
                test: (value) => {
                    return value.length >= 6;
                },
                message: 'Password must not be shorter than 6 characters',
            }
        ],
        errors: [],
        valid: false,
        state: ''
    },
    retypePassword: {
        rules: [
            {
                test: (value) => {
                    return value.length != 0;
                },
                message: 'Retype Password cannot be empty',
            },
            {
                test: (value) => {
                    return value.length >= 6;
                },
                message: 'Retype Password must not be shorter than 6 characters',
            }, {
                test: (value, valueToCompare) => {
                    return value === valueToCompare;
                },
                fieldToCompare: "password",
                message: 'Password and Retype Password should be same',
            }
        ],

        errors: [],
        valid: false,
        state: ''
    },
};

export default passwordValidators;