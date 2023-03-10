import axios from 'axios';

export class VehiculoService {
    url = "http://localhost:8080/api/vehiculos/";

    getAll(){
        return axios.get(this.url).then(res => res.data);
    }
    save(vehiculo) {
        return axios.post(this.url, vehiculo).then(res => res.data);
    }
    delete(id) {
        return axios.delete(this.url+id).then(res => res.data);
    }
    findById(id){
        return axios.get(this.url+id).then(res => res.data);
    }

}