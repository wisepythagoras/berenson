module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        // plugins: [
        //     // other plugins
        //     [
        //         'babel-plugin-rewrite-require',
        //         {
        //             aliases: {
        //                 stream: 'readable-stream',
        //             },
        //         },
        //     ],
        // ],
    };
};
