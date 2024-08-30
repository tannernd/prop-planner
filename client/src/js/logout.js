const logout = async () => {
  // Make a POST request to destroy the session on the back end
  const response = await fetch("/api/prop-planner/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    sessionStorage.setItem("loggedOut", "true");
  } else {
    alert(response.statusText);
  }
};

export default logout;
