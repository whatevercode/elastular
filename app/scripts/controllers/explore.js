'use strict';

angular.module('elastularApp')
  .controller('ExploreCtrl', function ($scope,explore,ejsResource) {
        $scope.url = 'http://dev2.tackl.it\\:9200';
//        $scope.indexInfo = {};
        $scope.request;
//        var e = new explore();
        $scope.stats = explore.nodeStats();
        $scope.showIndexInfo = function (key, val) {
            $scope.index = key;
            $scope.indexInfoJson = JSON.stringify(val,null,4);
            $scope.indexInfo = val;
            $scope.indexInfoKey = key;
            $scope.search();
        };

        $scope.showTypeInfo = function (key, val) {
            $scope.type = key;
            $scope.search();
        };

        $scope.search = function () {
            $scope.result = explore.search($scope.index,$scope.type,$scope.ejsStr);
        };

        $scope.search();
        console.log('%c exp', 'background: deeppink; color: white;', $scope.stats);

        $scope.showHit = function (hit) {
            $scope.hitJson = JSON.stringify(hit._source,null,4);
            $scope.hitInfo = hit;
        };

        $scope.save = function (hitInfo, source) {
            explore.save(hitInfo._index,hitInfo._type, hitInfo._id, source)
        };
//        console.log('%c e', 'background: deeppink; color: white;', e);



        $scope.add = function (key,val) {
            console.log('%c key val', 'background: deeppink; color: white;', key, val);

            function getParamNames(func) {
                var funStr = func.toString();
                return funStr.slice(funStr.indexOf('(')+1, funStr.indexOf(')')).match(/([^\s,]+)/g);
            }

            var params = getParamNames(val);
            params = params || [];
            var paramsStr = params.join(',');
            console.log('params: ', params, paramsStr);
            $scope.ejsJs = 'ejs.' + key + '(' +paramsStr + ');'
        };

        $scope.ejsJs = 'ejs.Request()\n.query(ejs.TermQuery(\'_all\',\'florian\'))\n.filter(ejs.TermFilter(\'tenants\',\'systaro\'));'

        $scope.$watch('ejsJs',function(val){
            console.log('%c val', 'background: deeppink; color: white;', val);
            var str = JSON.parse(eval(val).toString());
            $scope.ejsStr = JSON.stringify(str,null,4);;
        },true);

        $scope.$watch('ejsStr',function(val){
            $scope.search();
        },true);

        $scope.ejs = ejsResource();
  });
