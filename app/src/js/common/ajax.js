/**
 * Promise based HTTP client for the browser and node.js
 * 所有 AJAX 请求都要通过此文件暴露出来的 axios 执行
 * @type {Object}
 * @see https://github.com/mzabriskie/axios
 */

import axios from 'axios';
import siteConfig from 'site-config';
import qs from 'qs';
import jsonp from 'jsonp';

axios.defaults.baseURL = '';

// 发送请求前做特殊处理
axios.interceptors.request.use(
    function(config) {
        // Do something before request is sent
        config.params = config.params || {};
        config.data = config.data || {};
        if (config.rawFormData !== false) {
            // 默认支持 rawFormData
            config.data = qs.stringify(config.data);
        }
        return config;
    },
    function(error) {
        // Do something with request error
    }
);

// 返回结果前做特殊处理
axios.interceptors.response.use(
    function(response) {
        // Do something with response data
        return response;
    },
    function(error) {
        // Do something with response error
        return Promise.reject(error);
    }
);

// 添加 jsonp 功能
axios.jsonp = function(url, params = null) {
    let paramsStringify = qs.stringify(params) + '&callback';

    return new Promise((resolve, reject) => {
        jsonp( url, { param: paramsStringify }, (err, data) => {
            if (err) {
                console.error(err.message);
                reject(err.message);
            }
            resolve(data);
        });
    });
};

export default axios;
