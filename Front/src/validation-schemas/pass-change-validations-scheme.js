import * as yup from 'yup';

const passChangeScheme = yup.object({
  password: yup.string()
    .required('password is required')
    .min(4, 'password must have atleast 4 symbols')
    .max(20, 'password cant have more than 20 symbols')
    .matches(/[A-Z]{1}/, 'password must have at least one upper case letter')
    .matches(/[#?!@$%^&*-]{1}/, 'password must have at least special character'),

  confirmPassword: yup.string()
    .required('confirm password is required')
    .oneOf([yup.ref('password')], 'passwords must match'),
}).strict(true);

export default passChangeScheme;
