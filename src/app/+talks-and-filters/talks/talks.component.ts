import {Component, Input} from '@angular/core';
import {Talk} from '../+state/talks-and-filters.interfaces';

@Component({
  selector: 'talks-cmp',
  templateUrl: './talks.component.html',
  styleUrls: ['./talks.component.css']
})
export class TalksComponent {
  @Input() talks: Talk[];
}
