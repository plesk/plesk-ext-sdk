## v0.9.0

* Babel updated to version 8
    - if you use custom babel config you need to update related babel plugins:
        - Replace `@babel/plugin-proposal-class-properties` with `@babel/plugin-transform-class-properties`
        - Remove `@babel/plugin-proposal-object-rest-spread` dependency if it was used as a babel plugin for object rest/spread syntax
        - Add `runtime: "classic"` option to `@babel/plugin-transform-react-jsx` (or `@babel/preset-react`) because the default value was changed to `"automatic"`

## v0.6.0

* Babel updated to version 7
    - if you use custom babel config you need to update related babel plugins
    - you need to move config from .babelrc to babel.conf.js


* virtual-module-webpack-plugin replaced to webpack-virtual-modules
    - It has a similar api described on [webpack-virtual-modules project page](https://github.com/sysgears/webpack-virtual-modules "webpack-virtual-modules project page")


* @plesk/eslint-config updated to v2.0.0
    - to update from previous version you need to fix lint recommendations.


* clean-webpack-plugin updated to v4
