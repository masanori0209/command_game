module.exports = {
    chainWebpack: config => {
        config.module.rules.delete('eslint');
    },
    // publicPath: '/three_3d_vue/',
    outputDir: 'docs'
}