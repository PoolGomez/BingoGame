import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutButton } from "./LogoutButton";
import { useUser } from "@/src/infrastructure/hooks/useUser";
import { LoaderCircle } from "lucide-react";

export function DropDownMenuUser() {
  const user = useUser();
  if (!user) {
    return (
      <Avatar className="h-10 w-10 rounded-lg">
        <AvatarImage src="/images/user.png" alt="user image" />
        <AvatarFallback className="rounded-lg">
          <LoaderCircle className="animate-spin" />
        </AvatarFallback>
      </Avatar>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full">
          <Avatar className="h-10 w-10 rounded-lg">
            <AvatarImage src="/images/user.png" alt="user image" />
            <AvatarFallback className="rounded-lg">PG</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-72 rounded-lg"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5">
            <div className="grid flex-1 text-left text-lg leading-tight">
              <span className="truncate font-semibold">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
