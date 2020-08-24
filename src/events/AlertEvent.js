export default class AlertEvent extends CustomEvent {
    static EVENT = 'app:alert';
  
    constructor(options) {
      super(AlertEvent.EVENT, { detail: options });
    }
  }