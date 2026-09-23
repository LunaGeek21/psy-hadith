import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { createQuestion, getPublishedArticles, getPublishedAssessmentTools, getPublishedHelpResources, getPublishedQuestions } from "./db";
import { z } from "zod";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  content: router({
    articles: publicProcedure.query(() => getPublishedArticles()),
    assessments: publicProcedure.query(() => getPublishedAssessmentTools()),
    helpResources: publicProcedure.query(() => getPublishedHelpResources()),
  }),
  questions: router({
    list: publicProcedure.query(() => getPublishedQuestions()),
    submit: publicProcedure
      .input(z.object({ body: z.string().trim().min(10).max(5000) }))
      .mutation(({ input }) => createQuestion({ body: input.body })),
  }),
});

export type AppRouter = typeof appRouter;
