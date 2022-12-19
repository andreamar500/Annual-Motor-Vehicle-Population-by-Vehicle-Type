import axios from 'axios';

export class VehiculoService {
    url = "http://localhost:8080/api/vehiculos/";

    getAll(){
        return axios.get(this.url).then(res => res.data);
    }

}