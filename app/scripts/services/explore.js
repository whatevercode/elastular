'use strict';

angular.module('elastularApp')
  .service('explore', function explore($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function

        var url = 'http://dev2.tackl.it:9200/';

        var Explore = function(){
//            angular.extends(this,data);
        }

        Explore.prototype.nodeStats = function(){
            return $http.get(url+'_cluster/state').then(function(res){
                console.log('%c res', 'background: deeppink; color: white;', res);
                return res;
            })
        };
        Explore.prototype.search = function(index, type,request){
            var u = url;
            if(index!== undefined){
                u = u  + index + '/'
                if(type !== undefined){
                    u = u + type + '/';
                }
            }
            return $http.post(u+'_search', request).then(function(res){
                console.log('%c res', 'background: deeppink; color: white;', res);
                return res.data;
            })
        };

        Explore.prototype.save = function(index, type, id, source){
            var u = url  + index + '/' + type + '/' +id;
            return $http.post(u,source).then(function(res){
                console.log('%c res', 'background: deeppink; color: white;', res);
                return res.data;
            })
        };

        Explore.prototype.delete = function(index, type, id){
            var u = url  + index + '/' + type + '/' +id;
            return $http.delete(u).then(function(res){
                return res.data;
            })
        };


        return new Explore();
  });
