/** @param {import("@babel/core").ConfigAPI} api  */
export default function (api) {
    api.cache(true)
    console.info("babel config function")
    return {
        "presets": [
            [
                "@babel/preset-env",
                {
                    "useBuiltIns": "usage",
                    "corejs": {
                        "version": 3, 
                        "proposals": true 
                    },
                    "targets": {
                        "ie": "10"
                    },
                    "modules": "commonjs"
                }
            ],
            "@babel/preset-typescript"
        ],
        "plugins": [
            "@babel/plugin-transform-class-properties",
            "@babel/plugin-transform-object-rest-spread"
        ]
    }
}