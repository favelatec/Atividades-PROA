/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["loremflickr.com", "randomuser.me", "fastly.picsum.photos"],
  },
};

module.exports = nextConfig;
