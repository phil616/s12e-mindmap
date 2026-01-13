/**
 * @fileOverview
 *
 *  与后端交互的服务
 *
 * @author: zhangbobell
 * @email : zhangbobell@163.com
 *
 * @copyright: Baidu FEX, 2015
 */
angular.module('kityminderEditor')
    .service('server', ['config', '$http',  function(config, $http) {

        return {
            uploadImage: function(file) {
                return new Promise(function(resolve, reject) {
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        resolve({
                            data: {
                                errno: 0,
                                data: {
                                    url: e.target.result
                                }
                            }
                        });
                    };
                    reader.onerror = function(e) {
                        reject(e);
                    };
                    reader.readAsDataURL(file);
                });
            }
        }
    }]);