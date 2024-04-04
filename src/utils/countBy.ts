export interface ICountList {
	[key: string]: number;
}

export default function countBy(arr: Array<string | number>) {
	return arr.reduce((acc: ICountList, item) => {
		if (acc[item]) {
			acc[item] += 1;
		} else {
			acc[item] = 1;
		}
		return acc;
	}, {});
}
