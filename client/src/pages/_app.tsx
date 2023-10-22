import { GetInitialPropsContext } from "@/@types/get-initial-props";
import { buildClient } from "@/api/build-client";
import Header from "@/compnents/header";
import "bootstrap/dist/css/bootstrap.css";
import { NextPageContext } from "next";
import type { AppProps } from "next/app";

export type CurrentUser = {
  id: string;
  email: string;
} | null;

export default function App({
  Component,
  pageProps,
  currentUser,
}: AppProps & { currentUser: CurrentUser }) {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  );
}

App.getInitialProps = async (context: GetInitialPropsContext) => {
  const client = buildClient(context.ctx);

  let currentUser: { currentUser: CurrentUser } | null = null;
  let pageProps = {};

  try {
    const { data } = await client.get<{ currentUser: CurrentUser }>(
      "api/users/currentUser",
    );

    if (context.Component.getInitialProps) {
      pageProps = await context.Component.getInitialProps(
        context.ctx as unknown as NextPageContext,
      );
    }

    currentUser = data;
  } catch (error) {
    console.log("ERROR: ", (error as Error).message);
  }

  return { pageProps, ...currentUser };
};
