import React, { useId } from "react";
import { Button } from "../ui/button";
import { AddressT } from "@/types/address";


function AddressCard({ address: { type = "home", fullName = "", street = "", city = "", state = "", country = "", phone = "" } }: { address: AddressT }) {
  const addressRadioInputId = useId();
  return (
    <div className="flex overflow-hidden rounded-lg border">
      <label
        htmlFor={addressRadioInputId}
        className="bg-accent has-checked:bg-secondary flex w-full cursor-pointer items-start justify-between gap-y-2 p-5 max-md:flex-wrap"
      >
        <input
          type="radio"
          name="address"
          id={addressRadioInputId}
          className="accent-primary bg-accent mt-0.5 h-7 w-7"
        />
        <div className="flex w-full grow flex-col gap-y-1 px-3">
          <span className="text-secondary-text text-[14px] capitalize">{type}</span>
          <h2 className="text-primary-text text-[16px]">{fullName}</h2>
          <p className="text-primary-text max-w-72.5 text-[14px]">{`${street} ${city} ${state} ${country}`}</p>
          <p className="text-primary-text w-72.5 text-[14px]">{phone}</p>
        </div>
        <Button
          variant={"ghost"}
          className="text-primary h-auto w-auto py-0 text-[14px] font-bold"
        >
          EDIT
        </Button>
      </label>
    </div>
  );
}

export default AddressCard;
