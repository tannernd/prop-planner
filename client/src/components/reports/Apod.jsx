import { formatCurrency } from "../../js/helpers";
import { Table } from "react-bootstrap";

const Apod = (props) => {
  const { propertyReports } = props;

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th scope="col">Property Income</th>
            <th scope="col">Year 1</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Gross Scheduled Income</td>
            <td className="w-25">
              {formatCurrency(propertyReports.apod.grossScheduledIncome)}
            </td>
          </tr>
          <tr>
            <td>Loss due to Vacancies</td>
            <td className="w-25">
              {formatCurrency(propertyReports.apod.vacancyAmt)}
            </td>
          </tr>
          <tr>
            <td>Gross Operating Income</td>
            <td className="w-25">
              {formatCurrency(propertyReports.apod.grossOperatingIncome)}
            </td>
          </tr>
        </tbody>
      </Table>

      <Table>
        <thead>
          <tr>
            <th scope="col">Property Expenses</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {!!propertyReports.apod.expenses ? (
            propertyReports.apod.expenses.map((expense, key) => {
              return (
                <tr key={key}>
                  <td>{expense.description}</td>
                  <td className="w-25">
                    {formatCurrency(expense.annual_amount)}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>None</td>
              <td>NA</td>
            </tr>
          )}
          <tr>
            <th scope="col">Total Expenses</th>
            <th scope="col" className="w-25">
              {formatCurrency(propertyReports.apod.totalExpensesAmt)}
            </th>
          </tr>
        </tbody>
      </Table>

      <Table>
        <tfoot>
          <tr>
            <th scope="col">Net Operating Income</th>
            <th scope="col" className="w-25">
              {formatCurrency(propertyReports.apod.netOperatingIncom)}
            </th>
          </tr>
        </tfoot>
      </Table>
    </>
  );
};

export default Apod;
