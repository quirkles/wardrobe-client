const path = require('path')
const fs = require('fs')

const dotenv = require('dotenv')

// Set the env from APP_ENV and fall back to local
const env = process.env.APP_ENV || 'local'

function getDotenvConfig() {
  const envPath = path.join(__dirname, '..', `.${env}.env`)
  let dotEnvBuffer = null
  try {
    dotEnvBuffer = fs.readFileSync(envPath)
  } catch (err) {
    if (err.code === 'ENOENT') return {}
    throw err
  }
  return dotenv.parse(dotEnvBuffer)
}

function getEnvVarConfig() {
  const envVars = [
    'AWS_BUCKET_NAME',
    'AWS_BUCKET_REGION',
    'AWS_IDENTITY_POOL_ID',
    'GQL_SCHEMA_ENDPOINT',
  ]
  return envVars.reduce((envVarConfig, varName) => {
    const value = process.env[varName]
    if (value) {
      envVarConfig[varName] = value
    }
    return envVarConfig
  }, {})
}

const baseConfig = require('./base') || {}
const envConfig = require(`./${env}`) || {}

const fromEnvFile = getDotenvConfig()
const fromProcessEnv = getEnvVarConfig()
const config = Object.assign(baseConfig, envConfig, fromEnvFile, fromProcessEnv)

module.exports = config
