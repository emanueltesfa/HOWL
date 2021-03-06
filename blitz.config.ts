import { BlitzConfig, sessionMiddleware, simpleRolesIsAuthorized } from "blitz"

const config: BlitzConfig = {
  middleware: [
    sessionMiddleware({
      cookiePrefix: "Howl-App",
      isAuthorized: simpleRolesIsAuthorized,
    }),
  ],
  images: {
    domains: ["howlimagestorage.blob.core.windows.net"],
  },

  env: {
    SESSION_SECRET_KEY: "JFKLHJLSHDFJKLSHIFPOEHWUNFUEBUPCBEWBFJLKSDB",
  },
  /* Uncomment this to customize the webpack config
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    return config
  },
  */
}
module.exports = config
