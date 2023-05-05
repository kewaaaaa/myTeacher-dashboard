import { createStore } from "redux";
import {
  ADD_MODAL,
  CLOSE_MODAL,
  EDIT_MODAL,
  OPEN_MODAL,
  PAGE_ADMIN,
  PAGE_CLIENT,
  START_LOAD,
  STOP_LOAD,
} from "./ationTypes";

const initStae = {
  isModalOpen: false,
  modalType: null,
  reloadItems: false,
  page: null,
};

const reducer = (state = initStae, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return { ...state, isModalOpen: true };
    case CLOSE_MODAL:
      return { ...state, isModalOpen: false };
    case ADD_MODAL:
      return { ...state, modalType: "Add" };
    case EDIT_MODAL:
      return { ...state, modalType: "Edit" };
    case START_LOAD:
      return { ...state, reloadItems: true };
    case STOP_LOAD:
      return { ...state, reloadItems: false };
    case PAGE_ADMIN:
      return { ...state, page: "Admin" };
    case PAGE_CLIENT:
      return { ...state, page: "Client" };
    default:
      return state;
  }
};
export const store = createStore(reducer);
