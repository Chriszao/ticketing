import { SerializedError } from "@/@types";
import axios, { AxiosError } from "axios";
import { ReactElement, useState } from "react";

interface UseRequestProps<R = unknown, T = unknown> {
  url: string;
  method: "get" | "post" | "put" | "delete";
  body?: T;
  onSuccess?: (data: R) => void;
}

export function useRequest<T>({
  method,
  url,
  body,
  onSuccess,
}: UseRequestProps<T>) {
  const [errors, setErrors] = useState<ReactElement | null>(null);

  async function doRequest() {
    try {
      const response = await axios[method]<T>(url, body);

      setErrors(null);

      onSuccess?.(response.data);

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ errors: SerializedError[] }>;

      setErrors(
        <div className="alert alert-danger my-2">
          <h4>Ooops...</h4>

          <ul className="my-0">
            {axiosError.response?.data.errors.map((error) => (
              <li key={error.message}>{error.message}</li>
            ))}
          </ul>
        </div>,
      );
    }
  }

  return {
    errors,
    doRequest,
  };
}
