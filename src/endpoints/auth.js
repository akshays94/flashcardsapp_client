import { withoutAuthAxios } from "@/axios";
import { withAuthAxios } from "@/axios";

export const registerAPI = (formData) =>
  withoutAuthAxios.post("/register/", formData);

export const loginAPI = (formData) =>
  withoutAuthAxios.post("/login/", formData);

export const validateTokenAPI = () => withAuthAxios.get("/validate-token/");
