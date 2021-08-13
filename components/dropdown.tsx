import * as React from 'react';
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface Item {
  value: string;
  displayName: string;
}

interface Props {
  items: Item[];
  onChange: (value: string) => void;
}

const Dropdown = ({items, onChange}: Props): JSX.Element => {
  const [selected, setSelected] = React.useState(items[0]);

  const updateSelected = (item: Item) => {
    setSelected(item);
    onChange(item.value);
  }

  return (
    <Menu as="div" className="relative inline-block text-left py-2">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          {selected.displayName} 
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-left absolute left-1 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="py-1">
            {items.map(item => (
              <Menu.Item key={item.value}>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                    onClick={() => {updateSelected(item)}}
                  >
                    {item.displayName}
                  </a>
                )}
              </Menu.Item>
            ))} 
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
};

export default Dropdown;
