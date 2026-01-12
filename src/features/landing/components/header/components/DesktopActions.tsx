import { Button } from "@/core/components/ui/button";
import { LangSwitcher } from "../lang-switcher";

interface DesktopActionsProps {
    bookNowText: string;
    onBookNowClick?: () => void;
}

export const DesktopActions = ({
    bookNowText,
    onBookNowClick
}: DesktopActionsProps) => {
    return (
        <div className="hidden md:flex items-center gap-4">
            <LangSwitcher isScrolled={true} />
            <Button
                variant="outline"
                className="rounded-full px-6 font-medium uppercase text-xs tracking-wider border-jet/20 text-jet hover:bg-jet hover:text-sand transition-all"
                onClick={onBookNowClick}
            >
                {bookNowText}
            </Button>
        </div>
    );
};