import ComingSoon from "../(protected)/ui/users/comingSoon";

const revalidate = 60;
export default async function Page() {
    let url = process.env.BACKEND_URL!+"/api/v1/user/pincode";
    let allData = (await (await fetch(url)).json()).place;

    console.log(allData)

    return <div className="h-screen">
        <ComingSoon area={allData}/>
    </div>
}