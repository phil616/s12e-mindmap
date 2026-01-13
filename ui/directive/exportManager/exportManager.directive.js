angular.module('kityminderEditor')
    .directive('exportManager', ['minder.service', function(minderService) {
        return {
            restrict: 'E',
            templateUrl: 'ui/directive/exportManager/exportManager.html',
            replace: true,
            scope: {
                minder: '='
            },
            link: function(scope, element) {
                var minder = scope.minder;
                
                function download(content, filename, type) {
                    var a = document.createElement('a');
                    var file = new Blob([content], {type: type});
                    a.href = URL.createObjectURL(file);
                    a.download = filename;
                    a.click();
                }

                scope.exportJson = function() {
                    var json = minder.exportJson();
                    var content = JSON.stringify(json, null, 2);
                    download(content, 'minder.json', 'application/json');
                };

                scope.exportPng = function() {
                    minder.exportData('png').then(function(content) {
                         var a = document.createElement('a');
                         a.href = content;
                         a.download = 'minder.png';
                         a.click();
                    });
                };
                
                scope.exportSvg = function() {
                    minder.exportData('svg').then(function(content) {
                        // 替换 font-family 属性，确保字体轮廓化或使用通用字体
                        // 注意：这里是简单的替换，更复杂的轮廓化需要在 kityminder-core 层处理
                        // 但通常 SVG 导出时如果不嵌入字体，会导致字体渲染问题
                        // kityminder-core 的 SVG 导出通常不包含字体轮廓化
                        // 这里尝试将字体设置为系统通用字体，改善兼容性
                        content = content.replace(/font-family="[^"]*"/g, 'font-family="sans-serif"');
                        
                        download(content, 'minder.svg', 'image/svg+xml');
                    });
                };
                
                scope.importJson = function() {
                    var fileInput = element.find('.file-input');
                    fileInput.val('');
                    fileInput.click();
                };
                
                scope.handleImport = function(files) {
                    if (files.length === 0) return;
                    var file = files[0];
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        var content = e.target.result;
                        try {
                            var json = JSON.parse(content);
                            minder.importJson(json);
                        } catch (e) {
                            alert('导入失败：文件格式不正确，请确保是有效的 JSON 文件');
                        }
                    };
                    reader.readAsText(file);
                };
            }
        };
    }]);
