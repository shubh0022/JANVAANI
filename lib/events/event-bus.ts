import { EventEmitter } from 'events';

export type DomainEventType =
  | 'problem.created'
  | 'problem.verified'
  | 'problem.assigned'
  | 'problem.escalated'
  | 'problem.resolved'
  | 'solution.created'
  | 'reward.earned'
  | 'bounty.created'
  | 'bounty.submitted'
  | 'api.limit_reached'
  | 'data.sync.completed';

export interface DomainEvent<T = any> {
  eventId: string;
  eventType: DomainEventType;
  tenantId: string;
  timestamp: string;
  actor?: {
    id: string;
    name: string;
    role: string;
  };
  payload: T;
}

class JanVaaniEventBus extends EventEmitter {
  constructor() {
    super();
    this.setMaxListeners(200);
  }

  /**
   * Publish a high-priority domain event to all subscribers & real-time SSE streams
   */
  publish<T = any>(event: Omit<DomainEvent<T>, 'eventId' | 'timestamp'>): DomainEvent<T> {
    const fullEvent: DomainEvent<T> = {
      ...event,
      eventId: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
      timestamp: new Date().toISOString(),
    };

    console.log(`[EventBus] Dispatched [${fullEvent.eventType}] for tenant: ${fullEvent.tenantId}`);
    this.emit(fullEvent.eventType, fullEvent);
    this.emit('*', fullEvent);

    return fullEvent;
  }
}

// Global EventBus Singleton
export const eventBus = new JanVaaniEventBus();
