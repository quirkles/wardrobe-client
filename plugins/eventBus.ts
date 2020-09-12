import { Subject, Unsubscribable } from 'rxjs'

import { Plugin } from '@nuxt/types'
import { v4 as uuid } from 'uuid'

export interface AppNotification {
  type: 'warning' | 'info' | 'danger' | 'success'
  content: string
}

export type Payload = AppNotification

interface EventBus {
  subscribe(
    topic: string,
    handler: (eventPayload: Payload) => any
  ): Unsubscribable
  publish(topic: string, payload: Payload): void
}

export const createEventBus = (): EventBus => {
  const busId = uuid()
  const listeners: { [topic: string]: Subject<Payload> } = {}
  return {
    subscribe(
      topic: string,
      handler: (eventPayload: Payload) => any
    ): Unsubscribable {
      let listener = listeners[topic]
      if (listener == null) {
        listener = new Subject()
        listeners[topic] = listener
      }
      return listener.subscribe({
        next: (payload) => handler(payload),
      })
    },
    publish(topic: string, payload: Payload) {
      const listener = listeners[topic]
      if (listener) {
        listener.next(payload)
      }
    },
  }
}

declare module '@nuxt/types' {
  interface Context {}
}

declare module 'vue/types/vue' {
  interface Vue {
    $eventBus: EventBus
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $eventBus: EventBus
  }
  interface Context {
    $eventBus: EventBus
  }
}

const eventBus: Plugin = (context, inject) => {
  const bus = createEventBus()
  inject('eventBus', bus)
  context.$eventBus = bus
}

export default eventBus
