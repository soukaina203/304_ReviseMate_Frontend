export class User{
    id: number = 0
    lastName: string;
    firstName: string;
    email: string;
    id_role:number;
    id_classe:null | number;
    password: string;
    createdAt?: Date;  // Optionnel car généré par le backend
    updatedAt?: Date;  // Optionnel car mis à jour par le backend
}
