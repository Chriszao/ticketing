import { useRequest } from "@/hooks";
import Router from "next/router";
import { FormEvent, useState } from "react";

interface SignInData {
  email: string;
  password: string;
}

interface SignInResponse {
  id: string;
  email: string;
}

export default function SignIn() {
  const [signInData, setSignInData] = useState<SignInData>({
    email: "",
    password: "",
  });
  const { doRequest, errors } = useRequest<SignInResponse>({
    url: "/api/users/signIn",
    method: "post",
    body: signInData,
    onSuccess: () => Router.push("/"),
  });

  function handleInputChange(name: keyof SignInData, value: string) {
    setSignInData({ ...signInData, [name]: value });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await doRequest();
  }

  return (
    <form onSubmit={handleSubmit} className="mx-4">
      <h1>Sign In</h1>

      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          name="email"
          className="form-control"
          value={signInData.email}
          onChange={(event) => handleInputChange("email", event.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          className="form-control"
          value={signInData.password}
          onChange={(event) =>
            handleInputChange("password", event.target.value)
          }
        />
      </div>

      {errors}

      <button className="btn btn-primary mt-4">Sign In</button>
    </form>
  );
}
