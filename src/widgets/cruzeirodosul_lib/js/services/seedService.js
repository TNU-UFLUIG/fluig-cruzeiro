angular.module('cruzeirodosul.services')
  .factory('cruzeirodosulService', ['$q', '$http', '$log', 'fluigService',
    ($q, $http, $log, fluigService) => ({

      getPrestacaoContas: function getPrestacaoContas(displaykey, fields) {
        return fluigService.getDataset('cruzeirodosul_prestacao_contas', {
          displaykey,
        }, fields);
      }

    })
  ]);
