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
const getters = {
    getCommonData() {
        return state.commonData;
    }
};

// mutations
const mutations = {
    [types.COMMON.SET_DATA](state, payload) {
        // 这里的 `state` 对象是模块的局部状态
        if (payload) {
            state.commonData = payload;
        }
    },
    [types.COMMON.SET_LOAD_STATUS](state, payload) {
        // 这里的 `state` 对象是模块的局部状态
        if (payload) {
            state.loadStatus = payload;
        }
    },
};

// actions
const actions = {
    initCommon({ commit}, payload) {
        return new Promise((resolve, reject) => {
            ajax({
                url: config.API.getCommon,
                method: 'get',
                params: {
                }
            }).then(res => {
                if (res.data.code == 0) {
                    commit(types.COMMON.SET_DATA, res.data.data);
                    resolve();
                } else {
                    reject(res.data.msg);
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
