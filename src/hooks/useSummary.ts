import { useTransactionContext } from '../contexts/TransactionsContext'

export function useSummary() {
  const { transactions } = useTransactionContext()

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'income') {
        acc.income += transaction.price || 0
        acc.total += transaction.price || 0
      } else {
        acc.autcome += transaction.price || 0
        acc.total -= transaction.price || 0
      }

      return acc
    },
    {
      income: 0,
      autcome: 0,
      total: 0,
    },
  )
  return summary
}
