import { Switch } from '@headlessui/react'
import classNames from 'utils/classNames'

type Props = {
  enabled: boolean
  onChange: any
}

const Toggle = (props: Props) => {
  return (
    <Switch
      checked={props.enabled}
      onChange={props.onChange}
      className={classNames(
        'p-[1px] border flex items-center flex-shrink-0 h-[16px] w-[28px] rounded-full cursor-pointer transition-colors ease-in-out duration-200',
        props.enabled ? 'border-red' : 'border-black'
      )}
    >
      <span
        className={classNames(
          props.enabled ? 'bg-red translate-x-full' : 'bg-black translate-x-0',
          'pointer-events-none inline-block h-[12px] w-[12px] rounded-full shadow transform ring-0 transition ease-in-out duration-200'
        )}
      />
    </Switch>
  )
}

export default Toggle
