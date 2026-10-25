import { Button } from "@/components/ui/button";

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 text-center">
      <p className="text-4xl">⚠️</p>
      <h2 className="mt-3 text-lg font-semibold">Couldn't load weather data</h2>
      <p className="mt-1 text-sm text-muted-foreground">{message}</p>
      <Button className="mt-4" onClick={onRetry}>
        Try again
      </Button>
    </div>
  );
}