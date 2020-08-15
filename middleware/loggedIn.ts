import { Middleware } from '@nuxt/types'
import { decode } from 'jsonwebtoken'
import { clientGetCookie, serverGetCookie } from '~/utils/cookie'
import { DecodedJwtToken } from '~/types/DecodedJwtToken'

const loggedIn: Middleware = (context) => {
  const { redirect, app, route } = context
  const token = process.server ? serverGetCookie(context) : clientGetCookie()
  if (!token) {
    redirect(`/login?redirect=${encodeURIComponent(route.path)}`)
  } else {
    const { sub: tokenId, email: tokenEmail } = decode(token) as DecodedJwtToken
    const { id: existingId, email: existingEmail } = app.$accessor.sessionUser
    app.$accessor.sessionUser.setSessionUserData({
      id: existingId || String(tokenId),
      email: existingEmail || tokenEmail,
    })
  }
}

export default loggedIn
