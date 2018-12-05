/**
 * 项目开发环境配置文件，扩展生产环境配置
 */

import config from './config';
import extend from 'node.extend';

const devConfig = {
    DEBUG: true,
    // API_BASE_URL: '//127.0.0.1:6101',
};

export default extend(config, devConfig);
