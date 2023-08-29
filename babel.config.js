/*const config = {
    presets: [
        "@babel/preset-env",
        ["@babel/preset-react", { runtime: "automatic" }]
    ]
};

export default config;*/

module.exports = {
    presets: [
      ['@babel/preset-env', {targets: {node: 'current'}}],
      ["@babel/preset-react", { runtime: "automatic" }],
      '@babel/preset-typescript',
    ]
};