export interface Tarea {
  id: string;
  descripcion: string;
  fecha: Date | string;
  prioridad: string;
  listId?: string;
  nombre: string;
  fechaCreacion: Date | string;
  usuarioAsignado: string;
}