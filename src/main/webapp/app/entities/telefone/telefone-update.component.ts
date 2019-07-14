import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITelefone, Telefone } from 'app/shared/model/telefone.model';
import { TelefoneService } from './telefone.service';
import { ICliente } from 'app/shared/model/cliente.model';
import { ClienteService } from 'app/entities/cliente';

@Component({
  selector: 'jhi-telefone-update',
  templateUrl: './telefone-update.component.html'
})
export class TelefoneUpdateComponent implements OnInit {
  isSaving: boolean;

  clientes: ICliente[];

  editForm = this.fb.group({
    id: [],
    numero: [],
    cliente: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected telefoneService: TelefoneService,
    protected clienteService: ClienteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ telefone }) => {
      this.updateForm(telefone);
    });
    this.clienteService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICliente[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICliente[]>) => response.body)
      )
      .subscribe((res: ICliente[]) => (this.clientes = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(telefone: ITelefone) {
    this.editForm.patchValue({
      id: telefone.id,
      numero: telefone.numero,
      cliente: telefone.cliente
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const telefone = this.createFromForm();
    if (telefone.id !== undefined) {
      this.subscribeToSaveResponse(this.telefoneService.update(telefone));
    } else {
      this.subscribeToSaveResponse(this.telefoneService.create(telefone));
    }
  }

  private createFromForm(): ITelefone {
    return {
      ...new Telefone(),
      id: this.editForm.get(['id']).value,
      numero: this.editForm.get(['numero']).value,
      cliente: this.editForm.get(['cliente']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITelefone>>) {
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

  trackClienteById(index: number, item: ICliente) {
    return item.id;
  }
}
