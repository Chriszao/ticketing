import { useRequest } from "@/hooks";
import Router from "next/router";
import { FormEvent, useState } from "react";

interface SignUpData {
  email: string;
  password: string;
}

interface SignUpResponse {
  id: string;
  email: string;
}

export default function SignUp() {
  const [signUpData, setSignUpData] = useState<SignUpData>({
    email: "",
    password: "",
  });
  const { doRequest, errors } = useRequest<SignUpResponse>({
    url: "/api/users/signUp",
    method: "post",
    body: signUpData,
    onSuccess: () => Router.push("/"),
  });

  function handleInputChange(name: keyof SignUpData, value: string) {
    setSignUpData({ ...signUpData, [name]: value });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await doRequest();
  }

  return (
    <form onSubmit={handleSubmit} className="mx-4">
      <h1>Sign Up</h1>

      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          name="email"
          className="form-control"
          value={signUpData.email}
          onChange={(event) => handleInputChange("email", event.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          className="form-control"
          value={signUpData.password}
          onChange={(event) =>
            handleInputChange("password", event.target.value)
          }
        />
      </div>

      {errors}

      <button className="btn btn-primary mt-4">Sign Up</button>
    </form>
  );
}
