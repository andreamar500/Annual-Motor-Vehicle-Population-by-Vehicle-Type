import React, { Component } from 'react';
import './App.css';
import { VehiculoService } from './servicio/VehiculoService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default class App extends Component{
  constructor(){
    super();
    this.state = {
      visible : false,
      vehiculo: {
        id: null,
        anio: null,
        categoria: null,
        tipo: null,
        numVehiculos : null
      },
    };
    this.vehiculoService = new VehiculoService();
  }

  //para que se ejecute despues del primer render de este componente principal
  componentDidMount(){
    this.vehiculoService.getAll().then(data => this.setState({vehiculo: data}))
  }


  render(){
    return (
      <div style={{width:'80%', margin: '0 auto', marginTop: '20px'}}>
        <br/>

          <DataTable value={this.state.vehiculo}>
            <Column field="anio" header="Year"></Column>
            <Column field="categoria" header="Category"></Column>
            <Column field="tipo" header="Type"></Column>
            <Column field="numVehiculos" header="No. of Vehicles"></Column>
          </DataTable>

      </div>
    );
  }

}
