import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notallowed',
  templateUrl: './notallowed.component.html',
  styleUrls: ['./notallowed.component.css']
})
export class NotallowedComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const root = document.documentElement;
    const eyef = document.getElementById('eyef');
    let cx = eyef?.getAttribute("cx");
    let cy = eyef?.getAttribute("cy");

    document.addEventListener("mousemove", evt => {
      let x = evt.clientX / innerWidth;
      let y = evt.clientY / innerHeight;

      root.style.setProperty("--mouse-x", x.toString());
      root.style.setProperty("--mouse-y", y.toString());

      cx = (115 + 30 * x).toString();
      cy = (50 + 30 * y).toString();
      eyef?.setAttribute("cx", cx);
      eyef?.setAttribute("cy", cy);
    });

    document.addEventListener("touchmove", touchHandler => {
      let x = touchHandler.touches[0].clientX / innerWidth;
      let y = touchHandler.touches[0].clientY / innerHeight;

      root.style.setProperty("--mouse-x", x.toString());
      root.style.setProperty("--mouse-y", y.toString());
    });
  }
}
