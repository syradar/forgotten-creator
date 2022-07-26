import { env as _env } from './src/env/server.mjs'
import i18n from './next-i18next.config.js'
/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
  return config
}

console.log({
  reactStrictMode: true,
  swcMinify: true,
  ...i18n,
})

export default defineNextConfig({
  reactStrictMode: true,
  swcMinify: true,
  ...i18n,
})
