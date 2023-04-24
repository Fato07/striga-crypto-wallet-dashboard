import { UserState } from '@/types/userTypes';

const userInitialState: UserState = {
  isLoggedIn: false,
  email: 'fathindos.fd@gmail.com',
  firstName: 'Fathin',
  lastName: 'Dosunmu',
  mobile: {
    countryCode: '+372',
    number: '53653094',
  },
  address: {
    addressLine1: 'Pärnu mnt 33',
    city: 'Tallinn',
    country: 'Estonia',
    postalCode: '12611',
  },
};

export default userInitialState;
