import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ClienteService } from './cliente.service';
import { ClienteNewDto } from 'app/shared/model/clienteNewDto.model';

@Component({
  selector: 'jhi-cliente-update',
  templateUrl: './cliente-update.component.html'
})
export class ClienteUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nome: [],
    email: [],
    cpfOuCnpj: [],
    tipo: [],
    telefones: [],
    logradouro: [],
    numero: [],
    complemento: [],
    bairro: [],
    cep: [],
    cidadeNome: [],
    estadoNome: []
  });

  constructor(protected clienteService: ClienteService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ cliente }) => {
      this.updateForm(cliente);
    });
  }

  updateForm(cliente: ClienteNewDto) {
    this.editForm.patchValue({
      id: cliente.id,
      nome: cliente.nome,
      email: cliente.email,
      cpfOuCnpj: cliente.cpfOuCnpj,
      tipo: cliente.tipo,
      telefones: cliente.telefones,
      logradouro: cliente.logradouro,
      numero: cliente.numero,
      complemento: cliente.complemento,
      bairro: cliente.bairro,
      cep: cliente.cep,
      estadoNome: cliente.estadoNome,
      cidadeNome: cliente.cidadeNome
    });
  }

  // updateForm(cliente: ICliente) {
  //   this.editForm.patchValue({
  //     id: cliente.id,
  //     nome: cliente.nome,
  //     email: cliente.email,
  //     cpfOuCnpj: cliente.cpfOuCnpj,
  //     tipo: cliente.tipo
  //   });
  // }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const cliente = this.createFromForm();
    if (cliente.id !== undefined) {
      this.subscribeToSaveResponse(this.clienteService.updateCliente(cliente));
    } else {
      this.subscribeToSaveResponse(this.clienteService.createCliente(cliente));
    }
  }

  private createFromForm(): ClienteNewDto {
    return {
      ...new ClienteNewDto(),
      id: this.editForm.get(['id']).value,
      nome: this.editForm.get(['nome']).value,
      email: this.editForm.get(['email']).value,
      cpfOuCnpj: this.editForm.get(['cpfOuCnpj']).value,
      tipo: this.editForm.get(['tipo']).value,
      telefones: this.editForm.get(['telefones']).value,
      logradouro: this.editForm.get(['logradouro']).value,
      numero: this.editForm.get(['numero']).value,
      complemento: this.editForm.get(['complemento']).value,
      bairro: this.editForm.get(['bairro']).value,
      cep: this.editForm.get(['cep']).value,
      cidadeNome: this.editForm.get(['cidadeNome']).value,
      estadoNome: this.editForm.get(['estadoNome']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ClienteNewDto>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
