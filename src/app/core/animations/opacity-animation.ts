import { animation, style, animate, trigger, transition } from '@angular/animations';

export const opacityAnimation = trigger('opacityAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('200ms', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    animate('200ms', style({ opacity: 0 }))
  ])
])