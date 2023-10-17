import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { buildClient } from "@/api/build-client";

type CurrentUser = {
  id: string;
  email: string;
} | null;

export default function Home({
  currentUser,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are not signed in</h1>
  );
}

export const getServerSideProps: GetServerSideProps<{
  currentUser: CurrentUser;
}> = async (context) => {
  const client = buildClient(context);

  let currentUser: CurrentUser = null;

  try {
    const { data } = await client.get<{ currentUser: CurrentUser }>(
      "api/users/currentUser",
    );

    currentUser = data.currentUser;
  } catch (error) {
    console.log("ERROR: ", (error as Error).message);
  }

  return { props: { currentUser } };
};
