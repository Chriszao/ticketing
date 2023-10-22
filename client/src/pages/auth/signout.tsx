import { useRequest } from "@/hooks";
import Router from "next/router";
import { useEffect } from "react";

export default function SignOut() {
  const { doRequest } = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => Router.push("/"),
  });

  useEffect(() => {
    doRequest();
  }, [doRequest]);

  return <div>Signing you out...</div>;
}
