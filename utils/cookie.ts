import { pathOr } from 'ramda'
import { Context } from '@nuxt/types'

export const serverGetCookie = (ctx: Context) =>
  pathOr<string>('null', ['req', 'headers', 'cookie'], ctx)
    .split(';')
    .reduce((token: string | null, cookie: string) => {
      const [cookieName, cookieVal] = cookie.trim().split('=')
      if (cookieName === 'apollo-token') {
        return cookieVal
      }
      return token
    }, null)

export const clientGetCookie = () =>
  document.cookie.split(';').reduce((token: string | null, cookie: string) => {
    const [cookieName, cookieVal] = cookie.trim().split('=')
    if (cookieName === 'apollo-token') {
      return cookieVal
    }
    return token
  }, null)
