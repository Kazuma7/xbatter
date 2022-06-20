/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
};

module.exports = {
	nextConfig: nextConfig,
	images: {
		domains: [
			"source.unsplash.com",
			"gateway.pinata.cloud",
			"storage.googleapis.com",
			"lh3.googleusercontent.com",
			"gateway.ipfs.io",
		],
	},
};
