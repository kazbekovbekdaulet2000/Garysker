import { animation, style, animate, trigger, transition, state } from '@angular/animations';

export const expandAnimation = trigger('expandAnimation', [
  state('in', style({
    height: '*',
  })),
  state('out', style({
    opacity: '0',
    height: '0px',
  })),
  transition('in => out', animate('300ms ease-in-out')),
  transition('out => in', animate('300ms ease-in-out'))
])