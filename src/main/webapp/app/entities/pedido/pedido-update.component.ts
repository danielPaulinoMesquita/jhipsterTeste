import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPedido, Pedido } from 'app/shared/model/pedido.model';
import { PedidoService } from './pedido.service';
import { IPagamento } from 'app/shared/model/pagamento.model';
import { PagamentoService } from 'app/entities/pagamento';
import { ICliente } from 'app/shared/model/cliente.model';
import { ClienteService } from 'app/entities/cliente';
import { IProduto } from 'app/shared/model/produto.model';
import { ProdutoService } from 'app/entities/produto';

@Component({
  selector: 'jhi-pedido-update',
  templateUrl: './pedido-update.component.html'
})
export class PedidoUpdateComponent implements OnInit {
  isSaving: boolean;

  pagamentos: IPagamento[];

  clientes: ICliente[];

  produtos: IProduto[];

  editForm = this.fb.group({
    id: [],
    instante: [],
    pagamento: [],
    cliente: [],
    produtos: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected pedidoService: PedidoService,
    protected pagamentoService: PagamentoService,
    protected clienteService: ClienteService,
    protected produtoService: ProdutoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ pedido }) => {
      this.updateForm(pedido);
    });
    this.pagamentoService
      .query({ filter: 'pedido-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IPagamento[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPagamento[]>) => response.body)
      )
      .subscribe(
        (res: IPagamento[]) => {
          if (!this.editForm.get('pagamento').value || !this.editForm.get('pagamento').value.id) {
            this.pagamentos = res;
          } else {
            this.pagamentoService
              .find(this.editForm.get('pagamento').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IPagamento>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IPagamento>) => subResponse.body)
              )
              .subscribe(
                (subRes: IPagamento) => (this.pagamentos = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.clienteService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICliente[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICliente[]>) => response.body)
      )
      .subscribe((res: ICliente[]) => (this.clientes = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.produtoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IProduto[]>) => mayBeOk.ok),
        map((response: HttpResponse<IProduto[]>) => response.body)
      )
      .subscribe((res: IProduto[]) => (this.produtos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(pedido: IPedido) {
    this.editForm.patchValue({
      id: pedido.id,
      instante: pedido.instante,
      pagamento: pedido.pagamento,
      cliente: pedido.cliente,
      produtos: pedido.produtos
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const pedido = this.createFromForm();
    if (pedido.id !== undefined) {
      this.subscribeToSaveResponse(this.pedidoService.update(pedido));
    } else {
      this.subscribeToSaveResponse(this.pedidoService.create(pedido));
    }
  }

  private createFromForm(): IPedido {
    return {
      ...new Pedido(),
      id: this.editForm.get(['id']).value,
      instante: this.editForm.get(['instante']).value,
      pagamento: this.editForm.get(['pagamento']).value,
      cliente: this.editForm.get(['cliente']).value,
      produtos: this.editForm.get(['produtos']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPedido>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackPagamentoById(index: number, item: IPagamento) {
    return item.id;
  }

  trackClienteById(index: number, item: ICliente) {
    return item.id;
  }

  trackProdutoById(index: number, item: IProduto) {
    return item.id;
  }

  getSelected(selectedVals: Array<any>, option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
