import toast from "react-hot-toast";



/* validate login page username */
export async function usernameValidate(values) {
  const errors = usernameVerify({}, values);
  return errors;
}

/* validate password */
export async function passwordValidate(values) {
  const errors = passwordVerify({}, values);
  return errors;
}

/** validate register form */
export async function registerValidation(values) {
  const errors = usernameVerify({}, values);
  passwordVerify(errors, values);
  emailVerify(errors, values);

  return errors;
}

/** validate register form */
export async function adminRegisterValidation(values) {
    const errors = emailVerify({}, values);
    passwordVerify(errors, values);
    // emailVerify(errors, values);
    return errors;
  }

/* validate username */

interface FormError {
  username?: string; // Make the username property optional with `?`
}

function usernameVerify(error: FormError = {}, values: { username: string }) {
  if (!values.username) {
    error.username = toast.error("Username Required");
  } else if (values.username.includes(" ")) {
    error.username = toast.error("Invalid Username...!");
  }

  return error;
}

/** validate email */


// function emailVerify(error = {}, values) {
//   if (!values.email) {
//     error.email = toast.error("Email Required...!");
//   } else if (values.email.includes(" ")) {
//     error.email = toast.error("Wrong Email...!");
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     error.email = toast.error("Invalid email address...!");
//   }

//   return error;
// }

interface FormError {
  email?: string; // Make the email property optional with `?`
}

function emailVerify(error: FormError = {}, values: { email: string }) {
  if (!values.email) {
    error.email = toast.error("Email Required...!");
  } else if (values.email.includes(" ")) {
    error.email = toast.error("Wrong Email...!");
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    error.email = toast.error("Invalid email address...!");
  }

  return error;
}

/* validate password */
function passwordVerify(error , values) {
  if (!values.password) {
    error.password = toast.error("Password Required...!");
  } else if (values.password.includes(" ")) {
    error.password = toast.error("Wrong Password...!");
  } else if (values.password.length < 4) {
    error.password = toast.error(
      "Password must be more than 4 characters long...!"
    );
  }
}
