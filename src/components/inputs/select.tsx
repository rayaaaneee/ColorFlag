"use client";

import uppercaseFirstWordsLetters from "@/utils/string-treatment/uppercaseFirstWordsLetters";
import { Fragment, forwardRef, useEffect, useRef, useState, type ForwardedRef, type MouseEventHandler } from "react";

import styles from "@/asset/scss/components/search-select.module.scss";
import cn from "@/lib/utils/cn";
import addAnBeforeVowel from "@/utils/string-treatment/addAnBeforeVowel";
import getPluralWord from "@/utils/string-treatment/getPluralWord";
import replaceAccents from "@/utils/string-treatment/replaceAccents";

export type ElementValue = string | number | boolean | null | undefined;

export interface SelectDataSourceInterface {
    name: string,
    id: ElementValue,
    isDefault?: boolean,
    [key: string]: any,
}

type SetterValue = ElementValue | ElementValue[];

type SelectedValueType = SelectDataSourceInterface | SelectDataSourceInterface[];

export type Setter = React.Dispatch<React.SetStateAction<SetterValue>>;

interface SelectInterface <T> {
    dataSource: T[],
    className?: string,
    id?: string,

    isMultiple?: boolean,
    isSearcheable?: boolean,

    groupBy?: keyof T,
    groupNames?: keyof T,
    sortGroups?: boolean,
    itemName?: string,
    isOpen?: boolean,
    setter?: Setter,
}

const Select = <T extends SelectDataSourceInterface>({ className = "", id, isOpen = false, isSearcheable = false, isMultiple = false, dataSource, setter, itemName = "item", groupBy, sortGroups = false, groupNames }: SelectInterface<T>, ref: ForwardedRef<HTMLDivElement>) => {

    const initDefaultValue = (): string => {
        const prefix: string = (isMultiple ? "some" : addAnBeforeVowel(itemName));
        const word: string = (isMultiple ? getPluralWord(itemName) : itemName);

        return `Select ${prefix} ${word}`;
    }
    
    const dropdownButton = useRef<HTMLButtonElement>(null);
    const dropdownMenu = useRef<HTMLUListElement>(null);
    const searchInput = useRef<HTMLInputElement>(null);
    itemName = itemName.toLowerCase();

    const defaultSelectedValue: SelectDataSourceInterface = {
        name: initDefaultValue(),
        id: undefined,
        isDefault: true
    };

    const [selectedValue, setSelectedValue] = 
        useState<SelectedValueType>(isMultiple ? [defaultSelectedValue] : defaultSelectedValue);

    const [focusedItem, setFocusedItem] = useState<number>(-1);

    const [dropdownIsOpen, setDropdownIsOpen] = useState(isOpen);

    const [filteredDataSource, setFilteredDataSource] = useState<T[]>(dataSource);
    
    if (groupBy && groupNames) {
        if (dataSource.length !== 0) {
            if (!dataSource[0].hasOwnProperty(groupBy)) {
                throw new Error(`The property ${groupBy.toString()} does not exist in the dataSource`);
            } else if (!dataSource[0].hasOwnProperty(groupNames)) {
                throw new Error(`The property ${groupNames.toString()} does not exist in the dataSource`);
            }
            dataSource = dataSource.sort((a: T, b: T) => {
                if (a[groupBy] < b[groupBy]) return -1;
                else if (a[groupBy] > b[groupBy]) return 1;
                else if (sortGroups) {
                    if (a.name < b.name) return -1;
                    else if (a.name > b.name) return 1;
                    else return 0;
                } else {
                    return 0;
                }
            });
        }
    } else if (groupBy && !groupNames) {
        throw new Error('You must provide a groupNames property when groupBy is set');
    } else if (!groupBy && groupNames) {
        throw new Error('You must provide a groupBy property when groupNames is set');
    }

    const boldSearchedTokens = (text: string): string => {
        text = uppercaseFirstWordsLetters(text);
        let searchedTokens: string[] = [];
        if (searchInput.current && searchInput.current.value.trim().length > 0) {
            searchedTokens = replaceAccents(searchInput.current?.value.trim().toLowerCase()).split(' ');
        }
        if (!searchedTokens || searchedTokens.length === 0) return text;
        return text.replace(new RegExp(`(${searchedTokens.join('|')})`, 'gi'), '<b>$1</b>');
    }

    const onSearchInput = (): void => {
        if (searchInput.current) {
            const searchTerm: string = replaceAccents(searchInput.current.value.toLowerCase());
            const searchedWord: string[] = searchTerm.split(' ');

            setFilteredDataSource(dataSource.filter((item: T) => {
                return item.name.toLowerCase().split(' ').some((word: string) => searchedWord.every((searched: string) => word.includes(searched)));
            }));

            setFocusedItem(-1);
        }
    };

    const onItemSelect: MouseEventHandler<HTMLLIElement> = (e): void => {
        const element = e.currentTarget;
        const value: ElementValue = element.getAttribute('value') as ElementValue;
        const isSelected: boolean = element.classList.contains('selected');
        const newValue: SelectDataSourceInterface = { name: element.textContent || '', id: value};
        if (isMultiple) {
            if (!isSelected) {
                setSelectedValue((value: SelectedValueType) => {
                    const returnResult: SelectDataSourceInterface[] = [...value as T[], newValue]
                        .filter((item) => item.isDefault !== true);

                    if (setter !== undefined) setter(returnResult.map((element: SelectDataSourceInterface) => element.id));

                    return returnResult;
                });
            } else {
                setSelectedValue((value: SelectedValueType) => {
                    const returnResult: T[] = (value as T[])
                        .filter((item) => item.id !== newValue.id && item.isDefault !== true);

                    if (setter !== undefined) setter(returnResult.map((element: T) => element.id));

                    if (returnResult.length === 0) return [defaultSelectedValue];
                    else return returnResult;
                });
            }

        } else {
            setDropdownIsOpen(false);
            scrollToTop();
            if (setter !== undefined) setter(value);
            if (!isSelected) setSelectedValue(newValue);
            else setSelectedValue(defaultSelectedValue);
        }
    }

    const scrollToTop = (): void => {
        if (!dropdownMenu.current) return;

        const elementToScroll: HTMLDivElement | null = dropdownMenu.current.querySelector<HTMLDivElement>(`div.list-container`);
        console.log(elementToScroll);
        if (elementToScroll) {
            elementToScroll.scrollTop = 0;
        }
    }

    const closeSelectOnOutsideClick = (e: MouseEvent): void => {
        if (dropdownMenu.current && dropdownButton.current) {
            if (!dropdownMenu.current.contains(e.target as Node) && !dropdownButton.current.contains(e.target as Node) && dropdownIsOpen) {
                setDropdownIsOpen(false);
                scrollToTop();
            }
        }
    }

    const onKeydown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            setDropdownIsOpen(false);
        } else if (e.key === 'Enter') {
            if (focusedItem >= 0) {
                const items = dropdownMenu.current?.querySelectorAll<HTMLLIElement>('li:not(.group-declaration)');
                if (items) {
                    const item = items[focusedItem];
                    item.click();
                }
            } else {
                if (filteredDataSource.length === 1) {
                    const item = dropdownMenu.current?.querySelector<HTMLLIElement>('li:not(.group-declaration)');
                    if (item) {
                        item.click();
                    }
                }
            }
        } else if (e.key === 'ArrowDown') {
            if (focusedItem < filteredDataSource.length - 1) {
                // Automatically scroll down in the list (only on the div that contains the list)
                if (dropdownMenu.current) {
                    const elementToScroll: HTMLDivElement | null = dropdownMenu.current.querySelector('div');
                    const itemHeight = dropdownMenu.current.querySelectorAll('li:not(.group-declaration)')[0].clientHeight;
                    if (elementToScroll) {
                        if (groupBy) {
                            const i = focusedItem === -1 ? 2 : 1;
                            const nbGroupsPassed: number = Array.from(dropdownMenu.current.querySelectorAll<HTMLLIElement>('li:not(.group-declaration)')).slice(0, focusedItem + i).filter((element: HTMLLIElement) => element.classList.contains('first-group-item')).length;
                            const groupDeclarationElement: HTMLLIElement | null = dropdownMenu.current.querySelector('.group-declaration');
                            if (nbGroupsPassed > 0 && groupDeclarationElement) {
                                elementToScroll.scrollTop = (focusedItem) * itemHeight + (groupDeclarationElement.offsetHeight * nbGroupsPassed);
                            } else {
                                elementToScroll.scrollTop = (focusedItem) * itemHeight;
                            }
                        } else { 
                            elementToScroll.scrollTop = (focusedItem + 1) * itemHeight;
                        }
                    }
                }
                setFocusedItem(focusedItem => focusedItem + 1);
            } else {
                setFocusedItem(0);
                scrollToTop();
            }
        } else if (e.key === 'ArrowUp') {
            if (focusedItem > 0) {
                setFocusedItem(focusedItem => focusedItem - 1);
                // Automatically scroll up in the list (only on the div that contains the list)
                if (dropdownMenu.current) {
                    const elementToScroll: HTMLDivElement | null = dropdownMenu.current.querySelector(`div.list-container`);
                    const itemHeight = dropdownMenu.current.querySelector('li')?.clientHeight || 0;
                    if (elementToScroll) {
                        if (groupBy) {
                            const i = focusedItem === -1 ? 2 : 1;
                            const nbGroupsPassed: number = Array.from(dropdownMenu.current.querySelectorAll<HTMLLIElement>('li:not(.group-declaration)')).slice(0, focusedItem + i).filter((element: HTMLLIElement) => element.classList.contains('first-group-item')).length;
                            const groupDeclarationElement: HTMLLIElement | null = dropdownMenu.current.querySelector('.group-declaration');
                            if (nbGroupsPassed > 0 && groupDeclarationElement) {
                                elementToScroll.scrollTop = (focusedItem - 1) * itemHeight + (groupDeclarationElement.offsetHeight * nbGroupsPassed);
                            } else {
                                elementToScroll.scrollTop = (focusedItem - 1) * itemHeight;
                            }
                        } else {
                            elementToScroll.scrollTop = (focusedItem - 1) * itemHeight;
                        }
                    }
                }
            } else {
                if (dropdownMenu.current) { 
                    setFocusedItem(filteredDataSource.length - 1);
                    const totalGroups: number = Array.from(dropdownMenu.current.querySelectorAll<HTMLLIElement>('li:not(.group-declaration)')).length;
                    const groupDeclarationElement: HTMLLIElement | null = dropdownMenu.current.querySelector('.group-declaration');
                    if (groupDeclarationElement !== null) {
                        const elementToScroll: HTMLDivElement | null = dropdownMenu.current.querySelector(`div.list-container`);
                        const itemHeight = dropdownMenu.current.querySelector('li')?.clientHeight || 0;
                        if (elementToScroll) {
                            elementToScroll.scrollTop = (filteredDataSource.length - 1) * itemHeight + (groupDeclarationElement.offsetHeight * totalGroups);
                        }
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
        e.currentTarget === dropdownButton.current && setDropdownIsOpen(bool => {
            if (bool) scrollToTop();
            return !bool;
        });
    }

    return (
        <div className={cn("relative group w-60", className)} id={id} ref={ref}>
            <button onClick={ onClickSelect } ref={dropdownButton} style={{ display: "grid", gridTemplateColumns: "1fr auto"}} className={`${dropdownIsOpen && "border-b-2 border-slate-100" } rounded-md justify-center w-full px-4 py-2 text-sm font-medium text-white bg-main border-gray-300 shadow-sm`}>
                <span className="text-start mr-2 text-ellipsis whitespace-nowrap overflow-hidden">
                    { isMultiple ? 
                        ((selectedValue as T[])
                            .map((value: T) => (value.name)).join(', '))
                            : 
                        ((selectedValue as T).name
                    )}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>
            <div id={styles.ulWrapper} className={ `${ dropdownIsOpen && styles.opened }` }>
                <ul ref={dropdownMenu} className={cn("overflow-hidden w-full text-sm right-0 shadow-lg bg-main ring-1 ring-black ring-opacity-5 p-1 space-y-1", styles.dropDownMenu, dropdownIsOpen ? 'rounded-b-md' : 'rounded-md')}>
                    { (isSearcheable === true && (<input ref={searchInput} className="block w-full px-4 py-2 text-slate-50 bg-scnd rounded-md focus:outline-none" type="text" placeholder={ `Search ${itemName}`} autoComplete="off" />)) }
                    <div className={`list-container overflow-scroll no-scrollbar h-fit max-h-60`}>
                        {filteredDataSource.map((item: T, index: number, arr: T[]) => {
                            const previousItem: T | null = index > 0 ? arr[index - 1] : null;
                            const switchingGroup: boolean = Boolean(groupBy && previousItem && previousItem[groupBy.toString()] !== item[groupBy as string]);
                            return (
                                <Fragment key={index}>
                                    {(switchingGroup || previousItem === null) && (
                                        <li className="self-end ml-auto mr-2 py-2 px-4 w-fit text-end font-medium let italic text-black text-sm bg-gray-100 rounded-3xl text-ellipsis whitespace-nowrap tracking-wider group-declaration border-main border-4">{uppercaseFirstWordsLetters(item[(groupNames ?? groupBy) as string])}</li>
                                    )}
                                    <li 
                                        about={item.name} 
                                        onClick={onItemSelect} 
                                        value={item.id?.toString()} 
                                        className={cn(
                                            "min-w-full h-fit relative text-ellipsis whitespace-nowrap block px-4 py-2 text-white bg-main hoverable active:bg-gray-500 cursor-pointer rounded-md hover:overflow-visible",
                                            focusedItem === index ? `focused overflow-visible w-fit` : 'overflow-hidden',
                                            (isMultiple ?
                                                ((selectedValue as T[]).map((value: T) => value.id).includes(item.id) && 'selected')
                                                :
                                                ((selectedValue as T).id === item.id && 'selected')
                                            ),
                                            switchingGroup && 'first-group-item'
                                        )}
                                        dangerouslySetInnerHTML={{ __html: boldSearchedTokens(item.name) }}>
                                    </li>
                                </Fragment>
                            );
                        })}
                        { filteredDataSource.length === 0 && <li className="text-gray-400 px-4 py-2 text-sm">No results found</li>}
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default forwardRef(Select);
