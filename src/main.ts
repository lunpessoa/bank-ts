import '@/assets/styles/index.css';
import fetchData from './utils/fetchData.ts';
import normalizeTransaction from './utils/normalizers/transaction.ts';
import Statistics from './utils/Statistics.ts';
import { ICountList } from './utils/countBy.ts';

async function handleData() {
	const data = await fetchData<ITransactionRaw[]>('https://api.origamid.dev/json/transacoes.json?');
	if (!data) return;

	const transactions = data.map(normalizeTransaction);
	fillTable(transactions);
	fillStatistics(transactions);
}

handleData();

function fillList(arr: ICountList, containerId: string) {
	const containerEl = document.getElementById(containerId);

	if (!containerEl) return;

	Object.entries(arr).forEach(([key, value]) => {
		containerEl.innerHTML += `
			<p>${key}: ${value}</p>
		`;
	});
}

function fillStatistics(transactions: ITransaction[]): void {
	const statistics = new Statistics(transactions);

	const totalEl = document.querySelector<HTMLElement>('#total span');
	const bestDayEl = document.querySelector<HTMLElement>('#best-day span');
	if (!totalEl || !bestDayEl) return;

	totalEl.innerText = statistics.total.toLocaleString('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	});

	bestDayEl.innerText = statistics.bestDay[0];

	fillList(statistics.payment, 'payment');
	fillList(statistics.status, 'status');
}

function fillTable(transactions: ITransaction[]): void {
	const table = document.querySelector('#transactions tbody');
	if (!table) return;
	transactions.forEach((transaction) => {
		table.innerHTML += `
			<tr>
				<td>${transaction.name}</td>
				<td>${transaction.email}</td>
				<td>R$ ${transaction.currency}</td>
				<td>${transaction.payment}</td>
				<td>${transaction.status}</td>
			</tr>
		`;
	});
}
