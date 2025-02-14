import { auth } from "@app/server/auth";
import { api, HydrateClient } from "@app/trpc/server";
import { SingleApply } from "@app/components/single-apply";
import type { Application, User } from "@prisma/client";
import { FoundPreviousApplication } from "@app/components/found-previous-application";
import { LoginToKeepTrack } from "@app/components/login-to-keep-track";

export default async function ApplyNow() {
  const session = await auth();
  let application: (Application & { createdBy: User }) | null = null;

  if (session?.user) {
    application = await api.application.getUserApplication();
  }

  return (
    <HydrateClient>
      <main className='flex flex-col gap-4'>
        {application && <FoundPreviousApplication application={application} />}
        {!session?.user && <LoginToKeepTrack />}
        <SingleApply application={null} />
      </main>
    </HydrateClient>
  );
}
