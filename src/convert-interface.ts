/*
 * Copyright (c) 2024 by frostime. All Rights Reserved.
 * @Author       : frostime
 * @Date         : 2024-09-28 21:16:47
 * @FilePath     : /src/convert-interface.ts
 * @LastEditTime : 2024-09-28 21:41:19
 * @Description  : 
 */
type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

const SPACES = (level?: number) => {
    level = level || 0;
    return ' '.repeat(level * 4);
};

const processValue = (value: JsonValue, depth: number): string => {
    if (typeof value === 'string') { return 'string'; }
    if (typeof value === 'number') { return 'number'; }
    if (typeof value === 'boolean') { return 'boolean'; }
    if (value === null) { return 'null'; }
    if (Array.isArray(value)) {
        if (value.length === 0) {
            return 'any[]';
        }
        const itemTypes = value.map(item => processValue(item, depth));
        const uniqueTypes = [...new Set(itemTypes)];
        if (uniqueTypes.length === 1) {
            return `${uniqueTypes[0]}[]`;
        } else {
            return `[${itemTypes.join(', ')}]`;
        }
    }
    if (typeof value === 'object') {
        return generateInterface(value, undefined, depth + 1);
    }
    return 'any';
};

const generateInterface = (obj: JsonValue, interfaceName?: string, depth: number = 0): string => {
    if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
        return processValue(obj, depth);
    }

    const lines: string[] = interfaceName ? [`${SPACES(depth)}interface ${interfaceName} {`] : ['{'];

    const addProperty = (key: string, value: JsonValue) => {
        const type = processValue(value, depth);
        if (!/^[a-zA-Z0-9]+$/.test(key)) {
            key = `"${key}"`;
            console.warn(`key ${key} is not valid, please use only letters and numbers`);
        }
        lines.push(`${SPACES(depth + 1)}${key}: ${type};`);
    };

    for (const [key, value] of Object.entries(obj)) {
        addProperty(key, value);
    }

    lines.push(`${SPACES(depth)}}`);
    return lines.join('\n');
};

export const convertToInterface = (obj: JsonValue, interfaceName: string = 'I18n'): string => {
    return generateInterface(obj, interfaceName);
};
