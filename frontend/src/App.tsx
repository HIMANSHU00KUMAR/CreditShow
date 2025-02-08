// src/App.tsx
import React, { useState } from "react";

import { CreditReport } from "./types";
import FileUpload from "./components/FileUpload";
import { CreditCardIcon, PhoneIcon, CreditCard, AlertCircle, Building2, MapPin } from "lucide-react";

const App: React.FC = () => {
  const [reportData, setReportData] = useState<CreditReport | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">CreditSea Report</h1>
          <p className="text-gray-600">Comprehensive Credit Analysis</p>
        </header>

        {/* File Upload */}
        <FileUpload onUploadSuccess={setReportData} />

        {reportData && (
          <>
            {/* Basic Details */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Details</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <CreditCardIcon className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{reportData.basicDetails.name}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <PhoneIcon className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Mobile</p>
                    <p className="font-medium">{reportData.basicDetails.mobilePhone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">PAN</p>
                    <p className="font-medium">{reportData.basicDetails.pan}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Credit Score</p>
                    <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center">
                    <span className="text-xl font-bold text-green-500">{reportData.basicDetails.creditScore}</span>
                  </div>
                </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Report Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Report Summary</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total Accounts</p>
                  <p className="text-2xl font-bold text-blue-600">{reportData.reportSummary.totalAccounts}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Active Accounts</p>
                  <p className="text-2xl font-bold text-green-600">{reportData.reportSummary.activeAccounts}</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <p className="text-sm text-gray-600">Closed Accounts</p>
                  <p className="text-2xl font-bold text-red-600">{reportData.reportSummary.closedAccounts}</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-gray-600">Credit Enquiries (7d)</p>
                  <p className="text-2xl font-bold text-purple-600">{reportData.reportSummary.lastSevenDaysCreditEnquiries}</p>
                </div>
              </div>
            </div>

            {/* Credit Accounts */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Credit Accounts</h2>
              <div className="space-y-4">
                {reportData.creditAccounts.map((account, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Building2 className="w-5 h-5 text-blue-600" />
                          <span className="font-medium">{account.bankName}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CreditCard className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-600">{account.accountNumber}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-600">{account.address}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Current Balance</p>
                        <p className="text-lg font-bold text-gray-900">${account.currentBalance.toLocaleString()}</p>
                        {account.amountOverdue > 0 && (
                          <p className="text-sm font-medium text-red-500">
                            Overdue: ${account.amountOverdue.toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
