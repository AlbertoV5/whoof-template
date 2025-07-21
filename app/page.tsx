import { Theme } from 'frosted-ui';
import { headers } from 'next/headers';
import { WhopThemeScript } from "@whop/react";
import { Geist, Geist_Mono } from "next/font/google";
import { verifyUserToken } from '@whop/api';
import { env } from '@/lib/env';

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const INSTALL_URL = `https://whop.com/apps/${env.NEXT_PUBLIC_WHOP_APP_ID}/install/`

export default async function Page() {
	const headersList = await headers();
	const result = await verifyUserToken(headersList);
	if (!result) {
		return (
			<html className="dark" style={{ colorScheme: "dark" }}>
				<head>
					<WhopThemeScript />
				</head>
				<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
					<Theme accentColor="blue">
						<div className="flex flex-col items-center justify-center h-screen">
							<p>Please <a className="text-blue-9" href={INSTALL_URL}>install</a> this app via Whop.</p>
						</div>
					</Theme>
				</body>
			</html>
		)
	}
	return (
		<div>Hello World</div>
	);
}