function getEl(selector, allElements = false) {
	return document["querySelector" + (allElements ? "All" : "")](selector);
};

function createElWithClassList(elem = "div", classList = []) {
	const el = document.createElement(elem);
	if (classList.length) el.classList.add(...classList);
	return el;
}

// ** Change color scheme of the page
function oppositeColorScheme() {
	const metaColorSchemeEl = getEl("[name='color-scheme']", false);
	const oppositeColor = ((metaColorSchemeEl.getAttribute("content") === "dark") ? "light" : "dark");
	metaColorSchemeEl.setAttribute("content", oppositeColor);

	return oppositeColor;
};

getEl('#btnColorScheme', false).addEventListener('click', function (e) {
	[
		this.title,
		this.querySelector('#theme').style.color
	] = (
			(oppositeColorScheme() === "dark") ?
				["Change to light theme", "snow"] :
				["Change to dark theme", "hsl(180, 50%, 10%)"]
		);
}, false);

// ** Products gallery
const galleryURL = "./imagesInfo.json";
let isFetchFinised = false;

try {
	fetch(galleryURL, {
		method: "GET"
	})
		.then(response => {
			if (!response.ok) return;
			return response.json();
		})
		.then(cardsImages => {
			const galleryEl = getEl("#gallery", false);

			cardsImages.forEach(({ cardImage: { src, alt }, cardDescription: { description } }) => {
				const [
					divCardHolder,
					divCard,
					figure,
					divBackface,
					productImg,
					figcaption,
					pDescription,
					btnOrder
				] = [
						createElWithClassList("div", ["card-holder"]),
						createElWithClassList("div", ["card"]),
						createElWithClassList("figure"),
						createElWithClassList("div", ["backface"]),
						createElWithClassList("img"),
						createElWithClassList("figcaption"),
						createElWithClassList("p"),
						createElWithClassList("button", ["order"])
					];

				[productImg.src, productImg.alt, productImg.loading] = [src, alt, "lazy"];

				[
					figcaption.textContent,
					pDescription.textContent,
					btnOrder.textContent
				] = [
						alt,
						description,
						"Poručite"
					];

				btnOrder.type = "button";

				figure.append(productImg, figcaption)
				divBackface.append(pDescription, btnOrder);
				divCard.append(figure, divBackface);
				divCardHolder.appendChild(divCard);
				galleryEl.appendChild(divCardHolder);
			});
		})
		.catch(err => {
			throw new Error(err);
		});

	isFetchFinised = !isFetchFinised;
}
catch (err) {
	throw new Error("Please check URL, connection or else!");
}
finally {
	console.log(`Fetching successful: ${isFetchFinised}`);
};

// ** Order pop-up
const ordersEls = getEl(".order", true);

function getOrderDialog() {
	return `
        
    `;
}

ordersEls.forEach(order => {

});