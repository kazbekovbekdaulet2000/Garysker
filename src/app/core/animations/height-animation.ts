import { animation, style, animate, trigger, transition } from '@angular/animations';

export const heightAnimation = trigger('heightAnimation', [
  transition(':enter', [
    style({ 
      height: 0, 
      opacity: 0
    }),
    animate('300ms', style({ 
      height: "*",
      opacity: 1
    })),
  ]),
  transition(':leave', [
    animate('300ms', style({ 
      height: 0,
      opacity: 0
    }))
  ])
])