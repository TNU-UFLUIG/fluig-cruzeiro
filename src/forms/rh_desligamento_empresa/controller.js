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
        vm.etapas = ['consulta', 'inicio', 'notificarSuperior', 'aprovarBP', 'aprovarRH', 'aprovarMedSeg', 'revisarSolicitacao', 'validarAjustarDados', 'notificarDesligamento', 'anexarCartaDesligamento', 'integrarRM', 'calcularRescisao', 'anexarExameDemissional', 'analisarErros'];

        vm.regras = {};
        [
          { regra: 'showResumo', def: true, etapas: vm.etapas },
          { regra: 'showInstituicao', def: true, etapas: vm.etapas },
          { regra: 'enableInstituicao', def: vm.Params.edit, etapas: ['inicio'] },
          { regra: 'showSolicitacao', def: true, etapas: vm.etapas },
          { regra: 'enableSolicitacao', def: vm.Params.edit, etapas: ['inicio', 'revisarSolicitacao'] },
          { regra: 'showAprovacaoBP', def: true, etapas: ['revisarSolicitacao', 'aprovarBP'] },
          { regra: 'enableAprovacaoBP', def: vm.Params.edit, etapas: ['aprovarBP'] },
          { regra: 'showAprovacaoRH', def: true, etapas: ['revisarSolicitacao', 'aprovarRH'] },
          { regra: 'enableAprovacaoRH', def: vm.Params.edit, etapas: ['aprovarRH'] },
          { regra: 'showAprovacaoMedSeg', def: true, etapas: ['revisarSolicitacao', 'aprovarMedSeg'] },
          { regra: 'enableAprovacaoMedSeg', def: vm.Params.edit, etapas: ['aprovarMedSeg'] },
          { regra: 'showExameDemissional', def: true, etapas: vm.etapas },
          { regra: 'enableExameDemissional', def: vm.Params.edit, etapas: ['anexarExameDemissional'] },
          { regra: 'showCartaDesligamento', def: true, etapas: vm.etapas },
          { regra: 'enableCartaDesligamento', def: vm.Params.edit, etapas: ['anexarCartaDesligamento'] },
          { regra: 'showCalculoRescisao', def: true, etapas: vm.etapas },
          { regra: 'enableCalculoRescisao', def: vm.Params.edit, etapas: ['calcularRescisao'] },
          { regra: 'showCorrigirErros', def: true, etapas: vm.etapas },
          { regra: 'enableCorrigirErros', def: vm.Params.edit, etapas: ['analisarErros'] }

        ].forEach((o) => {
          vm.regras[o.regra] = vm.Params.user === 'adminx' && vm.Params.edit ? true : o.etapas.indexOf(vm.Params.etapa) >= 0 ? o.def : false;
        });
      };

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
