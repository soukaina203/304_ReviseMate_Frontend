export class Question{

        id?: string; // Optional because MongoDB generates it
        question: string;
        correct_answer: string;
        incorrect_answers: string[]; // Must contain exactly 3 incorrect answers
        id_quiz?: string; // Optional reference to the Quiz

}
