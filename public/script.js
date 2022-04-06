
const $ = (id) => document.getElementById(id);


fetch("/random")
	.then(
		r => r.json())
	.then(data => {
		/* champion */
		const champ_field = $("champion")
		const champ_name = document.createElement("h2")
		champ_name.innerText = data.champion.name;
		const img_e = document.createElement("img");
		img_e.width = img_e.height = 64
		img_e.src = "/champion/tiles/" + data.champion.id + "_0.jpg";
		img_e.onload = () => {
			champ_field.appendChild(img_e);
			champ_field.appendChild(champ_name);
		}

		/* runes */
		const runes_field_p = $("runes-primary");
		const runes_field_s = $("runes-secondary");
		data.runes.primary.forEach(r => {
			const rune_elem = document.createElement("div");
			rune_elem.classList.add("rune-elem")
			const img_e = document.createElement("img");
			img_e.src = "/" + r.icon;
			img_e.width = img_e.height = 24;

			img_e.onload = () => {
				rune_elem.appendChild(img_e);
				const text_elem = document.createElement("p");
				text_elem.innerText = r.name;

				rune_elem.appendChild(text_elem);
				runes_field_p.appendChild(rune_elem);
			}
		})

		data.runes.secondary.forEach(r => {
			const rune_elem = document.createElement("div");
			rune_elem.classList.add("rune-elem")
			const img_e = document.createElement("img");
			img_e.src = "/" + r.icon;
			img_e.width = img_e.height = 24;

			img_e.onload = () => {
				rune_elem.appendChild(img_e);
				const text_elem = document.createElement("p");
				text_elem.innerText = r.name;

				rune_elem.appendChild(text_elem);
				runes_field_s.appendChild(rune_elem);
			}
		})

		/* items */
		const build_field = $("build");
		data.build.forEach(i => {
			const item_elem = document.createElement("div");
			item_elem.classList.add("item-elem")
			const img_e = document.createElement("img");
			img_e.src = "/item/" + i.image.full;
			img_e.width = img_e.height = 24;

			img_e.onload = () => {
				item_elem.appendChild(img_e);
				const text_elem = document.createElement("p");
				text_elem.innerText = i.name;

				item_elem.appendChild(text_elem);
				build_field.appendChild(item_elem);
			}
		});

		const summ_field = $("summoners")
		data.summ_spells.forEach(s => {
			const summ_elem = document.createElement("div");
			summ_elem.classList.add("summ-elem")
			const img_e = document.createElement("img");
			img_e.src = "/spell/" + s.image.full;
			img_e.width = img_e.height = 24;

			img_e.onload = () => {
				summ_elem.appendChild(img_e);
				const text_elem = document.createElement("p");
				text_elem.innerText = s.name;

				summ_elem.appendChild(text_elem);
				summ_field.appendChild(summ_elem);
			}
		});
		$("summoner-spells").innerText = summ_spells
	}
	)
