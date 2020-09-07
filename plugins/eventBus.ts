import { Subject, Unsubscribable } from 'rxjs'

import { Plugin } from '@nuxt/types'

interface Payload {
  payload: any
}

interface EventBus {
  subscribe(
    topic: string,
    handler: (eventPayload: Payload) => any
  ): Unsubscribable
  publish(topic: string, payload: Payload): void
}

const createEventBus = (): EventBus => {
  const listeners: { [topic: string]: Subject<Payload> } = {}
  return {
    subscribe(
      topic: string,
      handler: (eventPayload: Payload) => any
    ): Unsubscribable {
      console.log(`subscribing to event: ${topic}`) //eslint-disable-line
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
