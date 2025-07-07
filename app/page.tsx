
import { Metadata } from "next";
import { NotificationManager } from "./ui/notificationManager/notificationManager";


export async function generateMetadata():Promise<Metadata> {
  return {
    title:"Quikcrats",
    description:"Quikcrats | Ecommerce"
  }
}

export default function Home() {

        return (
                <NotificationManager />
        );
}
