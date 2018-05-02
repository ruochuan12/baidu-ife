module.exports = {
    // eslint 中文文档
    // https://eslint.cn/docs/user-guide/command-line-interface
    "extends": 'standard',
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "rules": {
        "semi": [ 'error', 'always' ],
    }
};