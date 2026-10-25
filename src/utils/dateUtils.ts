import { format, parseISO } from "date-fns";

export function formatTime(isoString: string): string {
  return format(parseISO(isoString), "h:mm a");
}

export function formatFullDate(isoString: string): string {
  return format(parseISO(isoString), "EEEE, d MMMM");
}