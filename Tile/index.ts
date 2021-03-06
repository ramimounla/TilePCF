import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class Tile implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _context: ComponentFramework.Context<IInputs>;

	private _spanValue: HTMLSpanElement;
	private _spanDescription: HTMLSpanElement;

	/**
	 * Empty constructor.
	 */
	constructor() {

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement) {
		// Add control initialization code
		var localDiv: HTMLDivElement;
		localDiv = document.createElement("div");
		localDiv.className = "divstyle divother";
		localDiv.style.backgroundColor = context.parameters.colour.raw || "";

		this._spanDescription = document.createElement("span");
		this._spanDescription.className = "descriptionstyle";
		localDiv.appendChild(this._spanDescription);

		this._spanValue = document.createElement("span");
		this._spanValue.className = "spanstyle";
		localDiv.appendChild(this._spanValue);
		
		this._spanValue.innerText = context.parameters.input.raw;
		this._spanDescription.innerText = context.parameters.title.raw || "";

		if (((context.parameters.tabName.raw || "").trim().length > 0)) {
			localDiv.style.cursor = "pointer";
			localDiv.onclick = ((e: MouseEvent) => this.navigateToTab(context.parameters.tabName.raw || ""));
		}

		container.appendChild(localDiv);
	}

	private navigateToTab(tabName: string): void {
		eval("Xrm.Page.ui.tabs.get(tabName).setFocus()");
	}

	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void {
		// Add code to update control view
		this._spanValue.innerText = context.parameters.input.raw + "";
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs {
		return {};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void {
		// Add code to cleanup control if necessary
	}
}