module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: [
        'raw-loader',
        {
          loader: 'glslify-loader',
          options: {
            transform: [
              ['glslify-hex', { 'option-1': true, 'option-2': 42 }]
            ]
          }
        }
      ]
    });

    return config;
  }
};