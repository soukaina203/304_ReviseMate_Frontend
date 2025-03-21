export interface Student {
    _id: string; 
    nom: string; 
    score: {
      current: number; 
      max: number; 
    };
    fiches: string[]; 
    cartesMemoire: string[]; 
    quizzes: string[]; 
    id_role: string; 
  }