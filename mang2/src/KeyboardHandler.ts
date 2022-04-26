class KeyboardHandler {
  private activeKey: string | null;

  constructor() {
    this.activeKey = null;
    document.addEventListener('keydown', e => this.keyDownListener(e));
  }

  getActiveKey(): string | null {
    return this.activeKey;
  }

  checkIfOppositeKey(newKey: string): boolean {
    return (this.activeKey === "w" && newKey === "s") 
      || (this.activeKey === "s" && newKey === "w") 
      || (this.activeKey === "a" && newKey === "d") 
      || (this.activeKey === "d" && newKey === "a");
  }

  keyDownListener(event: KeyboardEvent) {
    if (event.key === "w" || event.key === "s" || event.key === "a" || event.key === "d") {
      if (!this.checkIfOppositeKey(event.key)) {
        this.activeKey = event.key;
      }
    }
  }
}

export default KeyboardHandler;
