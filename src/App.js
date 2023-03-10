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
import {CSVLink} from 'react-csv';
import axios from 'axios';


import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default class App extends Component{
  url = "http://localhost:8080/api/vehiculos/";
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
      listOfData: [],
      loading: false,
      selectedVehiculo : {

      },
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
        command : () => {
          if(this.state.selectedVehiculo.tipo!==''){
            this.showEditDialog();
          }}
      },
      {
        label : 'Delete',
        icon  : 'pi pi-fw pi-trash',
        command : () => {this.delete()}
      }
    ];
    this.vehiculoService = new VehiculoService();
    this.save = this.save.bind(this);
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
    this.footer = (
      <div>
        <Button label="Save" icon="pi pi-check" onClick={this.save} />
      </div>
    );
    this.footerEdit = (
      <div>
        <Button label="Save" icon="pi pi-check" onClick={this.edit} />
      </div>
    );




  }



  //para que se ejecute despues del primer render de este componente principal
  async componentDidMount(){
    this.vehiculoService.getAll().then(data => this.setState({vehiculos: data}));
    const res = await axios.get("http://localhost:8080/api/vehiculos/");
    this.setState({listOfData: res.data});
    console.log(this.state.listOfData);
  }
  save() {
    this.vehiculoService.save(this.state.vehiculo).then(data => {
      this.setState({
        visible : false,
        visible2: false,
        vehiculo: {
          id: null,
          anio: null,
          categoria: null,
          tipo: null,
          numVehiculos : null
        }
      });
      this.growl.show({severity: 'success', summary: 'Atenci??n!', detail: 'Se guard?? el registro correctamente.'});
      this.vehiculoService.getAll().then(data => this.setState({vehiculos: data}))
    })
  }
  edit() {
    this.vehiculoService.save(this.state.vehiculo).then(data => {
      this.setState({
        visible : false,
        visible2: false,
        vehiculo: {
          id: null,
          anio: null,
          categoria: null,
          tipo: null,
          numVehiculos : null
        }
      });
      this.growl.show({severity: 'success', summary: 'Atenci??n!', detail: 'Se edit?? el registro correctamente.'});
      this.vehiculoService.getAll().then(data => this.setState({vehiculos: data}))
    })
  }
  delete() {
    if(window.confirm("??Realmente desea eliminar el registro?")) {
      this.vehiculoService.delete(this.state.selectedVehiculo.id).then(data => {
        this.growl.show({severity: 'success', summary: 'Atenci??n!', detail: 'Se elimin?? el registro correctamente.'});
        this.vehiculoService.getAll().then(data => this.setState({vehiculos: data}));
      });
    }
  }


  render(){
    return (
       <div style={{width:'80%', margin: '0 auto', marginTop: '20px'}}>
        <br/>
        
        <CSVLink data={this.state.listOfData} filename={"annual-motor-vehicle-population-by-vehicle-type.csv"}><Button label="Download" className="p-button-success" icon="pi pi-file-excel"/></CSVLink>
        <br/>
        <br/>
          <Menubar model={this.items}/>
          <Panel header="Annual Motor Vehicle Population by Vehicle Type">
          <DataTable id="tabla" value={this.state.vehiculos} paginator={true} rows="4" selectionMode="single" selection={this.state.selectedVehiculo} onSelectionChange={e => this.setState({selectedVehiculo: e.value})} responsiveLayout="scroll">
            <Column field="anio" header="Year" sortable></Column>
            <Column field="categoria" header="Category" sortable></Column>
            <Column field="tipo" header="Type" sortable></Column>
            <Column field="numVehiculos" header="No. of Vehicles" sortable></Column>
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
                <label htmlFor="anio">A??o</label>
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
                <label htmlFor="categoria">Categor??a</label>
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
                <label htmlFor="numVehiculos">N??mero de veh??culos</label>
              </span>
            </form>
          </Dialog>
          <Growl ref={(el) => this.growl = el} />
          <Dialog header="Edit new vehicle population" visible={this.state.visible2} style={{width: '400px'}} footer={this.footerEdit} modal={true} onHide={() => this.setState({visible2: false})}>
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
                <label htmlFor="anio">A??o</label>
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
                <label htmlFor="categoria">Categor??a</label>
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
                <label htmlFor="numVehiculos">N??mero de veh??culos</label>
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
  showEditDialog() {
    this.setState({
      visible2 : true,
      vehiculo : {
        id: this.state.selectedVehiculo.id,
        anio: this.state.selectedVehiculo.anio,
        categoria: this.state.selectedVehiculo.categoria,
        tipo: this.state.selectedVehiculo.tipo,
        numVehiculos : this.state.selectedVehiculo.numVehiculos
      }
    });
  }

}
