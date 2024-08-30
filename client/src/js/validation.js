import * as yup from "yup";

export const propertyInfoSchema = {
  name: yup.string().required("Please enter a property name"),
  property_type: yup
    .object({
      value: yup.string().required("Please select a property type"),
    })
    .nullable()
    .required("This field is required"),
  address1: yup.string().required("Please enter an address"),
  city: yup.string().required("Please enter a city"),
  state: yup
    .object({
      value: yup.string().required("Please select a state"),
    })
    .nullable()
    .required("This field is required"),
  zip: yup
    .string()
    .required("Please enter a ZIP code")
    .matches(/^\d{5}$/, "Must be exactly 5 digits"),
};
export const financialSchema = {
  offer_amount: yup.number().required("Please enter an offer amount"),
  property_value: yup.number().required("Please enter a property Value"),
  closing_amount: yup
    .number()
    .required("Please enter the estimated closing costs"),
  tax_rate: yup.number().required("Please enter your income tax rate"),
};
export const marketInfoSchema = {
  appreciation: yup
    .number()
    .required("Please enter the estimated appreciation rate"),
  annual_rent_increase: yup
    .number()
    .required("Please enter the planned annual rent increase rate"),
  annual_expense_increase: yup
    .number()
    .required("Please enter the planned annual expense increase rate"),
  vacancy: yup
    .number()
    .required("Please enter the estimated vacancy rate per year"),
};
export const incomeInfoSchema = {
  description: yup
    .object({
      value: yup.string().required("Please select an income description"),
    })
    .nullable()
    .required("This field is required"),
  amount: yup.number().required("Please enter the income amount"),
};
export const expenseInfoSchema = {
  description: yup
    .object({
      value: yup.string().required("Please select an income description"),
    })
    .nullable()
    .required("This field is required"),
  amount: yup.number().required("Please enter the income amount"),
};
export const mortgageInfoSchema = {
  loan_amount: yup.number().required("Please enter the loan amount"),
  rate: yup.number().required("Please enter the rate"),
  term: yup.number().required("Please enter the term in months"),
  payment: yup.number().required("Please enter the payment amount"),
};
