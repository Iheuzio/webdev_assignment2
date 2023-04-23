"use strict"

/**
 * 
 * @param {*} json_file the json file to be fetched
 * @param {*} select_element "id of the select element"
 * @description
 * 1. Initialize the select options with the data from the json file using the provided class of the select element
 */
function initialize_Select_Options_data(json_file, select_element) {
    let select_option = document.getElementsByClassName(select_element);
    let select_option_array = Array.from(select_option);
    let option = document.createElement("option");

    for(let i = 0; i < select_option_array.length; i++) {
        for (let key in json_file) {
            option.setAttribute("value", key);
            option.innerHTML = json_file[key].name;
            select_option_array[i].appendChild(option.cloneNode(true));
        }
    }
}