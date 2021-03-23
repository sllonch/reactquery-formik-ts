import * as yup from "yup";

const phoneRegExp = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;

export const validationSchema = yup.object().shape({
  name: yup.string().required("Required"),
  email: yup.string().email("Invalid email format").required("Required"),
  phone: yup.string().matches(phoneRegExp, "Phone number is not valid"),
});
