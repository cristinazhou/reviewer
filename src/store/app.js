/**
 * Created by leegend on 2018/4/1.
 */
const app = {
  state: {
    annotationDelete: false
  },
  mutations: {
    annotationDelete(state) {
      state.annotationDelete = !state.annotationDelete;
    }
  }
};

export default app;