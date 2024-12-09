export default (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
    const nextConfig = {
      reactStrictMode: false,
      experimental: {
        serverActions: {
          // 👇 change file size limit
          bodySizeLimit: "1000MB", 
        },
        serverComponentsExternalPackages: ["@react-pdf/renderer"],
      },
      // 👇 to access images links globally
      images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "**",
            port: "",
            pathname: "/**/**",
          },
        ],
      },
    };
  return nextConfig
}