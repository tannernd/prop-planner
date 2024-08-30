class PropertyObj {
  constructor(propertyData) {
    this.property_id = propertyData.id;
    this.user_id = propertyData.user_id;
    this.name = propertyData.name;
    this.desc = propertyData.description;
    this.type = propertyData.type;
    this.address1 = propertyData.address1;
    this.address2 = propertyData.address2;
    this.city = propertyData.city;
    this.state = propertyData.state;
    this.zip = propertyData.zip;
    this.year = propertyData.year;
    this.status = propertyData.status;
    this.totalunits = propertyData.totalunits;
    this.purchase_date = propertyData.purchase_date;
    this.sell_date = propertyData.sell_date;
    this.expenses = propertyData.expenses;
    this.financials = propertyData.financials;
    this.incomes = propertyData.incomes;
    this.markets = propertyData.markets;
    this.mortgages = propertyData.mortgages;
  }
  //Method to get the total income for a property
  getTotalIncome() {
    let amt = 0;
    this.incomes.forEach((value) => {
      amt += parseFloat(value.amount);
    });

    return amt;
  }
  //Method to return 5 years of total annual income amounts
  getAnnualTotalIncome() {
    const totalIncomeArray = [];
    for (let i = 0; i <= 4; i++) {
      let totalIncome = 0;
      if (i === 0) {
        totalIncome = this.getTotalIncome() * 12;
      } else {
        totalIncome =
          parseFloat(totalIncomeArray[i - 1]) *
          (parseFloat(this.markets[0].annual_rent_increase) * 0.01 + 1);
      }
      totalIncomeArray.push(Math.round(totalIncome * 100) / 100);
    }

    return totalIncomeArray;
  }
  //Method to get the total expenses of a property
  getTotalExpense() {
    let amt = 0;
    this.expenses.forEach((value) => {
      amt += parseFloat(value.amount);
    });
    return amt;
  }
  //Method to return 5 years of total annual expense amounts
  getAnnualTotalExpense() {
    const totalExpenseArray = [];
    for (let i = 0; i <= 4; i++) {
      let totalExpense = 0;

      if (i === 0) {
        totalExpense = this.getTotalExpense() * 12;
      } else {
        totalExpense =
          parseFloat(totalExpenseArray[i - 1]) *
          (parseFloat(this.markets[0].annual_expense_increase) * 0.01 + 1);
      }
      totalExpenseArray.push(Math.round(totalExpense * 100) / 100);
    }

    return totalExpenseArray;
  }

  getAnnualExpenseList() {
    const expenseArray = [];
    this.expenses.forEach((value) => {
      const expenseList = {
        id: value.id,
        user_id: value.user_id,
        property_id: value.property_id,
        amount: value.amount,
        annual_amount: value.amount * 12,
        description: value.description,
        other_description: value.other_description,
        createdAt: value.createdAt,
        updatedAt: value.updatedAt,
      };
      expenseArray.push(expenseList);
    });
    return expenseArray;
  }
  //Method to get the total vacancy amount of a property for a 5 year period
  getTotalVacancy() {
    const totalIncome = this.getAnnualTotalIncome();
    const vacancyAmtArray = [];
    let vacancyAmt = 0;

    for (let i = 0; i <= 4; i++) {
      vacancyAmt = totalIncome[i] * (this.markets[0].vacancy * 0.01);
      vacancyAmtArray.push(Math.round(vacancyAmt * 100) / 100);
    }
    return vacancyAmtArray;
  }
  //Method to get the Gross Opperating Income for a 5 year period
  getGOI() {
    const grossScheduledIncome = this.getAnnualTotalIncome();
    const vacancyAmt = this.getTotalVacancy();
    const grossOperatingIncomeArray = [];
    let grossOperatingIncome = 0;

    for (let i = 0; i <= 4; i++) {
      grossOperatingIncome = grossScheduledIncome[i] - vacancyAmt[i];
      grossOperatingIncomeArray.push(
        Math.round(grossOperatingIncome * 100) / 100
      );
    }

    return grossOperatingIncomeArray;
  }
  //Method to get the Net Opperating Income of a property for a 5 year period
  getNOI() {
    const grossOperatingIncome = this.getGOI();
    const totalExpensesAmt = this.getAnnualTotalExpense();
    const netOperatingIncomeArray = [];
    let netOperatingIncome = 0;

    for (let i = 0; i <= 4; i++) {
      netOperatingIncome = grossOperatingIncome[i] - totalExpensesAmt[i];
      netOperatingIncomeArray.push(Math.round(netOperatingIncome * 100) / 100);
    }

    return netOperatingIncomeArray;
  }

  getAnnualDebtService() {
    let debtService = 0;
    const debtServiceArray = [];
    this.mortgages.forEach((value) => {
      debtService += parseFloat(value.payment) * 12;
    });
    for (let i = 0; i <= 4; i++) {
      debtServiceArray.push(debtService);
    }

    return debtServiceArray;
  }

  getTotalMortgageAmount() {
    let mortgageAmount = 0;
    this.mortgages.forEach((value) => {
      mortgageAmount += parseFloat(value.loan_amount);
    });

    return mortgageAmount;
  }

  getBeforeTaxCashflow() {
    const noi = this.getNOI();
    const debtService = this.getAnnualDebtService();
    const beforeTaxCashflowArray = [];
    let beforeTaxCashflow = 0;

    for (let i = 0; i <= 4; i++) {
      beforeTaxCashflow = noi[i] - debtService[i];
      beforeTaxCashflowArray.push(Math.round(beforeTaxCashflow * 100) / 100);
    }

    return beforeTaxCashflowArray;
  }

  getAnnualCostBasis() {
    const costBasis =
      parseFloat(this.financials[0].offer_amount) +
      parseFloat(this.financials[0].closing_amount);
    const costBasisArray = [];

    for (let i = 0; i <= 4; i++) {
      costBasisArray.push(Math.round(costBasis * 100) / 100);
    }

    return costBasisArray;
  }

  getDepreciableAllowance() {
    const costBasis =
      parseFloat(this.financials[0].offer_amount) +
      parseFloat(this.financials[0].closing_amount);
    const depreciation = costBasis / 27.5;
    const depreciableAllowanceArray = [];
    for (let i = 0; i <= 4; i++) {
      depreciableAllowanceArray.push(Math.round(depreciation * 100) / 100);
    }

    return depreciableAllowanceArray;
  }

  getMortgageInterest() {
    let mortIntAnn = 0;
    let mortnum = 0;
    let intAmt = 0;
    let prinPay = 0;

    const totalInt = [];

    this.mortgages.forEach((value) => {
      let principal = parseFloat(value.loan_amount);
      totalInt.push([]);
      for (let i = 0; i <= 4; i++) {
        for (let x = 0; x < 12; x++) {
          intAmt =
            Math.round(
              principal * ((parseFloat(value.rate) * 0.01) / 12) * 100
            ) / 100;
          mortIntAnn += parseFloat(intAmt);
          prinPay = parseFloat(value.payment) - intAmt;
          principal -= prinPay;
        }
        totalInt[mortnum].push(Math.round(mortIntAnn * 100) / 100);
        mortIntAnn = 0;
      }
      mortnum++;
    });

    return totalInt;
  }

  getMortgagePrincipal() {
    let mortPrinAnn = 0;
    let mortnum = 0;
    let intAmt = 0;
    let prinPay = 0;

    const totalPrin = [];

    this.mortgages.forEach((value) => {
      let principal = parseFloat(value.loan_amount);
      totalPrin.push([]);
      for (let i = 0; i <= 4; i++) {
        for (let x = 0; x < 12; x++) {
          intAmt =
            Math.round(
              principal * ((parseFloat(value.rate) * 0.01) / 12) * 100
            ) / 100;
          prinPay = parseFloat(value.payment) - intAmt;
          mortPrinAnn += parseFloat(prinPay);
          principal -= prinPay;
        }
        totalPrin[mortnum].push(Math.round(mortPrinAnn * 100) / 100);
        mortPrinAnn = 0;
      }
      mortnum++;
    });

    return totalPrin;
  }

  getMortgageBalance() {
    let mortnum = 0;
    let intAmt = 0;
    let prinPay = 0;

    const totalBal = [];

    this.mortgages.forEach((value) => {
      let principal = parseFloat(value.loan_amount);
      totalBal.push([]);
      for (let i = 0; i <= 4; i++) {
        for (let x = 0; x < 12; x++) {
          intAmt =
            Math.round(
              principal * ((parseFloat(value.rate) * 0.01) / 12) * 100
            ) / 100;
          prinPay = parseFloat(value.payment) - intAmt;
          principal -= prinPay;
        }
        totalBal[mortnum].push(Math.round(principal * 100) / 100);
      }
      mortnum++;
    });

    return totalBal;
  }

  getTaxableIncome() {
    let intCalc = 0;
    const noi = this.getNOI();
    const depreciation = this.getDepreciableAllowance();
    const totalInt = this.getMortgageInterest();
    const taxIncomeArray = [];
    for (let i = 0; i <= 4; i++) {
      for (let x = 0; x < totalInt.length; x++) {
        intCalc += totalInt[x][i];
      }
      taxIncomeArray.push(
        Math.round((noi[i] - depreciation[i] - intCalc) * 100) / 100
      );
      intCalc = 0;
    }

    return taxIncomeArray;
  }

  getTaxesDue() {
    const taxableIncome = this.getTaxableIncome();
    const taxesDueArray = [];
    let taxesDue = 0;

    for (let i = 0; i <= 4; i++) {
      taxesDue =
        Math.round(
          taxableIncome[i] *
            (parseFloat(this.financials[0].tax_rate) * 0.01) *
            100
        ) / 100;
      if (taxesDue <= 0) {
        taxesDue = 0;
      }
      taxesDueArray.push(taxesDue);
    }

    return taxesDueArray;
  }

  getAfterTaxCashflow() {
    let aftTaxCF = 0;
    const aftTaxCFArray = [];
    const beforeTaxCF = this.getBeforeTaxCashflow();
    const taxDue = this.getTaxesDue();

    for (let i = 0; i <= 4; i++) {
      aftTaxCF = Math.round((beforeTaxCF[i] - taxDue[i]) * 100) / 100;
      aftTaxCFArray.push(aftTaxCF);
    }

    return aftTaxCFArray;
  }

  getPropertyValue() {
    const propertyValueArray = [];
    let propertyValue = 0;

    for (let i = 0; i <= 4; i++) {
      if (i === 0) {
        propertyValue =
          (this.markets[0].appreciation * 0.01 + 1) *
          this.financials[0].property_value;
      } else {
        propertyValue =
          (this.markets[0].appreciation * 0.01 + 1) * propertyValueArray[i - 1];
      }
      propertyValueArray.push(Math.round(propertyValue * 100) / 100);
    }

    return propertyValueArray;
  }

  getGrossMultiplier() {
    const grossRent = this.getAnnualTotalIncome();
    const grossMultiplier =
      Math.round((this.financials[0].offer_amount / grossRent[0]) * 100) / 100;

    return grossMultiplier;
  }

  getCapRate() {
    const noi = this.getNOI();
    const offerAmount = this.financials[0].offer_amount;
    const capRate = 100 * (Math.round((noi[0] / offerAmount) * 10000) / 10000);
    const capRatePct = capRate;

    return capRatePct;
  }

  getIRR() {
    const noi = this.getNOI();
    const totalMortgagePayment = this.getAnnualDebtService();
    const totalMorgageAmount = this.getTotalMortgageAmount();
    const irr =
      100 *
      (Math.round(
        ((noi[0] - totalMortgagePayment[0]) / totalMorgageAmount) * 10000
      ) /
        10000);
    const irrPct = irr;

    return irrPct;
  }

  getYield() {
    const grossRent = this.getAnnualTotalIncome();
    const offerAmount = this.financials[0].offer_amount;
    const yieldNum = Math.round((grossRent[0] / offerAmount) * 10000) / 10000;

    return yieldNum * 100;
  }

  getDebtCoverage() {
    let debtCoverage = 0;
    const noi = this.getNOI();
    const totalMortPayAnn = this.getAnnualDebtService();
    const debtCoverageArray = [];

    for (let i = 0; i <= 4; i++) {
      debtCoverage = Math.round((noi[i] / totalMortPayAnn[0]) * 100) / 100;
      debtCoverageArray.push(debtCoverage);
    }

    return debtCoverageArray;
  }

  getCurrentLTV() {
    let totalPrin = 0;
    let ltv = 0;

    for (let i = 0; i < this.mortgages.length; i++) {
      totalPrin += parseFloat(this.mortgages[i].loan_amount);
    }
    ltv =
      100 *
      (Math.round((totalPrin / this.financials[0].property_value) * 10000) /
        10000);

    return ltv;
  }

  getAnnualLTV() {
    const principalBalance = this.getMortgageBalance();
    const propertyValue = this.getPropertyValue();
    const ltvArray = [];
    let ltv = 0;
    let totalPrin = 0;

    for (let i = 0; i <= 4; i++) {
      for (let x = 0; x < principalBalance.length; x++) {
        totalPrin += principalBalance[x][i];
      }
      ltv = 100 * (Math.round((totalPrin / propertyValue[i]) * 10000) / 10000);
      ltvArray.push(ltv);
      totalPrin = 0;
    }

    return ltvArray;
  }

  getOwnershipPercentage() {
    const propertyValue = this.getPropertyValue();
    const totalBalance = this.getMortgageBalance();
    const ownershipPercentageArray = [];
    let ownPercent = 0;
    let totalPrin = 0;

    for (let i = 0; i <= 4; i++) {
      for (let x = 0; x < totalBalance.length; x++) {
        totalPrin += totalBalance[x][i];
      }
      ownPercent =
        100 *
        (Math.round(
          ((propertyValue[i] - totalPrin) / propertyValue[i]) * 10000
        ) /
          10000);
      ownershipPercentageArray.push(ownPercent);
      totalPrin = 0;
    }
    return ownershipPercentageArray;
  }

  getDownPayment() {
    const principalBalance = this.getMortgageBalance();
    let totalPrin = 0;
    let downPayment = 0;

    for (let i = 0; i < this.mortgages.length; i++) {
      totalPrin += parseFloat(this.mortgages[i].loan_amount);
    }

    downPayment = this.financials[0].offer_amount - totalPrin;

    return downPayment;
  }

  getCOCBeforeTax() {
    const downPayment = this.getDownPayment();
    const beforeTaxCashflow = this.getBeforeTaxCashflow();
    const cashOnCashBeforeTaxArray = [];
    let cashOnCashBeforeTax = 0;

    if (downPayment !== 0) {
      for (let i = 0; i <= 4; i++) {
        cashOnCashBeforeTax =
          (Math.round((beforeTaxCashflow[i] / downPayment) * 10000) / 10000) *
          100;
        cashOnCashBeforeTaxArray.push(cashOnCashBeforeTax);
      }
    } else {
      for (let i = 0; i <= 4; i++) {
        cashOnCashBeforeTaxArray.push("Infinite");
      }
    }

    return cashOnCashBeforeTaxArray;
  }

  getCOCAfterTax() {
    const downPayment = this.getDownPayment();
    const afterTaxCashflow = this.getAfterTaxCashflow();
    const cashOnCashAfterTaxArray = [];
    let cashOnCashAfterTax = 0;

    if (downPayment !== 0) {
      for (let i = 0; i <= 4; i++) {
        cashOnCashAfterTax =
          (Math.round((afterTaxCashflow[i] / downPayment) * 10000) / 10000) *
          100;
        cashOnCashAfterTaxArray.push(cashOnCashAfterTax);
      }
    } else {
      for (let i = 0; i <= 4; i++) {
        cashOnCashAfterTaxArray.push("Infinite");
      }
    }

    return cashOnCashAfterTaxArray;
  }

  getMortgageInfo() {
    const mortgages = [];
    const mortgageInterest = this.getMortgageInterest();
    const mortgagePrincipal = this.getMortgagePrincipal();
    const mortgageBalance = this.getMortgageBalance();
    let obj = {};
    let keyPrincipal = "";
    let keyInterst = "";
    let keyBalance = "";

    for (let x = 0; x < mortgageBalance.length; x++) {
      mortgages.push([]);
      for (let i = 0; i <= 4; i++) {
        keyPrincipal = "mortgage_" + (x + 1) + "_principal";
        keyInterst = "mortgage_" + (x + 1) + "_interest";
        keyBalance = "mortgage_" + (x + 1) + "_balance";
        obj[keyPrincipal] = mortgagePrincipal[x][i];
        obj[keyInterst] = mortgageInterest[x][i];
        obj[keyBalance] = mortgageBalance[x][i];
        mortgages[x].push(obj);
        obj = {};
      }
    }

    return mortgages;
  }

  getAppreciation() {
    const propertyValue = this.getPropertyValue();
    const propertyAppreciationArray = [];
    let propertyAppreciation = 0;

    for (let i = 0; i <= 4; i++) {
      if (i === 0) {
        propertyAppreciation =
          this.markets[0].appreciation *
          0.01 *
          this.financials[0].property_value;
      } else {
        propertyAppreciation =
          this.markets[0].appreciation * 0.01 * propertyValue[i - 1];
      }
      propertyAppreciationArray.push(
        Math.round(propertyAppreciation * 100) / 100
      );
    }

    return propertyAppreciationArray;
  }

  getRORLoanReduction() {
    const principalPay = this.getMortgagePrincipal();
    const downPayment = this.getDownPayment();
    const rorLoanReductionArray = [];
    let rorLoanReduction = 0;
    let totalPrin = 0;

    if (downPayment !== 0) {
      for (let i = 0; i <= 4; i++) {
        for (let x = 0; x < principalPay.length; x++) {
          totalPrin += principalPay[x][i];
        }
        rorLoanReduction =
          100 * (Math.round((totalPrin / downPayment) * 10000) / 10000);
        rorLoanReductionArray.push(rorLoanReduction);
        totalPrin = 0;
      }
    } else {
      for (let i = 0; i <= 4; i++) {
        rorLoanReductionArray.push("Infinite");
      }
    }

    return rorLoanReductionArray;
  }

  getRORAppreciation() {
    const appreciation = this.getAppreciation();
    const downPayment = this.getDownPayment();
    const rorAppreciationArray = [];
    let rorAppreciation = 0;

    if (downPayment !== 0) {
      for (let i = 0; i <= 4; i++) {
        rorAppreciation =
          100 * (Math.round((appreciation[i] / downPayment) * 10000) / 10000);
        rorAppreciationArray.push(rorAppreciation);
      }
    } else {
      for (let i = 0; i <= 4; i++) {
        rorAppreciationArray.push("Infinite");
      }
    }

    return rorAppreciationArray;
  }

  getRORBeforeTaxCF() {
    const beforeTaxCashflow = this.getBeforeTaxCashflow();
    const downPayment = this.getDownPayment();
    const rorBeforeTaxCFArray = [];
    let rorBeforeTaxCF = 0;

    if (downPayment !== 0) {
      for (let i = 0; i <= 4; i++) {
        rorBeforeTaxCF =
          100 *
          (Math.round((beforeTaxCashflow[i] / downPayment) * 10000) / 10000);
        rorBeforeTaxCFArray.push(rorBeforeTaxCF);
      }
    } else {
      for (let i = 0; i <= 4; i++) {
        rorBeforeTaxCFArray.push("Infinite");
      }
    }

    return rorBeforeTaxCFArray;
  }

  getAPOD() {
    let grossScheduledIncome = this.getAnnualTotalIncome();
    let vacancyAmt = this.getTotalVacancy();
    let grossOperatingIncome = this.getGOI();
    let totalExpensesAmt = this.getAnnualTotalExpense();
    let netOperatingIncome = this.getNOI();

    return {
      grossScheduledIncome: grossScheduledIncome[0],
      vacancyAmt: vacancyAmt[0],
      grossOperatingIncome: grossOperatingIncome[0],
      expenses: this.getAnnualExpenseList(),
      totalExpensesAmt: totalExpensesAmt[0],
      netOperatingIncom: netOperatingIncome[0],
    };
  }
  getCashflow() {
    const noi = this.getNOI();
    const debtService = this.getAnnualDebtService();
    const beforeTaxCashflow = this.getBeforeTaxCashflow();
    const depreciableAllowance = this.getDepreciableAllowance();
    const mortgageInterest = this.getMortgageInterest();
    const taxableIncome = this.getTaxableIncome();
    const taxesDue = this.getTaxesDue();
    const afterTaxCashflow = this.getAfterTaxCashflow();

    return {
      noi: noi,
      debtService: debtService,
      beforeTaxCashflow: beforeTaxCashflow,
      depreciableAllowance: depreciableAllowance,
      mortgageInterest: mortgageInterest,
      taxableIncome: taxableIncome,
      taxesDue: taxesDue,
      AfterTaxCashflow: afterTaxCashflow,
    };
  }

  getCriticalOutput() {
    const propertyValue = this.getPropertyValue();
    const gsi = this.getAnnualTotalIncome();
    const vacancy = this.getTotalVacancy();
    const goi = this.getGOI();
    const totalExpense = this.getAnnualTotalExpense();
    const noi = this.getNOI();
    const grossMultiplier = this.getGrossMultiplier();
    const capRatePct = this.getCapRate();
    const irr = this.getIRR();
    const yieldNum = this.getYield();
    const debtCoverage = this.getDebtCoverage();
    const ltv = this.getAnnualLTV();
    const ownPercent = this.getOwnershipPercentage();
    const cashOnCashBeforeTax = this.getCOCBeforeTax();
    const cashOnCashAfterTax = this.getCOCAfterTax();
    const costBasis = this.getAnnualCostBasis();
    const depreciation = this.getDepreciableAllowance();
    const mortgages = this.getMortgageInfo();
    const beforeTaxCashflow = this.getBeforeTaxCashflow();
    const taxableIncome = this.getTaxableIncome();
    const taxesDue = this.getTaxesDue();
    const afterTaxCashflow = this.getAfterTaxCashflow();
    const rorLoanReduction = this.getRORLoanReduction();
    const rorAppreciation = this.getRORAppreciation();
    const rorBeforeTaxCF = this.getRORBeforeTaxCF();

    propertyValue.unshift(parseFloat(this.financials[0].property_value));
    gsi.unshift(gsi[0]);
    vacancy.unshift(vacancy[0]);
    goi.unshift(goi[0]);
    totalExpense.unshift(totalExpense[0]);
    noi.unshift(noi[0]);
    ltv.unshift(this.getCurrentLTV());

    return {
      propertyValue: propertyValue,
      GSI: gsi,
      vacancy: vacancy,
      GOI: goi,
      totalExpense: totalExpense,
      NOI: noi,
      grossMultiplier: grossMultiplier,
      capRate: capRatePct,
      irr: irr,
      yield: yieldNum,
      debtCoverage: debtCoverage,
      ltv: ltv,
      ownPercent: ownPercent,
      cashOnCashBeforeTax: cashOnCashBeforeTax,
      cashOnCashAfterTax: cashOnCashAfterTax,
      costBasis: costBasis,
      depreciation: depreciation,
      debtService: mortgages,
      beforeTaxCashflow: beforeTaxCashflow,
      taxableIncome: taxableIncome,
      taxesDue: taxesDue,
      afterTaxCashflow: afterTaxCashflow,
      rorLoanReduction: rorLoanReduction,
      rorAppreciation: rorAppreciation,
      rorBeforeTaxCF: rorBeforeTaxCF,
    };
  }

  getAllReports() {
    const APOD = this.getAPOD();
    const cashflow = this.getCashflow();
    const criticalOutput = this.getCriticalOutput();

    return {
      apod: APOD,
      cashflow: cashflow,
      criticalOutput: criticalOutput,
    };
  }
}

export default PropertyObj;
