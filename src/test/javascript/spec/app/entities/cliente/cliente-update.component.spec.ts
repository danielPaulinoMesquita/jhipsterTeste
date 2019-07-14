/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { TestehipsterTestModule } from '../../../test.module';
import { ClienteUpdateComponent } from 'app/entities/cliente/cliente-update.component';
import { ClienteService } from 'app/entities/cliente/cliente.service';
import { Cliente } from 'app/shared/model/cliente.model';
import { ClienteNewDto } from 'app/shared/model/clienteNewDto.model';

describe('Component Tests', () => {
  describe('Cliente Management Update Component', () => {
    let comp: ClienteUpdateComponent;
    let fixture: ComponentFixture<ClienteUpdateComponent>;
    let service: ClienteService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TestehipsterTestModule],
        declarations: [ClienteUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ClienteUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ClienteUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ClienteService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ClienteNewDto(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new ClienteNewDto();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
