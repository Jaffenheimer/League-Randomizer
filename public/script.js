

const $ = document.getElementById.bind(document);

fetch("/random")
	.then(
		r => r.json())
	.then(data => {
		$("champion-name").innerText = data.champion;

		let runes = "";
		data.runes.primary.forEach(r => runes += r.name + "\n");
		runes += "\n"
		data.runes.secondary.forEach(r => runes += r.name + "\n");
		$("runes").innerText = runes;

		let build = "";
		data.build.forEach(i => build += i.name + "\n");
		$("build").innerText = build;

		let summ_spells = "";
		data.summ_spells.forEach(s => summ_spells += s.name + " ")
		$("summoner-spells").innerText = summ_spells
	}
	)
