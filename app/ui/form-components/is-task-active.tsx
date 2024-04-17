export const IsTaskActive = ({ isActiveValue }: { isActiveValue: boolean }) => (
    isActiveValue
        ? <input
            type="checkbox"
            name="taskIsActive"
            id="taskIsActive"
            className={`h-full w-full`}
            required
            defaultChecked
        />
        : <input
            type="checkbox"
            name="taskIsActive"
            id="taskIsActive"
            className={`bg-transparent border`}
            required
        />
);