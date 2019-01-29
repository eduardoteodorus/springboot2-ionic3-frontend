import { StorageService } from './storage.service';
import { LocalUser } from './../models/local_user';
import { API_CONFIG } from './../config/api.config';
import { CredenciaisDTO } from './../models/credenciais.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt'

@Injectable()
export class AuthService {

    jwtHelper: JwtHelper = new JwtHelper();

    constructor(public http: HttpClient, public storage: StorageService) {

    }

    authenticate(cred: CredenciaisDTO) {
       return this.http.post(`${API_CONFIG.baseUrl}/login`,
            cred,
            { observe: 'response', responseType: 'text' }           
        )
    }

    sucessfullLogin(authorizationValue: string) {
        let strToken = authorizationValue.substring(7);
        let user: LocalUser = {
            token: strToken,
            email: this.jwtHelper.decodeToken(strToken).sub
        };
        this.storage.setLocalUser(user);
    }

    logout() {
        this.storage.setLocalUser(null);
    }
}