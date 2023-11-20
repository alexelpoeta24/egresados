import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnInit,
} from '@angular/core';
import { Carrera } from 'src/app/Models/carreras.model';
import { Habilidad } from 'src/app/Models/habilidades.model';
import { Provincia } from 'src/app/Models/provincias.model';
import { CarreraListService } from 'src/app/Servicios/lista-carreras.service';
import { HabilidadListService } from 'src/app/Servicios/lista-habilidadades.service';
import { ProvinciaListService } from 'src/app/Servicios/lista-provincias.services';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.css'],
})
export class FiltrosComponent implements OnInit {
  carreras: Carrera[] = [];
  habilidades: Habilidad[] = [];
  provincias: Provincia[] = [];
  titulosTipos: any;

  @ViewChild('fechaDesde') fechaDesde: ElementRef | undefined;
  @ViewChild('fechaHasta') fechaHasta: ElementRef | undefined;

  filters: any;
  destacado: Boolean = false;

  rangoFechaInicio: any;
  rangoFechaFin: any;
  dateRangeDisabled: any;
  FiltroHabilidadInput: any;
  FiltroProvinciaInput: any;

  @Output() parentFiltrosFunction: EventEmitter<any> = new EventEmitter();

  constructor(
    private carreraListService: CarreraListService,
    private habilidadListService: HabilidadListService,
    private provinciaListService: ProvinciaListService
  ) {}
  ngOnInit(): void {
    this.Provincias();
    this.Habilidades();
  }

  Carreras() {
    this.carreraListService.getCarreras().subscribe(
      (data) => {
        this.carreras = data;
      },
      (error) => {
        console.error('Error fetching skills:', error);
      }
    );
  }

  Habilidades() {
    this.habilidadListService.getHabilidades().subscribe(
      (data) => {
        this.habilidades = data;
      },
      (error) => {
        console.error('Error fetching skills:', error);
      }
    );
  }

  Provincias() {
    this.provinciaListService.getProvincias().subscribe(
      (data) => {
        this.provincias = data;
      },
      (error) => {
        console.error('Error fetching skills:', error);
      }
    );
  }

  destacadoCheck(event: any) {
    this.destacado = event.target.checked;
  }
  dateRangeDisabledCheck(event: any) {
    this.dateRangeDisabled = event.target.checked;
  }

  habilidadesFiltradas: any[] = [];
  filtrarHabilidades(id: number): void {
    const habilidad = this.habilidades.find((hab) => hab.id === id);
    if (habilidad) {
      if (!this.habilidadesFiltradas.some((hf) => hf.id === id)) {
        this.habilidadesFiltradas.push(habilidad);
      } else {
        this.habilidadesFiltradas = this.habilidadesFiltradas.filter(
          (hf) => hf.id !== id
        );
      }
    }
  }

  provinviasFiltradas: any[] = [];
  filtrarProvincias(id: number): void {
    const provincias = this.provincias.find((prov) => prov.id === id);
    if (provincias) {
      if (!this.provinviasFiltradas.some((hf) => hf.id === id)) {
        this.provinviasFiltradas.push(provincias);
      } else {
        this.provinviasFiltradas = this.habilidadesFiltradas.filter(
          (hf) => hf.id !== id
        );
      }
    }
  }

  licenciatura: boolean = false;
  ingenieria: boolean = false;
  maestria: boolean = false;
  Especialidad: boolean = false;
  Doctorado: boolean = false;
  Tecnico: boolean = false;
  tituloTipos: any[] = [];

  filtrarNiveldeEstudios() {
    this.tituloTipos = [];

    if (this.licenciatura) {
      this.tituloTipos.push({ nivel: 'Licenciatura' });
    }

    if (this.ingenieria) {
      this.tituloTipos.push({ nivel: 'Ingeniería' });
    }

    if (this.maestria) {
      this.tituloTipos.push({ nivel: 'Maestría' });
    }
  }

  aplicarDatosFiltros() {
    this.filters = {
      destacados: this.destacado,
      rangoFechaInicio: this.fechaDesde?.nativeElement.value,
      rangoFechaFin: this.fechaHasta?.nativeElement.value,
      dateRangeDisabled: this.dateRangeDisabled,
      habilidades: this.habilidadesFiltradas,
      provincias: this.provinviasFiltradas,
      tituloTipos: this.tituloTipos,
    };
    this.parentFiltrosFunction.emit(this.filters);
  }

  mostrarOcultar(data: any) {
    this.parentFiltrosFunction.emit(data);
  }

  limpiarFiltros(data: any) {
    this.parentFiltrosFunction.emit(data);
  }
}
