import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Mascota } from '../../../models/mascota';
import { MascotaService } from '../../../services/mascota.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SeguraEliminarComponent } from '../segura-eliminar/segura-eliminar.component';

@Component({
  selector: 'app-segura-listar',
  templateUrl: './segura-listar.component.html',
  styleUrl: './segura-listar.component.scss',
})
export class SeguraListarComponent {
  mascotas: Mascota[] = [];
  dataSource = new MatTableDataSource<Mascota>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [
    'id',
    'address',
    'birthdate',
    'size',
    'status',
    'actions',
  ];

  constructor(
    private mascotaService: MascotaService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.mascotaService.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
    });

    this.mascotaService.getList().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    const sortState: Sort = { active: 'id', direction: 'asc' };
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
  }

  onEdit(id: number) {
    this.router.navigate([`mascota/segura/edicion/${id}`]);
  }

  onDelete(id: number){
    this.dialog.open(SeguraEliminarComponent).afterClosed().subscribe(result =>{
      if(result){
        this.mascotaService.delete(id).subscribe({
          next: () => {
            this.mascotaService.list().subscribe({
              next: (mascotas) => {
                this.mascotaService.setList(mascotas);
              },
            });
          }
        })
      }
    });
  }

  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim();
  }
}
