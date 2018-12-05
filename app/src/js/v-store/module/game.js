/**
 * 游戏页接口
 */
// 接口http://swagger-ui.corp.mama.cn/2.0/dist/index.html?url=/2.0/dist/spec/act.mama.cn/v1/pregnancy.json#/孕程呵护；
import types from 'v-store/mutation-type';
import ajax from 'common/ajax';
import config from 'common/config';

// state
const state = {
    gameData: {},
};

// getters
const getters = {};

// mutations
const mutations = {
    [types.GAME.SET_DATA](state, payload) {
        // 这里的 `state` 对象是模块的局部状态
        if (payload) {
            state.gameData = payload;
        }
    },
};

// actions
const actions = {
    initGamePage({ commit }, payload) {
        console.log('uid', payload);
        return new Promise((resolve, reject) => {
            ajax({
                url: config.API.getRoutine,
                method: 'get',
                params: {
                    uid: payload.uid,
                }
            }).then(res => {
                if (res.data.code == 0) {
                    commit(types.GAME.SET_DATA, res.data.data);
                    resolve(res.data.code);
                } else {
                    if (res.data.code == 6010403) {
                        // 未发起活动
                        resolve(res.data.code);
                    } else if (res.data.code == 10002) {
                        // 缺少参数
                        resolve(res.data.code);
                    }
                    reject(res.data.msg);
                }
            }).catch(err => {
                reject(-1);
            });
        });
    },
    toInvoke() {
        return new Promise((resolve, reject) => {
            ajax({
                url: config.API.toInvoke,
                method: 'get',
                params: {
                }
            }).then(res => {
                if (res.data.code == 0) {
                    resolve(res.data);
                }  else if (res.data.code == 11001) {
                    // 未登录
                    resolve(res.data);
                } else {
                    reject(res.data);
                }
            }).catch(err => {
                reject(-1);
            });
        });
    },
    toSubWinData({}, payload) {
        return new Promise((resolve, reject) => {
            ajax({
                url: config.API.subWinInfo,
                method: 'get',
                params: payload,
                // {
                //     realName: payload.realName,
                //     phone: payload.phone,
                //     address: payload.address
                // }
            }).then(res => {
                if (res.data.code == 0) {
                    resolve(res.data);
                } else if (res.data.code == 11001) {
                    // 未登录
                    resolve(res.data);
                } else {
                    reject(res.data);
                }
            }).catch(err => {
                reject(-1);
            });
        });
    },
    toHelp({}, payload) {
        return new Promise((resolve, reject) => {
            ajax({
                url: config.API.toHelp,
                method: 'get',
                params: {
                    uid: payload.uid,
                }
            }).then(res => {
                if (res.data.code == 0) {
                    resolve(res.data);
                } else if (res.data.code == 11001) {
                    // 未登录
                    resolve(res.data);
                } else {
                    reject(res.data);
                }
            }).catch(err => {
                reject(-1);
            });
        });
    },
    getHelpList({}, payload) {
        return new Promise((resolve, reject) => {
            ajax({
                url: config.API.getHelpList,
                method: 'get',
                params: {
                    uid: payload.uid,
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
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions,
};
