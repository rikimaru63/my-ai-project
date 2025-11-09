export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold">Card Shop International</h1>
        <p className="text-lg">Premium Trading Cards Worldwide</p>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
          <h2 className="mb-3 text-2xl font-semibold">
            Pokemon Cards
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Latest Japanese Pokemon TCG cards and exclusive sets
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
          <h2 className="mb-3 text-2xl font-semibold">
            One Piece Cards
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            One Piece Card Game singles and booster boxes
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
          <h2 className="mb-3 text-2xl font-semibold">
            Dragon Ball Super
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Dragon Ball Super Card Game collection
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
          <h2 className="mb-3 text-2xl font-semibold">
            Graded Cards
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            PSA and BGS graded cards with authentication
          </p>
        </div>
      </div>
    </main>
  )
}