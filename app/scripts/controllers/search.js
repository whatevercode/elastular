'use strict';

angular.module('elastularApp')
  .controller('SearchCtrl', function ($scope,ejsResource) {
        $scope.queryErrors = [];
        $scope.filterErrors = [];
        $scope.facetErrors = [];

        $scope.queryEjs = 'ejs.MatchAllQuery();';
        $scope.filterEjs = '';
        $scope.facetEjs = '';


        // Editor part
        var _editor = $scope.foo;
        console.log('editor', _editor);



        $scope.request = ejs.Request();
//        $scope.request.size(10);
//        $scope.request.query(ejs.MatchAllQuery());
        $scope.doSearch = function(){
            $scope.results = undefined;
            $scope.resultsJson = JSON.stringify({},null,4);
            $scope.request.doSearch(
                function(data){
                    console.log('search res',data);
                    $scope.results = data;
                    $scope.resultsJson = JSON.stringify(data,null,4);
                }
            );
        };



        $scope.url = 'http://dev2.tackl.it:9200';

        $scope.connect = function(){
            console.log('connection...', $scope.url);
            $scope.ejs = ejsResource($scope.url);
            $scope.doSearch();
        };

        if($scope.url !== ''){
            $scope.connect();
        }


        $scope.$watch('url',$scope.connect,true);


        $scope.addTypeFilter = function(){
            $scope.request.filter(ejs.TypeFilter('tackls'));
            $scope.doSearch();
        };


        function getParamNames(func) {
            var funStr = func.toString();
            return funStr.slice(funStr.indexOf('(')+1, funStr.indexOf(')')).match(/([^\s,]+)/g);
        }

        function setEjsRequestStr(){
            console.log('$scope.request.toString()',$scope.request.toString());
            $scope.ejsRequestStr = jsonString(JSON.parse($scope.request.toString()));

            if($scope.queryErrors.length === 0){
                $scope.doSearch();
            }
//            $scope.ejsRequestStr = $scope.request.toString();
        }

        function jsonString(obj){
            return JSON.stringify(obj,null,4);
        }

        $scope.add = function(key,val){
            console.log('adding', key);
            var params = getParamNames(val);
            params = params || [];
            var paramsStr = params.join(',');
            console.log('params: ', params, paramsStr);

            if(key.indexOf('Query')>0){
                console.log('is a query');
//                console.log('$scope.request.query(',$scope.request.query());
                if(angular.isFunction(val)){
//                    var v = val();
                    console.log('v',  Object.keys(val));

//                    var params = getParamNames(val);
//                    $scope.request.query(val(params.join(',')));
//                    $scope.queryStr = JSON.stringify($scope.request.query());
//                    $scope.queryStr = 'ejs.' + key + '(' +paramsStr + ');';
                    $scope.queryEjs =  ($scope.queryEjs ?  $scope.queryEjs : '') + 'ejs.' + key + '(' +paramsStr + ');\n';
                }
//                console.log('eval: ' , val);

                if($scope.request.query() === undefined){
                    console.log('adding first query...');
//                    var query = val;
//                    console.log('query',query);
//                    $scope.request.query(val());
                }
            }
            else if(key.indexOf('Filter')>0){

//                $scope.request.filter());
                $scope.filterEjs =  ($scope.filterEjs ?  $scope.filterEjs : '') + 'ejs.' + key + '(' +paramsStr + ');\n';

                $scope.filterStr = jsonString(val());
                console.log('is a Filter');
            }
            else if(key.indexOf('Facet')>0){
                $scope.facetEjs =  ($scope.facetEjs ?  $scope.facetEjs +'\n' : '') + 'ejs.' + key + '(' +paramsStr + ');';
                console.log('is a Facet');
            }
            else {
                console.log('else', key);
            }
            setEjsRequestStr();
        };

        $scope.show = function(key,val){
            console.log('show', key,val());
        };

        $scope.execFilterEjs = function(type){

            console.log('execFilterEjs!!');
            $scope.filterErrors = [];
            try{
                console.log('execEjs', type ,$scope.filterEjs,eval($scope.filterEjs));
            }
            catch(err){
                console.error('exception!!!',err.message);
                $scope.filterErrors.push(err.message);
            }
            $scope.request.filter(eval($scope.filterEjs));

            setEjsRequestStr();
        };

        $scope.$watch('filterEjs',$scope.execFilterEjs,true);

        $scope.execQueryEjs = function(){

            $scope.queryErrors = [];
            try{
                console.log('execQueryEjs', $scope.queryEjs,eval($scope.queryEjs));
            }
            catch(err){
                console.error('exception!!!',err.message);
                $scope.queryErrors.push(err.message);
            }
            $scope.request.query(eval($scope.queryEjs));

            setEjsRequestStr();
        };

        $scope.$watch('queryEjs',$scope.execQueryEjs,true);

        $scope.setFacet = function(){
            console.log('setFacet');
            $scope.request.facet(eval($scope.facetEjs));
            setEjsRequestStr();
        };

        //facet
        $scope.execFacetEjs = function(){

            $scope.facetErrors = [];
            try{
                console.log('execFacetEjs', $scope.facetEjs,eval($scope.facetEjs));
            }
            catch(err){
                console.error('exception!!!',err.message);
                $scope.facetErrors.push(err.message);
            }
//            $scope.request.facet(eval($scope.facetEjs));

//            setEjsRequestStr();
        };

        $scope.$watch('facetEjs',$scope.execFacetEjs,true);  });
