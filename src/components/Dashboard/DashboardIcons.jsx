import { createIcon } from "@chakra-ui/react";

export const IncomeIcon = createIcon({
  displayName: "IncomeIcon",
  viewBox: "0 0 24 24",
  path: (
    <path
      fill="currentColor"
      d="M12 2L4 10h3v8h10v-8h3L12 2zm1 10h-2v6h2v-6z"
    />
  ),
});

export const ExpenseIcon = createIcon({
  displayName: "ExpenseIcon",
  viewBox: "0 0 24 24",
  path: (
    <path
      fill="currentColor"
      d="M12 22l8-8h-3V6H7v8H4l8 8zm-1-10h2V8h-2v4z"
    />
  ),
});

export const BalanceIcon = createIcon({
  displayName: "BalanceIcon",
  viewBox: "0 0 24 24",
  path: (
    <path
      fill="currentColor"
      d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"
    />
  ),
}); 