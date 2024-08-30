export const getSingleProperty = async (propertyId) => {
  try {
    const fetchedData = await fetch(`/api/prop-planner/property/${propertyId}`);
    if (!fetchedData.ok) {
      const msg = await fetchedData.json();
      throw new Error(msg.msg);
    }
    const data = await fetchedData.json();
    return { auth: true, propertyData: data };
  } catch (err) {
    return { auth: false };
  }
};

export const getAllProperties = async () => {
  try {
    const response = await fetch("/api/prop-planner/properties");
    if (!response.ok) {
      const msg = await response.json();
      throw new Error(msg.msg);
    } else {
      const data = await response.json();
      return { auth: true, propertyData: data };
    }
  } catch (err) {
    return { auth: false };
  }
};

//Function to Add a property
export const addPropertySubmit = async (values) => {
  const propertyName = values.name;
  const propertyType = values.property_type.value;
  const description = values.description;
  const address1 = values.address1;
  const address2 = values.address2;
  const city = values.city;
  const state = values.state.value;
  const zip = values.zip;
  const yearBuilt = values.year_built;
  const totalUnits = values.total_units;
  const offerAmt = values.offer_amount;
  const propertyValue = values.property_value;
  const closingAmt = values.closing_amount;
  const taxRate = values.tax_rate;
  const appreciation = values.appreciation;
  const rentIncrease = values.annual_rent_increase;
  const expenseIncrease = values.annual_expense_increase;
  const vacancy = values.vacancy;
  //create the payload object
  const payload = {
    propertyInfo: {
      name: propertyName,
      property_type: propertyType,
      description: description,
      address1: address1,
      address2: address2,
      city: city,
      state: state,
      zip: zip,
      year_built: yearBuilt,
      total_units: totalUnits,
    },
    financial: {
      offer_amount: offerAmt,
      property_value: propertyValue,
      closing_amount: closingAmt,
      tax_rate: taxRate,
    },
    market: {
      appreciation: appreciation,
      annual_rent_increase: rentIncrease,
      annual_expense_increase: expenseIncrease,
      vacancy: vacancy,
    },
  };
  //Send the property info data
  const propertyResponse = await fetch("/api/prop-planner/property", {
    method: "POST",
    body: JSON.stringify(payload.propertyInfo),
    headers: { "Content-Type": "application/json" },
  });
  //Get the JSON response to obtain the newly created property ID
  const propertyInfo = await propertyResponse.json();
  //Set the property ID
  payload.financial.property_id = propertyInfo.id;
  payload.market.property_id = propertyInfo.id;
  //Send the financial data
  const financialResponse = await fetch(
    "/api/prop-planner/property/financial",
    {
      method: "POST",
      body: JSON.stringify(payload.financial),
      headers: { "Content-Type": "application/json" },
    }
  );
  //Send the market data
  const marketResponse = await fetch("/api/prop-planner/property/market", {
    method: "POST",
    body: JSON.stringify(payload.market),
    headers: { "Content-Type": "application/json" },
  });
  //If responses are Ok, then redirect to the property listing page.
  if (propertyResponse.ok && financialResponse.ok && marketResponse.ok) {
    document.location.replace("/property/" + propertyInfo.id);
  } else {
    alert("Failed save property.");
  }
};

export const updateProperty = async (values, handleClose, setPropertyData) => {
  values.state = values.state.value;
  values.property_type = values.property_type.value;
  const updateResponse = await fetch(
    "/api/prop-planner/property/" + values.id,
    {
      method: "PUT",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
    }
  );

  if (updateResponse.ok) {
    const updatedData = await updateResponse.json();
    await setPropertyData(updatedData.propertyData);

    handleClose();
  } else {
    alert("Failed Update nfo.");
  }
};

//Function to update financials
export const updateFinancialInfo = async (
  values,
  handleClose,
  setPropertyData
) => {
  const financialId = values.id;

  //create the payload object
  const payload = {
    financial: {
      offer_amount: values.offer_amount,
      property_value: values.property_value,
      closing_amount: values.closing_amount,
      tax_rate: values.tax_rate,
      property_id: values.property_id,
    },
  };
  //Send the financial info data
  const financialResponse = await fetch(
    "/api/prop-planner/property/financial/" + financialId,
    {
      method: "PUT",
      body: JSON.stringify(payload.financial),
      headers: { "Content-Type": "application/json" },
    }
  );
  //If response is Ok, then redirect to the property listing page.
  if (financialResponse.ok) {
    const updatedData = await financialResponse.json();
    await setPropertyData(updatedData.propertyData);

    handleClose();
  } else {
    alert("Failed save financial info.");
  }
};

//Function to update market data
export const updateMarketInfo = async (
  values,
  handleClose,
  setPropertyData
) => {
  const marketId = values.id;

  //create the payload object
  const payload = {
    market: {
      appreciation: values.appreciation,
      annual_rent_increase: values.annual_rent_increase,
      annual_expense_increase: values.annual_expense_increase,
      vacancy: values.vacancy,
      property_id: values.property_id,
    },
  };
  //Send the market info data
  const marketResponse = await fetch(
    "/api/prop-planner/property/market/" + marketId,
    {
      method: "PUT",
      body: JSON.stringify(payload.market),
      headers: { "Content-Type": "application/json" },
    }
  );
  //If response is Ok, then redirect to the property listing page.
  if (marketResponse.ok) {
    const updatedData = await marketResponse.json();
    await setPropertyData(updatedData.propertyData);
    handleClose();
  } else {
    alert("Failed save market info.");
  }
};

//Function to add income data
export const updateIncome = async (values, handleClose, setPropertyData) => {
  const incomeId = !!values.id ? values.id : "";

  //create the payload object
  const payload = {
    income: {
      description: values.description.value,
      amount: values.amount,
      property_id: values.property_id,
    },
  };
  if (incomeId == "") {
    //Send the income data
    const incomeResponse = await fetch("/api/prop-planner/property/income/", {
      method: "POST",
      body: JSON.stringify(payload.income),
      headers: { "Content-Type": "application/json" },
    });
    //If response is Ok, then redirect to the property listing page.
    if (incomeResponse.ok) {
      const updatedData = await incomeResponse.json();
      await setPropertyData(updatedData.propertyData);
      handleClose();
    } else {
      alert("Failed save income info.");
    }
  } else {
    const incomeResponse = await fetch(
      "/api/prop-planner/property/income/" + incomeId,
      {
        method: "PUT",
        body: JSON.stringify(payload.income),
        headers: { "Content-Type": "application/json" },
      }
    );
    //If response is Ok, then redirect to the property listing page.
    if (incomeResponse.ok) {
      const updatedData = await incomeResponse.json();
      await setPropertyData(updatedData.propertyData);
      handleClose();
    } else {
      alert("Failed save income info.");
    }
  }
};

//Function to add expense data
export const updateExpense = async (values, handleClose, setPropertyData) => {
  const expenseId = !!values.id ? values.id : "";
  //create the payload object
  const payload = {
    expense: {
      description: values.description.value,
      amount: values.amount,
      property_id: values.property_id,
    },
  };
  if (expenseId == "") {
    //Send the expense data
    const expenseResponse = await fetch("/api/prop-planner/property/expense/", {
      method: "POST",
      body: JSON.stringify(payload.expense),
      headers: { "Content-Type": "application/json" },
    });
    //If response is Ok, then redirect to the property listing page.
    if (expenseResponse.ok) {
      const updatedData = await expenseResponse.json();
      await setPropertyData(updatedData.propertyData);
      handleClose();
    } else {
      alert("Failed save expense info.");
    }
  } else {
    const expenseResponse = await fetch(
      "/api/prop-planner/property/expense/" + expenseId,
      {
        method: "PUT",
        body: JSON.stringify(payload.expense),
        headers: { "Content-Type": "application/json" },
      }
    );
    //If response is Ok, then redirect to the property listing page.
    if (expenseResponse.ok) {
      const updatedData = await expenseResponse.json();
      await setPropertyData(updatedData.propertyData);
      handleClose();
    } else {
      alert("Failed save expense info.");
    }
  }
};

//Function to add income data
export const updateMortgage = async (values, handleClose, setPropertyData) => {
  const mortgageId = !!values.id ? values.id : "";
  //create the payload object
  const payload = {
    mortgage: {
      property_id: values.property_id,
      lender: values.lender,
      loan_amount: values.loan_amount,
      rate: values.rate,
      term: values.term,
      payment: values.payment,
    },
  };
  if (mortgageId == "") {
    //Send the mortgage data
    const mortgageResponse = await fetch(
      "/api/prop-planner/property/mortgage/",
      {
        method: "POST",
        body: JSON.stringify(payload.mortgage),
        headers: { "Content-Type": "application/json" },
      }
    );
    //If response is Ok, then redirect to the property listing page.
    if (mortgageResponse.ok) {
      const updatedData = await mortgageResponse.json();
      await setPropertyData(updatedData.propertyData);
      handleClose();
    } else {
      alert("Failed save mortgage info.");
    }
  } else {
    const mortgageResponse = await fetch(
      "/api/prop-planner/property/mortgage/" + mortgageId,
      {
        method: "PUT",
        body: JSON.stringify(payload.mortgage),
        headers: { "Content-Type": "application/json" },
      }
    );
    //If response is Ok, then redirect to the property listing page.
    if (mortgageResponse.ok) {
      const updatedData = await mortgageResponse.json();
      await setPropertyData(updatedData.propertyData);
      handleClose();
    } else {
      alert("Failed save mortgage info.");
    }
  }
};
// function to delete a submitted item
export const deleteSubmit = async (values, handleClose, setPropertyData) => {
  console.log(values);
  const id = values.id;
  const property_id = values.property_id;
  const deleteType = values.deleteType;
  let url;

  if (deleteType === "property") {
    url = "/api/prop-planner/property/" + id;
  } else {
    url =
      "/api/prop-planner/property/" + deleteType + "/" + id + "/" + property_id;
  }

  const deleteResponse = await fetch(url, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  //If response is Ok, then redirect to the property listing page.
  if (deleteResponse.ok) {
    const updatedData = await deleteResponse.json();
    await setPropertyData(updatedData.propertyData);
    handleClose();
  } else {
    alert("Failed delete nfo.");
  }
};

//function to calculate the mortgage payment.
export const mortgageCalc = (values) => {
  const loanAmount = values.loan_amount;
  const rate = values.rate;
  const term = values.term;

  if (loanAmount !== "" && rate !== "" && term !== "") {
    // Convert annual interest rate to monthly rate
    const monthlyRate = rate / 12 / 100;
    // Calculate the number of monthly payments
    const numberOfPayments = term;
    // Calculate the monthly mortgage payment
    const payment =
      (loanAmount *
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    return Math.round(payment * 100) / 100;
  } else {
    return "";
  }
};
