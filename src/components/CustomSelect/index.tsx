import styles from './style.module.scss';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import React from 'react';
import { ArrowSelect } from '../../assets/icons/icons.tsx';

interface Props {
    options: any[];
    selectedId: number | null;
    onSelect: (value: any) => void;
    getMethod: (page: number, limit: number) => void;
    page: number,
    limit: number,
    loading: boolean,
    name?: string;
    placeholder?: string;
    title?: string;
    style?: any;
    disabled?: boolean;
}

const CustomSelect = (props: Props) => {
    const {
        options,
        onSelect,
        selectedId,
        getMethod,
        page,
        limit,
        loading,
        placeholder,
        name,
        title = 'name',
        style,
        disabled = false,
    } = props;

    const selectRef = useRef<HTMLInputElement>(null);

    const [value, setValue] = useState<string>('');

    const [isViewSelect, setIsViewSelect] = useState(false);

    const handleSelect = (data: any) => {
        if (onSelect) {
            onSelect(data.id);
        }
        setIsViewSelect(false);
    };

    const visibleValue = (id: number | null) => {
        const item = options.find((item) => item.id === id);
        return item ? item[title] : '';
    };

    const handleChange = () => {
        setValue(value);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setIsViewSelect(false);
        }, 250);
    };

    const handleFocus = () => {
        setIsViewSelect(true);
    };

    const handleArrowClick = () => {
        if (isViewSelect) {
            setIsViewSelect(false);
        } else {
            selectRef.current?.focus();
        }
    };

    const onscroll = () => {
        const block = document.getElementById('options');
        if (block) {
            if (block.scrollTop + block.clientHeight >= block.scrollHeight - 150) {
                if (!loading) {
                    getMethod(page + 1, limit);
                }
            }
        }
    }

    useEffect(() => {
        if (isViewSelect && !options.length) {
            getMethod(1, 50);
        }
    }, [isViewSelect])

    return (
        <div className={styles.customSelectContainer} style={style}>
            <input
                ref={selectRef}
                className={classNames(styles.customSelect, { [styles.disabled]: disabled })}
                value={visibleValue(selectedId)}
                placeholder={placeholder}
                name={name}
                disabled={disabled}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
            />
            {isViewSelect && (
                <div id={'options'} className={styles.blockOptions} onScroll={onscroll}>
                    {options.map((data, index) => (
                        <div 
                            key={index + ')'} 
                            className={classNames(styles.option, { [styles.selected]: (data.id == selectedId) })} 
                            onMouseDown={() => handleSelect(data)}
                        >
                            <div className={styles.iconOption}>
                                {data[title][0]}
                            </div>
                            {data[title]}
                        </div>
                    ))}
                </div>
            )}
            <div
                className={classNames({
                    [styles.arrowSelect]: true,
                    [styles.open]: isViewSelect,
                    [styles.close]: !isViewSelect,
                    [styles.disabled_icon]: disabled,
                })}
                onClick={handleArrowClick}
            >
                <ArrowSelect />
            </div>
        </div>
    );
};

export default CustomSelect
