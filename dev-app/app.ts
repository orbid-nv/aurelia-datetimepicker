export class App {
	public message: string = "from Aurelia!";
	public dateFormat: string = "m-d-Y";
	public maxDate: Date = new Date();
	public value: Date[] = [new Date("2019-05-02"), new Date("2019-05-01")];
	public mode: string = "single";
	clicked() {
		// eslint-disable-next-line no-alert
		// this.mode = "multiple";
		// this.maxDate = new Date("2018-01-01");
		// alert("A primary button click or a touch");
		this.disable.push(new Date("2019-06-05"));
		console.log(this.disable);
	}
	// public disable: Date[] = [new Date("2019-06-02"), new Date("2019-06-01")];

	public disable: any[] = [
		function(date) {
			return date.getDay() === 0 || date.getDay() === 6;
		}
	];
}
