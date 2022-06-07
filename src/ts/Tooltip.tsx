import React from 'react'
import $ from 'jquery'
import '../css/tooltip.css'
import { CountryCodes, Countries } from 'js/countries'
const Codes = CountryCodes.split(',').map(i=>{ return i.trim().toUpperCase()})
const CountryNames = Countries.split(',').map(i=>{ return i.trim()})
function getCountry(Code){
    let index = Codes.indexOf(Code)
    return CountryNames[index+1]
}
export default function Tooltip(props) {
    const { Parent, id, Color, Labels, Wilayas } = props
    const ParentElement = `[data-panelid='${Parent}']`
    var Tooltip =  <div id={id}>
                    <span className="info" style={{backgroundColor: Color}}>
                        <div className="tt-title"></div>
                        <div className="tt-more"></div> 
                    </span>
                </div>
    $(function( ) {
        const e = $('#' + id)
        $(ParentElement + " [data-country]").hover( function() {
            let id = $(this).attr('id')
            let name = getCountry(id.toUpperCase())  
            try {
                if (id) {
                    let more = ``
                    let vals = Wilayas[id]
                    for (let i = 0; i < Labels.length; i++)
                        more += `<div class="more-class">
                            <div>${Labels[i]}</div>
                            <div>${vals[i]}</div>
                        </div>`
                    e.find(' .tt-title').text(`${name}`)
                    e.find(' .tt-more').html(more)
                    e.find(' .info').stop().fadeIn(100)
                }
            } catch (e) {
    
            }
    
        }, function() {
            let id = $(this).attr('id')
            try {
                if (id) {
                    e.find(' .info').stop().fadeOut(100)
                    e.find(' .tt-title').text(``)
                    e.find(' .tt-more').html('')
                }
            } catch (e) {
    
            }
        });

    })

    return Tooltip
}