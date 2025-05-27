export function TopBar({children}:{children:React.ReactElement}
){
    return <div className="bg-white w-full border-b border-gray-200 flex items-center px-8 py-4 ">
        {children}
    </div>
}