import React from 'react';
import * as Select from '@radix-ui/react-select';
import classnames from 'classnames';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import './Select.scss';
import SelectItem from './SelectItem';

const SelectWrapper = (props: any) => {


    const { items, onOptionClick, label } = props;
    


    return (
        <Select.Root
        onValueChange={(e) => { onOptionClick(label, e)}}
        // onOpenChange={(e) => { console.log(e) }}
    >
        <Select.Trigger className="SelectTrigger" aria-label="Food">
            <Select.Value placeholder='Select a band...'>
            </Select.Value>
            <Select.Icon className="SelectIcon">
                <ChevronDownIcon />
            </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
            <Select.Content className="SelectContent">
                <Select.ScrollUpButton className="SelectScrollButton">
                    <ChevronUpIcon />
                </Select.ScrollUpButton>
                <Select.Viewport className="SelectViewport">
                    <Select.Group>
                        <Select.Label className="SelectLabel">Bands</Select.Label>
                        {items.map((option: { value: string, label: string, color: string }, index: number) => {
                            return (
                                <SelectItem
                                    key={index}
                                    value={option.value}
                                    className={classnames('SelectItem', option.value === 'banana' && 'SelectItem--selected')}
                                    color={option.color}
                                >
                                    {option.label}
                                </SelectItem>
                            );
                        })
                        }
                    </Select.Group>
                    {/* <Select.Separator className="SelectSeparator" /> */}
                </Select.Viewport>
                <Select.ScrollDownButton className="SelectScrollButton">
                    <ChevronDownIcon />
                </Select.ScrollDownButton>
            </Select.Content>
        </Select.Portal>
    </Select.Root >

    )
};


export default SelectWrapper;