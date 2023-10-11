import { Button } from "ui";

export default function Page(): JSX.Element {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex space-x-6">
        <Button>Button</Button>
        <Button variant="secondary">Button</Button>
      </div>
    </main>
  );
}
