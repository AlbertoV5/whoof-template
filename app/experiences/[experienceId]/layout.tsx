import { AppBuilder } from '@whoof/ui';
import 'frosted-ui/styles.css';
import React from 'react';

import { getAuthenticatedUser } from '@/lib/server/middleware/auth';
import { whopSdk } from '@/lib/server/whop';
import { env } from '@/lib/server/env';
import Main from '@/components/Main';

import type { AppUser } from '@/lib/types';

type AppInitialData = {
	customKey?: string
}

export default async function ExperiencePage({
	children,
	params
}: {
	children: React.ReactNode
	params: Promise<{ experienceId: string }>
}) {
	return <AppBuilder<AppUser, AppInitialData>
		params={params}
		whopSdk={whopSdk}
		appView={{
			user: ({ user, experience, customKey }) => (
				<Main user={user} experienceId={experience.id} />
			),
			creator: ({ user, experience }) => (
				<Main user={user} experienceId={experience.id} />
			),
			developer: ({ user, experience }) => (
				<Main user={user} experienceId={experience.id} />
			),
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
					customKey: "myCustomValue",
				}
			} catch (error) {
				throw error
			}
		}}>
		<>{children}</>
	</AppBuilder>
}

