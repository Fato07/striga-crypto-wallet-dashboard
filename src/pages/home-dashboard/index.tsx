import React, { useState, useMemo, useEffect } from 'react'
import countryList from 'react-select-country-list'
import axios from 'axios';
import { occupationOptions, purposeOfAccountOptions, sourceOfFundsOptions, txVolumeYearlyOptions } from '../../../utility/fieldOptions';
import PersonalInfo from '@/components/Forms/PersonalInfo';
import countries from 'i18n-iso-countries';
import 'i18n-iso-countries/langs/en.json';
import { kycFormSchema } from '@/schemas/kycFormSchema';

countries.registerLocale(require('i18n-iso-countries/langs/en.json')); // register the English language data

const Index = () => {
 // const countryOptions = useMemo(() => countryList().getData(), [])
 const countryList = useMemo(() => countries.getNames('en'), []);

 const [formData, setFormData] = useState({
  occupation: '',
  sourceOfFunds: '',
  sourceOfFundsOther: '',
  selfPepDeclaration: false,
  purposeOfAccount: '',
  purposeOfAccountOther: '',
  expectedOutgoingTxVolumeYearly: '',
  expectedIncomingTxVolumeYearly: '',
  ipAddress: '',
  placeOfBirth: '',
 })

 const [formErrors, setFormErrors] = useState({});


 const displayOccupationOptions = occupationOptions.map(
  (option, index) =>
   (<option key={index} value={option}>{option}</option>))

 const displaySourceOfFundsOptions = sourceOfFundsOptions.map(
  (option, index) =>
   (<option key={index} value={option}>{option}</option>))

 const displayPurposeOfAccountOptions = purposeOfAccountOptions.map(
  (option, index) =>
   (<option key={index} value={option}>{option}</option>))

 const displayYearlyVolumeOptions = txVolumeYearlyOptions.map(
  (option, index) =>
   (<option key={index} value={option}>{option}</option>))

 const displayCountryOptions = Object.entries(countryList).map(([code, name]) => (
  <option key={code} value={code}>{name}</option>
 ));

 const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {

  const target = event.target as HTMLInputElement;
  const { name, value, type, checked } = target;

  setFormData((prevState) => ({
   ...prevState,
   [name]: type === 'checkbox' ? checked : value,
  }));
 }

 const validateForm = () => {
  const validationResult = kycFormSchema.safeParse(formData);
  if (validationResult.success) {
   return true
  } else {
   const errorMap = validationResult.error.formErrors.fieldErrors;
   console.log(errorMap)
   setFormErrors(errorMap);
   return false
  }
 };

 const displayErrorMessage = (field: string) => {
  const errorMessage = formErrors[field];
  if (errorMessage) {
   return (
    <p className="text-xs text-red-500 mt-1">
     {errorMessage && errorMessage[0]}
    </p>
   );
  }
 }

 const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();

  const submittedData = {
   ...formData,
   placeOfBirth: countries.alpha2ToAlpha3(formData.placeOfBirth),
  };


  console.log(formData)

  if (validateForm()) {
   try {

   } catch (error) {

   }
  }


 };

 const getIp = async () => {
  try {
   const response = await axios.get('/api/IpAddress');;
   setFormData((prevFormData) => ({
    ...prevFormData,
    ipAddress: response.data.ip,
   }));
  } catch (error) {
   console.error('Failed to fetch IP address:', error);
  }
 }

 useEffect(() => {
  getIp();
 }, [])

 return (
  <div className="container mx-auto px-4">
   <form className="max-w-screen-md mx-auto" onSubmit={handleSubmit}>
    <div className="space-y-12">
     <div className="border-b border-gray-900/10 pb-12">
      <h2 className="text-base font-semibold leading-7 text-gray-900">Start KYC Proccess</h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
       Please fill in the missing fields to complete setting up your profile
      </p>
     </div>

     {/* Component Displays Personal Info of User */}
     <PersonalInfo />

     <div className="border-b border-gray-900/10 pb-12">
      <h2 className="text-base font-semibold leading-7 text-gray-900">Mising Information</h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">Please Enter the following information to comeplete your profile</p>
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
       <div className="sm:col-span-3">
        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
         Occupation
        </label>
        <div className="mt-2">
         <select
          id="occupation"
          name="occupation"
          autoComplete="occupation"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={formData.occupation}
          onChange={handleChange}
         >
          {displayOccupationOptions}
         </select>
         {displayErrorMessage('occupation')}
        </div>
       </div>

       <div className="sm:col-span-3">
        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
         Source Of Funds
        </label>
        <div className="mt-2">
         <select
          id="sourceOfFunds"
          name="sourceOfFunds"
          autoComplete="sourceOfFunds"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={formData.sourceOfFunds}
          onChange={handleChange}
         >
          {displaySourceOfFundsOptions}
         </select>
         {displayErrorMessage('sourceOfFunds')}
        </div>
       </div>

       {formData.sourceOfFunds === "OTHER" && (
        <div className="sm:col-span-3">
         <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
          Source of Funds (Other)
         </label>
         <div className="mt-2">
          <textarea
           id="sourceOfFundsOther"
           name="sourceOfFundsOther"
           autoComplete="sourceOfFundsOther"
           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
           value={formData.sourceOfFundsOther}
           onChange={handleChange}
           required
          />
          {displayErrorMessage('sourceOfFundsOther')}
         </div>
        </div>
       )}
       <div className="col-span-full">
        <div className="relative flex gap-x-3">
         <div className="flex h-6 items-center">
          <input
           id="selfPepDeclaration"
           name="selfPepDeclaration"
           type="checkbox"
           className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
           checked={formData.selfPepDeclaration}
           onChange={handleChange}
          />
         </div>
         <div className="text-sm leading-6">
          <label htmlFor="selfPepDeclaration" className="font-medium text-gray-900">
           Are you a Politically Exposed Person ?
          </label>
         </div>
        </div>
       </div>

       <div className="sm:col-span-3">
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
         Purpose Of Account
        </label>
        <div className="mt-2">
         <select
          id="purposeOfAccount"
          name="purposeOfAccount"
          autoComplete="purposeOfAccount"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={formData.purposeOfAccount}
          onChange={handleChange}
         >
          {displayPurposeOfAccountOptions}
         </select>
         {displayErrorMessage('purposeOfAccount')}
        </div>
       </div>

       {formData.purposeOfAccount === "OTHER" && (
        <div className="sm:col-span-3">
         <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
          Purpose of Account (Other)
         </label>
         <div className="mt-2">
          <textarea
           id="purposeOfAccountOther"
           name="purposeOfAccountOther"
           autoComplete="purposeOfAccountOther"
           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
           value={formData.purposeOfAccountOther}
           onChange={handleChange}
           required
          />
          {displayErrorMessage('purposeOfAccountOther')}
         </div>
        </div>
       )}
       <div className="sm:col-span-3">
        <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
         Expected Outgoing Volume Yearly
        </label>
        <div className="mt-2">
         <select
          id="expectedOutgoingTxVolumeYearly"
          name="expectedOutgoingTxVolumeYearly"
          autoComplete="expectedOutgoingTxVolumeYearly"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          value={formData.expectedOutgoingTxVolumeYearly}
          onChange={handleChange}

         >
          {displayYearlyVolumeOptions}
         </select>
         {displayErrorMessage('expectedOutgoingTxVolumeYearly')}
        </div>
       </div>
       <div className="sm:col-span-3">
        <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
         Expected Incoming Volume Yearly
        </label>
        <div className="mt-2">
         <select
          id="expectedIncomingTxVolumeYearly"
          name="expectedIncomingTxVolumeYearly"
          autoComplete="expectedIncomingTxVolumeYearly"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          value={formData.expectedIncomingTxVolumeYearly}
          onChange={handleChange}
         >
          {displayYearlyVolumeOptions}
         </select>
         {displayErrorMessage('expectedIncomingTxVolumeYearly')}
        </div>
       </div>

       <div className="sm:col-span-3">
        <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
         IP Address
        </label>
        <div className="mt-2">
         <input
          type="text"
          name="ipAddress"
          id="ipAddress"
          autoComplete="ipAddress"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={formData.ipAddress}
          disabled
         />
        </div>
       </div>

       <div className="sm:col-span-3">
        <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
         Place Of Birth
        </label>
        <div className="mt-2">
         <select
          id="placeOfBirth"
          name="placeOfBirth"
          autoComplete="placeOfBirth"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={formData.placeOfBirth}
          onChange={handleChange}
         >
          {displayCountryOptions}
         </select>
         {displayErrorMessage('placeOfBirth')}
        </div>
       </div>
      </div>
     </div>
    </div>

    <div className="mt-6 flex items-center justify-end gap-x-6">
     <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
      Cancel
     </button>
     <button
      type="submit"
      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
     >
      Save
     </button>
    </div>
   </form>
  </div>
 )
}

export default Index