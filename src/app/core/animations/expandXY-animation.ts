import { animation, style, animate, trigger, transition, state } from '@angular/animations';

export const expandXYAnimation = trigger('expandXYAnimation', [
  transition(':enter', [
    style({ width: 0, height: 0, top: 48, opacity: 0 }),
    animate('200ms', style({ width: "*", height: "*", opacity: 1 })),
  ]),
  transition(':leave', [
    animate('200ms', style({ opacity: 0 }))
  ])
])