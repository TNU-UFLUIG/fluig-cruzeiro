angular.module('cruzeirodosulApp', ['angular.fluig', 'ngAnimate', 'cruzeirodosul.services'])

  .controller('cruzeirodosulController', ['$scope', '$compile', '$http', '$timeout', '$log', 'formService',
    function cruzeirodosulController($scope, $compile, $http, $timeout, $log, formService) {
      const vm = this;

      formService.atualizaForm($scope, vm)
        .then(() => {
          vm.inicia();
        });

      vm.inicia = function inicia() {
        vm.checkRegras();
      };

      vm.checkRegras = function checkRegras() {
        vm.etapas = ['consulta', 'inicio', 'revisarSolicitacao', 'analisarErros'];

        vm.regras = {};
        [
          { regra: 'showResumo', def: true, etapas: vm.etapas },
          { regra: 'showSolicitacao', def: true, etapas: ['inicio', 'consulta', 'revisarSolicitacao', 'analisarErros'] },
          { regra: 'enableSolicitacao', def: vm.Params.edit, etapas: ['inicio', 'revisarSolicitacao'] },


        ].forEach(o => {
          vm.regras[o.regra] = vm.Params.user == "adminx" && vm.Params.edit ? true : o.etapas.indexOf(vm.Params.etapa) >= 0 ? o.def : false;
        });
      }

      vm.removeChild = function removeChild(Array, item) {
        FLUIGC.message.confirm({
          message: 'Deseja excluir esse registro?',
          title: 'Excluir'
        }, (result) => {
          if (result) {
            Array.splice(Array.indexOf(item), 1);
            $scope.$apply();
          }
        });
      };
    }
  ]);
