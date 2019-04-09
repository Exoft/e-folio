import { Component, OnInit, Input } from '@angular/core';
import { Developer } from 'src/app/components/models/developer.model';

@Component({
  selector: 'app-developers-item',
  templateUrl: './developers-item.component.html',
  styleUrls: ['./developers-item.component.scss']
})
export class DevelopersItemComponent implements OnInit {

  @Input() developer: Developer;

  constructor() { }

  ngOnInit() {
  }

}
