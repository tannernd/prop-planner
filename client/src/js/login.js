const loginFormHandler = async (values, setErrMsg, setShowErrorMessage) => {
  // Gather the data from the form elements on the page
  const email = values.email.trim();
  const password = values.password.trim();

  if (email && password) {
    // Send the e-mail and password to the server
    const response = await fetch("/api/prop-planner/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      setShowErrorMessage(false);
      document.location.replace("/dashboard");
    } else {
      const errorData = await response.json();
      setErrMsg(errorData.msg || "An error occurred during login");
      setShowErrorMessage(true);
    }
  }
};

export const checkLogin = async () => {
  try {
    const response = await fetch("/api/prop-planner/users/check-token");
    const data = await response.json();
    return data.logged_in;
  } catch (error) {
    console.error("Error checking session:", error);
    return false;
  }
};

export default loginFormHandler;
