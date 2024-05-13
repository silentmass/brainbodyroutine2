export const IsTaskActive = ({ isActiveValue }: { isActiveValue: boolean }) =>
  isActiveValue ? (
    <input
      type='checkbox'
      name='taskIsActive'
      id='taskIsActive'
      className={`flex`}
      defaultChecked
    />
  ) : (
    <input
      type='checkbox'
      name='taskIsActive'
      id='taskIsActive'
      className={`flex`}
    />
  )
