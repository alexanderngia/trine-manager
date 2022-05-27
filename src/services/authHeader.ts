import { AxiosRequestHeaders } from "axios";

export default function authHeader(): AxiosRequestHeaders {
  const accessTK: any = localStorage.getItem("persist:user");

  if (typeof accessTK !== "string") throw new Error("User info not found");

  const user = JSON.parse(accessTK);

  if (user && user.accessToken) {
    return { "x-access-token": user.accessToken };
  } else {
    return {};
  }
}
