import { animation, style, animate, trigger, transition } from '@angular/animations';

export const opacityUpDownAnimation = trigger('opacityUpDownAnimation', [
  transition(':enter', [
    style({ 
      top: -48,
      opacity: 0 
    }),
    animate('500ms', style({ opacity: 1, top: 0})),
  ]),
  transition(':leave', [
    animate('500ms', style({ opacity: 0, top: 48, }))
  ])
])