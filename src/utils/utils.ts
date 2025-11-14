import { Grades } from "../types";

export function calcolaMedia(gradesData: Grades): number {
	if (!gradesData.grades || gradesData.grades.length === 0) {
		return -1;
	}

	const votiValidi = gradesData.grades
		.map((g) => g.decimalValue)
		.filter((v): v is number => v !== null && !isNaN(v));

	if (votiValidi.length === 0) {
		return -1;
	}

	const somma = votiValidi.reduce((r, v) => r + v, 0);

	return Math.round((somma / votiValidi.length) * 10) / 10;
}

export function markColor(mark: any) {
	return mark == null
		? "#18b2ff"
		: mark >= 5 && mark < 6
		? "#ff7418"
		: mark < 5
		? "#ff4d4d"
		: "#3ce339";
}

export function markBgColor(mark: any) {
	return mark == null
		? "#18b2ff5c"
		: mark >= 5 && mark < 6
		? "#ff7418aa"
		: mark < 5
		? "#ff4d4da2"
		: "#3ce339aa";
}
