import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
    return <div className="w-full h-full flex items-center justify-center">
            <Spinner size="50"/>;
        </div>
}
