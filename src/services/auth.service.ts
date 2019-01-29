import { API_CONFIG } from './../config/api.config';
import { CredenciaisDTO } from './../models/credenciais.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {
    constructor(public http: HttpClient) {

    }

    authenticate(cred: CredenciaisDTO) {
       return this.http.post(`${API_CONFIG.baseUrl}/login`,
            cred,
            { observe: 'response', responseType: 'text' }           
        )
    }
}