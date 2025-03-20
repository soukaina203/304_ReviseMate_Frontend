export class User{
    id: string = ''
    lastName: string;
    firstName: string;
    email: string;
    role:string;
    id_classe:null | number;
    password: string;
    createdAt?: Date;  // Optionnel car généré par le backend
    updatedAt?: Date;  // Optionnel car mis à jour par le backend
}
