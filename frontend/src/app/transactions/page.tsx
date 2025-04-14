"use client"

import React from 'react'
import Transactions from '../components/dashboard/Transactions'

const TransactionsPage = () => {
    return (
        <div className="min-h-[90vh] p-4 flex flex-col">
            <Transactions />
        </div>
    )
}

export default TransactionsPage
