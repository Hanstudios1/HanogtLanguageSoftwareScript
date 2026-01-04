import type { OpenNextConfig } from "@opennextjs/cloudflare";

const config: OpenNextConfig = {
    buildCommand: "npm run build",

    // Cloudflare specific settings
    cloudflare: {
        // Enable Node.js compatibility
        nodeCompat: true,
    },
};

export default config;
