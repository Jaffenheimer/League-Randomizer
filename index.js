const _ = require("lodash");
const express = require("express");
const app = express();

/* import raw data */
const items_raw = require("./data/item.json").data;
const champions_raw = require("./data/champion.json").data
const runes_raw = require("./data/runesReforged.json")
const summoners_raw = require("./data/summoner.json").data

/* Handle items */
//#region 
let full_items = Object.keys(items_raw)
	.filter(k => k >= 3000)
	.map(k => items_raw[k])
	.filter(
		item => !item.tags.includes("GoldPer")
			&& !item.tags.includes("Consumable")
			&& !item.tags.includes("Trinket")
			&& (item.in_store ?? true)
			&& item.maps[11]
			&& item.into == undefined);


const boots = full_items.filter(item => item.tags.includes("Boots"));
full_items = full_items.filter(item => !item.tags.includes("Boots"));

const mythics = full_items.filter(item => item.description.includes("Mythic"));
full_items = full_items.filter(item => !item.description.includes("Mythic"));

//#endregion
/* Filter summoner spells to only Summoners Rift regular mode */
const summoners = Object.values(summoners_raw).filter(s => s.modes.includes("CLASSIC"))

/* Handle runes */

function random_runes() {
	const primary = [];
	const secondary = [];

	let [_primary, _secondary] = _.sampleSize(runes_raw, 2);

	for (let slot of _primary.slots) {
		primary.push(_.sample(slot.runes));
	}

	for (let slot of _.sampleSize(_secondary.slots.slice(1, 3), 2)) {
		secondary.push(_.sample(slot.runes));
	}


	return { primary, secondary }
}

function random_selection() {
	const build = [];
	build.push(_.sample(boots, 1));
	build.push(_.sample(mythics, 1));
	const items = _.sampleSize(full_items, 4).forEach(i => build.push(i))

	const champion = _.sample(Object.keys(champions_raw), 1);
	const summ_spells = [];
	_.sampleSize(summoners, 2).map(s => summ_spells.push(s))

	const runes = random_runes();

	return { build, champion, summ_spells, runes }

}

app.use(express.static("public"));

app.get("/random", (req, res) => {
	const selection = random_selection();
	res.json(selection);
	console.log(`Sent random build! (${selection.champion}:${selection.runes.primary[0].name})`)
})

app.listen(80, () => {
	console.log("Listening on port 80...")
})




