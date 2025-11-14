import { FaWallet } from "react-icons/fa"

const Card = ({ active, title, value }) => {
  return (
    <div className={`bg-card text-card-foreground flex items-center gap-6 rounded-xl border p-6 shadow-sm ${ active ? "!bg-[#363A3F] !text-[background]" : "" }`}>
        <div className={`rounded-full bg-sidebar-accent p-4 ${ active ? "!bg-[#4E5257]" : ""}`}><FaWallet className={`text-[--text-1] ${active ? "!text-primary" : ""}`}/></div>
        <div className="flex flex-col gap-2">
            <div className="text-sm opacity-70 font-light">{title}</div>
            <div className="text-3xl font-semibold">{value}</div>
        </div>
    </div>
  )
}

export default Card