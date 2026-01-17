import convertModule from "@/modules/convert.js";

export const processVolatilities = (datas, goldInfo) => {
	if (!datas) {
		return {};
	}
	
	const volatilities = {};

	datas.forEach(item => {
		const datetime = convertModule.toYYYYMMDDHHMMSS(item[0]);
		if (volatilities[datetime]) {
			return;
		}

		const datetime15m = new Date(new Date(datetime).getTime() + 15 * 60 * 1000);
		const datetime30m = new Date(new Date(datetime).getTime() + 30 * 60 * 1000);
		const datetime45m = new Date(new Date(datetime).getTime() + 45 * 60 * 1000);

		const gold = goldInfo.find(x => x.t === datetime);
		if (! gold) {
			return;
		}

		volatilities[item[0]] = {
			'15m': { open_high: null, open_low: null, range: null },
			'30m': { open_high: null, open_low: null, range: null },
			'1h': { open_high: null, open_low: null, range: null },
		};

		const open = gold.i[0];

		let high = gold.i[1];
		let low = gold.i[2];

		let openHighLength = (open - high) * (high - open) * -1;
		let openLowLength = (open - low) * (low - open) * -1;

		let max = openHighLength > openLowLength ? high - open : low - open;

		volatilities[item[0]]['15m'] = {
			max: max,
			range: high - low,
		};

		const gold15m = goldInfo.find(x => x.t === convertModule.toYYYYMMDDHHMMSS(datetime15m));
		if (! gold15m) {
			return;
		}

		high = high > gold15m.i[1] ? high : gold15m.i[1];
		low = low < gold15m.i[2] ? low : gold15m.i[2];
		
		openHighLength = (open - high) * (high - open) * -1;
		openLowLength = (open - low) * (low - open) * -1;

		max = openHighLength > openLowLength ? high - open : low - open;

		volatilities[item[0]]['30m'] = {
			max: max,
			range: high - low,
		};

		const gold30m = goldInfo.find(x => x.t === convertModule.toYYYYMMDDHHMMSS(datetime30m));
		if (! gold30m) {
			return;
		}

		const gold45m = goldInfo.find(x => x.t === convertModule.toYYYYMMDDHHMMSS(datetime45m));
		if (! gold45m) {
			return;
		}

		high = high > gold30m.i[1] ? high : gold30m.i[1];
		high = high > gold45m.i[1] ? high : gold45m.i[1];

		low = low < gold30m.i[2] ? low : gold30m.i[2];
		low = low < gold45m.i[2] ? low : gold45m.i[2];

		openHighLength = (open - high) * (high - open) * -1;
		openLowLength = (open - low) * (low - open) * -1;

		max = openHighLength > openLowLength ? high - open : low - open;

		volatilities[item[0]]['1h'] = {
			max: max,
			range: high - low,
		};
	});

	return volatilities;
};
