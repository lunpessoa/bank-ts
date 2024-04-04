import currencyToNumber from '@/utils/toNumber';
import toDate from '@/utils/toDate';

export default function normalizeTransaction(transaction: ITransactionRaw): ITransaction {
	return {
		name: transaction.Nome,
		id: transaction.ID,
		date: toDate(transaction.Data),
		status: transaction.Status,
		email: transaction.Email,
		currency: transaction['Valor (R$)'],
		value: currencyToNumber(transaction['Valor (R$)']),
		payment: transaction['Forma de Pagamento'],
		new: Boolean(transaction['Cliente Novo']),
	};
}
