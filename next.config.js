/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
}

module.exports = (phase, {defaultConfig}) => {
    if ('sassOptions' in defaultConfig) {
        defaultConfig['sassOptions'] = {
            includePaths: ['./src'],
            prependData: `@import "style/variables.scss";`,
        }
    }
    return {defaultConfig, ...nextConfig}
}
