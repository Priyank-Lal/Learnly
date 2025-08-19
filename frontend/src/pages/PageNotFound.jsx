
const PageNotFound = () => {
  return (
    <>
    <div className='top-[50%] left-[50%] absolute translate-x-[-50%] translate-y-[-50%] text-center grid gap-4'>
        <h1 className='text-5xl text-red-400 animate-pulse'>404 - Page Not Found</h1>
        <p className='text-xl text-gray-600'>The page you are looking for does not exist.</p>
    </div>
    </>
  )
}

export default PageNotFound