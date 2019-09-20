import { FrameworkConfiguration } from "aurelia-framework";
import { PLATFORM } from "aurelia-pal";
import { DatepickerConfig } from "./datepicker-config";

export function configure(
	config: FrameworkConfiguration,
	callback?: (config: DatepickerConfig) => void,
): void | Promise<void> {
	config.globalResources([
		PLATFORM.moduleName("./elements/or-datetimepicker"),
	]);

	let instance = config.container.get(DatepickerConfig) as DatepickerConfig;

	// Do we have a callback function?
	if (callback !== undefined && typeof callback === "function") {
		callback(instance);
	}
}

export * from "./datepicker-config";
export * from "./elements/or-datetimepicker";
