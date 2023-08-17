import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <div className="flex gap-4">
        <Button asChild variant="secondary" className="pl:3">
          <Link href="/wine">Wine</Link>
        </Button>{" "}
        {/* <Button asChild variant="secondary" className="pl:3">
          <Link href="/cellar">Cellar</Link>
        </Button> */}
      </div>
    </div>
  );
}
