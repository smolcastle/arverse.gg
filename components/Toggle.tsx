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
      className="p-[1px] border border-black flex items-center flex-shrink-0 h-[16px] w-[28px] rounded-full cursor-pointer transition-colors ease-in-out duration-200"
    >
      <span
        className={classNames(
          props.enabled ? 'translate-x-full' : 'translate-x-0',
          'pointer-events-none inline-block h-[12px] w-[12px] rounded-full bg-black shadow transform ring-0 transition ease-in-out duration-200'
        )}
      />
    </Switch>
  )
}

export default Toggle
