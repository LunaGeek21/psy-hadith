import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createContext(): TrpcContext {
  return {
    user: undefined,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("questions.submit", () => {
  it("rejects questions that are too short to be useful", async () => {
    const caller = appRouter.createCaller(createContext());

    await expect(caller.questions.submit({ body: "قصير" })).rejects.toMatchObject({
      code: "BAD_REQUEST",
    });
  });
});
