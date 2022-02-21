import { DataSettings, ViewSettings } from 'ptnl-constructor-sdk';
import {
    checkbox,
    CreateViewSettings,
    input,
    select,
    ViewSettingsValidation,
} from 'ptnl-constructor-sdk/config';
import {
    _NodesBorderValueDefault,
    _NodesBorderColorDefault,
    _NodesBorderValueMin,
    _NodesBorderValueMax,
} from './constants';

const colorModes = [
    ['gradient', 'Градиент', 'Gradient'],
    ['from', 'Исходящие потоки', 'From'],
    ['to', 'Входящие потоки', 'To'],
];

export const createViewSettings: CreateViewSettings<DataSettings> = ({}: {
    dataSettings: DataSettings;
    viewSettings: ViewSettings;
}) => {
    return [
        select({
            key: 'colorMode',
            label: {
                ru: 'Цвет потоков',
                en: 'Flow Color',
            },
            defaultValue: colorModes[0][0],
            options: colorModes.map((item) => {
                const [value, ru, en] = item;

                return {label: {ru,en}, value };
            }),
        }),

        input({
            key: '_TextColor',
            label: {
                ru: 'Цвет текста (HTML)',
                en: 'Text color (HTML)',
            },
            defaultValue: 'gray',
        }),
        input({
            key: '_TextSize',
            label: {
                ru: 'Высота текста (в пикселях)',
                en: 'Text color (HTML)',
            },
            defaultValue: '20',
        }),
        input({
            key: '_TextFamily',
            label: {
                ru: 'Назване текста',
                en: 'TextFamily',
            },
            defaultValue: 'Arial',
        }),
        select({
            key: '_TextStyle',
            label: {
                ru: 'Стиль техта',
                en: 'Text Style',
            },
            defaultValue: 'normal',
            options: [
                {label: {ru:'normal',en:'normal'}, value:'normal' },
                {label: {ru:'italic',en:'italic'}, value:'italic' },
                {label: {ru:'oblique',en:'oblique'}, value:'oblique' },
                {label: {ru:'initial',en:'initial'}, value:'initial' },
                {label: {ru:'inherit',en:'inherit'}, value:'inherit' },
            ],
        }),


        select({
            key: 'preferredFlowOverlap',
            label: {
                ru: 'Высота узла',
                en: 'Preferred flow overlap',
            },
            defaultValue: 'max',
            options: [
                {label: {ru:'По максимальной ширене потока',en:'Maximum'}, value:'max' },
                {label: {ru:'По минимальной ширине потока',en:'Minimum'}, value:'min' },
            ],
        }),
        input({
            key: '_NodesBorderValue',
            label: {
                ru: 'Толшина рамки вокруг узлов (в пикселях)',
                en: 'Width of the node frame (pixels)',
            },
            defaultValue: `${_NodesBorderValueDefault}`,
        }),
        input({
            key: '_NodesBorderColor',
            label: {
                ru: 'Цвет рамки узлов (HTML)',
                en: 'Color of the node frame (HTML)',
            },
            defaultValue: `${_NodesBorderColorDefault}`,
        }),
    ];
};

export const validation: ViewSettingsValidation = {
    _NodesBorderValue: (value)=>{
        const parsedValue = parseInt(value);
        if (
            !/^\d+$/.test(value) ||
            parsedValue < _NodesBorderValueMin ||
            parsedValue > _NodesBorderValueMax
        ) {
            return {
                ru: `укажите целое число от ${_NodesBorderValueMin} до ${_NodesBorderValueMax}`,
                en: `enter an integer from ${_NodesBorderValueMin} to ${_NodesBorderValueMax}`,
            };
        }
        return null;
    },

};
