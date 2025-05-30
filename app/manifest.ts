import { MetadataRoute } from "next";


export default function manifest(): MetadataRoute.Manifest {

    return {
        "name": "Quikcrats",
        "short_name": "Quikcrats",
        "description": "a pwa ecommerce website for restaurants, food vendors and retailers",
        "start_url": "/",
        "background_color": "#56abfd",
        "theme_color": "#56abfd",
        "display": "standalone",
        "icons": [{
            "type": "image/png",
            "sizes": "96x96",
            "src": "/favicon-96x96.png"
        },
        {
            "type": "image/png",
            "sizes": "180x180",
            "src": "/apple-touch-icon.png"
        },
        {
            "src": "/web-app-manifest-192x192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "maskable"
        },
        {
            "src": "/web-app-manifest-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
        }

        ]
    }
}