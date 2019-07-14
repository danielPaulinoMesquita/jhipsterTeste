import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'produto',
        loadChildren: './produto/produto.module#TestehipsterProdutoModule'
      },
      {
        path: 'categoria',
        loadChildren: './categoria/categoria.module#TestehipsterCategoriaModule'
      },
      {
        path: 'pedido',
        loadChildren: './pedido/pedido.module#TestehipsterPedidoModule'
      },
      {
        path: 'pagamento',
        loadChildren: './pagamento/pagamento.module#TestehipsterPagamentoModule'
      },
      {
        path: 'pagamento-com-boleto',
        loadChildren: './pagamento-com-boleto/pagamento-com-boleto.module#TestehipsterPagamentoComBoletoModule'
      },
      {
        path: 'pagamento-com-cartao',
        loadChildren: './pagamento-com-cartao/pagamento-com-cartao.module#TestehipsterPagamentoComCartaoModule'
      },
      {
        path: 'cliente',
        loadChildren: './cliente/cliente.module#TestehipsterClienteModule'
      },
      {
        path: 'telefone',
        loadChildren: './telefone/telefone.module#TestehipsterTelefoneModule'
      },
      {
        path: 'endereco',
        loadChildren: './endereco/endereco.module#TestehipsterEnderecoModule'
      },
      {
        path: 'cidade',
        loadChildren: './cidade/cidade.module#TestehipsterCidadeModule'
      },
      {
        path: 'estado',
        loadChildren: './estado/estado.module#TestehipsterEstadoModule'
      },
      {
        path: 'item-pedido',
        loadChildren: './item-pedido/item-pedido.module#TestehipsterItemPedidoModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestehipsterEntityModule {}
