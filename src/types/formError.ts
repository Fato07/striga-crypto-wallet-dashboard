type FormErrors = {
  email?: string;
  firstName?: string;
  lastName?: string;
  mobile?: {
    countryCode?: string;
    number?: number;
  };
  address?: {
    addressLine1?: string;
    city?: string;
    country?: string;
    postalCode?: string;
  };
};
