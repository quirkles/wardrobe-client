export interface AppConfig {
  AWS_BUCKET_NAME: string
  AWS_BUCKET_REGION: string
  AWS_IDENTITY_POOL_ID: string
  GQL_SCHEMA_ENDPOINT: string
}
declare const config: AppConfig
export default config
