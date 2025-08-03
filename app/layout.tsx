import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "frosted-ui/styles.css";
import { Theme } from "frosted-ui";
import { WhopThemeScript } from "@whop/react";
import { appMetadata, appTheme } from "@/lib/config";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = appMetadata;

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
				<Theme {...appTheme}>
					{children}
				</Theme>
			</body>
		</html>
	);
}
