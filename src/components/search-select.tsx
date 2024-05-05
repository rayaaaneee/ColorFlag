import { MouseEventHandler, useEffect, useRef, useState } from "react";
import uppercaseFirstWordsLetters from "@/useful/uppercaseFirstWordsLetters";

import styles from "@/asset/scss/components/search-select.module.scss"

export type ElementValue = string | number | undefined;

export interface SearchSelectDataSourceInterface {
    name: string;
    value: ElementValue;
}

interface SearchSelectInterface {
    dataSources: SearchSelectDataSourceInterface[];
    itemName?: string;
    isOpen?: boolean;
    widthClass?: string;
    setSelectedParentValue?: React.Dispatch<React.SetStateAction<ElementValue>>;
}

const initDefaultValue = (itemName: string) => {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    const hasN = vowels.includes(itemName[0].toLowerCase());

    return `Select a${ hasN ? "n" : "" } ${itemName}`;
}

const SearchSelect = ({ isOpen = false, dataSources, setSelectedParentValue, widthClass = "w-60", itemName = "item"}: SearchSelectInterface) => {

    const dropdownButton = useRef<HTMLButtonElement>(null);
    const dropdownMenu = useRef<HTMLUListElement>(null);
    const searchInput = useRef<HTMLInputElement>(null);

    const [selectedValue, setSelectedValue] = 
        useState<SearchSelectDataSourceInterface>({ 
            name: initDefaultValue(itemName), 
            value: undefined 
        });

    const [focusedItem, setFocusedItem] = useState<number>(-1);

    const [dropdownIsOpen, setDropdownIsOpen] = useState(isOpen);

    const [filteredDataSources, setFilteredDataSources] = useState<SearchSelectDataSourceInterface[]>(dataSources);

    const onSearchInput = () => {
        if (searchInput.current) {
            const searchTerm = searchInput.current.value.toLowerCase();
            
            setFilteredDataSources(dataSources.filter((item: SearchSelectDataSourceInterface) => {
                return item.name.toLowerCase().includes(searchTerm);
            }));

            setFocusedItem(-1);
        }
    };

    const onItemSelect: MouseEventHandler<HTMLLIElement> = (e) => {
        const element = e.currentTarget;
        const value: ElementValue = element.getAttribute('value') as ElementValue;
        setSelectedValue({ name: element.textContent || '', value: value});
        setDropdownIsOpen(false);
        if (setSelectedParentValue !== undefined) setSelectedParentValue(value);
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

    return (
        <div className={`relative group ${ widthClass }`}>
            <button onClick={ e => setDropdownIsOpen(bool => !bool)} ref={dropdownButton} id="dropdown-button" style={{ display: "grid", gridTemplateColumns: "1fr auto"}} className={`rounded-md justify-center w-full px-4 py-2 text-sm font-medium text-white main-bg border-gray-300 shadow-sm`}>
                <span className="text-start mr-2 text-ellipsis whitespace-nowrap overflow-hidden">{ selectedValue.name }</span>
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
                                about={item.name} onClick={ onItemSelect } key={index} value={item.value} className={`${ focusedItem == index ? `focused overflow-visible w-fit` : 'overflow-hidden' } min-w-full relative text-ellipsis whitespace-nowrap block px-4 py-2 text-white main-bg hoverable active:bg-gray-500 cursor-pointer rounded-md hover:overflow-visible`}>{ uppercaseFirstWordsLetters(item.name) }
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
