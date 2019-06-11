import {
  autoinject,
  bindable,
  bindingMode,
  BindingEngine,
  ICollectionObserverSplice,
  Disposable
} from "aurelia-framework";
import * as Flatpickr from "flatpickr";
import { Instance } from "flatpickr/dist/types/instance";

@autoinject()
export class OrDatetimepicker {
  public flatpickr: any = (Flatpickr as any).default || Flatpickr;
  public flatpickrInstance: Instance;
  public flatpickerElement: HTMLElement;
  @bindable public config: any = {};
  public _config: any;
  @bindable
  public placeholder: any;
  public selectedDatesSubscription: Disposable;
  private attached() {
	this.flatpickrInstance = this.flatpickr(this.flatpickerElement, {});
	// this.flatpickrInstance.setDate(new Date("05/05/2018"));
	this.flatpickrInstance.config.onChange.push(
		(selectedDates: Date[], dateStr: string, instance: Instance) => {
		switch (instance.config.mode) {
			case "multiple":
			case "range":
			this.oValues = selectedDates;
			break;
			case "single":
			case "time": {
			if (selectedDates != null && selectedDates.length > 0)
				this.oValue = selectedDates[0];
			else this.oValue = null;
			break;
			}
		}
		}
	);
	this.initialiseProperties();
	if (this.oValue) {
		this.flatpickrInstance.setDate(this.oValue);
	} else if (this.oValues) {
		this.flatpickrInstance.setDate(this.oValues);
	}
  }
  constructor(private bindingEngine: BindingEngine) {}
  private collectionChanged(
	splices: Array<ICollectionObserverSplice<string | Date>>
  ) {
	this.flatpickrInstance.setDate(this.oValues);
  }
  private detached() {
	this.flatpickrInstance.config.onChange.length = 0;
	if (this.selectedDatesSubscription) {
		this.selectedDatesSubscription.dispose();
	}
  }
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public oValue: Date;

  private oValueChanged(newValue, oldValue) {
	if (!this.flatpickrInstance) {
		return;
	}

	this.flatpickrInstance.setDate(this.oValue);
  }
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public oValues: Date[];

  private oValuesChanged(newValue, oldValue) {
	if (!this.flatpickrInstance) {
		return;
	}
	if (this.selectedDatesSubscription) {
		this.selectedDatesSubscription.dispose();
	}
	this.selectedDatesSubscription = this.bindingEngine
		.collectionObserver(this.oValues)
		.subscribe(this.collectionChanged.bind(this));
	this.flatpickrInstance.setDate(this.oValues);
  }
  //--- GENERATED CODE ---
  @bindable()
  public oAllowInput: boolean;
  private oAllowInputChanged(newValue, oldValue) {
	if (!this.flatpickrInstance) {
		return;
	}
	this.flatpickrInstance.set("allowInput", this.oAllowInput);
  }
  @bindable()
  public oAltFormat: string;
  private oAltFormatChanged(newValue, oldValue) {
	if (!this.flatpickrInstance) {
		return;
	}
	this.flatpickrInstance.set("altFormat", this.oAltFormat);
  }
  @bindable()
  public oAltInput: boolean;
  private oAltInputChanged(newValue, oldValue) {
	if (!this.flatpickrInstance) {
		return;
	}
	this.flatpickrInstance.set("altInput", this.oAltInput);
  }
  @bindable()
  public oAltInputClass: string;
  private oAltInputClassChanged(newValue, oldValue) {
	if (!this.flatpickrInstance) {
		return;
	}
	this.flatpickrInstance.set("altInputClass", this.oAltInputClass);
  }
  @bindable()
  public oAnimate: boolean;
  private oAnimateChanged(newValue, oldValue) {
	if (!this.flatpickrInstance) {
		return;
	}
	this.flatpickrInstance.set("animate", this.oAnimate);
  }
  @bindable()
  public oAriaDateFormat: string;
  private oAriaDateFormatChanged(newValue, oldValue) {
	if (!this.flatpickrInstance) {
		return;
	}
	this.flatpickrInstance.set("ariaDateFormat", this.oAriaDateFormat);
  }
  @bindable()
  public oClickOpens: boolean;
  private oClickOpensChanged(newValue, oldValue) {
	if (!this.flatpickrInstance) {
		return;
	}
	this.flatpickrInstance.set("clickOpens", this.oClickOpens);
  }
  @bindable()
  public oCloseOnSelect: boolean;
  private oCloseOnSelectChanged(newValue, oldValue) {
	if (!this.flatpickrInstance) {
		return;
	}
	this.flatpickrInstance.set("closeOnSelect", this.oCloseOnSelect);
  }
  @bindable()
  public oConjunction: string;
  private oConjunctionChanged(newValue, oldValue) {
	if (!this.flatpickrInstance) {
		return;
	}
	this.flatpickrInstance.set("conjunction", this.oConjunction);
  }
  @bindable()
  public oDateFormat: string;
  private oDateFormatChanged(newValue, oldValue) {
	if (!this.flatpickrInstance) {
		return;
	}
	this.flatpickrInstance.set("dateFormat", this.oDateFormat);
  }
  @bindable()
  public oDefaultDate: "undefined" | "undefined";
  private oDefaultDateChanged(newValue, oldValue) {
	if (!this.flatpickrInstance) {
		return;
	}
	this.flatpickrInstance.set("defaultDate", this.oDefaultDate);
  }
  @bindable()
  public oDefaultHour: number;
  private oDefaultHourChanged(newValue, oldValue) {
	if (!this.flatpickrInstance) {
		return;
	}
	this.flatpickrInstance.set("defaultHour", this.oDefaultHour);
  }
  @bindable()
  public oDefaultMinute: number;
  private oDefaultMinuteChanged(newValue, oldValue) {
	if (!this.flatpickrInstance) {
		return;
	}
	this.flatpickrInstance.set("defaultMinute", this.oDefaultMinute);
  }
  @bindable()
  public oDefaultSeconds: number;
  private oDefaultSecondsChanged(newValue, oldValue) {
	if (!this.flatpickrInstance) {
		return;
	}
	this.flatpickrInstance.set("defaultSeconds", this.oDefaultSeconds);
  }
  @bindable()
  public oDisableMobile: boolean;
  private oDisableMobileChanged(newValue, oldValue) {
	if (!this.flatpickrInstance) {
		return;
	}
	this.flatpickrInstance.set("disableMobile", this.oDisableMobile);
  }
  @bindable()
  public oEnableSeconds: boolean;
  private oEnableSecondsChanged(newValue, oldValue) {
	if (!this.flatpickrInstance) {
		return;
	}
	this.flatpickrInstance.set("enableSeconds", this.oEnableSeconds);
  }
  @bindable()
  public oEnableTime: boolean;
  private oEnableTimeChanged(newValue, oldValue) {
	if (!this.flatpickrInstance) {
		return;
	}
	this.flatpickrInstance.set("enableTime", this.oEnableTime);
  }
  @bindable()
  public oHourIncrement: number;
  private oHourIncrementChanged(newValue, oldValue) {
	if (!this.flatpickrInstance) {
		return;
	}
	this.flatpickrInstance.set("hourIncrement", this.oHourIncrement);
  }
  @bindable()
  public oInline: boolean;
  private oInlineChanged(newValue, oldValue) {
	if (!this.flatpickrInstance) {
		return;
	}
	this.flatpickrInstance.set("inline", this.oInline);
  }
  @bindable()
  public oLocale: "undefined" | "undefined";
  private oLocaleChanged(newValue, oldValue) {
	if (!this.flatpickrInstance) {
		return;
	}
	this.flatpickrInstance.set("locale", this.oLocale);
  }
  @bindable()
  public oMaxDate: Date;
  private oMaxDateChanged(newValue, oldValue) {
	if (!this.flatpickrInstance) {
		return;
	}
	this.flatpickrInstance.set("maxDate", this.oMaxDate);
  }
  @bindable()
  public oMaxTime: Date;
  private oMaxTimeChanged(newValue, oldValue) {
	if (!this.flatpickrInstance) {
		return;
	}
	this.flatpickrInstance.set("maxTime", this.oMaxTime);
  }
  @bindable()
  public oMinDate: Date;
  private oMinDateChanged(newValue, oldValue) {
	if (!this.flatpickrInstance) {
		return;
	}
	this.flatpickrInstance.set("minDate", this.oMinDate);
  }
  @bindable()
  public oMinTime: Date;
  private oMinTimeChanged(newValue, oldValue) {
	if (!this.flatpickrInstance) {
		return;
	}
	this.flatpickrInstance.set("minTime", this.oMinTime);
  }
  @bindable()
  public oMinuteIncrement: number;
  private oMinuteIncrementChanged(newValue, oldValue) {
	if (!this.flatpickrInstance) {
		return;
	}
	this.flatpickrInstance.set("minuteIncrement", this.oMinuteIncrement);
  }
  @bindable()
  public oMode: "single" | "multiple" | "range" | "time";
  private oModeChanged(newValue, oldValue) {
	if (!this.flatpickrInstance) {
		return;
	}
	this.flatpickrInstance.set("mode", this.oMode);
  }
  @bindable()
  public oNextArrow: string;
  private oNextArrowChanged(newValue, oldValue) {
	if (!this.flatpickrInstance) {
		return;
	}
	this.flatpickrInstance.set("nextArrow", this.oNextArrow);
  }
  @bindable()
  public oNoCalendar: boolean;
  private oNoCalendarChanged(newValue, oldValue) {
	if (!this.flatpickrInstance) {
		return;
	}
	this.flatpickrInstance.set("noCalendar", this.oNoCalendar);
  }
  @bindable()
  public oNow: Date;
  private oNowChanged(newValue, oldValue) {
	if (!this.flatpickrInstance) {
		return;
	}
	this.flatpickrInstance.set("now", this.oNow);
  }
  @bindable()
  public oPosition: "auto" | "above" | "below";
  private oPositionChanged(newValue, oldValue) {
	if (!this.flatpickrInstance) {
		return;
	}
	this.flatpickrInstance.set("position", this.oPosition);
  }
  @bindable()
  public oPrevArrow: string;
  private oPrevArrowChanged(newValue, oldValue) {
	if (!this.flatpickrInstance) {
		return;
	}
	this.flatpickrInstance.set("prevArrow", this.oPrevArrow);
  }
  @bindable()
  public oShorthandCurrentMonth: boolean;
  private oShorthandCurrentMonthChanged(newValue, oldValue) {
	if (!this.flatpickrInstance) {
		return;
	}
	this.flatpickrInstance.set(
		"shorthandCurrentMonth",
		this.oShorthandCurrentMonth
	);
  }
  @bindable()
  public oShowMonths: number;
  private oShowMonthsChanged(newValue, oldValue) {
	if (!this.flatpickrInstance) {
		return;
	}
	this.flatpickrInstance.set("showMonths", this.oShowMonths);
  }
  @bindable()
  public oStatic: boolean;
  private oStaticChanged(newValue, oldValue) {
	if (!this.flatpickrInstance) {
		return;
	}
	this.flatpickrInstance.set("static", this.oStatic);
  }
  @bindable()
  public oTime_24hr: boolean;
  private oTime_24hrChanged(newValue, oldValue) {
	if (!this.flatpickrInstance) {
		return;
	}
	this.flatpickrInstance.set("time_24hr", this.oTime_24hr);
  }
  @bindable()
  public oWeekNumbers: boolean;
  private oWeekNumbersChanged(newValue, oldValue) {
	if (!this.flatpickrInstance) {
		return;
	}
	this.flatpickrInstance.set("weekNumbers", this.oWeekNumbers);
  }
  @bindable()
  public oWrap: boolean;
  private oWrapChanged(newValue, oldValue) {
	if (!this.flatpickrInstance) {
		return;
	}
	this.flatpickrInstance.set("wrap", this.oWrap);
  }
  private initialiseProperties() {
	if (this.oAllowInput) {
		this.flatpickrInstance.set("allowInput", this.oAllowInput);
	}
	if (this.oAltFormat) {
		this.flatpickrInstance.set("altFormat", this.oAltFormat);
	}
	if (this.oAltInput) {
		this.flatpickrInstance.set("altInput", this.oAltInput);
	}
	if (this.oAltInputClass) {
		this.flatpickrInstance.set("altInputClass", this.oAltInputClass);
	}
	if (this.oAnimate) {
		this.flatpickrInstance.set("animate", this.oAnimate);
	}
	if (this.oAriaDateFormat) {
		this.flatpickrInstance.set("ariaDateFormat", this.oAriaDateFormat);
	}
	if (this.oClickOpens) {
		this.flatpickrInstance.set("clickOpens", this.oClickOpens);
	}
	if (this.oCloseOnSelect) {
		this.flatpickrInstance.set("closeOnSelect", this.oCloseOnSelect);
	}
	if (this.oConjunction) {
		this.flatpickrInstance.set("conjunction", this.oConjunction);
	}
	if (this.oDateFormat) {
		this.flatpickrInstance.set("dateFormat", this.oDateFormat);
	}
	if (this.oDefaultDate) {
		this.flatpickrInstance.set("defaultDate", this.oDefaultDate);
	}
	if (this.oDefaultHour) {
		this.flatpickrInstance.set("defaultHour", this.oDefaultHour);
	}
	if (this.oDefaultMinute) {
		this.flatpickrInstance.set("defaultMinute", this.oDefaultMinute);
	}
	if (this.oDefaultSeconds) {
		this.flatpickrInstance.set("defaultSeconds", this.oDefaultSeconds);
	}
	if (this.oDisableMobile) {
		this.flatpickrInstance.set("disableMobile", this.oDisableMobile);
	}
	if (this.oEnableSeconds) {
		this.flatpickrInstance.set("enableSeconds", this.oEnableSeconds);
	}
	if (this.oEnableTime) {
		this.flatpickrInstance.set("enableTime", this.oEnableTime);
	}
	if (this.oHourIncrement) {
		this.flatpickrInstance.set("hourIncrement", this.oHourIncrement);
	}
	if (this.oInline) {
		this.flatpickrInstance.set("inline", this.oInline);
	}
	if (this.oLocale) {
		this.flatpickrInstance.set("locale", this.oLocale);
	}
	if (this.oMaxDate) {
		this.flatpickrInstance.set("maxDate", this.oMaxDate);
	}
	if (this.oMaxTime) {
		this.flatpickrInstance.set("maxTime", this.oMaxTime);
	}
	if (this.oMinDate) {
		this.flatpickrInstance.set("minDate", this.oMinDate);
	}
	if (this.oMinTime) {
		this.flatpickrInstance.set("minTime", this.oMinTime);
	}
	if (this.oMinuteIncrement) {
		this.flatpickrInstance.set("minuteIncrement", this.oMinuteIncrement);
	}
	if (this.oMode) {
		this.flatpickrInstance.set("mode", this.oMode);
	}
	if (this.oNextArrow) {
		this.flatpickrInstance.set("nextArrow", this.oNextArrow);
	}
	if (this.oNoCalendar) {
		this.flatpickrInstance.set("noCalendar", this.oNoCalendar);
	}
	if (this.oNow) {
		this.flatpickrInstance.set("now", this.oNow);
	}
	if (this.oPosition) {
		this.flatpickrInstance.set("position", this.oPosition);
	}
	if (this.oPrevArrow) {
		this.flatpickrInstance.set("prevArrow", this.oPrevArrow);
	}
	if (this.oShorthandCurrentMonth) {
		this.flatpickrInstance.set(
		"shorthandCurrentMonth",
		this.oShorthandCurrentMonth
		);
	}
	if (this.oShowMonths) {
		this.flatpickrInstance.set("showMonths", this.oShowMonths);
	}
	if (this.oStatic) {
		this.flatpickrInstance.set("static", this.oStatic);
	}
	if (this.oTime_24hr) {
		this.flatpickrInstance.set("time_24hr", this.oTime_24hr);
	}
	if (this.oWeekNumbers) {
		this.flatpickrInstance.set("weekNumbers", this.oWeekNumbers);
	}
	if (this.oWrap) {
		this.flatpickrInstance.set("wrap", this.oWrap);
	}
  }
  //--- END GENERATED CODE ---
}
