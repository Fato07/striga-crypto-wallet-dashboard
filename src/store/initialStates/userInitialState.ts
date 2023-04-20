import { UserState } from '@/types/userTypes';

const userInitialState: UserState = {
  isLoggedIn: false,
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
};

export default userInitialState;
