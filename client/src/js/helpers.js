import selectOptions from "../../data/SelectOptions.json";
export const formatCurrency = (value) => {
  value =
    "$" + value.toString().replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, "$1,");

  if (value.indexOf(".") === -1) return value + ".00";

  var decimals = value.split(".")[1];

  return decimals.length < 2 ? value + "0" : value;
};

export const limit = (value, length) => value.toString().slice(0, length);

export const suffix = (value, character) =>
  value.toString().endsWith(character) ? value : value.toString() + character;

export const ipp = (index) => parseInt(index) + 1;

export const initialValueInfo = (data, modal) => {
  switch (modal) {
    case "propInfo":
      const propertyTypeOption = selectOptions.propertyTypeOptions.find(
        (option) => option.value === data.property_type
      );
      const stateOption = selectOptions.stateOptions.find(
        (option) => option.value === data.state
      );
      return {
        name: data.name,
        property_type: propertyTypeOption,
        year_built: data.year_built ? data.year_built : "",
        total_units: data.total_units ? data.total_units : "",
        description: data.description ? data.description : "",
        address1: data.address1,
        address2: data.address2 ? data.address2 : "",
        city: data.city,
        state: stateOption,
        zip: data.zip,
      };
    case "financialInfo":
      return {
        offer_amount: data.financials[0].offer_amount,
        property_value: data.financials[0].property_value,
        closing_amount: data.financials[0].closing_amount,
        tax_rate: data.financials[0].tax_rate,
      };
    case "marketInfo":
      return {
        appreciation: data.markets[0].appreciation,
        annual_rent_increase: data.markets[0].annual_rent_increase,
        annual_expense_increase: data.markets[0].annual_expense_increase,
        vacancy: data.markets[0].vacancy,
      };
    case "income":
      const incomeOption = !!data.description
        ? selectOptions.incomeOptions.find(
            (option) => option.value === data.description
          )
        : "";
      return {
        description: incomeOption,
        amount: !!data.amount ? data.amount : "",
      };
    case "expense":
      const expenseOption = !!data.description
        ? selectOptions.expenseOptions.find(
            (option) => option.value === data.description
          )
        : "";
      return {
        description: expenseOption,
        amount: !!data.amount ? data.amount : "",
      };
    case "mortgage":
      return {
        lender: !!data.lender ? data.lender : "",
        loan_amount: !!data.loan_amount ? data.loan_amount : "",
        rate: !!data.rate ? data.rate : "",
        term: !!data.term ? data.term : "",
        payment: !!data.payment ? data.payment : "",
      };
  }
};
