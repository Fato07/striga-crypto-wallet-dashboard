import { UserState } from '@/types/userTypes';

const userInitialState: UserState = {
  isLoggedIn: false,
  email: '',
  firstName: '',
  lastName: '',
};

export default userInitialState;
