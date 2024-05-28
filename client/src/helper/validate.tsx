import toast from "react-hot-toast";

interface FormError {
  username?: string;
  email?: string; 
  fname?: string;
  lname?: string;
  phone?:string;

}

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
  firstNameVerify(errors, values);
  lastNameVerify(errors, values);
  phoneVerify(errors, values);
  return errors;
}

/** validate register form */
export async function adminRegisterValidation(values) {
    const errors = emailVerify({}, values);
    passwordVerify(errors, values);
    // emailVerify(errors, values);
    return errors;
  }

  export async function resetPasswordValidation(values) {
    const errors = {} as FormError;
    usernameVerify(errors, values);
    passwordVerify(errors, values);
    return errors;
  }



function usernameVerify(error: FormError = {}, values: { username: string }) {
  if (!values.username) {
    error.username = toast.error("Username Required");
  } else if (values.username.includes(" ")) {
    error.username = toast.error("Invalid Username...!");
  } else if (values.username.length < 3) {
    error.username = toast.error("Invalid Username. Username should contain at least 3 letters.");
  }

  return error;
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
// function passwordVerify(error , values) {
//   if (!values.password) {
//     error.password = toast.error("Password Required...!");
//   } else if (values.password.includes(" ")) {
//     error.password = toast.error("Invalid Password...!");
//   } else if (values.password.length < 8) {
//     error.password = toast.error(
//       "Password must be more than 4 characters long...!"
//     );
//   }
// }


function passwordVerify(error, values) {
  if (!values.password) {
    error.password = toast.error("Password Required...!");
  } else if (values.password.includes(" ")) {
    error.password = toast.error("Password should not contain spaces...!");
  } else if (values.password.length < 8) {
    error.password = toast.error("Password must be at least 8 characters long...!");
  } else if (!/[a-z]/.test(values.password)) {
    error.password = toast.error("Password must contain at least one lowercase letter...!");
  } else if (!/[A-Z]/.test(values.password)) {
    error.password = toast.error("Password must contain at least one uppercase letter...!");
  } else if (!/\d/.test(values.password)) {
    error.password = toast.error("Password must contain at least one digit...!");
  } else if (!/[@$!%*?&]/.test(values.password)) {
    error.password = toast.error("Password must contain at least one special character...!");
  }

  return error;
}

function firstNameVerify(error: FormError = {}, values: { fname: string }) {
  if (!values.fname) {
    error.fname = toast.error("First Name Required");
  } else if (!/^[A-Za-z\s-]+$/.test(values.fname)) {
    error.fname = toast.error("Invalid First Name...!");
  }

  return error;
}

function lastNameVerify(error: FormError = {}, values: { lname: string }) {
  if (!values.lname) {
    error.lname = toast.error("Last Name Required");
  } else if (!/^[A-Za-z\s]+$/.test(values.lname)) {
    error.lname = toast.error("Invalid Last Name. Last name should only contain alphabets and spaces.");
  }

  return error;
}


function phoneVerify(error: FormError = {}, values: { phone: string }) {
  if (!values.phone) {
    error.phone = toast.error("Phone Number Required");
  } else if (!/^\d{10}$/g.test(values.phone)) {
    error.phone = toast.error("Invalid Phone Number. Please enter a 10-digit number without any spaces or special characters.");
  } else if (/(\d)\1{9}/.test(values.phone)) {
   
    error.phone = toast.error("Invalid Phone Number. Phone number should not contain consecutive identical digits.");
  }

  return error;
}