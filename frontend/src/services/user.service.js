import { axiosInstance as axios } from "./axiosInstance";

export const UserService = {
  login,
  logout,
  getAll
};

async function login(payload) {
  try {
    const response = await axios.post("/api/auth/login", payload);
    return response;
  } catch (error) {
    throw error.response.data.error;
  }
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("links");
  localStorage.removeItem("roles");
}

function getAll() {}
