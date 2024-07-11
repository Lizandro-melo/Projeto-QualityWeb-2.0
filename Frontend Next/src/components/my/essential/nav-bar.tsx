import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {GalleryHorizontal, GalleryHorizontalEnd, HomeIcon, PanelRightClose, PanelRightOpen, Undo} from "lucide-react";
import {ReactNode, useContext, useEffect, useRef, useState} from "react";
import {stateNavBarGlobal} from "@/lib/globalStates";
import {AuthContext} from "@/contexts/AuthContext";

export const NavBar = {
    Root: NavBarRoot,
    Section: NavBarSection,
    Item: NavBarItem,
    ButtonBack: NavBarButtonBack
};

type NavBarRootProps = {
    children: ReactNode
};

function NavBarRoot({children}: NavBarRootProps) {
    const state = stateNavBarGlobal((state: any) => state);

    return (
        <div
            onMouseOver={() => {
                if (!state.stateNavBar) {
                    state.setBool(true)
                }
            }}
            className={cn("w-[20%] relative h-full bg-slate-950 flex flex-col items-center py-[20px] transition-all gap-3", !state.stateNavBar && "!w-[65px] max-md:!w-[65px]")}>
            <NavBarButtonState/>
            {children}
        </div>
    );
}

function NavBarButtonState() {
    const state = stateNavBarGlobal((state: any) => state);

    return (
        <>
            {state.stateNavBar && (
                <img src="./assets/logo-grupo-quality-branca.png" alt="" className="w-[40%] mb-5 cursor-pointer"
                     onClick={() => location.href = "/home"}/>
            )}

        </>
    );
}

type NavBarSectionProps = {
    title: string;
    children: ReactNode;
    testeRole: boolean | undefined;
};

function NavBarSection({title, children, testeRole}: NavBarSectionProps) {
    if (testeRole) {
        return (
            <div

                className={cn("w-[85%]")}>
                <div
                    className="bg-slate-950 border-none border w-full h-[35px] text-white flex items-center justify-center">
                    <span className="text-xs">{title}</span>
                </div>
                <div className={cn("flex flex-col w-full")}>
                    {children}
                </div>
                <hr className="my-5 border-stone-400"/>
            </div>
        );
    }
    return null;
}

type NavBarItemProps = {
    icon: ReactNode;
    title: string;
    action?: () => void;
    testeRole: boolean | undefined;
};

function NavBarItem({icon, title, action, testeRole}: NavBarItemProps) {
    const state = stateNavBarGlobal((state: any) => state);

    if (testeRole) {
        return (
            <Button
                title={title}
                onClick={action}
                className={cn("bg-slate-950 border-none rounded-none w-full h-[35px] border flex items-center justify-between", !state.stateNavBar && "!justify-center")}>
                {icon}
                {state.stateNavBar && (
                    <span className="font-semibold text-xs text-white whitespace-nowrap">
                        {title}
                    </span>
                )}
            </Button>
        );
    }
    return null;
}

function NavBarButtonBack() {
    const state = stateNavBarGlobal((state: any) => state);

    return (
        <Button
            onClick={() => history.back()}
            className={cn("bg-slate-950 border-none rounded-none w-full h-[35px] border flex items-center justify-between", !state.stateNavBar && "!justify-center")}>
            <Undo/>
            {state.stateNavBar && (
                <span className="font-semibold text-xs text-white whitespace-nowrap">
                    Voltar
                </span>
            )}
        </Button>
    );
}
