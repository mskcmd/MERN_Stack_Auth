export const isEmailValid = (email, setState, ref) => {
  const emailRegx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegx.test(email)) {
    if (ref && ref.current) {
      ref.current.innerText = "Invalid email address! Please check your email";
    }
    setState(email);
    return false;
  }

  if (ref && ref.current) {
    ref.current.innerText = "";
  }

  setState(email);

  return true;
};

export const isPasswordValid = (password, setState, ref) => {
  // const passwordRegx = /^(?=.[A-Za-z])(?=.\d)[A-Za-z\d]{5,}$/;

  if (password.length < 5) {
    if (ref && ref.current) {
      ref.current.innerText = "Password should contain 5 characters";
      ref.current.style.display = "block";
    }
    setState(password);
    return false;
  }

  if (ref && ref.current) {
    ref.current.innerText = "";
    ref.current.style.display = "none";
  }

  setState(password);

  return true;
};

export const nameValidate = (name, setState, ref) => {
  const nameRegx = /^[a-zA-Z]{3,}$/;

  if (!nameRegx.test(name)) {
    if (ref && ref.current) {
      ref.current.innerText = "Invalid name! Please check name";
      ref.current.style.display = "block";
    }
    setState(name);
    return false;
  }

  if (ref && ref.current) {
    ref.current.innerText = "";
    ref.current.style.display = "none";
  }

  setState(name);

  return true;
};
