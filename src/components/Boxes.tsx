import { Building2, CloudAlert, Loader2 } from "lucide-react";

export const ApiErrorBox = () => {
  return (
    <div className="h-full bg-[rgba(0,0,0,0.1)] text-white rounded-md flex flex-col items-center justify-center gap-1">
      <CloudAlert className="size-6" />
      <span className="text-sm">API Error</span>
    </div>
  )
}

export const CityNotFoundBox = () => {
  return (
    <div className="h-full bg-[rgba(0,0,0,0.1)] text-white rounded-md flex flex-col items-center justify-center gap-1 py-10">
      <Building2 className="size-6" />
      <span className="text-sm">City not foud</span>
    </div>
  )
}

export const LoadingBox = () => {
  return (
    <div className="h-full bg-[rgba(0,0,0,0.1)] text-white rounded-md flex flex-col items-center justify-center gap-1 py-10">
      <Loader2 className="size-6 animate-spin" />
      <span className="text-sm">Loading</span>
    </div>
  )
}