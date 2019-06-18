import {
	autoinject,
	bindable,
	bindingMode,
	BindingEngine,
	ICollectionObserverSplice,
	Disposable,
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
		let self = this;
		this.flatpickrInstance = this.flatpickr(
			this.flatpickerElement,
			this.initialiseProperties(),
		);
		this.flatpickrInstance.config.onChange.push(
			(selectedDates: Date[], dateStr: string, instance: Instance) => {
				switch (instance.config.mode) {
					case "multiple":
					case "range":
						self.oValues = selectedDates;
						break;
					case "single":
					case "time": {
						if (selectedDates != null && selectedDates.length > 0)
							self.oValue = selectedDates[0];
						else self.oValue = null;
						break;
					}
				}
			},
		);
		if (this.oValue) {
			this.flatpickrInstance.setDate(this.oValue);
		} else if (this.oValues) {
			this.flatpickrInstance.setDate(this.oValues);
		}
		// if (this.oDisable) {
		// 	if (this.oDisable instanceof Array) {
		// 		this.oDisableSubscription = this.bindingEngine
		// 			.collectionObserver(this.oDisable)
		// 			.subscribe(this.oDisbleCollectionChanged.bind(this));
		// 	}
		// 	this.flatpickrInstance.set("disable", this.oDisable);
		// }
	}
	constructor(private bindingEngine: BindingEngine) {}
	private collectionChanged(
		splices: Array<ICollectionObserverSplice<string | Date>>,
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
		if (this.selectedDatesSubscription) {
			this.selectedDatesSubscription.dispose();
		}
		this.selectedDatesSubscription = this.bindingEngine
			.collectionObserver(this.oValues)
			.subscribe(this.collectionChanged.bind(this));
		if (!this.flatpickrInstance) {
			return;
		}
		this.flatpickrInstance.setDate(this.oValues);
	}
	// @bindable()
	// public oDisable: any[];
	// public oDisableSubscription: Disposable;
	// private oDisableChanged(newValue, oldValue) {
	// 	if (!this.flatpickrInstance) {
	// 		return;
	// 	}
	// 	if (this.selectedDatesSubscription) {
	// 		this.selectedDatesSubscription.dispose();
	// 	}
	// 	if (this.oDisable instanceof Array) {
	// 		this.oDisableSubscription = this.bindingEngine
	// 			.collectionObserver(this.oDisable)
	// 			.subscribe(this.oDisbleCollectionChanged.bind(this));
	// 	}

	// 	this.flatpickrInstance.set("disable", this.oDisable);
	// }
	// private oDisbleCollectionChanged(
	// 	splices: Array<ICollectionObserverSplice<any>>
	// ) {
	// 	this.flatpickrInstance.set("disable", this.oDisable);
	// }
	//--- GENERATED CODE ---
	@bindable()
	public oAllowInput: boolean;
	private oAllowInputChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		this.flatpickrInstance.set("allowInput", this.oAllowInput);
		this.flatpickrInstance.destroy();
		this.attached();
	}
	@bindable()
	public oAltFormat: string;
	private oAltFormatChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		this.flatpickrInstance.set("altFormat", this.oAltFormat);
		this.flatpickrInstance.destroy();
		this.attached();
	}
	@bindable()
	public oAltInput: boolean;
	private oAltInputChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		this.flatpickrInstance.set("altInput", this.oAltInput);
		this.flatpickrInstance.destroy();
		this.attached();
	}
	@bindable()
	public oAltInputClass: string;
	private oAltInputClassChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		this.flatpickrInstance.set("altInputClass", this.oAltInputClass);
		this.flatpickrInstance.destroy();
		this.attached();
	}
	@bindable()
	public oAnimate: boolean;
	private oAnimateChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		this.flatpickrInstance.set("animate", this.oAnimate);
		this.flatpickrInstance.destroy();
		this.attached();
	}
	@bindable()
	public oAriaDateFormat: string;
	private oAriaDateFormatChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		this.flatpickrInstance.set("ariaDateFormat", this.oAriaDateFormat);
		this.flatpickrInstance.destroy();
		this.attached();
	}
	@bindable()
	public oClickOpens: boolean;
	private oClickOpensChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		this.flatpickrInstance.set("clickOpens", this.oClickOpens);
		this.flatpickrInstance.destroy();
		this.attached();
	}
	@bindable()
	public oCloseOnSelect: boolean;
	private oCloseOnSelectChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		this.flatpickrInstance.set("closeOnSelect", this.oCloseOnSelect);
		this.flatpickrInstance.destroy();
		this.attached();
	}
	@bindable()
	public oConjunction: string;
	private oConjunctionChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		this.flatpickrInstance.set("conjunction", this.oConjunction);
		this.flatpickrInstance.destroy();
		this.attached();
	}
	@bindable()
	public oDateFormat: string;
	private oDateFormatChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		this.flatpickrInstance.set("dateFormat", this.oDateFormat);
		this.flatpickrInstance.destroy();
		this.attached();
	}
	@bindable()
	public oDefaultDate: "undefined" | "undefined";
	private oDefaultDateChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		this.flatpickrInstance.set("defaultDate", this.oDefaultDate);
		this.flatpickrInstance.destroy();
		this.attached();
	}
	@bindable()
	public oDefaultHour: number;
	private oDefaultHourChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		this.flatpickrInstance.set("defaultHour", this.oDefaultHour);
		this.flatpickrInstance.destroy();
		this.attached();
	}
	@bindable()
	public oDefaultMinute: number;
	private oDefaultMinuteChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		this.flatpickrInstance.set("defaultMinute", this.oDefaultMinute);
		this.flatpickrInstance.destroy();
		this.attached();
	}
	@bindable()
	public oDefaultSeconds: number;
	private oDefaultSecondsChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		this.flatpickrInstance.set("defaultSeconds", this.oDefaultSeconds);
		this.flatpickrInstance.destroy();
		this.attached();
	}
	@bindable()
	public oDisableMobile: boolean;
	private oDisableMobileChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		this.flatpickrInstance.set("disableMobile", this.oDisableMobile);
		this.flatpickrInstance.destroy();
		this.attached();
	}
	@bindable()
	public oEnableSeconds: boolean;
	private oEnableSecondsChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		this.flatpickrInstance.set("enableSeconds", this.oEnableSeconds);
		this.flatpickrInstance.destroy();
		this.attached();
	}
	@bindable()
	public oEnableTime: boolean;
	private oEnableTimeChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		this.flatpickrInstance.set("enableTime", this.oEnableTime);
		this.flatpickrInstance.destroy();
		this.attached();
	}
	@bindable()
	public oHourIncrement: number;
	private oHourIncrementChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		this.flatpickrInstance.set("hourIncrement", this.oHourIncrement);
		this.flatpickrInstance.destroy();
		this.attached();
	}
	@bindable()
	public oInline: boolean;
	private oInlineChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		this.flatpickrInstance.set("inline", this.oInline);
		this.flatpickrInstance.destroy();
		this.attached();
	}
	@bindable()
	public oLocale: "undefined" | "undefined";
	private oLocaleChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		this.flatpickrInstance.set("locale", this.oLocale);
		this.flatpickrInstance.destroy();
		this.attached();
	}
	@bindable()
	public oMaxDate: Date;
	private oMaxDateChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		this.flatpickrInstance.set("maxDate", this.oMaxDate);
		this.flatpickrInstance.destroy();
		this.attached();
	}
	@bindable()
	public oMaxTime: Date;
	private oMaxTimeChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		this.flatpickrInstance.set("maxTime", this.oMaxTime);
		this.flatpickrInstance.destroy();
		this.attached();
	}
	@bindable()
	public oMinDate: Date;
	private oMinDateChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		this.flatpickrInstance.set("minDate", this.oMinDate);
		this.flatpickrInstance.destroy();
		this.attached();
	}
	@bindable()
	public oMinTime: Date;
	private oMinTimeChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		this.flatpickrInstance.set("minTime", this.oMinTime);
		this.flatpickrInstance.destroy();
		this.attached();
	}
	@bindable()
	public oMinuteIncrement: number;
	private oMinuteIncrementChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		this.flatpickrInstance.set("minuteIncrement", this.oMinuteIncrement);
		this.flatpickrInstance.destroy();
		this.attached();
	}
	@bindable()
	public oMode: "single" | "multiple" | "range" | "time";
	private oModeChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		this.flatpickrInstance.set("mode", this.oMode);
		this.flatpickrInstance.destroy();
		this.attached();
	}
	@bindable()
	public oNextArrow: string;
	private oNextArrowChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		this.flatpickrInstance.set("nextArrow", this.oNextArrow);
		this.flatpickrInstance.destroy();
		this.attached();
	}
	@bindable()
	public oNoCalendar: boolean;
	private oNoCalendarChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		this.flatpickrInstance.set("noCalendar", this.oNoCalendar);
		this.flatpickrInstance.destroy();
		this.attached();
	}
	@bindable()
	public oNow: Date;
	private oNowChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		this.flatpickrInstance.set("now", this.oNow);
		this.flatpickrInstance.destroy();
		this.attached();
	}
	@bindable()
	public oPosition: "auto" | "above" | "below";
	private oPositionChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		this.flatpickrInstance.set("position", this.oPosition);
		this.flatpickrInstance.destroy();
		this.attached();
	}
	@bindable()
	public oPrevArrow: string;
	private oPrevArrowChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		this.flatpickrInstance.set("prevArrow", this.oPrevArrow);
		this.flatpickrInstance.destroy();
		this.attached();
	}
	@bindable()
	public oShorthandCurrentMonth: boolean;
	private oShorthandCurrentMonthChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		this.flatpickrInstance.set(
			"shorthandCurrentMonth",
			this.oShorthandCurrentMonth,
		);
		this.flatpickrInstance.destroy();
		this.attached();
	}
	@bindable()
	public oShowMonths: number;
	private oShowMonthsChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		this.flatpickrInstance.set("showMonths", this.oShowMonths);
		this.flatpickrInstance.destroy();
		this.attached();
	}
	@bindable()
	public oStatic: boolean;
	private oStaticChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		this.flatpickrInstance.set("static", this.oStatic);
		this.flatpickrInstance.destroy();
		this.attached();
	}
	@bindable()
	public oTime_24hr: boolean;
	private oTime_24hrChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		this.flatpickrInstance.set("time_24hr", this.oTime_24hr);
		this.flatpickrInstance.destroy();
		this.attached();
	}
	@bindable()
	public oWeekNumbers: boolean;
	private oWeekNumbersChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		this.flatpickrInstance.set("weekNumbers", this.oWeekNumbers);
		this.flatpickrInstance.destroy();
		this.attached();
	}
	@bindable()
	public oWrap: boolean;
	private oWrapChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		this.flatpickrInstance.set("wrap", this.oWrap);
		this.flatpickrInstance.destroy();
		this.attached();
	}
	@bindable()
	public oDisable: any[];
	public oDisableSubscription: Disposable;
	private oDisableChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		if (this.oDisableSubscription) {
			this.oDisableSubscription.dispose();
		}
		if (this.oDisable instanceof Array) {
			this.oDisableSubscription = this.bindingEngine
				.collectionObserver(this.oDisable)
				.subscribe(this.oDisableCollectionChanged.bind(this));
		}

		this.flatpickrInstance.set("disable", this.oDisable);
	}
	private oDisableCollectionChanged(
		splices: Array<ICollectionObserverSplice<any>>,
	) {
		this.flatpickrInstance.set("disable", this.oDisable);
	}

	@bindable()
	public oEnable: any[];
	public oEnableSubscription: Disposable;
	private oEnableChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		if (this.oEnableSubscription) {
			this.oEnableSubscription.dispose();
		}
		if (this.oEnable instanceof Array) {
			this.oEnableSubscription = this.bindingEngine
				.collectionObserver(this.oEnable)
				.subscribe(this.oEnableCollectionChanged.bind(this));
		}

		this.flatpickrInstance.set("enable", this.oEnable);
	}
	private oEnableCollectionChanged(
		splices: Array<ICollectionObserverSplice<any>>,
	) {
		this.flatpickrInstance.set("enable", this.oEnable);
	}

	@bindable()
	public oIgnoredFocusElements: any[];
	public oIgnoredFocusElementsSubscription: Disposable;
	private oIgnoredFocusElementsChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		if (this.oIgnoredFocusElementsSubscription) {
			this.oIgnoredFocusElementsSubscription.dispose();
		}
		if (this.oIgnoredFocusElements instanceof Array) {
			this.oIgnoredFocusElementsSubscription = this.bindingEngine
				.collectionObserver(this.oIgnoredFocusElements)
				.subscribe(
					this.oIgnoredFocusElementsCollectionChanged.bind(this),
				);
		}

		this.flatpickrInstance.set(
			"ignoredFocusElements",
			this.oIgnoredFocusElements,
		);
	}
	private oIgnoredFocusElementsCollectionChanged(
		splices: Array<ICollectionObserverSplice<any>>,
	) {
		this.flatpickrInstance.set(
			"ignoredFocusElements",
			this.oIgnoredFocusElements,
		);
	}

	@bindable()
	public oOnChange: any[];
	public oOnChangeSubscription: Disposable;
	private oOnChangeChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		if (this.oOnChangeSubscription) {
			this.oOnChangeSubscription.dispose();
		}
		if (this.oOnChange instanceof Array) {
			this.oOnChangeSubscription = this.bindingEngine
				.collectionObserver(this.oOnChange)
				.subscribe(this.oOnChangeCollectionChanged.bind(this));
		}

		this.flatpickrInstance.set("onChange", this.oOnChange);
	}
	private oOnChangeCollectionChanged(
		splices: Array<ICollectionObserverSplice<any>>,
	) {
		this.flatpickrInstance.set("onChange", this.oOnChange);
	}

	@bindable()
	public oOnClose: any[];
	public oOnCloseSubscription: Disposable;
	private oOnCloseChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		if (this.oOnCloseSubscription) {
			this.oOnCloseSubscription.dispose();
		}
		if (this.oOnClose instanceof Array) {
			this.oOnCloseSubscription = this.bindingEngine
				.collectionObserver(this.oOnClose)
				.subscribe(this.oOnCloseCollectionChanged.bind(this));
		}

		this.flatpickrInstance.set("onClose", this.oOnClose);
	}
	private oOnCloseCollectionChanged(
		splices: Array<ICollectionObserverSplice<any>>,
	) {
		this.flatpickrInstance.set("onClose", this.oOnClose);
	}

	@bindable()
	public oOnDayCreate: any[];
	public oOnDayCreateSubscription: Disposable;
	private oOnDayCreateChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		if (this.oOnDayCreateSubscription) {
			this.oOnDayCreateSubscription.dispose();
		}
		if (this.oOnDayCreate instanceof Array) {
			this.oOnDayCreateSubscription = this.bindingEngine
				.collectionObserver(this.oOnDayCreate)
				.subscribe(this.oOnDayCreateCollectionChanged.bind(this));
		}

		this.flatpickrInstance.set("onDayCreate", this.oOnDayCreate);
	}
	private oOnDayCreateCollectionChanged(
		splices: Array<ICollectionObserverSplice<any>>,
	) {
		this.flatpickrInstance.set("onDayCreate", this.oOnDayCreate);
	}

	@bindable()
	public oOnDestroy: any[];
	public oOnDestroySubscription: Disposable;
	private oOnDestroyChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		if (this.oOnDestroySubscription) {
			this.oOnDestroySubscription.dispose();
		}
		if (this.oOnDestroy instanceof Array) {
			this.oOnDestroySubscription = this.bindingEngine
				.collectionObserver(this.oOnDestroy)
				.subscribe(this.oOnDestroyCollectionChanged.bind(this));
		}

		this.flatpickrInstance.set("onDestroy", this.oOnDestroy);
	}
	private oOnDestroyCollectionChanged(
		splices: Array<ICollectionObserverSplice<any>>,
	) {
		this.flatpickrInstance.set("onDestroy", this.oOnDestroy);
	}

	@bindable()
	public oOnKeyDown: any[];
	public oOnKeyDownSubscription: Disposable;
	private oOnKeyDownChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		if (this.oOnKeyDownSubscription) {
			this.oOnKeyDownSubscription.dispose();
		}
		if (this.oOnKeyDown instanceof Array) {
			this.oOnKeyDownSubscription = this.bindingEngine
				.collectionObserver(this.oOnKeyDown)
				.subscribe(this.oOnKeyDownCollectionChanged.bind(this));
		}

		this.flatpickrInstance.set("onKeyDown", this.oOnKeyDown);
	}
	private oOnKeyDownCollectionChanged(
		splices: Array<ICollectionObserverSplice<any>>,
	) {
		this.flatpickrInstance.set("onKeyDown", this.oOnKeyDown);
	}

	@bindable()
	public oOnMonthChange: any[];
	public oOnMonthChangeSubscription: Disposable;
	private oOnMonthChangeChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		if (this.oOnMonthChangeSubscription) {
			this.oOnMonthChangeSubscription.dispose();
		}
		if (this.oOnMonthChange instanceof Array) {
			this.oOnMonthChangeSubscription = this.bindingEngine
				.collectionObserver(this.oOnMonthChange)
				.subscribe(this.oOnMonthChangeCollectionChanged.bind(this));
		}

		this.flatpickrInstance.set("onMonthChange", this.oOnMonthChange);
	}
	private oOnMonthChangeCollectionChanged(
		splices: Array<ICollectionObserverSplice<any>>,
	) {
		this.flatpickrInstance.set("onMonthChange", this.oOnMonthChange);
	}

	@bindable()
	public oOnOpen: any[];
	public oOnOpenSubscription: Disposable;
	private oOnOpenChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		if (this.oOnOpenSubscription) {
			this.oOnOpenSubscription.dispose();
		}
		if (this.oOnOpen instanceof Array) {
			this.oOnOpenSubscription = this.bindingEngine
				.collectionObserver(this.oOnOpen)
				.subscribe(this.oOnOpenCollectionChanged.bind(this));
		}

		this.flatpickrInstance.set("onOpen", this.oOnOpen);
	}
	private oOnOpenCollectionChanged(
		splices: Array<ICollectionObserverSplice<any>>,
	) {
		this.flatpickrInstance.set("onOpen", this.oOnOpen);
	}

	@bindable()
	public oOnParseConfig: any[];
	public oOnParseConfigSubscription: Disposable;
	private oOnParseConfigChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		if (this.oOnParseConfigSubscription) {
			this.oOnParseConfigSubscription.dispose();
		}
		if (this.oOnParseConfig instanceof Array) {
			this.oOnParseConfigSubscription = this.bindingEngine
				.collectionObserver(this.oOnParseConfig)
				.subscribe(this.oOnParseConfigCollectionChanged.bind(this));
		}

		this.flatpickrInstance.set("onParseConfig", this.oOnParseConfig);
	}
	private oOnParseConfigCollectionChanged(
		splices: Array<ICollectionObserverSplice<any>>,
	) {
		this.flatpickrInstance.set("onParseConfig", this.oOnParseConfig);
	}

	@bindable()
	public oOnPreCalendarPosition: any[];
	public oOnPreCalendarPositionSubscription: Disposable;
	private oOnPreCalendarPositionChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		if (this.oOnPreCalendarPositionSubscription) {
			this.oOnPreCalendarPositionSubscription.dispose();
		}
		if (this.oOnPreCalendarPosition instanceof Array) {
			this.oOnPreCalendarPositionSubscription = this.bindingEngine
				.collectionObserver(this.oOnPreCalendarPosition)
				.subscribe(
					this.oOnPreCalendarPositionCollectionChanged.bind(this),
				);
		}

		this.flatpickrInstance.set(
			"onPreCalendarPosition",
			this.oOnPreCalendarPosition,
		);
	}
	private oOnPreCalendarPositionCollectionChanged(
		splices: Array<ICollectionObserverSplice<any>>,
	) {
		this.flatpickrInstance.set(
			"onPreCalendarPosition",
			this.oOnPreCalendarPosition,
		);
	}

	@bindable()
	public oOnReady: any[];
	public oOnReadySubscription: Disposable;
	private oOnReadyChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		if (this.oOnReadySubscription) {
			this.oOnReadySubscription.dispose();
		}
		if (this.oOnReady instanceof Array) {
			this.oOnReadySubscription = this.bindingEngine
				.collectionObserver(this.oOnReady)
				.subscribe(this.oOnReadyCollectionChanged.bind(this));
		}

		this.flatpickrInstance.set("onReady", this.oOnReady);
	}
	private oOnReadyCollectionChanged(
		splices: Array<ICollectionObserverSplice<any>>,
	) {
		this.flatpickrInstance.set("onReady", this.oOnReady);
	}

	@bindable()
	public oOnValueUpdate: any[];
	public oOnValueUpdateSubscription: Disposable;
	private oOnValueUpdateChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		if (this.oOnValueUpdateSubscription) {
			this.oOnValueUpdateSubscription.dispose();
		}
		if (this.oOnValueUpdate instanceof Array) {
			this.oOnValueUpdateSubscription = this.bindingEngine
				.collectionObserver(this.oOnValueUpdate)
				.subscribe(this.oOnValueUpdateCollectionChanged.bind(this));
		}

		this.flatpickrInstance.set("onValueUpdate", this.oOnValueUpdate);
	}
	private oOnValueUpdateCollectionChanged(
		splices: Array<ICollectionObserverSplice<any>>,
	) {
		this.flatpickrInstance.set("onValueUpdate", this.oOnValueUpdate);
	}

	@bindable()
	public oOnYearChange: any[];
	public oOnYearChangeSubscription: Disposable;
	private oOnYearChangeChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		if (this.oOnYearChangeSubscription) {
			this.oOnYearChangeSubscription.dispose();
		}
		if (this.oOnYearChange instanceof Array) {
			this.oOnYearChangeSubscription = this.bindingEngine
				.collectionObserver(this.oOnYearChange)
				.subscribe(this.oOnYearChangeCollectionChanged.bind(this));
		}

		this.flatpickrInstance.set("onYearChange", this.oOnYearChange);
	}
	private oOnYearChangeCollectionChanged(
		splices: Array<ICollectionObserverSplice<any>>,
	) {
		this.flatpickrInstance.set("onYearChange", this.oOnYearChange);
	}

	@bindable()
	public oPlugins: any[];
	public oPluginsSubscription: Disposable;
	private oPluginsChanged(newValue, oldValue) {
		if (!this.flatpickrInstance) {
			return;
		}
		if (this.oPluginsSubscription) {
			this.oPluginsSubscription.dispose();
		}
		if (this.oPlugins instanceof Array) {
			this.oPluginsSubscription = this.bindingEngine
				.collectionObserver(this.oPlugins)
				.subscribe(this.oPluginsCollectionChanged.bind(this));
		}

		this.flatpickrInstance.set("plugins", this.oPlugins);
	}
	private oPluginsCollectionChanged(
		splices: Array<ICollectionObserverSplice<any>>,
	) {
		this.flatpickrInstance.set("plugins", this.oPlugins);
	}

	private initialiseProperties(): any {
		let config: any = {};
		if (this.oAllowInput) {
			config.allowInput = this.oAllowInput;
		}
		if (this.oAltFormat) {
			config.altFormat = this.oAltFormat;
		}
		if (this.oAltInput) {
			config.altInput = this.oAltInput;
		}
		if (this.oAltInputClass) {
			config.altInputClass = this.oAltInputClass;
		}
		if (this.oAnimate) {
			config.animate = this.oAnimate;
		}
		if (this.oAriaDateFormat) {
			config.ariaDateFormat = this.oAriaDateFormat;
		}
		if (this.oClickOpens) {
			config.clickOpens = this.oClickOpens;
		}
		if (this.oCloseOnSelect) {
			config.closeOnSelect = this.oCloseOnSelect;
		}
		if (this.oConjunction) {
			config.conjunction = this.oConjunction;
		}
		if (this.oDateFormat) {
			config.dateFormat = this.oDateFormat;
		}
		if (this.oDefaultDate) {
			config.defaultDate = this.oDefaultDate;
		}
		if (this.oDefaultHour) {
			config.defaultHour = this.oDefaultHour;
		}
		if (this.oDefaultMinute) {
			config.defaultMinute = this.oDefaultMinute;
		}
		if (this.oDefaultSeconds) {
			config.defaultSeconds = this.oDefaultSeconds;
		}
		if (this.oDisableMobile) {
			config.disableMobile = this.oDisableMobile;
		}
		if (this.oEnableSeconds) {
			config.enableSeconds = this.oEnableSeconds;
		}
		if (this.oEnableTime) {
			config.enableTime = this.oEnableTime;
		}
		if (this.oHourIncrement) {
			config.hourIncrement = this.oHourIncrement;
		}
		if (this.oInline) {
			config.inline = this.oInline;
		}
		if (this.oLocale) {
			config.locale = this.oLocale;
		}
		if (this.oMaxDate) {
			config.maxDate = this.oMaxDate;
		}
		if (this.oMaxTime) {
			config.maxTime = this.oMaxTime;
		}
		if (this.oMinDate) {
			config.minDate = this.oMinDate;
		}
		if (this.oMinTime) {
			config.minTime = this.oMinTime;
		}
		if (this.oMinuteIncrement) {
			config.minuteIncrement = this.oMinuteIncrement;
		}
		if (this.oMode) {
			config.mode = this.oMode;
		}
		if (this.oNextArrow) {
			config.nextArrow = this.oNextArrow;
		}
		if (this.oNoCalendar) {
			config.noCalendar = this.oNoCalendar;
		}
		if (this.oNow) {
			config.now = this.oNow;
		}
		if (this.oPosition) {
			config.position = this.oPosition;
		}
		if (this.oPrevArrow) {
			config.prevArrow = this.oPrevArrow;
		}
		if (this.oShorthandCurrentMonth) {
			config.shorthandCurrentMonth = this.oShorthandCurrentMonth;
		}
		if (this.oShowMonths) {
			config.showMonths = this.oShowMonths;
		}
		if (this.oStatic) {
			config.static = this.oStatic;
		}
		if (this.oTime_24hr) {
			config.time_24hr = this.oTime_24hr;
		}
		if (this.oWeekNumbers) {
			config.weekNumbers = this.oWeekNumbers;
		}
		if (this.oWrap) {
			config.wrap = this.oWrap;
		}
		if (this.oDisable) {
			config.disable = this.oDisable;
			if (this.oDisable instanceof Array) {
				this.oDisableSubscription = this.bindingEngine
					.collectionObserver(this.oDisable)
					.subscribe(this.oDisableCollectionChanged.bind(this));
			}
		}
		if (this.oEnable) {
			config.enable = this.oEnable;
			if (this.oEnable instanceof Array) {
				this.oEnableSubscription = this.bindingEngine
					.collectionObserver(this.oEnable)
					.subscribe(this.oEnableCollectionChanged.bind(this));
			}
		}
		if (this.oIgnoredFocusElements) {
			config.ignoredFocusElements = this.oIgnoredFocusElements;
			if (this.oIgnoredFocusElements instanceof Array) {
				this.oIgnoredFocusElementsSubscription = this.bindingEngine
					.collectionObserver(this.oIgnoredFocusElements)
					.subscribe(
						this.oIgnoredFocusElementsCollectionChanged.bind(this),
					);
			}
		}
		if (this.oOnChange) {
			config.onChange = this.oOnChange;
			if (this.oOnChange instanceof Array) {
				this.oOnChangeSubscription = this.bindingEngine
					.collectionObserver(this.oOnChange)
					.subscribe(this.oOnChangeCollectionChanged.bind(this));
			}
		}
		if (this.oOnClose) {
			config.onClose = this.oOnClose;
			if (this.oOnClose instanceof Array) {
				this.oOnCloseSubscription = this.bindingEngine
					.collectionObserver(this.oOnClose)
					.subscribe(this.oOnCloseCollectionChanged.bind(this));
			}
		}
		if (this.oOnDayCreate) {
			config.onDayCreate = this.oOnDayCreate;
			if (this.oOnDayCreate instanceof Array) {
				this.oOnDayCreateSubscription = this.bindingEngine
					.collectionObserver(this.oOnDayCreate)
					.subscribe(this.oOnDayCreateCollectionChanged.bind(this));
			}
		}
		if (this.oOnDestroy) {
			config.onDestroy = this.oOnDestroy;
			if (this.oOnDestroy instanceof Array) {
				this.oOnDestroySubscription = this.bindingEngine
					.collectionObserver(this.oOnDestroy)
					.subscribe(this.oOnDestroyCollectionChanged.bind(this));
			}
		}
		if (this.oOnKeyDown) {
			config.onKeyDown = this.oOnKeyDown;
			if (this.oOnKeyDown instanceof Array) {
				this.oOnKeyDownSubscription = this.bindingEngine
					.collectionObserver(this.oOnKeyDown)
					.subscribe(this.oOnKeyDownCollectionChanged.bind(this));
			}
		}
		if (this.oOnMonthChange) {
			config.onMonthChange = this.oOnMonthChange;
			if (this.oOnMonthChange instanceof Array) {
				this.oOnMonthChangeSubscription = this.bindingEngine
					.collectionObserver(this.oOnMonthChange)
					.subscribe(this.oOnMonthChangeCollectionChanged.bind(this));
			}
		}
		if (this.oOnOpen) {
			config.onOpen = this.oOnOpen;
			if (this.oOnOpen instanceof Array) {
				this.oOnOpenSubscription = this.bindingEngine
					.collectionObserver(this.oOnOpen)
					.subscribe(this.oOnOpenCollectionChanged.bind(this));
			}
		}
		if (this.oOnParseConfig) {
			config.onParseConfig = this.oOnParseConfig;
			if (this.oOnParseConfig instanceof Array) {
				this.oOnParseConfigSubscription = this.bindingEngine
					.collectionObserver(this.oOnParseConfig)
					.subscribe(this.oOnParseConfigCollectionChanged.bind(this));
			}
		}
		if (this.oOnPreCalendarPosition) {
			config.onPreCalendarPosition = this.oOnPreCalendarPosition;
			if (this.oOnPreCalendarPosition instanceof Array) {
				this.oOnPreCalendarPositionSubscription = this.bindingEngine
					.collectionObserver(this.oOnPreCalendarPosition)
					.subscribe(
						this.oOnPreCalendarPositionCollectionChanged.bind(this),
					);
			}
		}
		if (this.oOnReady) {
			config.onReady = this.oOnReady;
			if (this.oOnReady instanceof Array) {
				this.oOnReadySubscription = this.bindingEngine
					.collectionObserver(this.oOnReady)
					.subscribe(this.oOnReadyCollectionChanged.bind(this));
			}
		}
		if (this.oOnValueUpdate) {
			config.onValueUpdate = this.oOnValueUpdate;
			if (this.oOnValueUpdate instanceof Array) {
				this.oOnValueUpdateSubscription = this.bindingEngine
					.collectionObserver(this.oOnValueUpdate)
					.subscribe(this.oOnValueUpdateCollectionChanged.bind(this));
			}
		}
		if (this.oOnYearChange) {
			config.onYearChange = this.oOnYearChange;
			if (this.oOnYearChange instanceof Array) {
				this.oOnYearChangeSubscription = this.bindingEngine
					.collectionObserver(this.oOnYearChange)
					.subscribe(this.oOnYearChangeCollectionChanged.bind(this));
			}
		}
		if (this.oPlugins) {
			config.plugins = this.oPlugins;
			if (this.oPlugins instanceof Array) {
				this.oPluginsSubscription = this.bindingEngine
					.collectionObserver(this.oPlugins)
					.subscribe(this.oPluginsCollectionChanged.bind(this));
			}
		}
		return config;
	}
	private disposeProperties() {
		this.oDisableSubscription.dispose();
		this.oEnableSubscription.dispose();
		this.oIgnoredFocusElementsSubscription.dispose();
		this.oOnChangeSubscription.dispose();
		this.oOnCloseSubscription.dispose();
		this.oOnDayCreateSubscription.dispose();
		this.oOnDestroySubscription.dispose();
		this.oOnKeyDownSubscription.dispose();
		this.oOnMonthChangeSubscription.dispose();
		this.oOnOpenSubscription.dispose();
		this.oOnParseConfigSubscription.dispose();
		this.oOnPreCalendarPositionSubscription.dispose();
		this.oOnReadySubscription.dispose();
		this.oOnValueUpdateSubscription.dispose();
		this.oOnYearChangeSubscription.dispose();
		this.oPluginsSubscription.dispose();
	} //--- END GENERATED CODE ---
}
