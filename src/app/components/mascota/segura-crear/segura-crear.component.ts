import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MascotaService } from '../../../services/mascota.service';

@Component({
  selector: 'app-segura-crear',
  templateUrl: './segura-crear.component.html',
  styleUrl: './segura-crear.component.scss',
})
export class SeguraCrearComponent {
  mascotaForm: FormGroup;
  currentDate = new Date();

  editMascotaId: number = 0;
  editingData: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private mascotaService: MascotaService,
    private route: ActivatedRoute
  ) {
    this.mascotaForm = this.fb.group({
      address: this.fb.control('', Validators.required),
      birthDate: this.fb.control('', Validators.required),
      size: this.fb.control('', Validators.required),
      status: this.fb.control('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.editMascotaId = data['id'];

      if (this.editMascotaId) {
        this.editingData = true;
        this.mascotaService.serachById(this.editMascotaId).subscribe({
          next: (data) => {
            if (data) this.mascotaForm.patchValue(data);
          },
        });
      }
    });
  }

  onSubmit() {
    const maxDate = new Date();
    maxDate.setDate(this.currentDate.getDate() + 1);
    maxDate.setHours(0, 0, 0, 0);

    const invalidDate = this.mascotaForm.get('birthDate')?.value >= maxDate;

    if (this.mascotaForm.invalid || invalidDate) {
      this.mascotaForm.markAllAsTouched();
      if (invalidDate)
        this.mascotaForm.get('birthDate')?.setErrors({ invaliddate: true });
    } else {
      if (this.editingData) {
        this.mascotaService
          .update({ ...this.mascotaForm.value, id: this.editMascotaId })
          .subscribe({
            next: () => {
              this.mascotaService.list().subscribe({
                next: (mascotas) => {
                  this.mascotaService.setList(mascotas);
                },
              });
            },
          });
      } else {
        this.mascotaService.create(this.mascotaForm.value).subscribe({
          next: () => {
            this.mascotaService.list().subscribe({
              next: (mascotas) => {
                this.mascotaService.setList(mascotas);
              },
            });
          },
        });
      }
      this.router.navigate(['/mascota/segura/listar']);
    }
  }

  onCancel() {
    this.router.navigate(['/mascota/segura/listar']);
  }
}
