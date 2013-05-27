'use strict';

angular.module('elastularApp')
  .controller('MainCtrl', function ($scope,ejsResource) {
        $scope.url = '';



        $scope.getClusterStats = function(){
            console.log('get cluster stats...', new Date());
            ejs.ClusterState().doState(function(data){
                console.log('stats',data);
                $scope.stats = data;
                $scope.statsJson =  JSON.stringify(data.nodes,null,4);
                $scope.indicesJson =  JSON.stringify(data.metadata.indices,null,4);
            });
        };


        $scope.connect = function(){
            $scope.stats = undefined;
            $scope.statsJson =  '{}';
            $scope.indicesJson =  '{}';
            console.log('connection...', $scope.url);
            $scope.ejs = ejsResource($scope.url);
            $scope.getClusterStats();
        };

        if($scope.url !== ''){
            $scope.connect();
        }

        $scope.$watch('url',$scope.connect,true);


        $scope.showIndexInfo = function(idx, data){
            $scope.indexInfo = {
                index: idx,
                data: data
            };
        };

        $scope.request = ejs.Request();
//        $scope.request.size(100);
        $scope.request.query(ejs.MatchAllQuery());
        $scope.doSearch = function(){
            $scope.request.doSearch(
                function(data){
                    console.log('search res',data);
                    $scope.results = data;
                }
            );
        };
        $scope.doSearch();

        $scope.resultsJson = '{}';

        $scope.addTypeFilter = function(){
            $scope.request.filter(ejs.TypeFilter('tackls'));
            $scope.doSearch();
        };



    });
