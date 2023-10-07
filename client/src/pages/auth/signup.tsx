import { FormEvent, useState } from "react";
import axios from "axios";

interface SignUpData {
  email: string;
  password: string;
}

export default function SignUp() {
  const [signUpData, setSignUpData] = useState<SignUpData>({
    email: "",
    password: "",
  });

  function handleInputChange(name: keyof SignUpData, value: string) {
    setSignUpData({ ...signUpData, [name]: value });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await axios.post("/api/users/signup", signUpData);

    console.log(response.data);
  }

  return (
    <form onSubmit={handleSubmit}>
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

      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
}
