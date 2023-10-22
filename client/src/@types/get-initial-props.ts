import { NextComponentType, NextPageContext } from "next";
import { NextIncomingMessage } from "next/dist/server/request-meta";

export type GetInitialPropsContext = NextPageContext & {
  ctx: {
    req: NextIncomingMessage & { cookies: Partial<{ [key: string]: string }> };
  };
  Component: NextComponentType<NextPageContext>;
};
