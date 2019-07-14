import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IProduto, Produto } from 'app/shared/model/produto.model';
import { ProdutoService } from './produto.service';
import { IPedido } from 'app/shared/model/pedido.model';
import { PedidoService } from 'app/entities/pedido';
import { ICategoria } from 'app/shared/model/categoria.model';
import { CategoriaService } from 'app/entities/categoria';

@Component({
  selector: 'jhi-produto-update',
  templateUrl: './produto-update.component.html'
})
export class ProdutoUpdateComponent implements OnInit {
  isSaving: boolean;

  pedidos: IPedido[];

  categorias: ICategoria[];

  editForm = this.fb.group({
    id: [],
    nome: [null, [Validators.required, Validators.maxLength(100)]],
    preco: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected produtoService: ProdutoService,
    protected pedidoService: PedidoService,
    protected categoriaService: CategoriaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ produto }) => {
      this.updateForm(produto);
    });
    this.pedidoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPedido[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPedido[]>) => response.body)
      )
      .subscribe((res: IPedido[]) => (this.pedidos = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.categoriaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICategoria[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICategoria[]>) => response.body)
      )
      .subscribe((res: ICategoria[]) => (this.categorias = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(produto: IProduto) {
    this.editForm.patchValue({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const produto = this.createFromForm();
    if (produto.id !== undefined) {
      this.subscribeToSaveResponse(this.produtoService.update(produto));
    } else {
      this.subscribeToSaveResponse(this.produtoService.create(produto));
    }
  }

  private createFromForm(): IProduto {
    return {
      ...new Produto(),
      id: this.editForm.get(['id']).value,
      nome: this.editForm.get(['nome']).value,
      preco: this.editForm.get(['preco']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduto>>) {
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

  trackPedidoById(index: number, item: IPedido) {
    return item.id;
  }

  trackCategoriaById(index: number, item: ICategoria) {
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
