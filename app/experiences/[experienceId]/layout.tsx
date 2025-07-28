import React from 'react';
import { getAuthenticatedUser } from '@/lib/auth';
import { whopSdk } from '@/lib/whop-sdk';
import { AppBuilder } from '../../../../../packages/ui/src/builder';
import { env } from '@/lib/env';
import 'frosted-ui/styles.css';

export default async function ExperiencePage({
	children,
	params
}: {
	children: React.ReactNode
	params: Promise<{ experienceId: string }>
}) {
	return <AppBuilder
		params={params}
		whopSdk={whopSdk}
		appView={{
			user: ({ user, experience, validKey, untypedKey }) => (<div>User {user.userId} {experience.id}</div>),
			creator: ({ user, experience }) => (<div>Creator {user.userId} {experience.id}</div>),
			developer: ({ user, experience }) => (<div>Developer {user.userId} {experience.id}</div>),
		}}
		appConfig={{
			appId: env.NEXT_PUBLIC_WHOP_APP_ID,
		}}
		getUser={getAuthenticatedUser}
		fetchData={async ({ user, experience }) => {
			console.log('🔍 User:', user)
			console.log('🔍 Experience:', experience)
			try {
				return {
					validKey: "value",
				}
			} catch (error) {
				throw error
			}
		}}>
		<>{children}</>
	</AppBuilder>
}

