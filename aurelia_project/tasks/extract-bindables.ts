import * as gulp from "gulp";
import * as replace from "gulp-replace";
import * as typedoc from "gulp-typedoc";
import * as fs from "fs";
import * as hbsAll from "gulp-handlebars-all";
import * as hbHelpers from "handlebars-helpers";

function readTs() {
	//instance.d.ts is de high-level ts file
	return gulp.src(["./node_modules/flatpickr/dist/types/options.d.ts"]).pipe(
		typedoc({
			target: "es6",
			includeDeclarations: true,
			json: "./temp/flatpickr.json",
			name: "flatpickr-docs",
			mode: "modules",
			excludeExternals: true,
			version: true
		} as typedoc.Options)
	);
}

function extractBindables() {
	var json = JSON.parse(fs.readFileSync("./temp/flatpickr.json", "utf-8"));

	var jsObj = {};
	extractOptions(jsObj, json);

	//   var content = "export let bindables = " + JSON.stringify(jsObj);

	//   // write the js file to the file system
	//   fs.writeFile("./src/common/bindables.js", content, function(err) {
	//     if (err) {
	//       return console.log(err);
	//     }
	//   });
}
function convertType(type: any) {
	switch (type.type) {
		case "union":
			return type.types.map(x => '"' + x.value + '"').join("|");
			break;
		default:
			return type.name;
			break;
	}
}
function dashCase(str) {
	return str.replace(/[A-Z](?:(?=[^A-Z])|[A-Z]*(?=[A-Z][^A-Z]|$))/g, function(
		s,
		i
	) {
		return (i > 0 ? "-" : "") + s.toLowerCase();
	});
}
function extractOptions(jsObj, json) {
	var optionClasses = [];

	//all primitive properies, incl dates
	//var properties = json.children[0].children[1].type.types[2].declaration.children voor instance
	var properties = json.children[0].children[1].children
		.filter(
			x =>
				(x.type.type === "intrinsic" ||
					(x.type.type === "reference" && x.type.name === "Date") ||
					x.type.type === "union") &&
				!x.name.startsWith("_")
		)
		.map(x => new FlProperty({ name: x.name, type: convertType(x.type) }));
	var arrays = json.children[0].children[1].children
		.filter(
			x =>
				x.type.type === "array" &&
				!x.name.startsWith("_") &&
				x.type.elementType.name !== "Hook"
		)
		.map(x => new FlProperty({ name: x.name, type: "any[]" }));
	var hooks = json.children[0].children[1].children
		.filter(
			x =>
				x.type.type === "array" &&
				!x.name.startsWith("_") &&
				x.type.elementType.name === "Hook"
		)
		.map(
			x =>
				new HookProperty({
					name: x.name,
					dashCaseName: dashCase(x.name)
				})
		);
	gulp.src("./templates/flatpickr.hbs")
		.pipe(
			hbsAll("html", {
				context: new FlConfig({
					properties: properties,
					arrays: arrays,
					hooks: hooks
				}),

				partials: ["partials/*.hbs"],

				helpers: hbHelpers()
			})
		)
		.on("data", function(file) {
			gulp.src("./src/elements/or-datetimepicker.ts")
				.pipe(
					replace(
						/(?<=\/\/--- GENERATED CODE ---)[\s\S]*?(?=\/\/--- END GENERATED CODE ---)/,
						"\n" + file.contents.toString()
					)
				)
				.pipe(gulp.dest("./src/elements/"));
		});

	// get the kendo module
	// var kendoModule = kendo.children.find(function (i) { return i.name === "kendo" });
	// var jQueryInterface = kendo.children.find(function (i) { return i.name === "JQuery" && i.kindString === "Interface" });
	// var kendoMethods = jQueryInterface.children;

	// // loop over all kendo methods declarations:
	// // kendoAutoComplete(options: kendo.ui.AutoCompleteOptions): JQuery;
	// // kendoDraggable(options: kendo.ui.DraggableOptions): JQuery;
	// // and for each kendo method, find the id of the Options class (DraggableOptions, AutoCompleteOptions)
	// kendoMethods.forEach(function (method) {
	// 	if (method.name.startsWith('kendo')) {
	// 		var signatures = method.signatures;
	// 		signatures.forEach(function (signature) {
	// 			if (signature.parameters && signature.parameters.length > 0) {
	// 				optionClasses.push({
	// 					method: method.name, // kendoButton, kendoGrid
	// 					id: signature.parameters[0].type.id // id of the options class
	// 				});
	// 			}
	// 		});
	// 	}
	// });

	// // iterate over all modules and classes
	// // of every class matching an id we found above, add the properties to an array
	// kendoModule.children.forEach(function (module) {
	// 	// loop through all classes such as kendo.data.DataSource
	// 	iterativeOptionsLookup(module, optionClasses);
	// });

	// // sort a-z on method name (for readability)
	// optionClasses.sort(function (a, b) {
	// 	return (a.method > b.method) ? 1 : ((b.method > a.method) ? -1 : 0);
	// });

	// // create a flatter object so it can be easily read out by the plugin
	// optionClasses.forEach(function (optionClass) {
	// 	jsObj[optionClass.method] = optionClass.properties;
	// });
}

class FlConfig {
	public properties: FlProperty[];
	public arrays: FlProperty[];
	public hooks: FlProperty[];
	public constructor(init?: Partial<FlConfig>) {
		Object.assign(this, init);
	}
}

class FlProperty {
	public name: string;
	public type: string;
	public constructor(init?: Partial<FlProperty>) {
		Object.assign(this, init);
	}
}
class HookProperty {
	public name: string;
	public dashCaseName: string;
	public constructor(init?: Partial<HookProperty>) {
		Object.assign(this, init);
	}
}
export default gulp.series(readTs, extractBindables);
