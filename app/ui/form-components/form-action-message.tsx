import clsx from "clsx";

export default function FormActionStateMessage({ state }: { state: any }) {
    return (
        <>
            <p className={`${clsx({
                "hidden": state?.message === "",
                "": state?.message !== "",
            })}`}>{state?.message}</p>
            <p aria-live="polite" className="sr-only" >
                {state?.message}
            </p>
        </>
    );
}