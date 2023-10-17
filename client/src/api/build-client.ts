import axios, { AxiosInstance } from "axios";
import { NextApiRequestCookies } from "next/dist/server/api-utils";
import { NextIncomingMessage } from "next/dist/server/request-meta";

type BuildClientProps = {
  req: NextIncomingMessage & {
    cookies: NextApiRequestCookies;
  };
};

export function buildClient({ req }: BuildClientProps): AxiosInstance {
  return axios.create({
    baseURL:
      typeof window === "undefined"
        ? "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local"
        : "/",
    headers: req.headers,
  });
}
