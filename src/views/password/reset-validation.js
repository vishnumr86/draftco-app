const resetValidators = {
    email: {
        rules: [
            {
                test: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Email is invalid',
            },
            {
                test: (value) => {
                    return value.length != 0;
                },
                message: 'Email cannot be empty',
            },
        ],
        errors: [],
        valid: false,
        state: '',
    }
};

export default resetValidators;