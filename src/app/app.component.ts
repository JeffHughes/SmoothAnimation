import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
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
  @ViewChild('lines', { static: false }) lines!: ElementRef;

  constructor(
    public elem: ElementRef,
    public renderer: Renderer2,
    public zone: NgZone
  ) {}

  path: any[] = [];

  ngAfterViewInit(): void {
    this.renderer.setStyle(this.point.nativeElement, 'background-color', 'red');
    this.renderer.setStyle(this.point.nativeElement, 'top', '100px');
    this.renderer.setStyle(this.point.nativeElement, 'left', '100px');

    for (let i = 0; i < 100; i++) {
      this.path.push({
        x: i + 20,
        y: Math.sin(i / 10) * 100 + 100 + 20,

        // x: this.randomNumber(),
      });
    }

    let counter = 0;
    let travel = 20; 
    setInterval(() => {
      let p = this.path[counter++];
      console.log(p.y.toFixed(0));

      //  this. zone.run(() => {
      this.renderer.setStyle(
        this.point.nativeElement,
        'background-color',
        'blue'
      );

      this.renderer.setStyle(
        this.point.nativeElement,
        'top',
        p.y.toFixed(1) + 'px'
      );

      this.renderer.setStyle(
        this.point.nativeElement,
        'transition',
         'move ' + (travel / 1000) + 's linear' 
      );
 
      this.renderer.setStyle(this.point.nativeElement, 'left', p.x + 'px');
      if (counter == this.path.length) counter = 0;
      // });
    }, travel);

    for (let index = 0; index < this.path.length - 1; index++) {
      const element = this.path[index];
      const element2 = this.path[index + 1];

      this.linedraw(element.x, element.y, element2.x, element2.y);
    }
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
    var calc = Math.atan((bx - ax) / (ay - by));
    calc = (calc * 180) / Math.PI;
    var length = Math.sqrt((ax - bx) * (ax - bx) + (ay - by) * (ay - by));

    const div = this.renderer.createElement('div');
    this.renderer.setStyle(div, 'width', '1px');
    this.renderer.setStyle(div, 'height', length + 'px');
    this.renderer.setStyle(div, 'background-color',  'black');
    this.renderer.setStyle(div, 'position',   'absolute');
    this.renderer.setStyle(div, 'top', ay.toFixed(1) + 'px');
    this.renderer.setStyle(div, 'left', ax.toFixed(1) + 'px');
    this.renderer.setStyle(div, 'transform', 'rotate(' + calc  + 'deg)');
    this.renderer.setStyle(div, 'transform-origin', '0% 0%');

    this.renderer.appendChild(this.lines.nativeElement, div); 
  }
}
