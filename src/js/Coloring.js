import { closest } from "./Utils";
import chroma from 'chroma-js';
import { CountryCodes } from './countries.js';
const Codes = CountryCodes.split(",").map(i => { return i.trim().toUpperCase() })

export const Coloring = {
    WColors: [],
    WilayasColoring(Fields, Colors, newRanges, which, MapStyler, ParentSelector, options) {
        try {
            Fields.filter(value => {
                if (!Codes.includes(value.name.toUpperCase())) return false;
                return true
            }).map(value => {
                const id = value.name.toUpperCase()
                MapStyler.Selector = `${ParentSelector} #${id}`
                const Values = value.values.get(0).split(','),
                    val = Values[which]
                const Color = chroma(Colors[closest(val, newRanges)]).brighten(options.MaxInt).saturate(options.Saturation)
                MapStyler.Style(`fill: ${Color}; transition: all .2s ease-in-out; `)
                MapStyler.Style(`filter: brightness(1.5);`, 'hover')
                this.WColors[id] = Color
            })
        } catch (err) {}
    }
}