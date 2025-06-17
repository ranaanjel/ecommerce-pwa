export default async function Page({params}:{params:Promise<{itemName:string}>}) {
    let value = (await params).itemName;
    return <div>{value}</div>

    

}