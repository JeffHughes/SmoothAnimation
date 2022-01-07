import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'SmoothAnimation';

  @ViewChild('point', { static: false }) point!: ElementRef;

  constructor(public elem: ElementRef, public renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.renderer.setStyle(this.point.nativeElement, 'background-color', 'red');
    this.renderer.setStyle(this.point.nativeElement, 'top', '100px');
    this.renderer.setStyle(this.point.nativeElement, 'left', '100px');

    let path: any[] = [];
    for (let i = 0; i < 100; i++) {
      path.push({
        x: i,
        // x: this.randomNumber(),
        y: Math.sin(i / 10) * 100 + 100,
      });
    }

    for (let index = 0; index <= path.length; index++) {
      const element = path[index];
      const element2 = path[index + 1];

      this.linedraw(element.x, element.y, element2.x, element2.y);
    }

    // let counter = 0; // spot is the position of the point
    // setInterval(() => {
    //   this.renderer.setStyle(
    //     this.point.nativeElement,
    //     'top',
    //     path[counter].y + 'px'
    //   );
    //   this.renderer.setStyle(
    //     this.point.nativeElement,
    //     'left',
    //     path[counter++].x + 'px'
    //   );
    // }, 500);
  }
  randomNumber = () => Math.floor(Math.random() * 500);

  linedraw(ax: any, ay: any, bx: any, by: any) {
    if (ay > by) {
      bx = ax + bx;
      ax = bx - ax;
      bx = bx - ax;
      by = ay + by;
      ay = by - ay;
      by = by - ay;
    }
    var calc = Math.atan((ay - by) / (bx - ax));
    calc = (calc * 180) / Math.PI;
    var length = Math.sqrt((ax - bx) * (ax - bx) + (ay - by) * (ay - by));
    document.body.innerHTML +=
      "<div id='line' style='height:" +
      length +
      'px;width:1px;background-color:black;position:absolute;top:' +
      ay +
      'px;left:' +
      ax +
      'px;transform:rotate(' +
      calc +
      'deg);-ms-transform:rotate(' +
      calc +
      'deg);transform-origin:0% 0%;-moz-transform:rotate(' +
      calc +
      'deg);-moz-transform-origin:0% 0%;-webkit-transform:rotate(' +
      calc +
      'deg);-webkit-transform-origin:0% 0%;-o-transform:rotate(' +
      calc +
      "deg);-o-transform-origin:0% 0%;'></div>";
  }
}
