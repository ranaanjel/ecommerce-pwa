import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  reactStrictMode: false,
  allowedDevOrigins: [ "192.168.1.8"],
  async headers() {
    return [{
      source: "/(.*)",
      headers: [
        {
          key: "x-content-type-options", value: "nosniff",
        },

        {
          key: "x-frame-options", value: "deny",
        },

        {
          key: "referrer-policy", value: "strict-origin-when-cross-origin",
        }
      ]
    },
    {
      source: "/sw.js",
      headers: [
        {
          key: "Content-Type", value: "application/javascript; charset-utf-8",
        },

        {
          key: "Cache-Control", value: "no-cache, no-store, must-revalidate",
        },

        { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self'" },
        { key: "Cross-Origin-Embedded-Policy", value: "require-corp" }
      ]
    },

    ]
  },
  async redirects() {
    return [

      {
        source: "/",
        destination: "/dashboard",
        permanent: false
      }

    ]
  },
  images: {
    remotePatterns: [{
      protocol:"https",
      hostname:"ik.imagekit.io",
      pathname:"/auctvhqov/**"
    },{
      protocol:"https",
      hostname:"lh3.googleusercontent.com",
      pathname:"/**"
    }],
  }
};

export default nextConfig;
//https://lh3.googleusercontent.com/a/ACg8ocJY3gSZ4uvKMaPqmAJvRwZibA5u4YUbztD3n3w_s4Wna2x8gNs=s96-c