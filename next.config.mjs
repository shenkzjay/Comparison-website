/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pictures-nigeria.jijistatic.net",
        port: "",
      },
      {
        protocol: "https",
        hostname: "ng.jumia.is",
        port: "",
      },
      {
        protocol: "https",
        hostname: "www-konga-com-res.cloudinary.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
