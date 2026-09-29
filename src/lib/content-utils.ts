import type { EventDate, PublicationStatus } from "@/types/content";

export function isPublished(status: PublicationStatus): boolean {
  return status === "published";
}

export function isValidDateValue(date: EventDate | undefined): boolean {
  if (!date) {
    return true;
  }

  const { value, precision } = date;

  if (!value.trim()) {
    return false;
  }

  switch (precision) {
    case "year":
      return /^\d{4}$/.test(value);

    case "month":
      return /^\d{4}-(0[1-9]|1[0-2])$/.test(value);

    case "day":
      return (
        /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(value) &&
        new Date(value + "T00:00:00Z").toISOString().slice(0, 10) === value
      );

    case "datetime":
      return !Number.isNaN(Date.parse(value));

    default:
      return false;
  }
}

export function getSortableDateValue(date: EventDate | undefined): number {
  if (!date || !isValidDateValue(date)) {
    return Number.NEGATIVE_INFINITY;
  }

  switch (date.precision) {
    case "year":
      return Date.parse(`${date.value}-01-01T00:00:00Z`);

    case "month":
      return Date.parse(`${date.value}-01T00:00:00Z`);

    case "day":
      return Date.parse(`${date.value}T00:00:00Z`);

    case "datetime":
      return Date.parse(date.value);

    default:
      return Number.NEGATIVE_INFINITY;
  }
}

export function compareDatesDescending(
  first: EventDate | undefined,
  second: EventDate | undefined,
): number {
  const a = getSortableDateValue(first),
    b = getSortableDateValue(second);
  return a === b ? 0 : b - a;
}

export function compareDatesAscending(
  first: EventDate | undefined,
  second: EventDate | undefined,
): number {
  const a = getSortableDateValue(first),
    b = getSortableDateValue(second);
  return a === b ? 0 : a - b;
}

export function formatEventDate(
  date: EventDate | undefined,
  locale = "fr-BI",
): string | null {
  if (!date || !isValidDateValue(date)) {
    return null;
  }

  const parsedDate = new Date(getSortableDateValue(date));

  switch (date.precision) {
    case "year":
      return new Intl.DateTimeFormat(locale, {
        year: "numeric",
        timeZone: "UTC",
      }).format(parsedDate);

    case "month":
      return new Intl.DateTimeFormat(locale, {
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      }).format(parsedDate);

    case "day":
      return new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      }).format(parsedDate);

    case "datetime":
      return new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: date.timezone ?? "UTC",
      }).format(parsedDate);

    default:
      return null;
  }
}

export function compareDisplayOrder(
  first: { displayOrder: number },
  second: { displayOrder: number },
): number {
  return first.displayOrder - second.displayOrder;
}
