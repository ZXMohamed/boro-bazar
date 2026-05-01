import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

interface ProfileCardBaseProps {
  title: string;
  subTitle: string;
  children: React.ReactNode;
}

interface WithButton {
  hasButton: true;
  buttonLabel: string;
  dialogTitle: string;
  dialogDescription?: string;
  dialogContent: React.ReactNode;
}

interface WithoutButton {
  hasButton?: false;
  buttonLabel?: never;
  dialogTitle?: never;
  dialogDescription?: never;
  dialogContent?: never;
}

type ProfileCardProps = ProfileCardBaseProps & (WithButton | WithoutButton);

const ProfileCard = ({
  title,
  subTitle,
  children,
  hasButton,
  buttonLabel,
  dialogTitle,
  dialogDescription,
  dialogContent,
}: ProfileCardProps) => {
  return (
    <div className="rounded-xl border bg-white">
      <div className="flex items-center justify-between gap-4 border-b px-4 py-6">
        <div className="flex flex-col gap-1">
          <span className="text-lg font-medium opacity-70">{title}</span>
          <p className="text-sm font-normal opacity-60">{subTitle}</p>
        </div>

        {hasButton && (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="text-primary border-primary shrink-0"
              >
                {buttonLabel}
              </Button>
            </DialogTrigger>
            <DialogContent className="lg:min-w-2xl md:min-w-xl">
              <DialogHeader>
                <DialogTitle>{dialogTitle}</DialogTitle>
                {dialogDescription && (
                  <DialogDescription>{dialogDescription}</DialogDescription>
                )}
              </DialogHeader>
              {dialogContent}
            </DialogContent>
          </Dialog>
        )}
      </div>

      {children}
    </div>
  );
};

export default ProfileCard;