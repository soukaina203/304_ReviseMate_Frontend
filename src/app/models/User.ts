export class User{
        lastName: string;
        firstName: string;
        email: string;
        password: string;
        createdAt?: Date;  // Optionnel car généré par le backend
        updatedAt?: Date;  // Optionnel car mis à jour par le backend
}
