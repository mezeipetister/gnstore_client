import { Component, OnInit, Input } from '@angular/core';
import { Label } from 'src/app/class/issue';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css']
})
export class LabelComponent implements OnInit {

  constructor() { }

  @Input() labels: Label[] = [];

  ngOnInit() {
  }

}
