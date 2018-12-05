/**
 * 项目生产环境配置文件
 */

export default {
    API_BASE_URL: '//act.mama.cn',
    API: {
        // app页
        getCommon: '/Api/Subject/Pregnancy/getCommon',
        // game页
        toInvoke: '/Api/Subject/Pregnancy/guides',
        getRoutine: '/Api/Subject/Pregnancy/getRoutine',
        getHelpList: '/Api/Subject/Pregnancy/getHelpList',
        subWinInfo: '/Api/Subject/Pregnancy/subWinInfo',
        // game-friend页
        toHelp: '/Api/Subject/Pregnancy/help',
        // result页
        getWinResult: '/Api/Subject/Pregnancy/getWinResult',
        getUserInfo: '/api/extend/login/checklogin',
    },
};
