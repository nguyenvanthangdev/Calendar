import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { requireUser } from "../lib/hooks";
export default async function DashboardPage() {
  await requireUser();
  return (
    <>
      <div className="flex items-center justify-between px-2">
        <div className="sm:grid gap-1 hidden">
          <h1 className="font-heading text-3xl md:text-4xl">Event Types</h1>
          <p className="text-lg text-muted-foreground">
            Create and manage your event types.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/new">Create New Event</Link>
        </Button>
      </div>
    </>
  );
}
