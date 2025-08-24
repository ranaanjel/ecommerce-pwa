import RegistrationDetails from "@/app/(protected)/ui/users/registration-details";

export default async function Page({ params }: { params: Promise<{ userId: string }> }) {
  const userId = (await params).userId;

  

  return (
    <div className="max-h-screen pt-4">
      <RegistrationDetails userId={userId} />
    </div>
  );
}
