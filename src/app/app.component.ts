import { Component, OnInit, ViewChild } from '@angular/core';
import { jqxDropDownListComponent } from 'jqwidgets-ng/jqxdropdownlist';
import { jqxButtonComponent } from 'jqwidgets-ng/jqxbuttons';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('myDropDownList') myDropDownList!: jqxDropDownListComponent;
  @ViewChild('myGrid') myGrid!: jqxGridComponent;



  ngOnInit(): void {
    this.loadDataDesplegable();
  }

  title = 'testComponentsJqxWidgets';

  source: any = {
    datafields: [
      { name: 'id', type: 'int' },
      { name: 'name', type: 'string' },
      { name: 'price', type: 'int' },
      { name: 'quantity', type: 'int' }
    ],
    datatype: 'json',
    localdata: [
      { id: 0, name: 'CPU', price: 700 },
      { id: 1, name: 'Memory', price: 350 },
      { id: 2, name: 'Video Card', price: 300 },
      { id: 3, name: 'Motherboard', price: 250 },
      { id: 4, name: 'Mouse', price: 25 },
      { id: 5, name: 'Keyboard', price: 50 },
      { id: 6, name: 'Power Supply', price: 35 }
    ]
  };

  dataAdapter: any = new jqx.dataAdapter(this.source);

  columns: any[] = [
    { text: 'ID', datafield: 'id', width: 50 },
    { text: 'Name', datafield: 'name', width: 150 },
    { text: 'Price', datafield: 'price', width: 100 },
    { text: 'Quantity', datafield: 'quantity', width: 60 }
  ];

  rowdetailstemplate = (index: any): any => {
    var details = {
      rowdetails: '<div id="nestedGrid" style="margin: 10px;"></div>',
      rowdetailsheight: 220,
      rowdetailshidden: true,
    };
    return details;
  };

  nestedGrids: any[] = new Array();

  initRowDetails = (index: any, parentElement: any, gridElement: any, record: any): void => {
    let nestedGridContainer = parentElement.children[0];
    this.nestedGrids[index] = nestedGridContainer;

    // Crear un elemento div para mostrar el índice
    let indexDiv = document.createElement('div');
    indexDiv.innerText = `Índice: ${index}`;
    indexDiv.style.padding = '10px'; // Puedes ajustar el estilo según tus necesidades
    indexDiv.style.backgroundColor = '#f0f0f0'; // Color de fondo para mejor visibilidad

    // Añadir el div al contenedor del grid anidado
    nestedGridContainer.appendChild(indexDiv);
  }

  // desplegable de jqx
  appsAdapter: any;

  listDesplegable = [
    { Id: 1, Nombre: '> 300' },
    { Id: 2, Nombre: '< 100' },
    { Id: 3, Nombre: '= 50' },
    { Id: 4, Nombre: '> 100 y < 300' },

  ];

  loadDataDesplegable() {

    let sourceDesplegable = {
      datatype: 'json',
      datafields: [
        { name: 'Id', type: 'number', map: 'Id' },
        { name: 'Nombre', type: 'string', map: 'Nombre' },
      ],
      localdata: this.listDesplegable,

    };

    this.appsAdapter = new jqx.dataAdapter(sourceDesplegable, { autoBind: true });
  }

  // Botón de jqx

  clickButton(event: any): void {
    // creo un filtro para filtrar los datos segun el desplegable
    let filtergroup = new jqx.filter();
    let filter_or_operator = 1;

    let filtervalue = this.myDropDownList.getSelectedItem().label;
    console.log(filtervalue);

    // si son mayores a 300
    if (filtervalue === '> 300') {
      let filter = filtergroup.createfilter('numericfilter', 300, 'GREATER_THAN');
      filtergroup.addfilter(filter_or_operator, filter);
    }

    // si son menores a 100
    if (filtervalue === '< 100') {
      let filter = filtergroup.createfilter('numericfilter', 100, 'LESS_THAN');
      filtergroup.addfilter(filter_or_operator, filter);
    }

    // si son iguales a 50
    if (filtervalue === '= 50') {
      let filter = filtergroup.createfilter('numericfilter', 50, 'EQUAL');
      filtergroup.addfilter(filter_or_operator, filter);
    }

    // si son mayores a 100 y menores a 300
    if (filtervalue === '> 100 y < 300') {
      let filter1 = filtergroup.createfilter('numericfilter', 100, 'GREATER_THAN');
      filtergroup.addfilter(filter_or_operator, filter1);

      let filter2 = filtergroup.createfilter('numericfilter', 300, 'LESS_THAN');
      filtergroup.addfilter(filter_or_operator, filter2);
    }

    // aplico el filtro
    this.myGrid.addfilter('price', filtergroup);
    // aplico el filtro
    this.myGrid.applyfilters();
}










}
