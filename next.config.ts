import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins:["192.168.1.9"],
   async headers() {
    return [{
      source:"/(.*)",
      headers:[
        { key:"x-content-type-options", value:"nosniff",
        },

        { key:"x-frame-options", value:"deny",
        },

        { key:"referrer-policy", value:"strict-origin-when-cross-origin",
        }
      ]
    },
{
      source:"/sw.js",
      headers:[
        { key:"Content-Type", value:"application/javascript; charset-utf-8",
        },

        { key:"Cache-Control", value:"no-cache, no-store, must-revalidate",
        },

        { key:"Content-Security-Policy", value:"default-src 'self'; script-src 'self'" },
        { key:"Cross-Origin-Embedded-Policy", value:"require-corp" }
       ]
    },
  
  ]
  }
};

export default nextConfig;
