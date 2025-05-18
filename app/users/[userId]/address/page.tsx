
import UserLocation from "@/app/ui/users/user-location";

export default async function Page({params}:{params:Promise<{userId:string}>}) {
  const paramValue= (await params);
  const userId = paramValue.userId; 

  return (
    <div className="h-screen overflow-hidden">
      <UserLocation userId={userId} />
    </div>
  );
}
