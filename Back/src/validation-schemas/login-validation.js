const yup = require('yup')

const loginValidationSchema = yup.object({
    username: yup.string().required('username is required'),
    password: yup.string().required('password is required'),
}).strict(true);

module.exports = loginValidationSchema