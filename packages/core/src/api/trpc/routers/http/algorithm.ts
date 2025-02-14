import { publicProcedure, router } from './trpc'
import { z } from 'zod'
import { ITradeBot } from 'src/bot'
import { ZAlgorithmName, ZInputs, ZRunId, ZPaginationOptions } from '../../schemas'

export default (tradebot: ITradeBot) => {
  return router({
    list: publicProcedure.query(() => {
      return tradebot.analyzer.tradeAlgos.description
    }),
    listRuns: publicProcedure
      .input(
        z.object({
          algorithmName: ZAlgorithmName,
          pagination: ZPaginationOptions
        })
      )
      .query(async ({ input }) => {
        return await tradebot.analyzer.storage.algorithmRuns.findManyByAlgorithmPaginated(
          input.algorithmName,
          input.pagination
        )
      }),
    run: publicProcedure
      .input(
        z.object({
          algorithmName: ZAlgorithmName,
          inputs: ZInputs
        })
      )
      .mutation(async ({ input }) => {
        return await tradebot.analyzer.tradeAlgos.runAlgorithm(input.algorithmName, input.inputs)
      }),
    stop: publicProcedure
      .input(
        z.object({
          algorithmName: ZAlgorithmName,
          runId: ZRunId
        })
      )
      .mutation(async ({ input }) => {
        return await tradebot.analyzer.tradeAlgos.stopAlgorithm(input.algorithmName, input.runId)
      }),
    resume: publicProcedure
      .input(
        z.object({
          algorithmName: ZAlgorithmName,
          runId: ZRunId
        })
      )
      .mutation(async ({ input }) => {
        return await tradebot.analyzer.tradeAlgos.resumeAlgorithm(input.algorithmName, input.runId)
      })
  })
}
