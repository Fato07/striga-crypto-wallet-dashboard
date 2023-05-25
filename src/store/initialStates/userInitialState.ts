import { UserState } from '@/types/userTypes';

const userInitialState: UserState = {
  isLoggedIn: false,
  userId: '',
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
  KYC: {
    emailVerified: false,
    mobileVerified: false,
    status: '',
  },
  emailVerification: {
    dateExpires: '',
  },
  mobileVerification: {
    dateExpires: '',
  },
  createdAt: 0,
  expectedIncomingTxVolumeYearly: '',
  expectedOutgoingTxVolumeYearly: '',
  occupation: '',
  placeOfBirth: '',
  purposeOfAccount: '',
  selfPepDeclaration: false,
  sourceOfFunds: '',
};

export default userInitialState;
