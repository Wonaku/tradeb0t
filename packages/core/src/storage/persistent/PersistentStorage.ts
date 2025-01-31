import { DataSource } from 'typeorm'
import { AlgorithmRun, Algorithm, Order } from 'src/domain'
import { AlgorithmsRepository } from './AlgorithmsRepository'
import { AlgorithmRunsRepository } from './AlgorithmRunsRepository'
import { OrdersRepository } from './OrdersRepository'
import { IPersistentStorage } from './IPersistentStorage'
import type { LoggerService } from 'src/bot'

export class PersistentStorage implements IPersistentStorage {
  isInitialized = false

  get orders() {
    return this._orders
  }

  get algorithms() {
    return this._algorithms
  }

  get algorithmRuns() {
    return this._algorithmRuns
  }

  private _orders: OrdersRepository
  private _algorithms: AlgorithmsRepository
  private _algorithmRuns: AlgorithmRunsRepository

  constructor(private id: string) {
    this.datasource = new DataSource({
      type: 'better-sqlite3',
      database: `./storage-${this.id}.db`,
      logging: false,
      synchronize: true,
      entities: [Algorithm, AlgorithmRun, Order]
    })
  }

  async initialize(loggerService?: LoggerService) {
    await this.datasource.initialize()
    const algorithmsRepository = new AlgorithmsRepository(Algorithm, this.datasource.manager)
    const algorithmRunsRepository = new AlgorithmRunsRepository(AlgorithmRun, this.datasource.manager)
    const ordersRepository = new OrdersRepository(Order, this.datasource.manager)
    if (loggerService) {
      this._algorithms = loggerService.createErrorHandlingProxy(algorithmsRepository)
      this._algorithmRuns = loggerService.createErrorHandlingProxy(algorithmRunsRepository)
      this._orders = loggerService.createErrorHandlingProxy(ordersRepository)
    } else {
      this._algorithms = algorithmsRepository
      this._algorithmRuns = algorithmRunsRepository
      this._orders = ordersRepository
    }
    this.isInitialized = true
  }

  private datasource: DataSource
}
