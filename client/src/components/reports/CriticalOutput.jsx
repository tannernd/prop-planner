import { formatCurrency, limit, suffix, ipp } from "../../js/helpers";
import { Table } from "react-bootstrap";

const CriticalOutput = (props) => {
  const { propertyReports } = props;
  return (
    <>
      <Table responsive>
        <thead>
          <tr style={{ position: "sticky", top: "0" }}>
            <th scope="col" style={{ minWidth: "15rem" }}></th>
            <th scope="col" style={{ minWidth: "7rem" }}>
              At Purchase
            </th>
            <th scope="col" style={{ minWidth: "7rem" }}>
              Year 1
            </th>
            <th scope="col" style={{ minWidth: "7rem" }}>
              Year 2
            </th>
            <th scope="col" style={{ minWidth: "7rem" }}>
              Year 3
            </th>
            <th scope="col" style={{ minWidth: "7rem" }}>
              Year 4
            </th>
            <th scope="col" style={{ minWidth: "7rem" }}>
              Year 5
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Property Value</td>
            {propertyReports.criticalOutput.propertyValue.map(
              (propertyValue, key) => {
                return <td key={key}>{formatCurrency(propertyValue)}</td>;
              }
            )}
          </tr>
        </tbody>
      </Table>

      <Table responsive>
        <thead>
          <tr>
            <th scope="col" style={{ minWidth: "15rem" }}>
              Income and Expenses
            </th>
            <th scope="col" style={{ minWidth: "7rem" }}></th>
            <th scope="col" style={{ minWidth: "7rem" }}></th>
            <th scope="col" style={{ minWidth: "7rem" }}></th>
            <th scope="col" style={{ minWidth: "7rem" }}></th>
            <th scope="col" style={{ minWidth: "7rem" }}></th>
            <th scope="col" style={{ minWidth: "7rem" }}></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>GSI</td>
            {propertyReports.criticalOutput.GSI.map((GSI, key) => {
              return <td key={key}>{formatCurrency(GSI)}</td>;
            })}
          </tr>
          <tr>
            <td>Loss due to Vacancies</td>
            {propertyReports.criticalOutput.vacancy.map((vacancy, key) => {
              return <td key={key}>{formatCurrency(vacancy)}</td>;
            })}
          </tr>
          <tr>
            <td>Gross Operating Income</td>
            {propertyReports.criticalOutput.GOI.map((GOI, key) => {
              return <td key={key}>{formatCurrency(GOI)}</td>;
            })}
          </tr>
          <tr>
            <td>Loss due to Expenses</td>
            {propertyReports.criticalOutput.totalExpense.map(
              (totalExpense, key) => {
                return <td key={key}>{formatCurrency(totalExpense)}</td>;
              }
            )}
          </tr>
          <tr>
            <td>Net Operating Income (NOI)</td>
            {propertyReports.criticalOutput.NOI.map((NOI, key) => {
              return <td key={key}>{formatCurrency(NOI)}</td>;
            })}
          </tr>
        </tbody>
      </Table>

      <Table responsive>
        <thead>
          <tr>
            <th scope="col" style={{ minWidth: "15rem" }}>
              Financial Ratios
            </th>
            <th scope="col" style={{ minWidth: "7rem" }}></th>
            <th scope="col" style={{ minWidth: "7rem" }}></th>
            <th scope="col" style={{ minWidth: "7rem" }}></th>
            <th scope="col" style={{ minWidth: "7rem" }}></th>
            <th scope="col" style={{ minWidth: "7rem" }}></th>
            <th scope="col" style={{ minWidth: "7rem" }}></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Gross Multiplier</td>
            <td>{propertyReports.criticalOutput.grossMultiplier}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Cap Rate</td>
            <td>
              {Math.round(propertyReports.criticalOutput.capRate * 100) / 100 +
                "%"}
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Internal Rate of Return</td>
            <td>
              {Math.round(propertyReports.criticalOutput.irr * 100) / 100 + "%"}
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Yield</td>
            <td>
              {Math.round(propertyReports.criticalOutput.yield * 100) / 100 +
                "%"}
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Debt Coverage Ratio</td>
            <td></td>
            {propertyReports.criticalOutput.debtCoverage.map(
              (debtCoverage, key) => {
                return (
                  <td key={key}>
                    {Math.round(debtCoverage * 100) / 100 + "%"}
                  </td>
                );
              }
            )}
          </tr>
          <tr>
            <td>Loan to Value (LTV) Ratio</td>
            {propertyReports.criticalOutput.ltv.map((ltv, key) => {
              return <td key={key}>{Math.round(ltv * 100) / 100 + "%"}</td>;
            })}
          </tr>
          <tr>
            <td>Ownership Percentage</td>
            <td></td>
            {propertyReports.criticalOutput.ownPercent.map(
              (ownPercent, key) => {
                return (
                  <td key={key}>{Math.round(ownPercent * 100) / 100 + "%"}</td>
                );
              }
            )}
          </tr>
          <tr>
            <td>Cash on Cash Return (BT)</td>
            <td></td>
            {propertyReports.criticalOutput.cashOnCashBeforeTax.map(
              (cashOnCashBeforeTax, key) => {
                return (
                  <td key={key}>
                    {Math.round(cashOnCashBeforeTax * 100) / 100 + "%"}
                  </td>
                );
              }
            )}
          </tr>
          <tr>
            <td>Cash on Cash Return (AT)</td>
            <td></td>
            {propertyReports.criticalOutput.cashOnCashAfterTax.map(
              (cashOnCashAfterTax, key) => {
                return (
                  <td key={key}>
                    {Math.round(cashOnCashAfterTax * 100) / 100 + "%"}
                  </td>
                );
              }
            )}
          </tr>
        </tbody>
      </Table>

      <Table responsive>
        <thead>
          <tr>
            <th scope="col" style={{ minWidth: "15rem" }}>
              Depreciation
            </th>
            <th scope="col" style={{ minWidth: "7rem" }}></th>
            <th scope="col" style={{ minWidth: "7rem" }}></th>
            <th scope="col" style={{ minWidth: "7rem" }}></th>
            <th scope="col" style={{ minWidth: "7rem" }}></th>
            <th scope="col" style={{ minWidth: "7rem" }}></th>
            <th scope="col" style={{ minWidth: "7rem" }}></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Depreciable Improvements</td>
            <td></td>
            {propertyReports.criticalOutput.costBasis.map((costBasis, key) => {
              return <td key={key}>{formatCurrency(costBasis)}</td>;
            })}
          </tr>
          <tr>
            <td>Depreciable Allowance</td>
            <td></td>
            {propertyReports.criticalOutput.depreciation.map(
              (depreciation, key) => {
                return <td key={key}>{formatCurrency(depreciation)}</td>;
              }
            )}
          </tr>
        </tbody>
      </Table>

      <Table responsive>
        <thead>
          <tr>
            <th scope="col" style={{ minWidth: "15rem" }}>
              Cash Flow
            </th>
            <th scope="col" style={{ minWidth: "7rem" }}></th>
            <th scope="col" style={{ minWidth: "7rem" }}></th>
            <th scope="col" style={{ minWidth: "7rem" }}></th>
            <th scope="col" style={{ minWidth: "7rem" }}></th>
            <th scope="col" style={{ minWidth: "7rem" }}></th>
            <th scope="col" style={{ minWidth: "7rem" }}></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Before Tax Cash Flow</td>
            <td></td>
            {propertyReports.criticalOutput.beforeTaxCashflow.map(
              (beforeTaxCashflow, key) => {
                return <td key={key}>{formatCurrency(beforeTaxCashflow)}</td>;
              }
            )}
          </tr>
          <tr>
            <td>Taxable Income</td>
            <td></td>
            {propertyReports.criticalOutput.taxableIncome.map(
              (taxableIncome, key) => {
                return <td key={key}>{formatCurrency(taxableIncome)}</td>;
              }
            )}
          </tr>
          <tr>
            <td>Taxes Due</td>
            <td></td>
            {propertyReports.criticalOutput.taxesDue.map((taxesDue, key) => {
              return <td key={key}>{formatCurrency(taxesDue)}</td>;
            })}
          </tr>
          <tr>
            <td>After Tax Cash Flow</td>
            <td></td>
            {propertyReports.criticalOutput.afterTaxCashflow.map(
              (afterTaxCashflow, key) => {
                return <td key={key}>{formatCurrency(afterTaxCashflow)}</td>;
              }
            )}
          </tr>
        </tbody>
      </Table>

      <Table responsive>
        <thead>
          <tr>
            <th scope="col" style={{ minWidth: "15rem" }}>
              Rate of Return (RoR)
            </th>
            <th scope="col" style={{ minWidth: "7rem" }}></th>
            <th scope="col" style={{ minWidth: "7rem" }}></th>
            <th scope="col" style={{ minWidth: "7rem" }}></th>
            <th scope="col" style={{ minWidth: "7rem" }}></th>
            <th scope="col" style={{ minWidth: "7rem" }}></th>
            <th scope="col" style={{ minWidth: "7rem" }}></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>RoR on Loan Reduction</td>
            <td></td>
            {propertyReports.criticalOutput.rorLoanReduction.map(
              (rorLoanReduction, key) => {
                return (
                  <td key={key}>
                    {Math.round(rorLoanReduction * 100) / 100 + "%"}
                  </td>
                );
              }
            )}
          </tr>
          <tr>
            <td>RoR on Appreciation</td>
            <td></td>
            {propertyReports.criticalOutput.rorAppreciation.map(
              (rorAppreciation, key) => {
                return (
                  <td key={key}>
                    {Math.round(rorAppreciation * 100) / 100 + "%"}
                  </td>
                );
              }
            )}
          </tr>
          <tr>
            <td>RoR on BTCF</td>
            <td></td>
            {propertyReports.criticalOutput.rorBeforeTaxCF.map(
              (rorBeforeTaxCF, key) => {
                return (
                  <td key={key}>
                    {Math.round(rorBeforeTaxCF * 100) / 100 + "%"}
                  </td>
                );
              }
            )}
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default CriticalOutput;
