import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IEndereco, Endereco } from 'app/shared/model/endereco.model';
import { EnderecoService } from './endereco.service';
import { ICliente } from 'app/shared/model/cliente.model';
import { ClienteService } from 'app/entities/cliente';
import { ICidade } from 'app/shared/model/cidade.model';
import { CidadeService } from 'app/entities/cidade';

@Component({
  selector: 'jhi-endereco-update',
  templateUrl: './endereco-update.component.html'
})
export class EnderecoUpdateComponent implements OnInit {
  isSaving: boolean;

  clientes: ICliente[];

  cidades: ICidade[];

  editForm = this.fb.group({
    id: [],
    logradouro: [],
    numero: [],
    complemento: [],
    bairro: [],
    cep: [],
    cliente: [],
    cidade: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected enderecoService: EnderecoService,
    protected clienteService: ClienteService,
    protected cidadeService: CidadeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ endereco }) => {
      this.updateForm(endereco);
    });
    this.clienteService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICliente[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICliente[]>) => response.body)
      )
      .subscribe((res: ICliente[]) => (this.clientes = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.cidadeService
      .query({ filter: 'endereco-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<ICidade[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICidade[]>) => response.body)
      )
      .subscribe(
        (res: ICidade[]) => {
          if (!this.editForm.get('cidade').value || !this.editForm.get('cidade').value.id) {
            this.cidades = res;
          } else {
            this.cidadeService
              .find(this.editForm.get('cidade').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<ICidade>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<ICidade>) => subResponse.body)
              )
              .subscribe(
                (subRes: ICidade) => (this.cidades = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(endereco: IEndereco) {
    this.editForm.patchValue({
      id: endereco.id,
      logradouro: endereco.logradouro,
      numero: endereco.numero,
      complemento: endereco.complemento,
      bairro: endereco.bairro,
      cep: endereco.cep,
      cliente: endereco.cliente,
      cidade: endereco.cidade
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const endereco = this.createFromForm();
    if (endereco.id !== undefined) {
      this.subscribeToSaveResponse(this.enderecoService.update(endereco));
    } else {
      this.subscribeToSaveResponse(this.enderecoService.create(endereco));
    }
  }

  private createFromForm(): IEndereco {
    return {
      ...new Endereco(),
      id: this.editForm.get(['id']).value,
      logradouro: this.editForm.get(['logradouro']).value,
      numero: this.editForm.get(['numero']).value,
      complemento: this.editForm.get(['complemento']).value,
      bairro: this.editForm.get(['bairro']).value,
      cep: this.editForm.get(['cep']).value,
      cliente: this.editForm.get(['cliente']).value,
      cidade: this.editForm.get(['cidade']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEndereco>>) {
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

  trackCidadeById(index: number, item: ICidade) {
    return item.id;
  }
}
