require('@babel/register')({
    presets: [
        [
            '@babel/preset-env',
            {
                "forceAllTransforms": true
            }
        ]
    ],
    plugins: ["@babel/plugin-proposal-class-properties"]
});
require('./electron-main.js');