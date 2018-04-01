/**
 * Created by leegend on 2018/4/1.
 */
const app = {
  state: {
    annotationDelete: false,
    fileDelete: false,
    paperCollect: false,
  },
  mutations: {
    annotationDelete(state) {
      state.annotationDelete = !state.annotationDelete;
    },
    fileDelete(state) {
      state.fileDelete = !state.fileDelete;
    },
    paperCollect(state) {
      state.paperCollect = !state.paperCollect;
    },
  }
};

export default app;