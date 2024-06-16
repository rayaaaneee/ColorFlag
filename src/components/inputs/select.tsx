"use client";

import uppercaseFirstWordsLetters from "@/useful/string-treatment/uppercaseFirstWordsLetters";
import React, { ForwardedRef, MouseEventHandler, forwardRef, useEffect, useRef, useState } from "react";

import styles from "@/asset/scss/components/search-select.module.scss";
import cn from "@/lib/utils/cn";
import addAnBeforeVowel from "@/useful/string-treatment/addAnBeforeVowel";
import getPluralWord from "@/useful/string-treatment/getPluralWord";
import replaceAccents from "@/useful/string-treatment/replaceAccents";

export type ElementValue = string | number | boolean | null | undefined;

export interface SelectDataSourceInterface {
    name: string,
    value: ElementValue,
    isDefault?: boolean,
}

type SetterValue = ElementValue | ElementValue[];

type SelectedValueType = SelectDataSourceInterface | SelectDataSourceInterface[];

export type Setter = React.Dispatch<React.SetStateAction<SetterValue>>;

interface SelectInterface <T extends SelectDataSourceInterface> {
    dataSources: T[],
    isMultiple?: boolean,
    isSearcheable?: boolean,
    className?: string,
    id?: string,
    itemName?: string,
    isOpen?: boolean,
    setter?: Setter,
}

const Select = <T extends SelectDataSourceInterface>({ className = "", id = undefined, isOpen = false, isSearcheable = false, isMultiple = false, dataSources, setter, itemName = "item" }: SelectInterface<T>, ref: ForwardedRef<HTMLDivElement>) => {
    
    const dropdownButton = useRef<HTMLButtonElement>(null);
    const dropdownMenu = useRef<HTMLUListElement>(null);
    const searchInput = useRef<HTMLInputElement>(null);
    itemName = itemName.toLowerCase();

    const boldSearchedTokens = (text: string): string => {
        text = uppercaseFirstWordsLetters(text);
        let searchedTokens: string[] = [];
        if (searchInput.current && searchInput.current.value.trim().length > 0) {
            searchedTokens = replaceAccents(searchInput.current?.value.trim().toLowerCase()).split(' ');
        }
        if (!searchedTokens || searchedTokens.length === 0) return text;
        return text.replace(new RegExp(`(${searchedTokens.join('|')})`, 'gi'), '<b>$1</b>');
    }

    const initDefaultValue = (): string => {
        const prefix: string = (isMultiple ? "some" : addAnBeforeVowel(itemName));
        const word: string = (isMultiple ? getPluralWord(itemName) : itemName);

        return `Select ${prefix} ${word}`;
    }

    const defaultSelectedValue: SelectDataSourceInterface = { 
        name: initDefaultValue(), 
        value: undefined,
        isDefault: true
    }

    const [selectedValue, setSelectedValue] = 
        useState<SelectedValueType>(isMultiple ? [defaultSelectedValue] : defaultSelectedValue);

    const [focusedItem, setFocusedItem] = useState<number>(-1);

    const [dropdownIsOpen, setDropdownIsOpen] = useState(isOpen);

    const [filteredDataSources, setFilteredDataSources] = useState<SelectDataSourceInterface[]>(dataSources);

    const onSearchInput = () => {
        if (searchInput.current) {
            const searchTerm: string = replaceAccents(searchInput.current.value.toLowerCase());
            const searchedWord: string[] = searchTerm.split(' ');

            setFilteredDataSources(dataSources.filter((item: SelectDataSourceInterface) => {
                return item.name.toLowerCase().split(' ').some((word: string) => searchedWord.every((searched: string) => word.includes(searched)));
            }));

            setFocusedItem(-1);
        }
    };

    const onItemSelect: MouseEventHandler<HTMLLIElement> = (e) => {
        const element = e.currentTarget;
        const value: ElementValue = element.getAttribute('value') as ElementValue;
        const isSelected: boolean = element.classList.contains('selected');
        const newValue: SelectDataSourceInterface = { name: element.textContent || '', value: value};
        if (isMultiple) { 
            if (!isSelected) {
                setSelectedValue((value: SelectedValueType) => {
                    const returnResult: SelectDataSourceInterface[] = [...value as SelectDataSourceInterface[], newValue]
                        .filter((item) => item.isDefault !== true);

                    if (setter !== undefined) setter(returnResult.map((element: SelectDataSourceInterface) => element.value));

                    return returnResult;
                });
            } else {
                setSelectedValue((value: SelectedValueType) => {
                    const returnResult: SelectDataSourceInterface[] = (value as SelectDataSourceInterface[])
                        .filter((item) => item.value !== newValue.value && item.isDefault !== true);

                    if (setter !== undefined) setter(returnResult.map((element: SelectDataSourceInterface) => element.value));

                    if (returnResult.length === 0) return [defaultSelectedValue];
                    else return returnResult;
                });
            }

        } else {
            setDropdownIsOpen(false);
            if (setter !== undefined) setter(value);
            if (!isSelected) setSelectedValue(newValue);
            else setSelectedValue(defaultSelectedValue);
        }
    }

    const closeSelectOnOutsideClick = (e: MouseEvent) => {
        if (dropdownMenu.current && dropdownButton.current) {
            if (!dropdownMenu.current.contains(e.target as Node) && !dropdownButton.current.contains(e.target as Node) && dropdownIsOpen) {
                setDropdownIsOpen(false);
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
            } else {
                setFocusedItem(0);
                if (dropdownMenu.current) {
                    const elementToScroll: HTMLDivElement | null = dropdownMenu.current.querySelector('div');
                    if (elementToScroll) {
                        elementToScroll.scrollTop = 0;
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
            } else {
                setFocusedItem(filteredDataSources.length - 1);
                if (dropdownMenu.current) {
                    const elementToScroll: HTMLDivElement | null = dropdownMenu.current.querySelector('div');
                    const itemHeight = dropdownMenu.current.querySelector('li')?.clientHeight || 0;
                    if (elementToScroll) {
                        elementToScroll.scrollTop = (filteredDataSources.length - 1) * itemHeight;
                    }
                }
            }
        }

        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            dropdownButton.current?.blur();
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
            setFocusedItem(-1);
            const timeout = setTimeout(() => {
                if (dropdownButton.current) {
                    dropdownButton.current.classList.replace('rounded-t-md', 'rounded-md');
                    onSearchInput();
                    clearTimeout(timeout);
                }
            }, 150);
        }
    }, [dropdownIsOpen]);

    const onClickSelect: MouseEventHandler = (e) => {
        e.currentTarget === dropdownButton.current && setDropdownIsOpen(bool => !bool);
    }

    return (
        <div className={cn("relative group w-60", className)} id={id} ref={ref}>
            <button onClick={ onClickSelect } ref={dropdownButton} id="dropdown-button" style={{ display: "grid", gridTemplateColumns: "1fr auto"}} className={`${dropdownIsOpen && "border-b-2 border-slate-100" } rounded-md justify-center w-full px-4 py-2 text-sm font-medium text-white bg-main border-gray-300 shadow-sm`}>
                <span className="text-start mr-2 text-ellipsis whitespace-nowrap overflow-hidden">
                    { isMultiple ? 
                        ((selectedValue as SelectDataSourceInterface[])
                            .map((value: SelectDataSourceInterface) => (value.name)).join(', '))
                            : 
                        ((selectedValue as SelectDataSourceInterface).name
                    )}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>
            <div id={styles.ulWrapper} className={ `${ dropdownIsOpen && styles.opened }` }>
                <ul ref={dropdownMenu} className={cn("overflow-hidden w-full text-sm right-0 shadow-lg bg-main ring-1 ring-black ring-opacity-5 p-1 space-y-1", styles.dropDownMenu, dropdownIsOpen ? 'rounded-b-md' : 'rounded-md')}>
                    { (isSearcheable === true && (<input ref={searchInput} id="search-input" className="block w-full px-4 py-2 text-slate-50 bg-scnd rounded-md focus:outline-none" type="text" placeholder={ `Search ${itemName}`} autoComplete="off" />)) }
                    <div className={`overflow-scroll no-scrollbar h-fit max-h-60`}>
                        { filteredDataSources.map((item: SelectDataSourceInterface, index: number) => {
                            return (<li 
                                about={item.name} 
                                onClick={ onItemSelect } 
                                key={index} 
                                value={item.value?.toString()} 
                                className={cn(
                                    "min-w-full relative text-ellipsis whitespace-nowrap block px-4 py-2 text-white bg-main hoverable active:bg-gray-500 cursor-pointer rounded-md hover:overflow-visible",
                                    focusedItem == index ? `focused overflow-visible w-fit` : 'overflow-hidden',
                                    (isMultiple ?
                                        ((selectedValue as SelectDataSourceInterface[]).map((value: SelectDataSourceInterface) => value.value).includes(item.value) && 'selected')
                                        :
                                        ((selectedValue as SelectDataSourceInterface).value === item.value && 'selected')
                                    )
                                )}
                                dangerouslySetInnerHTML={{ __html: boldSearchedTokens(item.name) }}>
                            </li>);
                        }) }
                        { filteredDataSources.length === 0 && <li className="text-gray-400 px-4 py-2 text-sm">No results found</li>}
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default forwardRef(Select);
