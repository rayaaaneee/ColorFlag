import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import uppercaseFirstWordsLetters from "@/useful/uppercaseFirstWordsLetters";

import styles from "@/asset/scss/components/search-select.module.scss"
import replaceAccents from "@/useful/replaceAccents";

export type ElementValue = string | number | undefined;

export interface SearchSelectDataSourceInterface {
    name: string;
    value: ElementValue;
    isDefault?: boolean;
}

export type SetterValue = ElementValue | ElementValue[];

type SelectedValueType = SearchSelectDataSourceInterface | SearchSelectDataSourceInterface[];

export type Setter = React.Dispatch<React.SetStateAction<SetterValue>>;

interface SearchSelectInterface {
    dataSources: SearchSelectDataSourceInterface[];
    isMultiple?: boolean;
    itemName?: string;
    isOpen?: boolean;
    widthClass?: string;
    setter?: Setter;
}


const SearchSelect = ({ isOpen = false, isMultiple = false, dataSources, setter, widthClass = "w-60", itemName = "item"}: SearchSelectInterface) => {
    
    const dropdownButton = useRef<HTMLButtonElement>(null);
    const dropdownMenu = useRef<HTMLUListElement>(null);
    const searchInput = useRef<HTMLInputElement>(null);
    itemName = itemName.toLowerCase();

    const getPluralWord = (word: string): string  => 
        (word.endsWith('y') ? word.slice(0, -1) + 'ies' : word + 's');

    const initDefaultValue = (): string => {
        const vowels = ['a', 'e', 'i', 'o', 'u'];
        const hasN = vowels.includes(itemName[0].toLowerCase());
        return `Select ${isMultiple ? "some" : `a${ hasN ? "n" : "" }` } ${isMultiple ? getPluralWord(itemName) : itemName }`;
    }

    const defaultSelectedValue: SearchSelectDataSourceInterface = { 
        name: initDefaultValue(), 
        value: undefined,
        isDefault: true
    }

    const [selectedValue, setSelectedValue] = 
        useState<SelectedValueType>(isMultiple ? [defaultSelectedValue] : defaultSelectedValue);

    const [focusedItem, setFocusedItem] = useState<number>(-1);

    const [dropdownIsOpen, setDropdownIsOpen] = useState(isOpen);

    const [filteredDataSources, setFilteredDataSources] = useState<SearchSelectDataSourceInterface[]>(dataSources);

    const onSearchInput = () => {
        if (searchInput.current) {
            const searchTerm = replaceAccents(searchInput.current.value.toLowerCase());

            setFilteredDataSources(dataSources.filter((item: SearchSelectDataSourceInterface) => {
                return item.name.toLowerCase().includes(searchTerm);
            }));

            setFocusedItem(-1);
        }
    };

    const onItemSelect: MouseEventHandler<HTMLLIElement> = (e) => {
        const element = e.currentTarget;
        const value: ElementValue = element.getAttribute('value') as ElementValue;
        const isSelected: boolean = element.classList.contains('selected');
        if (setter !== undefined) setter(value);
        const newValue: SearchSelectDataSourceInterface = { name: element.textContent || '', value: value};
        if (isMultiple) { 
            if (!isSelected) {
                setSelectedValue(
                    (value: SelectedValueType) => {
                        return [...value as SearchSelectDataSourceInterface[], newValue]
                            .filter((item) => item.isDefault !== true);
                    }
                );
            } else {
                setSelectedValue(
                    (value: SelectedValueType) => {
                        return (value as SearchSelectDataSourceInterface[])
                            .filter((item) => item.value !== newValue.value);
                    }
                );
            }
        } else {
            setDropdownIsOpen(false);
            if (!isSelected) setSelectedValue(newValue);
            else setSelectedValue(defaultSelectedValue);
        }
    }

    const closeSelectOnOutsideClick = (e: MouseEvent) => {
        if (dropdownMenu.current && dropdownButton.current) {
            if (!dropdownMenu.current.contains(e.target as Node) && !dropdownButton.current.contains(e.target as Node) && dropdownIsOpen) {
                setDropdownIsOpen(bool => !bool);
            }
        }
    }

    const onKeydown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            setDropdownIsOpen(false);
        } else if (e.key === 'Enter') {
            if (focusedItem >= 0) {
                const items = dropdownMenu.current?.querySelectorAll('li');
                if (items) {
                    const item = items[focusedItem];
                    item.click();
                }
            } else {
                if (filteredDataSources.length === 1) {
                    const item = dropdownMenu.current?.querySelector('li');
                    if (item) {
                        item.click();
                    }
                }
            }
        } else if (e.key === 'ArrowDown') {
            if (focusedItem < filteredDataSources.length - 1) {
                setFocusedItem(focusedItem => focusedItem + 1);
                // Automatically scroll down in the list (only on the div that contains the list)
                if (dropdownMenu.current) {
                    const elementToScroll: HTMLDivElement | null = dropdownMenu.current.querySelector('div');
                    const itemHeight = dropdownMenu.current.querySelectorAll('li')[0].clientHeight;
                    if (elementToScroll) {
                        elementToScroll.scrollTop = (focusedItem + 1) * itemHeight;
                    }
                }
            }
        } else if (e.key === 'ArrowUp') {
            if (focusedItem > 0) {
                setFocusedItem(focusedItem => focusedItem - 1);
                // Automatically scroll up in the list (only on the div that contains the list)
                if (dropdownMenu.current) {
                    const elementToScroll: HTMLDivElement | null = dropdownMenu.current.querySelector('div');
                    const itemHeight = dropdownMenu.current.querySelector('li')?.clientHeight || 0;
                    if (elementToScroll) {
                        elementToScroll.scrollTop = (focusedItem - 1) * itemHeight;
                    }
                }
            }
        }

        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
        }
    }

    useEffect(() => {

        if (searchInput.current) {
            searchInput.current.addEventListener('input', onSearchInput);
        }

        document.addEventListener('click', closeSelectOnOutsideClick);

        document.addEventListener('keydown', onKeydown);

        return () => {
            if (searchInput.current) {
                searchInput.current.removeEventListener('input', onSearchInput);
            }
            document.removeEventListener('click', closeSelectOnOutsideClick);
            document.removeEventListener('keydown', onKeydown);
        };
    });

    useEffect(() => {
        if (dropdownIsOpen) {
            if (searchInput.current) searchInput.current.focus();
            if (dropdownButton.current) {
                dropdownButton.current.classList.replace('rounded-md', 'rounded-t-md');
            }
        } else {
            if (searchInput.current) searchInput.current.value = '';
            onSearchInput();
            setFocusedItem(-1);
            const timeout = setTimeout(() => {
                if (dropdownButton.current) {
                    dropdownButton.current.classList.replace('rounded-t-md', 'rounded-md');
                    clearTimeout(timeout);
                }
            }, 150);
        }
    }, [dropdownIsOpen]);

    useEffect(() => {
        if (isMultiple) {
            if ((selectedValue as SearchSelectDataSourceInterface[]).length === 0) {
                setSelectedValue([defaultSelectedValue]);
            }
        }
    }, [selectedValue])

    return (
        <div className={`relative group ${ widthClass }`}>
            <button onClick={ e => setDropdownIsOpen(bool => !bool)} ref={dropdownButton} id="dropdown-button" style={{ display: "grid", gridTemplateColumns: "1fr auto"}} className={`rounded-md justify-center w-full px-4 py-2 text-sm font-medium text-white main-bg border-gray-300 shadow-sm`}>
                <span className="text-start mr-2 text-ellipsis whitespace-nowrap overflow-hidden">
                    { isMultiple ? 
                        ((selectedValue as SearchSelectDataSourceInterface[])
                            .map(
                                (value: SearchSelectDataSourceInterface) => (value.name)
                            ).join(', '))
                            : 
                        ((selectedValue as SearchSelectDataSourceInterface).name
                    )}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>
            <div id={styles.ulWrapper} className={ `${ dropdownIsOpen && styles.opened }` }>
                <ul ref={dropdownMenu} id="dropdown-menu" className={ `${styles.dropDownMenu} overflow-hidden w-full text-sm right-0 ${ dropdownIsOpen ? 'rounded-b-md' : 'rounded-md' } shadow-lg main-bg ring-1 ring-black ring-opacity-5 p-1 space-y-1`}>
                    <input ref={searchInput} id="search-input" className="block w-full px-4 py-2 text-slate-50 scnd-bg border rounded-md border-gray-300 focus:outline-none" type="text" placeholder={ `Search ${itemName}`} autoComplete="off" />
                    <div className={`overflow-scroll no-scrollbar h-fit max-h-60`}>
                        { filteredDataSources.map((item: SearchSelectDataSourceInterface, index: number) => {
                            return (<li 
                                about={item.name} onClick={ onItemSelect } key={index} value={item.value} className={`${ focusedItem == index ? `focused overflow-visible w-fit` : 'overflow-hidden' } ${
                                    (isMultiple ?
                                        ((selectedValue as SearchSelectDataSourceInterface[]).map((value: SearchSelectDataSourceInterface) => value.value).includes(item.value) && 'selected')
                                        :
                                        ((selectedValue as SearchSelectDataSourceInterface).value === item.value && 'selected')
                                    )
                                } min-w-full relative text-ellipsis whitespace-nowrap block px-4 py-2 text-white main-bg hoverable active:bg-gray-500 cursor-pointer rounded-md hover:overflow-visible`}>{ uppercaseFirstWordsLetters(item.name) }
                            </li>);
                        }) }
                        { filteredDataSources.length === 0 && <li className="text-gray-400 px-4 py-2 text-sm">No results found</li>}
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default SearchSelect;
