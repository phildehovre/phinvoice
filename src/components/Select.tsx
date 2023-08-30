import * as Select from "@radix-ui/react-select";
import classnames from "classnames";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import "./Select.scss";
import SelectItem from "./SelectItem";
import { Entity } from "../types";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const SelectWrapper = (props: {
  items: Entity[];
  onOptionClick: (label: string, value: string) => void;
  label: string;
  typeahead?: boolean;
  query?: string;
  setQuery?: (value: string) => void;
}) => {
  const { items, onOptionClick, label } = props;

  const navigate = useNavigate();

  return (
    <Select.Root
      onValueChange={(e) => {
        onOptionClick(label, e);
      }}
      // onOpenChange={(e) => { console.log(e) }}
    >
      <Select.Trigger className="SelectTrigger" aria-label="Food">
        <Select.Value placeholder="Select a band..."></Select.Value>
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
            <Select.Group className="SelectGroup">
              {/* {
                            typeahead && 
                        <input className='select-typeahead' placeholder='Search...' type='text' onChange={(e: any) => setQuery(e.target.value)} value={query}></input>
                        } */}
              <Select.Label className="SelectLabel"></Select.Label>
              {items.map((item: any, index: number) => {
                return (
                  <SelectItem
                    key={index}
                    value={`${item.id}_${item.name}`}
                    className={classnames(
                      "SelectItem",
                      item.id === "banana" && "SelectItem--selected"
                    )}
                    // color={item.color}
                  >
                    {item.name}
                  </SelectItem>
                );
              })}
              <Select.Separator className="SelectSeparator" />
              <div
                className="new_entity-btn"
                onClick={() => {
                  navigate("/new/entity");
                }}
              >
                Create new entity...
                <FontAwesomeIcon icon={faPlus} />
              </div>
            </Select.Group>
            {/* <Select.Separator className="SelectSeparator" /> */}
          </Select.Viewport>
          <Select.ScrollDownButton className="SelectScrollButton">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default SelectWrapper;
