'use client'
import { fetchTaskById, fetchTaskCategories } from "@/app/lib/data";
import { TaskCategory } from "@/app/lib/definitions";
import { usePathname } from "next/navigation";

export default async function Layout({ children, params }: { children: React.ReactNode, params: { id: string } }) {
    const pathname = usePathname();

    return (
        <div className="w-full">
            {/* {
                pathname && /^\/tasks\/\d{1,}$/.test(pathname)
                    ? (
                        <div className="flex w-full pl-2 pr-2 justify-center">
                            {params.id}
                        </div>
                    )
                    : <></>
            } */}
            <div className="w-full">
                {children}
            </div>
        </div>
    );
};