/**
 * 工具模块
 */

module.exports = {
    /**
     * 返回当前项目静态资源链接
     * @param  {String} relativePath 资源相对路径，相对于项目 assets 目录下
     * @return {String}      完整 URI
     */
    assetsURL: function(relativePath) {
        return '//localhost:9001/asset/' + relativePath;
    },
    /**
     * 返回 static-files.mama.cn CDN 下的资源链接
     * @param  {String} relativePath 资源相对路径，相对于 static-files 仓库根目录
     * @return {String}      完整 URI
     */
    staticFilesURL: function(relativePath) {
        return '//localhost:9001/asset/' + relativePath;
    },
};