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
public Allowinput:boolean;
public Altformat:string;
public Altinput:boolean;
public Altinputclass:string;
public Animate:boolean;
public Ariadateformat:string;
public Clickopens:boolean;
public Closeonselect:boolean;
public Conjunction:string;
public Dateformat:string;
public Defaulthour:number;
public Defaultminute:number;
public Defaultseconds:number;
public Disablemobile:boolean;
public Enableseconds:boolean;
public Enabletime:boolean;
public Hourincrement:number;
public Inline:boolean;
public Maxdate:Date;
public Maxtime:Date;
public Mindate:Date;
public Mintime:Date;
public Minuteincrement:number;
public Nextarrow:string;
public Nocalendar:boolean;
public Now:Date;
public Prevarrow:string;
public Shorthandcurrentmonth:boolean;
public Showmonths:number;
public Static:boolean;
public Time24hr:boolean;
public Weeknumbers:boolean;
public Wrap:boolean;
//--- END GENERATED CODE ---
}
