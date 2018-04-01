import Cookies from 'js-cookie';
/**
 * Created by leegend on 2018/4/1.
 */
const user = {
  state: {
    role: null
  },
  mutations: {
    login (state, role) {
      state.role = role;
    },
    logout (state) {
      state.role = null;
      Cookies.remove('user');
      Cookies.remove('password');
      Cookies.remove('access');
      localStorage.clear();
    }
  }
};

export default user;