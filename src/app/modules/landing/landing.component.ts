import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingHomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { AfterViewInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-landing',
    standalone: true,
    imports: [CommonModule, LandingHomeComponent,RouterLink, HeaderComponent,MatIconModule],
    templateUrl: './landing.component.html',
})

export class LandingComponent implements AfterViewInit {
    lucide: any;
    ngAfterViewInit(): void {
        this.lucide.createIcons();
    }
    features = [
        {
            icon: 'lucide-upload',
            title: 'Dépôt de cours',
            description: 'Importez vos PDF ou saisissez directement votre texte',
        },
        {
            icon: 'lucide-file-text',
            title: 'Fiches de révision',
            description: 'Génération automatique des points essentiels',
        },
        {
            icon: 'lucide-brain',
            title: 'Cartes mémoire',
            description: 'Cartes interactives pour optimiser la mémorisation',
        },
        {
            icon: 'lucide-help-circle',
            title: 'Quiz personnalisés',
            description: 'Tests automatiques basés sur votre contenu',
        },
        {
            icon: 'lucide-pen-tool',
            title: 'Personnalisation',
            description: 'Modifiez et adaptez tout selon vos besoins',
        },
        {
            icon: 'lucide-share-2',
            title: 'Partage collaboratif',
            description: "Partagez vos fiches avec d'autres étudiants",
        },
    ];

    teacherFeatures = [
        {
            icon: 'lucide-bar-chart-3',
            title: 'Suivi des progrès',
            description: 'Statistiques détaillées sur la compréhension des concepts',
        },
        {
            icon: 'lucide-target',
            title: 'Analyse comportementale',
            description: 'Identification des points faibles pour un soutien ciblé',
        },
    ];
}
