/**
 * Planned adapter boundaries, not connected production services.
 * Time is monotonic milliseconds in a defined clock domain.
 * Coordinate transforms must be documented per provider before use.
 */
export type TrackingState = 'unavailable' | 'initializing' | 'tracking' | 'limited' | 'lost'
export type TrackingFrame = {
  providerId: string
  frameId: number
  timestampMs: number
  state: TrackingState
  face?: {
    /** Column-major 4x4 matrix in declared coordinate frame. */
    headMatrix: readonly number[]
    confidence?: number
  }
  body?: {
    /** Canonical named joints after explicit skeleton retargeting. */
    joints: Readonly<Record<string, readonly [number, number, number]>>
  }
}

export interface TrackingProvider {
  readonly id: string
  start(): Promise<void>
  stop(): Promise<void>
  subscribe(listener: (frame: TrackingFrame) => void): () => void
}

export type ShowState = 'disconnected' | 'connected' | 'streaming' | 'recording' | 'both' | 'error'
export type ShowCommand = 'start-stream' | 'stop-stream' | 'start-record' | 'stop-record'
export interface ProducerBridge {
  getStatus(): Promise<ShowState>
  /** Authenticated server-side bridge ONLY; no OBS credentials in the browser. */
  command(command: ShowCommand): Promise<ShowState>
}
