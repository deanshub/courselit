const withNextInItStats = require('next-in-it-stats/cjs')({
  legacy: true,
});

const cdn = process.env.MEDIALIT_SERVER
? process.env.MEDIALIT_CDN || process.env.MEDIALIT_SERVER
: "medialit.sgp1.cdn.digitaloceanspaces.com";

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        domains: [cdn],
    },
};

module.exports = withNextInItStats(nextConfig);
