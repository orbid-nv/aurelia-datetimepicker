export class UpcaseValueConverter {
  toView(value: any): string {
    return typeof value === 'string' ? value.toUpperCase() : '';
  }
}
