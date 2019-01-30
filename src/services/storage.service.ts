import { CarrinhoDTO } from '../models/carrinho.dto';
import { LocalUser } from './../models/local_user';
import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from '../config/storage_keys.config';

@Injectable()
export class StorageService {
    getLocalUser(): LocalUser {
        let usr = localStorage.getItem(STORAGE_KEYS.localUser);
        if (usr == null) {
            return null;
        } else {
            return JSON.parse(usr);
        }
    }

    setLocalUser(obj: LocalUser) {
        if (obj == null) {
            localStorage.removeItem(STORAGE_KEYS.localUser);
        } else {
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
        }
    }

    getCart() : CarrinhoDTO {
        let str = localStorage.getItem(STORAGE_KEYS.carrinho);
        if (str != null) {
            return JSON.parse(str);
        }
        else {
            return null;
        }
    }

    setCart(obj : CarrinhoDTO) {
        if (obj != null) {
            localStorage.setItem(STORAGE_KEYS.carrinho, JSON.stringify(obj));
        } 
        else {
            localStorage.removeItem(STORAGE_KEYS.carrinho);
        }
    }
}