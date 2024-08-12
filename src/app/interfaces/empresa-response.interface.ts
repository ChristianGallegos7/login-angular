import { Empresa } from "./empresa.interface";

export interface LoginResponseEmpresa {
    empresa: Empresa;
    token: string;
}
