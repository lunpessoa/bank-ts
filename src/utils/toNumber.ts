/**
 * Receive string '1.200,50' and return number: 1200.50
 */

export default function currencyToNumber(currency: string): number | null {
	const number = Number(currency.replaceAll('.', '').replace(',', '.'));

	if (isNaN(number)) return null;
	return number;
}
