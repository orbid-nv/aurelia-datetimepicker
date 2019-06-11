import { autoinject, bindable, bindingMode } from "aurelia-framework";
import * as Flatpickr from "flatpickr";
import { Instance } from "flatpickr/dist/types/instance";

@autoinject()
export class OrDatetimepicker {
  public flatpickr: any = (<any>Flatpickr).default || Flatpickr;
  public flatpickrInstance: Instance;
  public flatpickerElement: HTMLElement;
  @bindable config: any = {};
  public _config: any;
  @bindable
  placeholder: any;

  constructor(public element: Element) {}

  // private attached() {
  //   this.flatpickrElement = new this.flatpickr(
  //     this.element.querySelector(".aurelia-flatpickr"),
  //     {}
  //   );
  // }
  private attached() {
    this.flatpickrInstance = this.flatpickr(this.flatpickerElement, {});
    this.flatpickrInstance.setDate(new Date("05/05/2018"));
  }

  //--- GENERATED CODE ---
  public allowInput: boolean;
  public altFormat: string;
  public altInput: boolean;
  public altInputClass: string;
  public animate: boolean;
  public ariaDateFormat: string;
  public clickOpens: boolean;
  public closeOnSelect: boolean;
  public conjunction: string;
  public dateFormat: string;
  public defaultHour: number;
  public defaultMinute: number;
  public defaultSeconds: number;
  public disableMobile: boolean;
  public enableSeconds: boolean;
  public enableTime: boolean;
  public hourIncrement: number;
  public inline: boolean;
  public maxDate: Date;
  public maxTime: Date;
  public minDate: Date;
  public minTime: Date;
  public minuteIncrement: number;
  public nextArrow: string;
  public noCalendar: boolean;
  public now: Date;
  public prevArrow: string;
  public shorthandCurrentMonth: boolean;
  public showMonths: number;
  public static: boolean;
  public time_24hr: boolean;
  public weekNumbers: boolean;
  public wrap: boolean;
  //--- END GENERATED CODE ---
}
