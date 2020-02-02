import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  scene: Scene = Scene.MAIN;

  openings: { day: string, bs?: number, be?: number, as?: number, ae?: number }[] = [
    { day: 'Hétfő', bs: 8, be: 12, as: 13, ae: 17 },
    { day: 'Kedd', bs: 8, be: 12, as: 13, ae: 17 },
    { day: 'Szerda', bs: 8, be: 12, as: 13, ae: 17 },
    { day: 'Csütörtök', bs: 8, be: 12, as: 13, ae: 17 },
    { day: 'Péntek', bs: 8, be: 12, as: 13, ae: 17 },
    { day: 'Szombat', bs: 8, be: 12 },
    { day: 'Vasárnap' },
  ];

  constructor(private title: Title) {
    title.setTitle('Gardenova áruház');
  }

  setSceneMain() {
    this.scene = Scene.MAIN;
  }

  setSceneDetails() {
    this.scene = Scene.DETAILS;
  }

  setSceneOpenings() {
    this.scene = Scene.OPENINGS;
  }

  ngOnInit() {
  }

}

export enum Scene {
  MAIN,
  DETAILS,
  OPENINGS
}