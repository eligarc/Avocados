const path = require('node:path');

const nextConfig = {
	webpack(config) {
		config.resolve.alias = {
			...config.resolve.alias,
			'@styles': path.resolve(__dirname, 'src/styles'),
		};
		return config;
	},
	images: {
		unoptimized: true,
	},
	async rewrites() {
		return [
			{
				// Nueva ruta
				source: '/avocado/:path*',
				// De que ruta vendrá
				destination: '/product/:path*',
			},
		]
	},
};

module.exports = nextConfig;