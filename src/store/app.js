/**
 * Created by leegend on 2018/4/1.
 */
const app = {
  state: {
    annotationCreate: false,
    annotationDelete: false,
    annotationAllDelete: false,
    fileDelete: false,
    paperDelete: false,
    paperUpdate: false,
    paperCollect: false,
    paperUncollect: false,
    responseFailed: false,
    responseErrMsg: '',
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
    annotationAllDelete(state) {
      state.annotationAllDelete = !state.annotationAllDelete;
    },
    paperUncollect(state) {
      state.paperUncollect = !state.paperUncollect;
    },
    responseFailed(state, code){
      state.responseFailed = code;
    },
    responseErrMsg(state, errMsg) {
      state.responseErrMsg = errMsg;
    },
    annotationCreate(state) {
      state.annotationCreate = !state.annotationCreate;
    },
    paperDelete(state) {
      state.paperDelete = !state.paperDelete;
    },
    paperUpdate(state){
      state.paperUpdate = !state.paperUpdate;
    }
  }
};

export default app;