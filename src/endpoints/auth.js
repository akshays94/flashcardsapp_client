import { withoutAuthAxios } from "@/axios";
import { withAuthAxios } from "@/axios";

export const loginAPI = (formData) =>
  withoutAuthAxios.post("/login/", formData);

export const validateTokenAPI = () =>
  withAuthAxios.get("/validate-token/");
