import type { Metadata } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Nguyen Van Hung — Frontend Developer',
	description:
		'Frontend Developer with 5+ years of experience in React.js and Next.js, building scalable and high-performance web applications.',
	icons: {
		icon: '/logo.png',
		apple: '/logo.png',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' className={`${inter.variable} ${geistMono.variable}`}>
			<body>{children}</body>
		</html>
	)
}
