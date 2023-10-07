import { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { SerializedError } from "@/@types";

interface SignUpData {
  email: string;
  password: string;
}

export default function SignUp() {
  const [signUpData, setSignUpData] = useState<SignUpData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<SerializedError[]>([]);

  function handleInputChange(name: keyof SignUpData, value: string) {
    setSignUpData({ ...signUpData, [name]: value });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await axios.post("/api/users/signup", signUpData);
      console.log(response);
    } catch (error) {
      const axiosError = error as AxiosError<{ errors: SerializedError[] }>;

      setErrors(axiosError.response?.data.errors as SerializedError[]);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-4 ">
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

      {errors.length > 0 && (
        <div className="alert alert-danger my-2">
          <h4>Ooops...</h4>
          <ul className="my-0">
            {errors.map((error) => (
              <li key={error.message}>{error.message}</li>
            ))}
          </ul>
        </div>
      )}

      <button className="btn btn-primary mt-4">Sign Up</button>
    </form>
  );
}
