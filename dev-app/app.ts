export class App {
	public message: string = "from Aurelia!";
	public dateFormat: string = "m-d-Y";
	public maxDate: Date = new Date();
	public value: Date = new Date();
	public mode: string = "single";
	clicked() {
		// eslint-disable-next-line no-alert
		this.mode = "multiple";
		this.maxDate = new Date("2018-01-01");
		alert("A primary button click or a touch");
	}
}
