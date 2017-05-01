module.exports = {
    "root": true,
    "extends": [
        "eslint:recommended"
    ],
    "plugins": [
        "html"
    ],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true
        }
    },
    "env": {
        "es6": true,
        "browser": true,
        "node": true
    },
    "rules": {
        // fixme
        "no-console": 0,

        "arrow-parens": 0,
        "generator-star-spacing": 0,
        "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
        "quotes": 0,
        "no-var": 1,
        "semi": [1, "always"],
        "no-trailing-spaces": 0,
        "eol-last": 0,
        "no-underscore-dangle": 0,
        "no-alert": 0,
        "no-lone-blocks": 0
    },
    "globals": {}
};
