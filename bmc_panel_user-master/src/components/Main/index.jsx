import Header from '../Header'

export default function Main({children}){
  return (
    <div>
      <Header/>
      {children}
    </div>
  )
}