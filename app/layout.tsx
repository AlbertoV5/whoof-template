import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WhopThemeProvider } from "@whop-apps/sdk";
import 'frosted-ui/styles.css';
import { Theme } from 'frosted-ui';
import { WhopThemeScript } from "@whop/react";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Whop App",
	description: "My Whop App",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<WhopThemeScript />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Theme appearance="inherit" accentColor="blue">
					<WhopThemeProvider>{children}</WhopThemeProvider>
				</Theme>
			</body>
		</html>
	);
}
