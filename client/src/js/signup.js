const signupFormHandler = async (values, setErrorMsg, setShowErrMsg) => {
  const firstname = values.firstname.trim();
  const lastname = values.lastname.trim();
  const email = values.email.trim();
  const password = values.password.trim();
  if (firstname && lastname && email && password) {
    const response = await fetch("/api/prop-planner/users/create", {
      method: "POST",
      body: JSON.stringify({ firstname, lastname, email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      setShowErrMsg(false);
      document.location.replace("/dashboard");
    } else {
      const errorData = await response.json();
      setErrorMsg(errorData.msg || "An error occurred during sign up");
      setShowErrMsg(true);
    }
  }
};

export default signupFormHandler;
