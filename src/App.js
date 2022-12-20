import React, { Component } from 'react';
import './App.css';
import { VehiculoService } from './servicio/VehiculoService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {Menubar} from 'primereact/menubar';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Growl} from 'primereact/growl';
import {Panel} from 'primereact/panel';

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
      }
    };
    this.items = [
      {
        label : 'Create',
        icon  : 'pi pi-fw pi-plus',
        command : () => {this.showSaveDialog()}
      },
      {
        label : 'Edit',
        icon  : 'pi pi-fw pi-pencil',
      },
      {
        label : 'Delete',
        icon  : 'pi pi-fw pi-trash',
      }
    ];
    this.vehiculoService = new VehiculoService();
    this.save = this.save.bind(this);
    this.footer = (
      <div>
        <Button label="Save" icon="pi pi-check" onClick={this.save} />
      </div>
    );

  }

  //para que se ejecute despues del primer render de este componente principal
  componentDidMount(){
    this.vehiculoService.getAll().then(data => this.setState({vehiculos: data}))
  }
  save() {
    this.vehiculoService.save(this.state.vehiculo).then(data => {
      this.setState({
        visible : false,
        vehiculo: {
          id: null,
          anio: null,
          categoria: null,
          tipo: null,
          numVehiculos : null
        }
      });
      this.growl.show({severity: 'success', summary: 'Atención!', detail: 'Se guardó el registro correctamente.'});
      this.vehiculoService.getAll().then(data => this.setState({vehiculos: data}))
    })
  }


  render(){
    return (
      <div style={{width:'80%', margin: '0 auto', marginTop: '20px'}}>
        <br/>
          <Menubar model={this.items}/>
          <Panel header="React CRUD App">
          <DataTable value={this.state.vehiculos}>
            <Column field="anio" header="Year"></Column>
            <Column field="categoria" header="Category"></Column>
            <Column field="tipo" header="Type"></Column>
            <Column field="numVehiculos" header="No. of Vehicles"></Column>
          </DataTable>
          </Panel>
          <Dialog header="Create new vehicle population" visible={this.state.visible} style={{width: '400px'}} footer={this.footer} modal={true} onHide={() => this.setState({visible: false})}>
            <form id="vehicle-population-form">
              <span className="p-float-label">
                <InputText value={this.state.vehiculo.anio} style={{width : '100%'}} id="anio" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let vehiculo = Object.assign({}, prevState.vehiculo);
                        vehiculo.anio = val;

                        return { vehiculo };
                    })}
                  } />
                <label htmlFor="anio">Año</label>
              </span>
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.vehiculo.categoria} style={{width : '100%'}} id="categoria" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let vehiculo = Object.assign({}, prevState.vehiculo);
                        vehiculo.categoria = val

                        return { vehiculo };
                    })}
                  } />
                <label htmlFor="categoria">Categoría</label>
              </span>
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.vehiculo.tipo} style={{width : '100%'}} id="tipo" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let vehiculo = Object.assign({}, prevState.vehiculo);
                        vehiculo.tipo = val

                        return { vehiculo };
                    })}
                  } />
                <label htmlFor="tipo">Tipo</label>
              </span>
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.vehiculo.numVehiculos} style={{width : '100%'}} id="numVehiculos" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let vehiculo = Object.assign({}, prevState.vehiculo);
                        vehiculo.numVehiculos = val

                        return { vehiculo };
                    })}
                  } />
                <label htmlFor="numVehiculos">Número de vehículos</label>
              </span>
            </form>
          </Dialog>
          <Growl ref={(el) => this.growl = el} />

      </div>
    );
  }
  showSaveDialog(){
    this.setState({
      visible : true,
      vehiculo : {
        id: null,
        anio: null,
        categoria: null,
        tipo: null,
        numVehiculos : null
      }
    });
    document.getElementById('vehicle-population-form').reset();
  }

}
