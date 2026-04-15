"use client"
import { memo, useEffect, useState } from "react";
import { Flex } from "@radix-ui/themes";
import { FaStar } from "react-icons/fa";
import { cn } from "@/lib/utils";

interface RateInterface {
  rate?: number;
  editAble?: boolean;
  onChangeRate?: (newRate: number) => void;
}

function Rate({ rate = 0, editAble = false, onChangeRate = () => { }, }: RateInterface) {

  const [safeRateValue, setSafeRateValue] = useState(0);

    useEffect(() => {
        if (editAble && !rate) {
            setSafeRateValue(5);
        } else {
            const intRateValue = Math.trunc(rate);
            if (intRateValue >= 0 && intRateValue <= 5) {
                setSafeRateValue(intRateValue);
            } else {
                setSafeRateValue(0);
            }
        }
    }, [rate, editAble]);

  const handleOnChangeRate = (newRate: number) => {
    setSafeRateValue(newRate);
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

//*example
//*to use for display only
{
  /* <Rate rate={ 3 } /> */
}

//*to use for edit rate
{
  /* <Rate editAble onChangeRate={(newRate)=>console.log(newRate)} /> */
}

//*to use for display and edit rate in same time
{
  /* <Rate rate={ 3 } editAble onChangeRate={(newRate)=>console.log(newRate)} /> */
}
