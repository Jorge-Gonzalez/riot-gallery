import GalleryStore from './gallery-store.js';
import inherits from './inherits';



export default function PortfolioStore(dispatcher) {

	GalleryStore.call(this, dispatcher);	
}

inherits(PortfolioStore, GalleryStore);

PortfolioStore.prototype.computeBoxesLayout = function () {
	// console.log(this.ratios, ' - ', this.width)
	this.ratios = this.entries.length == 5 && this.width >= 1055
		? [1.33, 1.33, 1.21, 1.21, 1.21]
		: [1.33, 1.33, 1.33, 1.33, 1.33];

	this.constructor.super_.prototype.computeBoxesLayout.call(this);
};