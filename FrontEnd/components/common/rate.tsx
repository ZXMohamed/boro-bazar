"use client";

import { cn } from "@/lib/utils";
import { Flex } from "@radix-ui/themes";
import { memo, useState } from "react";
import { FaStar } from "react-icons/fa";

interface RateInterface {
  rate?: number;
  editAble?: boolean;
  onChangeRate?: (newRate: number) => void;
}

function Rate({
  rate = 0,
  editAble = false,
  onChangeRate = () => {},
}: RateInterface) {
  // 🔥 initialize once instead of syncing with effect
  const getSafeRate = (value: number) => {
    const intRateValue = Math.trunc(value);
    if (intRateValue >= 0 && intRateValue <= 5) return intRateValue;
    return 0;
  };

  const [localRate, setLocalRate] = useState(() => {
    if (editAble && !rate) return 5;
    return getSafeRate(rate);
  });

  // 🔥 decide which value to use
  const safeRateValue = editAble ? localRate : getSafeRate(rate);

  const handleOnChangeRate = (newRate: number) => {
    setLocalRate(newRate);
    onChangeRate(newRate);
  };

  return editAble ? (
    <Flex className="[&:hover>svg]:text-rate [&:hover>svg]:fill-rate items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <FaStar
          key={index}
          size={16}
          className={cn(
            "hover:text-rate hover:fill-rate [&:hover~svg]:text-muted-rate [&:hover~svg]:fill-muted-rate cursor-pointer hover:scale-120",
            index + 1 <= safeRateValue
              ? "text-rate fill-rate"
              : "text-muted-rate fill-muted-rate",
          )}
          onClick={() => handleOnChangeRate(index + 1)}
        />
      ))}
    </Flex>
  ) : (
    <Flex className="items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <FaStar
          key={index}
          size={16}
          className={cn(
            index + 1 <= safeRateValue
              ? "text-rate fill-rate"
              : "text-muted-rate fill-muted-rate",
          )}
        />
      ))}
    </Flex>
  );
}

export default memo(Rate);

/**
 * Rate Component
 *
 * A reusable star rating component that supports both display and interactive modes.
 *
 * 🔹 Modes:
 * - Read-only mode (default): Displays a static rating based on the `rate` prop.
 * - Editable mode (`editAble = true`): Allows users to select a rating by clicking on stars.
 *
 * 🔹 Behavior:
 * - Accepts a rating value from 0 to 5.
 * - Values are normalized (floored and clamped between 0–5).
 * - In editable mode:
 *    - If no `rate` is provided, defaults to 5 stars.
 *    - Uses internal state to manage user interaction.
 *    - Calls `onChangeRate` when user selects a new rating.
 *
 * 🔹 Props:
 * @param {number} rate - Initial rating value (0–5). Used for display or initial state.
 * @param {boolean} editAble - Enables interactive mode when true.
 * @param {(newRate: number) => void} onChangeRate - Callback fired when user selects a new rating.
 *
 * 🔹 Notes:
 * - This is a hybrid controlled/uncontrolled component:
 *    - Controlled when used in read-only mode.
 *    - Locally controlled when `editAble` is enabled.
 * - Does NOT sync with external `rate` changes after mount in editable mode.
 *
 * 🔹 Usage Examples:
 *
 * // Display only
 * <Rate rate={3} />
 *
 * // Editable only (default starts at 5)
 * <Rate editAble onChangeRate={(rate) => console.log(rate)} />
 *
 * // Display + Editable (initial value = 3)
 * <Rate rate={3} editAble onChangeRate={(rate) => console.log(rate)} />
 */
