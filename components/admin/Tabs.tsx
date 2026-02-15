'use client';

import { Tab } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';

interface TabItem {
    name: string;
    icon?: ReactNode;
}

interface TabsProps {
    tabs: TabItem[];
    children: ReactNode[];
}

export default function Tabs({ tabs, children }: TabsProps) {
    return (
        <Tab.Group>
            <Tab.List className="flex space-x-2 rounded-xl bg-background-secondary p-1 mb-6 overflow-x-auto">
                {tabs.map((tab, index) => (
                    <Tab key={index} as={Fragment}>
                        {({ selected }) => (
                            <button
                                className={`
                                    flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg
                                    transition-all duration-200 whitespace-nowrap
                                    ${selected
                                        ? 'bg-primary text-primary-foreground shadow'
                                        : 'text-foreground hover:bg-background hover:text-foreground'
                                    }
                                `}
                            >
                                {tab.icon}
                                {tab.name}
                            </button>
                        )}
                    </Tab>
                ))}
            </Tab.List>
            <Tab.Panels>
                {children.map((child, index) => (
                    <Tab.Panel key={index}>
                        {child}
                    </Tab.Panel>
                ))}
            </Tab.Panels>
        </Tab.Group>
    );
}
