import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPagamentoComBoleto, PagamentoComBoleto } from 'app/shared/model/pagamento-com-boleto.model';
import { PagamentoComBoletoService } from './pagamento-com-boleto.service';
import { IPagamento } from 'app/shared/model/pagamento.model';
import { PagamentoService } from 'app/entities/pagamento';

@Component({
  selector: 'jhi-pagamento-com-boleto-update',
  templateUrl: './pagamento-com-boleto-update.component.html'
})
export class PagamentoComBoletoUpdateComponent implements OnInit {
  isSaving: boolean;

  pagamentos: IPagamento[];

  editForm = this.fb.group({
    id: [],
    dataVencimento: [],
    dataPagamento: [],
    pagamento: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected pagamentoComBoletoService: PagamentoComBoletoService,
    protected pagamentoService: PagamentoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ pagamentoComBoleto }) => {
      this.updateForm(pagamentoComBoleto);
    });
    this.pagamentoService
      .query({ filter: 'pagamentocomboleto-is-null' })
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

  updateForm(pagamentoComBoleto: IPagamentoComBoleto) {
    this.editForm.patchValue({
      id: pagamentoComBoleto.id,
      dataVencimento: pagamentoComBoleto.dataVencimento,
      dataPagamento: pagamentoComBoleto.dataPagamento,
      pagamento: pagamentoComBoleto.pagamento
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const pagamentoComBoleto = this.createFromForm();
    if (pagamentoComBoleto.id !== undefined) {
      this.subscribeToSaveResponse(this.pagamentoComBoletoService.update(pagamentoComBoleto));
    } else {
      this.subscribeToSaveResponse(this.pagamentoComBoletoService.create(pagamentoComBoleto));
    }
  }

  private createFromForm(): IPagamentoComBoleto {
    return {
      ...new PagamentoComBoleto(),
      id: this.editForm.get(['id']).value,
      dataVencimento: this.editForm.get(['dataVencimento']).value,
      dataPagamento: this.editForm.get(['dataPagamento']).value,
      pagamento: this.editForm.get(['pagamento']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPagamentoComBoleto>>) {
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
