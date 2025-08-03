import { AuthenticatedUser } from "@whoof/auth"
import { accessModel } from "./config"

export type AppTierKey = keyof typeof accessModel.tiers
export type AppUserStatus = "developer" | "creator" | "user"
export type AppUser = AuthenticatedUser<AppUserStatus, AppTierKey>
export type AppAccessModel = typeof accessModel
