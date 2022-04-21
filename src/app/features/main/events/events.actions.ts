export class ListEvents {
  static readonly type = '[Events] ListEvents';
  constructor(
    public params: any
  ) { }
}


export class ParticipateEvent {
  static readonly type = '[Events] ParticipateEvent';
  constructor(
    public eventId: number
  ) { }
}

export class BookmarkEvent {
  static readonly type = '[Events] BookmarkEvent';
  constructor(
    public eventId: number
  ) { }
}

export class ClearEvents {
  static readonly type = '[Events] ClearEvents';
}