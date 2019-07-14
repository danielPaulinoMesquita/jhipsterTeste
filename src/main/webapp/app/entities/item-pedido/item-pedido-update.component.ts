import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IItemPedido, ItemPedido } from 'app/shared/model/item-pedido.model';
import { ItemPedidoService } from './item-pedido.service';

@Component({
  selector: 'jhi-item-pedido-update',
  templateUrl: './item-pedido-update.component.html'
})
export class ItemPedidoUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    desconto: [],
    quantidade: [],
    preco: []
  });

  constructor(protected itemPedidoService: ItemPedidoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ itemPedido }) => {
      this.updateForm(itemPedido);
    });
  }

  updateForm(itemPedido: IItemPedido) {
    this.editForm.patchValue({
      id: itemPedido.id,
      desconto: itemPedido.desconto,
      quantidade: itemPedido.quantidade,
      preco: itemPedido.preco
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const itemPedido = this.createFromForm();
    if (itemPedido.id !== undefined) {
      this.subscribeToSaveResponse(this.itemPedidoService.update(itemPedido));
    } else {
      this.subscribeToSaveResponse(this.itemPedidoService.create(itemPedido));
    }
  }

  private createFromForm(): IItemPedido {
    return {
      ...new ItemPedido(),
      id: this.editForm.get(['id']).value,
      desconto: this.editForm.get(['desconto']).value,
      quantidade: this.editForm.get(['quantidade']).value,
      preco: this.editForm.get(['preco']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IItemPedido>>) {
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
