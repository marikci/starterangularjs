/*
    Ajax Methods
*/
angular.module('main').factory('$global', ['$q', '$http',
function ($q, $http) {
    var self = this;
    var config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    self.prepareUrl=function (model, baseUrl, objectName,check_new) {
        var url = baseUrl + objectName;
        var paramUrl = "?";
        if (model == null) {
            return url;
        }
        if (typeof (model)=="number") {
            return url += "/" + model;
        }
        angular.forEach(Object.keys(model), function (value, key) {
            if (angular.isArray(model[value])) {
                angular.forEach(Object.keys(model[value]), function (item, key) {
                    if (check_new && model[value][item] != "") {
                        paramUrl += "&" + value + "=" + model[value][item];
                    } else {
                        if (model[value][item] != "") {
                            paramUrl += "&" + model[value][item];
                        }
                    }
                });
            } else if (model[value] !== "") {
                paramUrl += "&" + value + "=" + model[value];
            }
        });
        url += paramUrl;
        return url;
    }

    self.get = function (model, baseUrl, objectName, check_new) {
        var deferred = $q.defer();
        var url = self.prepareUrl(model, baseUrl, objectName, check_new);
        $http.get(url)
        .success(function (data) {
            deferred.resolve(data);
        })
        .error(function (reason) {
            deferred.reject(reason);
        })

        return deferred.promise;
    }
    self.put = function (id, model, baseUrl, objectName) {
        var deferred = $q.defer();
        var url = self.prepareUrl({ id: id }, baseUrl, objectName);

        $http.put(url, model, config)
        .success(function (data, status, headers, config) {
            deferred.resolve(data);
        })
        .error(function (data, status, headers, config) {
            deferred.reject(data);
        });
        return deferred.promise;
    }
    self.post = function (model, baseUrl, objectName) {
        var deferred = $q.defer();
        var url = self.prepareUrl(null, baseUrl, objectName);
        $http.post(url, model, config)
        .success(function (data, status) {
            deferred.resolve(data);
        })
        .error(function (data, status) {
            deferred.reject(data);
        });
        return deferred.promise;
    }
    self.delete = function (id, baseUrl, objectName) {
        var deferred = $q.defer();
        var url = baseUrl + objectName + "/" + id;
        $http.delete(url)
        .success(function (data, status, headers, config) {
            deferred.resolve(data);
        })
        .error(function (data, status, headers, config) {
            deferred.reject(data);
        });
        return deferred.promise;
    }
    return self;
}]);