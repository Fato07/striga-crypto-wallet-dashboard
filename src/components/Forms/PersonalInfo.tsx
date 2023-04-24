import { selectUser } from '@/store/userSlice';
import React from 'react'
import { useSelector } from 'react-redux';

const PersonalInfo = () => {

 const user = useSelector(selectUser);

 return (
  <div>
   <div className="border-b border-gray-900/10 pb-12">
    <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
     <div className="sm:col-span-3">
      <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
       First name
      </label>
      <div className="mt-2">
       <input
        type="text"
        name="firstName"
        id="firstName"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        value={user.firstName}
        disabled
       />
      </div>
     </div>

     <div className="sm:col-span-3">
      <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
       Last name
      </label>
      <div className="mt-2">
       <input
        type="text"
        name="lastName"
        id="lastName"
        autoComplete="family-name"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        value={user.lastName}
        disabled
       />
      </div>
     </div>

     <div className="sm:col-span-4">
      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
       Email address
      </label>
      <div className="mt-2">
       <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        value={user.email}
        disabled
       />
      </div>
     </div>

     <div className="sm:col-span-3">
      <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
       Country
      </label>
      <div className="mt-2">
       <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        value={user.address.country}
        disabled
       />
      </div>
     </div>

     <div className="col-span-full">
      <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
       Street address
      </label>
      <div className="mt-2">
       <input
        type="text"
        name="street-address"
        id="street-address"
        autoComplete="street-address"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        value={user.address.addressLine1}
        disabled
       />
      </div>
     </div>

     <div className="sm:col-span-2 sm:col-start-1">
      <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
       City
      </label>
      <div className="mt-2">
       <input
        type="text"
        name="city"
        id="city"
        autoComplete="address-level2"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        value={user.address.city}
        disabled
       />
      </div>
     </div>

     <div className="sm:col-span-2">
      <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
       ZIP / Postal code
      </label>
      <div className="mt-2">
       <input
        type="text"
        name="postal-code"
        id="postal-code"
        autoComplete="postal-code"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        value={user.address.postalCode}
        disabled
       />
      </div>
     </div>
    </div>
   </div>
  </div>
 )
}

export default PersonalInfo