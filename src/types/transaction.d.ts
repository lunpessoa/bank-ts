type TransactionPayment = 'Cartão de Crédito' | 'Boleto';

type TransactionStatus =
	| 'Paga'
	| 'Recusada pela operadora de cartão'
	| 'Aguardando pagamento'
	| 'Estornada';

interface ITransactionRaw {
	Nome: string;
	ID: number;
	Data: string;
	Status: TransactionStatus;
	Email: string;
	['Valor (R$)']: string;
	['Forma de Pagamento']: TransactionPayment;
	['Cliente Novo']: number;
}

interface ITransaction {
	name: string;
	id: number;
	date: Date;
	status: ITransactionStatus;
	email: string;
	currency: string;
	value: number | null;
	payment: ITransactionPayment;
	new: boolean;
}
