import * as yup from 'yup';

const loginValidationSchema = yup.object({
    username: yup.string().required('username is required'),
    password: yup.string().required('password is requide'),
}).strict(true);

export default loginValidationSchema