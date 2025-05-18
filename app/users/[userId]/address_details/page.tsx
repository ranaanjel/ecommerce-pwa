"use client";

import { useSearchParams, useParams } from "next/navigation";
import AddressDetails from "@/app/ui/users/address-details";

export default function Page() {
  const searchParams = useSearchParams();
  const params:{userId:string} = useParams();
  const address = searchParams.get("value") || "";

  return (
    <div className="h-screen">
      <AddressDetails userId={params.userId} address={address} />
    </div>
  );
}
