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
            className={cn("w-[20%] relative h-full bg-slate-950 flex flex-col items-center py-[20px] transition-all gap-3", !state.stateNavBar && "!w-[10%] max-md:!w-[10%]")}>
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
            <div className={cn("w-full bg-blue-950 h-[35px] absolute bottom-10 grid place-content-center")}>
                <span
                    className={cn("font-semibold text-white whitespace-nowrap max-md:hidden", !state.stateNavBar && "hidden")}>
                    Esconder Barra
                </span>
                <Button
                    onClick={() => state.alterState()}
                    className={cn("h-[45px] w-[45px] bg-blue-600 hover:bg-blue-500 absolute rounded-full -right-[22px] -top-[5px]")}>
                    {state.stateNavBar ? (
                        <PanelRightOpen className="relative w-[20px] h-[20px]"/>
                    ) : (
                        <PanelRightClose className="relative w-[20px] h-[20px]"/>
                    )}
                </Button>
            </div>
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
            <div className={cn("w-[85%]")}>
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
