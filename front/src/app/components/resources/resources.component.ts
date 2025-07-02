import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [CommonModule, FormsModule], // Asegúrate de tener FormsModule
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {
  resources: any[] = [];
  newResource = {
    name: '',
    price: 0
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getResources();
  }

  getResources() {
    this.http.get<any[]>('http://localhost:3000/resource').subscribe({
      next: data => {
        this.resources = data;
      },
      error: err => console.error('Error al obtener recursos', err)
    });
  }

  createResource() {
    this.http.post('http://localhost:3000/resource', this.newResource).subscribe({
      next: () => {
        this.newResource = { name: '', price: 0 }; // Limpiar formulario
        this.getResources(); // Refrescar lista
      },
      error: err => console.error('Error al crear recurso', err)
    });
  }

  deleteResource(id: string) {
    if (confirm('¿Estás seguro de eliminar este recurso?')) {
      this.http.delete(`http://localhost:3000/resource/${id}`).subscribe({
        next: () => {
          this.resources = this.resources.filter(r => r.id !== id);
        },
        error: err => console.error('Error al eliminar recurso', err)
      });
    }
  }

// 
  editedResource: any = null; // recurso que está siendo editado
// Seleccionar recurso para edición
editResource(resource: any) {
  this.editedResource = { ...resource }; // Clonar el recurso
}

// Cancelar edición
cancelEdit() {
  this.editedResource = null;
}

// Guardar cambios
updateResource() {
  if (!this.editedResource.name || this.editedResource.price <= 0) {
    alert('Nombre o precio inválido');
    return;
  }

  this.http.put(`http://localhost:3000/resource/${this.editedResource.id}`, {
    name: this.editedResource.name,
    price: this.editedResource.price
  }).subscribe({
    next: () => {
      this.getResources(); // Recargar lista actualizada
      this.editedResource = null; // Salir del modo edición
    },
    error: err => console.error('Error al actualizar recurso', err)
  });
}

}

