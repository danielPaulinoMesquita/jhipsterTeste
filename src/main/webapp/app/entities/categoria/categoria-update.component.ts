import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICategoria, Categoria } from 'app/shared/model/categoria.model';
import { CategoriaService } from './categoria.service';
import { IProduto } from 'app/shared/model/produto.model';
import { ProdutoService } from 'app/entities/produto';

@Component({
  selector: 'jhi-categoria-update',
  templateUrl: './categoria-update.component.html'
})
export class CategoriaUpdateComponent implements OnInit {
  isSaving: boolean;

  produtos: IProduto[];

  editForm = this.fb.group({
    id: [],
    nome: [null, [Validators.required, Validators.maxLength(100)]],
    produtos: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected categoriaService: CategoriaService,
    protected produtoService: ProdutoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ categoria }) => {
      this.updateForm(categoria);
    });
    this.produtoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IProduto[]>) => mayBeOk.ok),
        map((response: HttpResponse<IProduto[]>) => response.body)
      )
      .subscribe((res: IProduto[]) => (this.produtos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(categoria: ICategoria) {
    this.editForm.patchValue({
      id: categoria.id,
      nome: categoria.nome,
      produtos: categoria.produtos
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const categoria = this.createFromForm();
    if (categoria.id !== undefined) {
      this.subscribeToSaveResponse(this.categoriaService.update(categoria));
    } else {
      this.subscribeToSaveResponse(this.categoriaService.create(categoria));
    }
  }

  private createFromForm(): ICategoria {
    return {
      ...new Categoria(),
      id: this.editForm.get(['id']).value,
      nome: this.editForm.get(['nome']).value,
      produtos: this.editForm.get(['produtos']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICategoria>>) {
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
