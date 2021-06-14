import { withAuthAxios } from "@/axios";

export const getBundlesAPI = () =>
  withAuthAxios.get("/bundles/");