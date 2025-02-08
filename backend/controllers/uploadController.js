const xml2js = require('xml2js');
const CreditReport = require('../models/CreditReport');

const uploadController = {
  async uploadXML(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const xmlData = req.file.buffer.toString();
      const parser = new xml2js.Parser({ explicitArray: false });
      
      const result = await parser.parseStringPromise(xmlData);

      console.log("result from upload controller",result);
      
      // Extract data from XML
      const creditReport = new CreditReport({
        basicDetails: {
          name: `${result.INProfileResponse.CAIS_Account.CAIS_Account_DETAILS[0].CAIS_Holder_Details.Surname_Non_Normalized} ${result.INProfileResponse.CAIS_Account.CAIS_Account_DETAILS[0].CAIS_Holder_Details.First_Name_Non_Normalized}`,
          mobilePhone: result.INProfileResponse.Current_Application.Current_Application_Details.Current_Applicant_Details.MobilePhoneNumber,
          pan: result.INProfileResponse.CAIS_Account.CAIS_Account_DETAILS[0].CAIS_Holder_Details.Income_TAX_PAN,
          creditScore: parseInt(result.INProfileResponse.SCORE.BureauScore)
        },
        reportSummary: {
          totalAccounts: parseInt(result.INProfileResponse.CAIS_Account.CAIS_Summary.Credit_Account.CreditAccountTotal),
          activeAccounts: parseInt(result.INProfileResponse.CAIS_Account.CAIS_Summary.Credit_Account.CreditAccountActive),
          closedAccounts: parseInt(result.INProfileResponse.CAIS_Account.CAIS_Summary.Credit_Account.CreditAccountClosed),
          currentBalanceAmount: parseFloat(result.INProfileResponse.CAIS_Account.CAIS_Summary.Total_Outstanding_Balance.Outstanding_Balance_All),
          securedAccountsAmount: parseFloat(result.INProfileResponse.CAIS_Account.CAIS_Summary.Total_Outstanding_Balance.Outstanding_Balance_Secured),
          unsecuredAccountsAmount: parseFloat(result.INProfileResponse.CAIS_Account.CAIS_Summary.Total_Outstanding_Balance.Outstanding_Balance_UnSecured),
          lastSevenDaysCreditEnquiries: parseInt(result.INProfileResponse.TotalCAPS_Summary.TotalCAPSLast7Days)
        },
        creditAccounts: result.INProfileResponse.CAIS_Account.CAIS_Account_DETAILS.map(account => ({
          accountType: account.Account_Type,
          bankName: account.Subscriber_Name,
          accountNumber: account.Account_Number,
          address: `${account.CAIS_Holder_Address_Details.First_Line_Of_Address_non_normalized}, ${account.CAIS_Holder_Address_Details.Second_Line_Of_Address_non_normalized}, ${account.CAIS_Holder_Address_Details.Third_Line_Of_Address_non_normalized}`,
          amountOverdue: parseFloat(account.Amount_Past_Due),
          currentBalance: parseFloat(account.Current_Balance)
        }))
      });

      await creditReport.save();
      
      res.status(201).json({
        message: 'Credit report processed successfully',
        reportId: creditReport._id,
        creditReport: creditReport
      });
      console.log("credit report saved",creditReport);
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: 'Error processing XML file' });
    }
  }
};

module.exports = uploadController;