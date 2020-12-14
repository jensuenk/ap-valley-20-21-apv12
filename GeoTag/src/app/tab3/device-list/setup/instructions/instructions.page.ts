import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.page.html',
  styleUrls: ['./instructions.page.scss'],
})
export class InstructionsPage implements OnInit {

  constructor(private router: Router ) { }

  ngOnInit() {
  }

  search() {
    this.router.navigate(['./setup/searching']);
  }
}
