// import { createApp } from "@whoof/infra"
// import { env } from "../lib/env"

// const vpc = sst.aws.Vpc.get("vpc", "vpc-0f85c58795f5dea47")
// const db = sst.aws.Aurora.get("db", "whop-apps-production-dbcluster-bbfutxuo")

// export const app = createApp({
//   config: {
//     name: "app-template",
//     path: ".",
//     domain: undefined,
//     databaseName: "template",
//     devDatabase: "dev-template",
//     devPort: 3000,
//     devStudioPort: 3010,
//   },
//   dependencies: {
//     vpc: vpc,
//     db: db,
//     env: env,
//     getRepoVersion: () => "0.0.0",
//   },
// })
