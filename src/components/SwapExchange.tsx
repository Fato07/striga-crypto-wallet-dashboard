import React from 'react'

const SwapExchange = () => {
 return (
  <div>
   {/* Swap Exchange */}
   <section className="py-6 px-6">
    <h2 className="text-xl font-bold mb-4">Swap Exchange</h2>
    <form className="space-y-4">
     <div className="grid grid-cols-2 gap-4">
      <div className="space-y-4">
       {/* From Currency Form */}
       <label htmlFor="fromCurrency" className="block text-sm font-medium">From Currency</label>
       <select
        id="fromCurrency"
        className="w-full border-2 rounded p-2 mt-1"
       >
        {/* List of available currencies */}
        <option value="BTC">BTC</option>
        <option value="BNB">BNB</option>
        {/* Add other currency options */}
       </select>

       <label htmlFor="fromAmount" className="block text-sm font-medium">Amount</label>
       <input
        id="fromAmount"
        type="number"
        className="w-full border-2 rounded p-2 mt-1"
        placeholder="Enter amount"
       />
      </div>
      <div className="space-y-4">
       {/* To Currency Form */}
       <label htmlFor="toCurrency" className="block text-sm font-medium">To Currency</label>
       <select
        id="toCurrency"
        className="w-full border-2 rounded p-2 mt-1"
       >
        {/* List of available currencies */}
        <option value="BTC">BTC</option>
        <option value="BNB">BNB</option>
        {/* Add other currency options */}
       </select>

       <label htmlFor="toAmount" className="block text-sm font-medium">Amount</label>
       <input
        id="toAmount"
        type="number"
        className="w-full border-2 rounded p-2 mt-1"
        placeholder="Enter amount"
        readOnly
       />
      </div>
     </div>
     <button type="submit" className="w-full mt-4 bg-green-500 text-white font-semibold py-2 rounded">
      Swap
     </button>
    </form>
   </section>
  </div>
 )
}

export default SwapExchange