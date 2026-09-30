import { Component, inject, input, signal } from '@angular/core';

@Component({
  selector: 'app-panel',
  template: `
    <section class="panel" [style.margin-left.rem]="level">
      <button type="button" class="panel-title" (click)="open.update(o => !o)">
        {{ open() ? '▾' : '▸' }} {{ title() }} (niveau {{ level }})
      </button>
      @if (open()) {
        <div class="panel-body"><ng-content /></div>
      }
    </section>
  `,
  styles: `
    .panel { border-left: 2px solid #ccc; padding-left: 0.5rem; margin-block: 0.5rem; }
    .panel-title { background: none; border: none; font-weight: 600; cursor: pointer; }
  `,
})
export class Panel {
    readonly title = input.required<string>()
    protected readonly open = signal(true);


    // le panneau qui "me" contient
    private readonly parent = inject(Panel, { optional: true, skipSelf: true});
    readonly level: number = this.parent ? this.parent.level + 1 : 0;
}