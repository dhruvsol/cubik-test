import { PrismaClient } from "database";

export default async function Page({
  searchParams,
}: Record<string, string | string[] | undefined>): Promise<JSX.Element> {
  const userid =
    typeof searchParams.userid === "string" ? searchParams.userid : "";

  const prisma = new PrismaClient();

  const user = await prisma.user.findUnique({
    where: { id: userid },
    select: {
      username: true,
      bio: true,
      DOB: true,
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-slate-950 p-24">
      <div className="flex w-full max-w-5xl items-center justify-between font-mono text-sm">
        <div className="flex w-full flex-col">
          <h1 className="mb-10 text-center text-4xl font-bold text-gray-400">
            User Details
          </h1>
          <div className="bg-slate-900 p-10">{JSON.stringify(user)}</div>
        </div>
      </div>
    </main>
  );
}
