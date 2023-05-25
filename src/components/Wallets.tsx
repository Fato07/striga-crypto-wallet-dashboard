import React from 'react'

const Wallets = () => {

 const wallets = [
  { id: 1, name: 'name1' },
  { id: 2, name: 'name2' }]

 return (
  <div>{/* Wallets List */}
   <section className="py-6 px-6">
    <h2 className="text-xl font-bold mb-4">Your Wallets</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
     {wallets.map((wallet) => (
      <div key={wallet.id} className="border rounded p-4 shadow-md">
       <h3 className="text-lg font-semibold mb-2">{wallet.name}</h3>
       {/* Currency balances */}
      </div>
     ))}
    </div>
   </section>
   {/* Create Wallet */}
   <section className="py-6 px-6">
    <h2 className="text-xl font-bold mb-4">Create Wallet</h2>
    <form className="space-y-4">
     <div>
      <label htmlFor="walletName" className="block text-sm font-medium">Wallet Name</label>
      <input
       id="walletName"
       type="text"
       className="w-full border-2 rounded p-2 mt-1"
       placeholder="Enter wallet name"
      />
     </div>
     <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 rounded">
      Create Wallet
     </button>
    </form>
   </section>
  </div>
 )
}

export default Wallets