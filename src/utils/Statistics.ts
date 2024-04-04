import countBy from './countBy';

function filterValue(transaction: ITransaction): transaction is ITransaction & { value: number } {
	return transaction.value !== null;
}

export default class Statistics {
	private transactions;
	public total;
	public payment;
	public status;
	public weekStatus;
	public bestDay;

	constructor(transactions: ITransaction[]) {
		this.transactions = transactions;
		this.total = this.setTotal();
		this.payment = this.setPayment();
		this.status = this.setStatus();
		this.weekStatus = this.setWeekStatus();
		this.bestDay = this.setBestDay();
	}

	private setTotal() {
		return this.transactions.filter(filterValue).reduce((acc, item) => acc + item.value, 0);
	}

	private setPayment() {
		return countBy(this.transactions.map(({ payment }) => payment));
	}

	private setStatus() {
		return countBy(this.transactions.map(({ status }) => status));
	}

	private setWeekStatus() {
		const week = {
			['Domingo']: 0,
			['Segunda']: 0,
			['Terça']: 0,
			['Quarta']: 0,
			['Quinta']: 0,
			['Sexta']: 0,
			['Sábado']: 0,
		};

		this.transactions.forEach((transaction) => {
			const day = transaction.date.getDay();
			if (day === 0) week.Domingo += 1;
			if (day === 1) week.Segunda += 1;
			if (day === 2) week.Terça += 1;
			if (day === 3) week.Quarta += 1;
			if (day === 4) week.Quinta += 1;
			if (day === 5) week.Sexta += 1;
			if (day === 6) week.Sábado += 1;
		});
		return week;
	}

	private setBestDay() {
		return Object.entries(this.weekStatus).sort((a, b) => {
			return b[1] - a[1];
		})[0];
	}
}
