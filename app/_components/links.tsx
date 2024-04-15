'use client'

import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

export function Links() {
    const pathname = usePathname();

    return (
        <nav>
            <ul className="flex gap-5 pt-5 pb-5 border-b">
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
                            "active": pathname === "/task-categories",
                            "": pathname !== "/task-categories",
                        })}`}
                        href={"/task-categories"}
                    >
                        Task categories
                    </Link>
                </li>
                <li>
                    <Link
                        className={`link ${clsx({
                            "active": pathname === "/tasks",
                            "": pathname !== "/tasks",
                        })}`}
                        href={"/tasks"}
                    >
                        Tasks
                    </Link>
                </li>
            </ul>
        </nav>
    );
};