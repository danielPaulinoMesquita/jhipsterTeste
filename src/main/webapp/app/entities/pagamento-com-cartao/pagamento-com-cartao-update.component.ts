import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPagamentoComCartao, PagamentoComCartao } from 'app/shared/model/pagamento-com-cartao.model';
import { PagamentoComCartaoService } from './pagamento-com-cartao.service';
import { IPagamento } from 'app/shared/model/pagamento.model';
import { PagamentoService } from 'app/entities/pagamento';

@Component({
  selector: 'jhi-pagamento-com-cartao-update',
  templateUrl: './pagamento-com-cartao-update.component.html'
})
export class PagamentoComCartaoUpdateComponent implements OnInit {
  isSaving: boolean;

  pagamentos: IPagamento[];

  editForm = this.fb.group({
    id: [],
    numeroDeParcelas: [],
    pagamento: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected pagamentoComCartaoService: PagamentoComCartaoService,
    protected pagamentoService: PagamentoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ pagamentoComCartao }) => {
      this.updateForm(pagamentoComCartao);
    });
    this.pagamentoService
      .query({ filter: 'pagamentocomcartao-is-null' })
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
  }

  updateForm(pagamentoComCartao: IPagamentoComCartao) {
    this.editForm.patchValue({
      id: pagamentoComCartao.id,
      numeroDeParcelas: pagamentoComCartao.numeroDeParcelas,
      pagamento: pagamentoComCartao.pagamento
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const pagamentoComCartao = this.createFromForm();
    if (pagamentoComCartao.id !== undefined) {
      this.subscribeToSaveResponse(this.pagamentoComCartaoService.update(pagamentoComCartao));
    } else {
      this.subscribeToSaveResponse(this.pagamentoComCartaoService.create(pagamentoComCartao));
    }
  }

  private createFromForm(): IPagamentoComCartao {
    return {
      ...new PagamentoComCartao(),
      id: this.editForm.get(['id']).value,
      numeroDeParcelas: this.editForm.get(['numeroDeParcelas']).value,
      pagamento: this.editForm.get(['pagamento']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPagamentoComCartao>>) {
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
}
