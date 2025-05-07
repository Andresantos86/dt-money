import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Transaction } from '../model/Transaction'
import { api } from '../lib/axios'

interface TransactionContextType {
  transactions: Transaction[]
  fatchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: Transaction) => Promise<void>
}

interface TransactionsproviderProps {
  children: ReactNode
}

const TransactionContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionsproviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function fatchTransactions(query?: string) {
    const response = await api.get('/transactions', {
      params: {
        _sort: 'createAt',
        _order: 'desc',
        q: query,
      },
    })
    setTransactions(response.data)
  }

  async function createTransaction(data: Transaction) {
    const response = await api.post('/transactions', {
      ...data,
      createdAt: new Date(),
    })
    setTransactions((state) => [response.data, ...state])
  }

  useEffect(() => {
    fatchTransactions()
  }, [])
  return (
    <TransactionContext.Provider
      value={{ transactions, fatchTransactions, createTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  )
}

export const useTransactionContext = () => {
  const context = useContext(TransactionContext)
  return context
}
