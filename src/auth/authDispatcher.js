import { environment } from "../environment";
import http from "../shared/services/http-service.js";
import { concatMap, map } from "rxjs/operators";
import { LOGOUT } from "./authStore";
import { getAsUser } from "./user";

export const documentUploadUrl = environment.DOCUMENT_UPLOAD_URL;

export const doLogin = (loginRequest) => {
  clearAuthToken();
  return getToken(loginRequest).pipe(
    concatMap((token) => getMyDetailsWithToken(token))
  );
};
export const doUploadDocument = (id, file) => {
  const url = documentUploadUrl + id;
  let formData = new FormData();

  formData.append("file", file);

  return http.uploadFileToServer(url, formData);
};

export const getToken = (loginRequest) => {
  const url = environment.baseUrl + "/auth/login";

  return http.post(url, loginRequest).pipe(
    map((response) => {
      return response.token;
    })
  );
};
export const doRegisterUser = (registerRequest) => {
  const url = environment.REGISTER_URL;

  return http.post(url, registerRequest).pipe(
    concatMap((response) => {
      const loginRequest = {};
      loginRequest.userName = registerRequest.userName;
      loginRequest.password = registerRequest.password;
      return doLogin(loginRequest);
    })
  );
};

export const doRegisterDoctor = (registerRequest) => {
  const url = environment.DOCTOR_REGISTER_URL;

  return http.post(url, registerRequest);
};
export const doRegisterTester = (registerRequest) => {
  const url = environment.TESTER_REGISTER_URL;

  return http.post(url, registerRequest);
};

const getMyDetailsWithToken = (token) => {
  const url = environment.baseUrl + "/users/details";
  setAuthToken(token);

  return http.get(url).pipe(
    map((userObject) => {
      const authInfo = {};
      authInfo.token = token;
      authInfo.user = getAsUser(userObject);
      return authInfo;
    })
  );
};

export const setAuthToken = (token) => {
  http.setToken(token);
};

export const clearAuthToken = () => {
  http.setToken(null);
};

export const doLogout = (dispatch, history) => {
  dispatch({ type: LOGOUT });
  setAuthToken(null);
  localStorage.clear();
  history.push("/");
};
