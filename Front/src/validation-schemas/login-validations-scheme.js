import * as yup from 'yup';

const loginScheme = yup.object({
  username: yup.string().required('username is required'),
  password: yup.string().required('password is required'),
}).strict(true);

export default loginScheme;
