import React, { useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, signUpAsync } from '../../store/userSlice';
import { set as setNestedProperty } from 'lodash';
import countryList from 'react-select-country-list'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { formDataSchema } from '@/schemas/formSchema';

interface PhoneInputData {
  dialCode: string;
}

const Signup = () => {
  const countryOptions = useMemo(() => countryList().getData(), [])
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    mobile: {
      countryCode: '',
      number: '',
    },
    address: {
      addressLine1: '',
      city: '',
      country: '',
      postalCode: '',
    },
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    let finalValue = value;
    if (name === "address.country") {
      const selectedCountry = countryOptions.find((country) => country.label === value);
      if (selectedCountry) {
        finalValue = selectedCountry.value;
      }
    }

    // Update the form data using Lodash's set function.
    setFormData((prevState) => {
      const newFormData = { ...prevState };

      // handle the deep update of nested properties in form data
      setNestedProperty(newFormData, name, finalValue);

      return newFormData;
    });
  };

  const handlePhoneChange = (value: string, data: PhoneInputData) => {
    setFormData((prevState) => {
      const newFormData = { ...prevState };
      setNestedProperty(newFormData, "mobile.countryCode", "+" + data.dialCode);
      setNestedProperty(newFormData, "mobile.number", value.replace(data.dialCode, ""));
      return newFormData;
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const isUserinputValid = validateFormInput()
    if (isUserinputValid) {
      console.log("USER_INPUT", formData)
      dispatch(signUpAsync(formData));
    }
  };

  const validateFormInput = () => {
    const validationResult = formDataSchema.safeParse(formData);
    if (validationResult.success) {
      return true
    } else {
      const errorMap = validationResult.error.formErrors.fieldErrors;
      setFormErrors(errorMap);
      return false
    }
  };

  const displayErrorMessage = (field: string) => {

    const errorMessage = formErrors[field];
    if (errorMessage) {
      if (formErrors[field] !== "address") {
        return (
          <p className="text-xs text-red-500 mt-1">
            {errorMessage && errorMessage[0]}
          </p>
        );
      }
    }

    // If the field is within the address object, handle the errors here
    if (field === "address.addressLine1") {
      return (
        <p className="text-xs text-red-500 mt-1">
          {formErrors.address && formErrors.address[0]}
        </p>
      );
    }

    if (field === "address.city") {
      return (
        <p className="text-xs text-red-500 mt-1">
          {formErrors.address && formErrors.address[1]}
        </p>
      );
    }

    if (field === "address.postalCode") {
      return (
        <p className="text-xs text-red-500 mt-1">
          {formErrors.address && formErrors.address[2]}
        </p>
      );
    }

  };

  const displayCountryOptions = countryOptions.map((country, index) => (
    <option key={index} value={country.value}>{country.label}</option>
  ));

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Welcome to Sign Up
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                First name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  autoComplete="firstName"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {displayErrorMessage('firstName')}
              </div>
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                Last name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  autoComplete="lastName"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {displayErrorMessage('lastName')}
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {displayErrorMessage('email')}
              </div>
            </div>
            <div className="col-span-full">
              <label htmlFor="mobile" className="block text-sm font-medium leading-6 text-gray-900">
                Mobile number
              </label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <PhoneInput
                  country="us"
                  onChange={handlePhoneChange}
                />
              </div>
            </div>

            <div className="flex gap-2 mt-2">
              <div className="flex-1">
                <label htmlFor="Address" className="block text-sm font-medium leading-6 text-gray-900">
                  Street address
                </label>
                <input
                  type="text"
                  name="address.addressLine1"
                  id="Address"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Address"
                  value={formData.address.addressLine1}
                  onChange={handleChange}
                />
                {displayErrorMessage('address.addressLine1')}
              </div>
              <div className="flex-1">
                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                  City
                </label>
                <input
                  type="text"
                  name="address.city"
                  id="city"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="City"
                  value={formData.address.city}
                  onChange={handleChange}
                />
                {displayErrorMessage('address.city')}
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <div className="flex-1">
                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                  Country
                </label>
                <select
                  id="country"
                  name="address.country"
                  autoComplete="country"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.address.country}
                  onChange={handleChange}
                >
                  {displayCountryOptions}
                </select>
              </div>
              <div className="flex-1">
                <label htmlFor="postalCode" className="block text-sm font-medium leading-6 text-gray-900">
                  Postal code
                </label>
                <input
                  type="text"
                  name="address.postalCode"
                  id="postalCode"
                  autoComplete="postalCode"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Postal Code"
                  value={formData.address.postalCode}
                  onChange={handleChange}
                />
                {displayErrorMessage('address.postalCode')}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup