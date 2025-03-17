export interface Quiz {
    type?: string;
    _id?: string;
    titre: string;
    id_fiche?: string;
    id_utilisateur: string;
    scores?: {
      correctAnswers: number;
      totalQuestions: number;
      date: Date;
    }[];
    date_score?: Date;
    correctAnswers?: number;
    totalQuestions?: number;
  }
