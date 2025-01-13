import React from 'react'
import { AllDestinaitonBanner, PackageCard } from '../../components'

const AllPackages = () => {
  return (
    <main className='container'>
      <AllDestinaitonBanner/>
    <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
      {[1,2,3].map((item) => (
        <PackageCard key={item} />
      ))}
    </div>
    </main>
  )
}

export default AllPackages
