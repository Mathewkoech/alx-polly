// Utility function for conditionally joining classNames
// Source: https://ui.shadcn.com/docs/installation (recommended by Shadcn)

export function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
