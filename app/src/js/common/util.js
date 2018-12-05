/**
 * 工具模块
 */
import cookies from 'js-cookie';
export default {
    getNumber: () => {
        return 100;
    },
    /**
     * 检查是否登录，如果没有则跳转登录
     */
    checkLogin(ifshixiao) {
        if (!cookies.get('user_id') || ifshixiao) {
            // app 内唤起原生登录
            cookies.set('login_code', '1');
            if (window.MamaJSBridge.UA.mmq || window.MamaJSBridge.UA.pregnancyhelper) {
                if (window.MamaJSBridge.openMamaLogin) {
                    window.MamaJSBridge.openMamaLogin({
                        "type": 0,
                        "jsmethod": "window.appLoginCallback"
                    });
                } else {
                    location.href = 'q://loginwap';
                }
            } else if (window.MamaJSBridge.UA.wx) {
                // 微信授权登录
                // window.location.href = '//passport.mama.cn/wapweixinlogin?wxname=mmye&scope=snsapi_base&needwx=2&service=' + encodeURIComponent(location.href)；
                location.href = '//passport.mama.cn/wapindex?service=' + encodeURIComponent(location.href);
            } else {
                location.href = '//passport.mama.cn/wapindex?service=' + encodeURIComponent(location.href);
            }
            return false;
        }
        return true;
    },
};
