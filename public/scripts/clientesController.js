(function() {
    const app = angular.module('clientesApp', []);

    app.controller('clientesController', clientesController);

    clientesController.$inject = ['$scope', '$http'];
    
    function clientesController($scope, $http) {
        $scope.formData = {};
        $scope.errors = "";

        $http.get('/api/clientes')
            .success(function(data) {
                $scope.clientes = data;
                console.log(data);
            })
            .error(function(data) {
                $scope.errors = `Error:  ${data}`;
            });

        $scope.createTodo = () => {
            $http.post('/api/clientes', $scope.formData)
                .success(function(data) {
                    $scope.formData = {};
                    $scope.clientes = data;
                    console.log(data);
                })
                .error(function(data) {
                    $scope.errors = `Error:  ${data}`;
                });
        };

        $scope.deleteTodo = cnpj => {
            $http.delete('/api/clientes/' + cnpj)
                .success(function(data) {
                    $scope.clientes = data;
                    console.log(data);
                })
                .error(function(data) {
                    $scope.errors = `Error:  ${data}`;
                });
        };

        $scope.addCliente = () => {
            console.log($scope.formData)
        }
    }
})();