import { atom } from 'recoil';
import { RecoilAtomKeys } from '../recoilKeys';

export const authState = atom({
  key: RecoilAtomKeys.AUTH_STATE,
  default: {
    token: '',
    expires: null,
    user: {
      id: 0,
      name: '',
      sub: '',
    },
  },
});
