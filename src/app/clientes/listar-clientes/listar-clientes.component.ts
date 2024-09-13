import { Component, OnInit } from '@angular/core';
import { Clientes } from '../clientes';
import { ClienteService } from '../cliente.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
//import * as XLSX from 'xlsx';

@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.css']
})
export class ListarClientesComponent implements OnInit {

  clientes: Clientes[] = [];
  //paginacion
  currentPage: number = 1; // Página actual
  itemsPerPage: number = 13; // Cantidad de elementos por página
  displayClientes: any[] = []; // Array de clientes que se mostrarán en la página actual
  busqueda: string = '';

  constructor(private clienteServicio: ClienteService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerClientes();
  }

  private obtenerClientes() {
    this.clienteServicio.obtenerListaDeClientes().subscribe(data => {
      if (data.res === 'OK') {
        this.clientes = data.object as Clientes[];
        this.displayClientes = this.clientes.slice(0, this.itemsPerPage);
        this.actualizarClientesMostrados();
        console.log(data);

        // Llamar a getTotalPaginas() después de obtener los clientes
        const paginas = this.getTotalPaginas();
      } else {
        // Manejar caso cuando la respuesta no es 'OK'
      }
    });
  }

  actualizarCliente(id_cliente: number) {
    this.router.navigate(['actualizar-clientes', id_cliente]);
  }

  registrarCliente() {
    this.router.navigate(['registrar-clientes']);
  }

  eliminarCliente(id_cliente: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        // Realizar la eliminación
        this.clienteServicio.eliminarCliente(id_cliente).subscribe(data => {
          if (data.res === 'OK') {
            console.log(data);
            this.obtenerClientes();
          }
        });
        Swal.fire(
          'Eliminado',
          'El elemento ha sido eliminado.',
          'success'
        ).then(() => {
          // Cerrar la ventana modal
          Swal.close();
        });
      }
    });
  }

  verDetalles(id_cliente: number) {
    this.router.navigate(['clientes-detalles', id_cliente]);
  }

  buscarCliente() {
    // Filtrar la matriz de clientes según la cadena de búsqueda
    const clientesFiltrados = this.clientes.filter(cliente =>
      cliente.razon_social.toLowerCase().includes(this.busqueda.toLowerCase())
    );

    // Actualizar la matriz de clientes mostrados en la tabla
    this.clientes = clientesFiltrados;

    this.currentPage = 1; // Paginación
    this.actualizarClientesMostrados(); // Paginación
  }

  // Paginación
  actualizarClientesMostrados() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayClientes = this.clientes.slice(startIndex, endIndex);
  }

  cambiarPagina(page: number) {
    this.currentPage = page;
    this.actualizarClientesMostrados();
  }

  paginaAnterior() {
    if (this.currentPage > 1) {
      this.cambiarPagina(this.currentPage - 1);
    }
  }

  paginaSiguiente() {
    const totalPages = Math.ceil(this.clientes.length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.cambiarPagina(this.currentPage + 1);
    }
  }

  getPaginas(): number[] {
    const totalPages = this.getTotalPaginas();
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  getTotalPaginas(): number {
    return Math.ceil(this.clientes.length / this.itemsPerPage);
  }

  /*exportarExcel() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.clientes);
    const workbook: XLSX.WorkBook = { Sheets: { 'Clientes': worksheet }, SheetNames: ['Clientes'] };
    XLSX.writeFile(workbook, 'Listado_Clientes.xlsx');
  }

  // exportarPDF() {
  //   const doc = new jsPDF();
  //   const col = ['Tipo Doc.', 'Nro. Documento', 'Razon Social', 'Tipo Contribuyente', 'Mail', 'Telefono'];
  //   const rows = this.clientes.map(cliente => [
  //     cliente.tipo_documento,
  //     cliente.numero_documento,
  //     cliente.razon_social,
  //     cliente.tipo_contribuyente,
  //     cliente.mail,
  //     cliente.telefono
  //   ]);

  //   doc.autoTable({
  //     head: [col],
  //     body: rows,
  //   });
  //   doc.save('Listado_Clientes.pdf');
  // }*/

}

