import clsx from "clsx";

export default function FormActionStateMessage({ state }: { state: any }) {
    return (
        <>
            <p className={`flex w-full justify-center items-center p-1 text-xs text-gray-400 font-mono ${clsx({
                "hidden": state?.message === "",
                "": state?.message !== "",
            })}`}>{state?.message}{state?.responseDuration ? ` | Took: ${Math.round(state?.responseDuration * 1000) / 1000} ms` : ""}</p>
            <p aria-live="polite" className="sr-only" >
                {state?.message}
            </p>
        </>
    );
}