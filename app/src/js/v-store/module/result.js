/**
 * 在首页获取通用数据
 */
// 接口http://swagger-ui.corp.mama.cn/2.0/dist/index.html?url=/2.0/dist/spec/act.mama.cn/v1/pregnancy.json#/孕程呵护；
import types from 'v-store/mutation-type';
import ajax from 'common/ajax';
import config from 'common/config';

// state
const state = {
    commonData: {},
    loadStatus: true,  // 待去除
};

// getters
const getters = {};

// mutations
const mutations = {
};

// actions
const actions = {
    getWinResult({}, payload) {
        return new Promise((resolve, reject) => {
            ajax({
                url: config.API.getWinResult,
                method: 'get',
                params: payload,
            }).then(res => {
                if (res.data.code == 0 || res.data.code == 11001) {
                    resolve(res.data);
                } else if (res.data.code == 6010409) {
                    // 结果未公布
                    resolve(res.data);
                } else {
                    reject(res.data);
                }
            }).catch(err => {
                reject(-1);
            });
        });
    },
    getUserInfo() {
        return new Promise((resolve, reject) => {
            ajax({
                url: config.API.getUserInfo,
                method: 'get',
                params: {
                }
            }).then(res => {
                if (res.data.code == 0) {
                    resolve(res.data);
                } else {
                    reject(res.data);
                }
            }).catch(err => {
                reject(-1);
            });
        });
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions,
};
