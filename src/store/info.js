import {defineStore} from "pinia";
import {doc, documentId, getFirestore, collection, query, getDoc, getDocs, onSnapshot, orderBy, limit} from "firebase/firestore";
import {child, get, getDatabase, ref} from "firebase/database";

import convertModule from "@/modules/convert.js";
import remoteConfigModule from "@/modules/remoteConfig";

// import soundNotificationGoldNewsInfo from "@/assets/sound/mixkit-correct-answer-tone-2870.mp3";

// const database = getFirestore();
// const rtDatabase = getDatabase();

export const InfoStore = defineStore('info', {
	persist: {
		// paths: ['goldTon'],
		pick: [
			'forexfactory',
			'forexfactoryNews',
			'goldExnesses',
			'goldKitcos',
			'goldNews',
			'goldTon',
			'goldTradingster',
			'myFxbooks',
			'openInterest',
		],
	},

	state: () => ({
		active: [],
		snapshotListener: null,
		snapshotData: null,

		forexfactory: {
			v: null,
			data: {},
		},
		forexfactoryNews: {
			v: null,
			data: {
				slug: {},
				news: {},
			},
		},
		goldExnesses: {
			v: null,
			data: [],
		},
		goldKitcos: {
			opinion: {
				v: null,
				data: {
					date: null,
					gold: [],
					silver: [],
				},
				updated_at: null,
			},
			ampm: {
				v: null,
				data: {},
			}
		},
		goldNews: {
			v: null,
			data: [],
			updated_at: null,

			readed: '00:00:00',
		},
		goldTon: {
			v: null,
			data: [],
			etf_currentMonth: [],
			etf_lastMonth: [],
		},
		goldTradingster: {
			v: null,
			data: {},
		},
		myFxbooks: {
			v: null,
			data: {
				ask_amounts: [],
				ask_prices: [],
				bid_amounts: [],
				bid_prices: [],
				current_metric_long: [],
				current_metric_short: [],
				sentiment: [],
				updated_at: null,
			},
		},
		openInterest: {
			v: null,
			data: {
				categories: [],	
				data_call: [],
				data_put: [],
				updated_at: null,
			},
		},
	}),

	getters: {
		forexfactoryInfo: state => state.forexfactory.data || {},
		forexfactoryNewsInfo: state => state.forexfactoryNews.data || {},
		goldExnessesInfo: state => state.goldExnesses.data || [],
		goldKitcosAmPmLaser: state => state.goldKitcos.ampm.data || [],
		goldKitcosOpinion: state => state.goldKitcos.opinion.data || [],
		goldNewsInfo: state => ({data: state.goldNews.data, readed: state.goldNews.readed}) || [],
		goldTonInfo: state => state.goldTon.data || [],
		goldTonEtfInfo: state => ({lastMonth: state.goldTon.etf_lastMonth, currentMonth: state.goldTon.etf_currentMonth}),
		goldTradingsterInfo: state => state.goldTradingster.data || [],
		myFxbooksInfo: state => state.myFxbooks.data || [],
		openInterestInfo: state => state.openInterest.data || [],
	},

	actions: {
		clearNotificationGoldNewsInfo () {
			this.$patch((state) => {
				let lastTime = '00:00:00';
				Object.keys(state.goldNews.data).forEach((key) => {
					if (key > lastTime) {
						lastTime = key;
					}
				});
				
				state.goldNews.readed = lastTime;
				state.hasChanged = true;
			});
		},

		getForexFactory () {
			return new Promise(async (resolve) => {
				const name = 'forexfactoryInfo';
				const v = await this.getVersionSnapshot(name);
				
				this.setActive(name, 'add');

				if (v && v.seconds === this.forexfactory?.v?.seconds && v.nanoseconds === this.forexfactory?.v?.nanoseconds) {
					resolve(this.forexfactoryInfo);
					return;
				}

				if (import.meta.env.DEV) {
					console.log(`reload ${name}`);
				}
				
				// get(child(ref(getDatabase()), '/configs/forexfactory')).then((snapshot) => {
				// 	if (snapshot.exists()) {
				// 		const data = snapshot.val();

				// 		this.$patch((state) => {
				// 			state.forexfactory = {
				// 				v,
				// 				data: {
				// 					datas: (data?.datas || []),
				// 					updated_at: data.updated_at || null
				// 				}
				// 			};
				// 			state.hasChanged = true;
				// 		})
				// 		resolve(this.forexfactoryInfo);
				// 	}
				// 	else {
				// 		resolve(null);
				// 	}
				// }, err => {
				// 	console.error(err);
				// 	resolve(null);
				// });

				getDoc(doc(getFirestore(), 'systems', 'forexfactory')).then(doc => {
					if (doc.exists()) {
						const data = doc.data();

						this.$patch((state) => {
							state.forexfactory = {
								v,
								data: {
									datas: Object.keys(data?.datas || {}).map(i => data?.datas[i] || []),
									updated_at: data.updated_at || null
								}
							};
							state.hasChanged = true;
						})

						resolve(this.forexfactoryInfo);
					} else {
						resolve(null);
					}
				})
				.catch(err => {
					console.error(err);
					resolve(null);
				});
			});
		},

		getForexFactoryNews (slug) {
			return new Promise(async (resolve) => {
				const v = await this.getVersionSnapshot('forexfactoryNewsInfo');
				const news = this.forexfactoryNews.data.news[slug]
				if (news && v && v.seconds === news.v?.seconds && v.nanoseconds === news.v?.nanoseconds) {
					resolve(news);
					return;
				}

				let docData = null;
				const docRef = doc(getFirestore(), "goldForexFactoryNews", slug);
				await getDoc(docRef).then(async (_doc) => {
					if (_doc.exists()) {
						docData = _doc.data();
					}
				}).catch((err) => console.error(err));

				if (!docData) {
					resolve(null);
					return;
				}

				docData.datas = Object.keys(docData.datas).sort((a, b) => b > a ? 1 : -1).map(key => [...docData.datas[key], key]);
				docData.name = Object.keys(this.forexfactoryNews.data.slug).find(key => this.forexfactoryNews.data.slug[key] === slug);
				docData.v = v;
				this.$patch((state) => {
					state.forexfactoryNews.data.news[slug] = docData;
					state.hasChanged = true;
				})
				resolve(this.forexfactoryNews.data.news[slug]);
			});
		},

		getForexFactoryNewsSlug () {
			return new Promise((resolve) => {
				remoteConfigModule.getConfig('forexfactory_news').then((configs) => {
					this.$patch((state) => {
						state.forexfactoryNews = {
							data: {
								...state.forexfactoryNews.data,
								slug: configs || {},
							}
						};
						state.hasChanged = true;
					})
					resolve(this.forexfactoryNewsInfo);
				}).catch(err => {
					console.error(err);
					resolve(null);
				});
			});
		},

		getGoldExnesses () {
			return new Promise(async (resolve) => {
				const name = 'goldExnessesInfo';
				const v = await this.getVersionSnapshot(name);
				
				this.setActive(name, 'add');

				if (v && v.seconds === this.goldExnesses?.v?.seconds && v.nanoseconds === this.goldExnesses?.v?.nanoseconds) {
					resolve(this.goldExnessesInfo);
					return;
				}

				if (import.meta.env.DEV) {
					console.log(`reload ${name}`);
				}

				getDocs(
					query(
						collection(getFirestore(), 'goldExnesses'),
						orderBy(documentId(), 'desc'),
						limit(3)
					)
				).then(snapshot => {
					if (snapshot.empty) {
						resolve(null);
					} else {
						this.$patch((state) => {
							state.goldExnesses = {
								v,
								data: snapshot.docs.flatMap(doc => 
									Object.keys(doc.data()).map(key => ({
										t: `${doc.id} ${key.slice(0,2)}:${key.slice(2)}:00`,
										i: doc.data()[key]
									}))
								).sort((a, b) => a.t < b.t  ? -1 : 1), // ASC sort
							};
							state.hasChanged = true;
						})

						resolve(this.goldExnessesInfo);
					}
				})
				.catch(err => {
					console.error(err);
					resolve(null);
				});
			});
		},

		getGoldExnessesCache (alsoLastMonth = false) {
			return new Promise(async (resolve) => {
				getDocs(
					query(
						collection(getFirestore(), 'goldForexFactoryNews', '0-by-month', '0000-00'),
						orderBy(documentId(), "desc"),
						limit(alsoLastMonth ? 2 : 1)
					)
				).then(snapshot => {
					if (snapshot.empty) {
						resolve([]);
					} else {
						const data = [];
						snapshot.docs.forEach(doc => {
							const info = doc.data();
							Object.keys(info).forEach(date => {
								if (date === 'updated_at') return;
								
								Object.values(info[date]).forEach(time => {
									Object.keys(time[13] || {}).forEach((key) => {
										if (!data.find(item => item.t === `${date} ${key.slice(0,2)}:${key.slice(2)}:00`)) {
											data.push({
												t: `${date} ${key.slice(0,2)}:${key.slice(2)}:00`,
												i: time[13][key],
											});
										}
									});
								})
							});
						});

						data.sort((a, b) => a.t < b.t  ? -1 : 1); // ASC sort
						resolve(data);
					}
				})
				.catch(err => {
					console.error(err);
					resolve([]);
				});
			});

		},

		getGoldKitcosAmPmLaser () {
			return new Promise(async (resolve) => {
				const name = 'goldKitcosAmPmLaser';
				const v = await this.getVersionSnapshot(name);
				
				this.setActive(name, 'add');

				if (v && v.seconds === this.goldKitcos.ampm?.v?.seconds && v.nanoseconds === this.goldKitcos.ampm?.v?.nanoseconds) {
					resolve(this.goldKitcosAmPmLaser);
					return;
				}

				if (import.meta.env.DEV) {
					console.log(`reload ${name}`);
				}

				let docData = null;
				const docRef = doc(getFirestore(), 'goldKitcos', 'masterAmPmLaser');
				await getDoc(docRef).then(async (_doc) => {
					if (_doc.exists()) {
						docData = _doc.data();
					}
				}).catch((err) => console.error(err));

				if (!docData) {
					resolve(null);
					return;
				}

				this.$patch((state) => {
					state.goldKitcos.ampm = {
						v,
						data: docData.data  ? {
							...docData.data,
							updated_at: docData.updated_at,
						} : {},
					};
					state.hasChanged = true;
				})

				resolve(this.goldKitcosAmPmLaser);
			});
		},

		getGoldKitcosOpinion () {
			return new Promise(async (resolve) => {
				const name = 'goldKitcosOpinion';
				const v = await this.getVersionSnapshot(name);

				this.setActive(name, 'add');

				if (v && v.seconds === this.goldKitcos.opinion?.v?.seconds && v.nanoseconds === this.goldKitcos.opinion?.v?.nanoseconds) {
					resolve(this.goldKitcosOpinion);
					return;
				}

				if (import.meta.env.DEV) {
					console.log(`reload ${name}`);
				}

				let docData = null;
				const docRef = doc(getFirestore(), 'goldKitcos', 'opinion', 'dates', '0000-00-00');
				await getDoc(docRef).then(async (_doc) => {
					if (_doc.exists()) {
						docData = _doc.data();
					}
				}).catch((err) => console.error(err));

				if (!docData) {
					resolve(null);
					return;
				}

				this.$patch((state) => {
					state.goldKitcos.opinion = {
						v,
						data: {
							date: docData.date,
							gold: docData.data.gold,
							silver: docData.data.silver,
						},
						updated_at: docData.updated_at,
					};
					state.hasChanged = true;
				})

				resolve(this.goldKitcosOpinion);
			});
		},

		getGoldNews () {
			return new Promise(async (resolve) => {
				const name = 'goldNewsInfo';
				const v = await this.getVersionSnapshot(name);

				if (v && v.seconds === this.goldNews?.v?.seconds && v.nanoseconds === this.goldNews?.v?.nanoseconds) {
					resolve(this.goldNewsInfo);
					return;
				}

				if (import.meta.env.DEV) {
					console.log(`reload ${name}`);
				}

				const date = convertModule.toYYYYMMDD();

				let docData = null;
				const docRef = doc(getFirestore(), 'goldNews', date);
				await getDoc(docRef).then(async (_doc) => {
					if (_doc.exists()) {
						docData = _doc.data();
					}
				}).catch((err) => console.error(err));

				if (!docData) {
					resolve(null);
					return;
				}

				this.$patch((state) => {
					if (this.active.includes('goldNewsInfo')) {
						let lastTime = '00:00:00';
						Object.keys(docData.datas).forEach((key) => {
							if (key > lastTime) {
								lastTime = key;
							}
						});
						state.goldNews.readed = lastTime;
					}

					state.goldNews = {
						v,
						data: docData.datas,
						readed: state.goldNews.readed,
					};
					state.hasChanged = true;
				});

				// (new Audio(soundNotificationGoldNewsInfo)).play();

				resolve(this.goldNewsInfo);
			});
		},

		getGoldTon () {
			return new Promise(async (resolve) => {
				const name = 'goldTonInfo';
				const v = await this.getVersionSnapshot(name);
				
				this.setActive(name, 'add');

				if (v && v.seconds === this.goldTon?.v?.seconds && v.nanoseconds === this.goldTon?.v?.nanoseconds) {
					resolve(this.goldTonInfo);
					return;
				}

				if (import.meta.env.DEV) {
					console.log(`reload ${name}`);
				}

				getDocs(
					query(
						collection(getFirestore(), 'goldTon'),
						orderBy(documentId(), "desc"),
						limit(2)
					)
				).then(snapshot => {
					if (snapshot.empty) {
						resolve(null);
					} else {
						const data = snapshot.docs.map(doc => ({
							id: doc.id,
							...doc.data(),
						}));
						
						this.$patch((state) => {
							state.goldTon = {
								v,
								data,
								...this.goldEtfInit(data)
							};
							state.hasChanged = true;
						})

						resolve(this.goldTonInfo);
					}
				})
				.catch(err => {
					console.error(err);
					resolve(null);
				});
			});
		},

		getGoldTradingster () {
			return new Promise(async (resolve) => {
				const name = 'goldTradingsterInfo';
				const v = await this.getVersionSnapshot(name);
				
				this.setActive(name, 'add');

				if (v && v.seconds === this.goldTradingster?.v?.seconds && v.nanoseconds === this.goldTradingster?.v?.nanoseconds) {
					resolve(this.goldTradingsterInfo);
					return;
				}

				if (import.meta.env.DEV) {
					console.log(`reload ${name}`);
				}

				getDocs(
					query(
						collection(getFirestore(), 'goldTradingster'),
						orderBy(documentId(), "desc"),
						limit(2)
					)
				).then(snapshot => {
					if (snapshot.empty) {
						resolve(null);
					} else {
						const data = Object.assign({}, ...snapshot.docs.map(doc => ({
							...doc.data(),
						})));
						delete data.shorten;
						
						this.$patch((state) => {
							state.goldTradingster = {
								v,
								data,
							};
							state.hasChanged = true;
						})

						resolve(this.goldTradingsterInfo);
					}
				})
				.catch(err => {
					console.error(err);
					resolve(null);
				});
			});
		},

		getMyfxbooks () {
			return new Promise(async (resolve) => {
				const name = 'myFxbooksInfo';
				const v = await this.getVersionSnapshot(name);
				
				this.setActive(name, 'add');

				if (v && v.seconds === this.myFxbooks?.v?.seconds && v.nanoseconds === this.myFxbooks?.v?.nanoseconds) {
					resolve(this.myFxbooksInfo);
					return;
				}

				if (import.meta.env.DEV) {
					console.log(`reload ${name}`);
				}

				let docData = null;
				const docRef = doc(getFirestore(), 'goldMyfxbooks', '0000-00-00');
				await getDoc(docRef).then(async (_doc) => {
					if (_doc.exists()) {
						docData = _doc.data();
					}
				}).catch((err) => console.error(err));

				if (!docData) {
					resolve(null);
					return;
				}

				this.$patch((state) => {
					state.myFxbooks = {
						v,
						data: {
							ask_amounts: docData.data.ask_amounts,
							ask_prices: docData.data.ask_prices,
							bid_amounts: docData.data.bid_amounts,
							bid_prices: docData.data.bid_prices,
							current_metric_long: docData.data.current_metric_long,
							current_metric_short: docData.data.current_metric_short,
							sentiment: docData.data.sentiment,
							updated_at: docData.updated_at,
						},
					};
					state.hasChanged = true;
				})

				resolve(this.myFxbooksInfo);
			});
		},
		
		getOpenInterest () {
			return new Promise(async (resolve) => {
				const name = 'openInterestInfo';
				const v = await this.getVersionSnapshot(name);
				
				this.setActive(name, 'add');

				if (v && v.seconds === this.openInterest?.v?.seconds && v.nanoseconds === this.openInterest?.v?.nanoseconds) {
					resolve(this.openInterestInfo);
					return;
				}

				if (import.meta.env.DEV) {
					console.log(`reload ${name}`);
				}

				let docData = null;
				const docRef = doc(getFirestore(), "goldCmegroups", '0000-00-00');
				await getDoc(docRef).then(async (_doc) => {
					if (_doc.exists()) {
						docData = _doc.data();
					}
				}).catch((err) => console.error(err));

				if (!docData) {
					resolve(null);
					return;
				}

				const cmeData = docData.data;
				let categories = Object.keys(cmeData);
				categories = categories.filter(key => key !== 'null');

				const dataCall = [];
				const dataPut = [];
				Object.values(cmeData).forEach((item) => {
					const itemArray = item.split(",");
					dataCall.push(
						itemArray
							.filter((_, index) => index % 2 === 0)
							.reduce((acc, val) => (acc || 0) + parseFloat(val || 0), 0)
					);
					dataPut.push(
						itemArray
							.filter((_, index) => index % 2 !== 0)
							.reduce((acc, val) => (acc || 0) + parseFloat(val || 0), 0)
					);
				});

				// Remove the last element from dataCall, and dataPut because key is null
				dataCall.pop();
				dataPut.pop();

				this.$patch((state) => {
					state.openInterest = {
						v,
						data: {
							categories,
							data: docData.data,
							data_call: dataCall,
							data_put: dataPut,
							header: docData.header,
							updated_at: docData.updated_at,
						},
					};
					state.hasChanged = true;
				})

				resolve(this.openInterestInfo);
			});
		},

		async getVersionSnapshot (name) {
			if (this.snapshotData) {
				return this.snapshotData[name] || null;
			}

			let v = null;
			for (let i = 0; i < 10; i++) {
				await new Promise(resolve => setTimeout(resolve, 100 + i * 100));
				if (this.snapshotData) {
					return this.snapshotData[name] || null;
				}
			}
		},

		goldEtfInit (datas) {
			const currentMonth = [
				{ name: "gld", data: [], },
				{ name: "gld4", data: [], },
				{ name: "gldm", data: [], },
				{ name: "iau", data: [], },
				{ name: "phau", data: [], },
				{ name: "phys", data: [], },
				{ name: "sgln", data: [], },
				{ name: "sgld", data: [], },
				{ name: "sgbs", data: [], },
				{ name: "wgld", data: [], },
				{ name: "gbs", data: [], },
				{ name: "aaau", data: [], },
				{ name: "gbsp", data: [], },
				{ name: "gbse", data: [], },
				{ name: "gold", data: [], },
				{ name: "zgld", data: [], },
				{ name: "xad5", data: [], },
				{ name: "sgol", data: [], },
				{ name: "xad1", data: [], },
				{ name: "jp1540", data: [], },
				{ name: "cgl", data: [], },
			];
			const lastMonth = [
				{ name: "gld", data: [], },
				{ name: "gld4", data: [], },
				{ name: "gldm", data: [], },
				{ name: "iau", data: [], },
				{ name: "phau", data: [], },
				{ name: "phys", data: [], },
				{ name: "sgln", data: [], },
				{ name: "sgld", data: [], },
				{ name: "sgbs", data: [], },
				{ name: "wgld", data: [], },
				{ name: "gbs", data: [], },
				{ name: "aaau", data: [], },
				{ name: "gbsp", data: [], },
				{ name: "gbse", data: [], },
				{ name: "gold", data: [], },
				{ name: "zgld", data: [], },
				{ name: "xad5", data: [], },
				{ name: "sgol", data: [], },
				{ name: "xad1", data: [], },
				{ name: "jp1540", data: [], },
				{ name: "cgl", data: [], },
			];

			let data = datas[1] || {}; // last month data
			let date = new Date(data.id || Date.now());
			date.setMonth(date.getMonth() + 1, 0); // Set to the last day of the month
			let	daysInMonth = date.getDate();
			for (let i = 0; i < daysInMonth; i++) {
				const dateKey = data.id + "-" + (i + 1).toString().padStart(2, '0');
				lastMonth[0].data[i] = parseFloat(data[dateKey]?.['gld']) || null
				lastMonth[1].data[i] = parseFloat(data[dateKey]?.['gld4']) || null
				lastMonth[2].data[i] = parseFloat(data[dateKey]?.['gldm']) || null
				lastMonth[3].data[i] = parseFloat(data[dateKey]?.['iau']) || null
				lastMonth[4].data[i] = parseFloat(data[dateKey]?.['phau']) || null
				lastMonth[5].data[i] = parseFloat(data[dateKey]?.['phys']) || null
				lastMonth[6].data[i] = parseFloat(data[dateKey]?.['sgln']) || null
				lastMonth[7].data[i] = parseFloat(data[dateKey]?.['sgld']) || null
				lastMonth[8].data[i] = parseFloat(data[dateKey]?.['sgbs']) || null
				lastMonth[9].data[i] = parseFloat(data[dateKey]?.['wgld']) || null
				lastMonth[10].data[i] = parseFloat(data[dateKey]?.['gbs']) || null
				lastMonth[11].data[i] = parseFloat(data[dateKey]?.['aaau']) || null
				lastMonth[12].data[i] = parseFloat(data[dateKey]?.['gbsp']) || null
				lastMonth[13].data[i] = parseFloat(data[dateKey]?.['gbse']) || null
				lastMonth[14].data[i] = parseFloat(data[dateKey]?.['gold']) || null
				lastMonth[15].data[i] = parseFloat(data[dateKey]?.['zgld']) || null
				lastMonth[16].data[i] = parseFloat(data[dateKey]?.['xad5']) || null
				lastMonth[17].data[i] = parseFloat(data[dateKey]?.['sgol']) || null
				lastMonth[18].data[i] = parseFloat(data[dateKey]?.['xad1']) || null
				lastMonth[19].data[i] = parseFloat(data[dateKey]?.['jp1540']) || null
				lastMonth[20].data[i] = parseFloat(data[dateKey]?.['cgl']) || null
			};

			for (const item of lastMonth) {
				let latestData = item.data[0];
				let latestIndex = 0;
				for (let i = 0; i < daysInMonth; i++) {
					if (item.data[i] === null) {
						if (latestData === null) {
							continue;
						}

						let j;
						for (j = i + 1; j < daysInMonth; j++) {
							if (item.data[j] !== null) {
								const diff = (item.data[j] - latestData) / (j - latestIndex);
								for (let k = i; k < j; k++) {
									item.data[k] = latestData + diff * (k - latestIndex);
								}
								latestData = item.data[j];
								latestIndex = j;
								i = j - 1; // Skip to the next known value
								break;
							}
						}
						if (j === daysInMonth) {
							for (let k = i; k < daysInMonth; k++) {
								item.data[k] = latestData;
							}
						}
					} else {
						latestData = item.data[i];
						latestIndex = i;
					}
				}
			};

			data = datas[0] || {}; // current month data
			date = new Date(data.id || Date.now());
			date.setMonth(date.getMonth() + 1, 0); // Set to the last day of the month
			daysInMonth = date.getDate();
			for (let i = 0; i < daysInMonth; i++) {
				const dateKey = data.id + "-" + (i + 1).toString().padStart(2, '0');
				currentMonth[0].data[i] = parseFloat(data[dateKey]?.['gld']) || null
				currentMonth[1].data[i] = parseFloat(data[dateKey]?.['gld4']) || null
				currentMonth[2].data[i] = parseFloat(data[dateKey]?.['gldm']) || null
				currentMonth[3].data[i] = parseFloat(data[dateKey]?.['iau']) || null
				currentMonth[4].data[i] = parseFloat(data[dateKey]?.['phau']) || null
				currentMonth[5].data[i] = parseFloat(data[dateKey]?.['phys']) || null
				currentMonth[6].data[i] = parseFloat(data[dateKey]?.['sgln']) || null
				currentMonth[7].data[i] = parseFloat(data[dateKey]?.['sgld']) || null
				currentMonth[8].data[i] = parseFloat(data[dateKey]?.['sgbs']) || null
				currentMonth[9].data[i] = parseFloat(data[dateKey]?.['wgld']) || null
				currentMonth[10].data[i] = parseFloat(data[dateKey]?.['gbs']) || null
				currentMonth[11].data[i] = parseFloat(data[dateKey]?.['aaau']) || null
				currentMonth[12].data[i] = parseFloat(data[dateKey]?.['gbsp']) || null
				currentMonth[13].data[i] = parseFloat(data[dateKey]?.['gbse']) || null
				currentMonth[14].data[i] = parseFloat(data[dateKey]?.['gold']) || null
				currentMonth[15].data[i] = parseFloat(data[dateKey]?.['zgld']) || null
				currentMonth[16].data[i] = parseFloat(data[dateKey]?.['xad5']) || null
				currentMonth[17].data[i] = parseFloat(data[dateKey]?.['sgol']) || null
				currentMonth[18].data[i] = parseFloat(data[dateKey]?.['xad1']) || null
				currentMonth[19].data[i] = parseFloat(data[dateKey]?.['jp1540']) || null
				currentMonth[20].data[i] = parseFloat(data[dateKey]?.['cgl']) || null
			};

			for (const [infoIndex, item] of currentMonth.entries()) {
				let latestData = item.data[0];
				let latestIndex = 0;
				for (let i = 0; i < daysInMonth; i++) {
					if (item.data[i] === null) {
						if (i === 0) {
							latestData = lastMonth[infoIndex].data[lastMonth[infoIndex].data.length - 1] || null;
						}
						if (latestData === null) {
							continue;
						}

						let j;
						for (j = i + 1; j < daysInMonth; j++) {
							if (item.data[j] !== null) {
								const diff = (item.data[j] - latestData) / (j - latestIndex);
								for (let k = i; k < j; k++) {
									item.data[k] = latestData + diff * (k - latestIndex);
								}
								latestData = item.data[j];
								latestIndex = j;
								i = j - 1; // Skip to the next known value
								break;
							}
						}
					} else {
						latestData = item.data[i];
						latestIndex = i;
					}
				}
			};

			return {
				etf_lastMonth: lastMonth,
				etf_currentMonth: currentMonth
			};
		},

		setActive (name, type) { // add, remove
			if (import.meta.env.DEV) {
				console.log(name, type);
			}

			if (type === 'remove') {
				const index = this.active.indexOf(name);
				if (index > -1) {
					this.active.splice(index, 1);
				}
				return;
			}

			if (this.active.includes(name)) {
				return;
			}

			this.active.push(name);
		},

		startSnapshotListener () {
			if (this.snapshotListener) {
				return;
			}
			
			this.getForexFactoryNewsSlug();

			this.snapshotListener = onSnapshot(doc(getFirestore(), "systems", "client_update"), (doc) => {
				if (!doc.exists()) {
					unsubscribe();
					
					return;
				}

				const data = doc.data();
				if (!data) {
					return;
				}

				this.snapshotData = data;

				if (this.active.includes('forexfactoryInfo')) {
					this.getForexFactory();
				}

				if (this.active.includes('goldExnessesInfo')) {
					this.getGoldExnesses();
				}

				if (this.active.includes('goldKitcosAmPmLaser')) {
					this.getGoldKitcosAmPmLaser();
				}

				if (this.active.includes('goldKitcosOpinion')) {
					this.getGoldKitcosOpinion();
				}

				// Active always for display number of notification.
				// if (this.active.includes('goldNewsInfo')) { 
					this.getGoldNews();
				// }

				if (this.active.includes('goldTonInfo')) {
					this.getGoldTon();
				}

				if (this.active.includes('goldTradingsterInfo')) {
					this.getGoldTradingster();
				}

				if (this.active.includes('myFxbooksInfo')) {
					this.getMyfxbooks();
				}

				if (this.active.includes('openInterestInfo')) {
					this.getOpenInterest();
				}

			}, (error) => {
				console.error("Error getting snapshot: ", error);
				this.snapshotListener();
			});
		},
		
		stopSnapshotListener () {
			this.snapshotListener();
			this.snapshotListener = null;
		},
	}
})
