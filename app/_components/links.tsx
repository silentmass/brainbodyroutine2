'use client'

import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

export function Links() {
    const pathname = usePathname();

    return (
        <div className="flex flex-col w-full justify-center items-center p-2 gap-y-1">
            <div className="flex w-full items-center justify-center pl-8 pr-8">
                <nav>
                    <ul className="flex gap-2 pt-1 pb-1">
                        <li>
                            <Link
                                className={`link ${clsx({
                                    "active": pathname === "/",
                                    "": pathname !== "/",
                                })}`}
                                href="/"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={`link ${clsx({
                                    "active": pathname && (/^\/tasks$|^\/tasks\//).test(pathname),
                                    "": pathname !== "/tasks",
                                })}`}
                                href={"/tasks"}
                            >
                                Tasks
                            </Link>
                        </li>
                    </ul>
                </nav>

            </div>
            <div className="w-full bg-gray-50 h-[2px]"></div>
        </div>

    );
};