// dom content load event listener
document.addEventListener("DOMContentLoaded", init);
let url_object = {
    main_url: 'https://api.exchangerate.host/convert',
    from_qry: null,
    to_qry: null,
    amount_qry: null,
    absolute_url: function () { return this.main_url + '?from=' + this.from_qry + '&to=' + this.to_qry + '&amount=' + this.amount_qry }
};



function init() {


    fetch("../json/currency.json")
        .then(response => response.json())
        .then(data => initialize_Select_Options_data(data, "currency_select"))
        .catch(error => console.log(error));

    let convert_btn = document.getElementById("get_data_btn");
    convert_btn.addEventListener("click", () => {
        let from_currency = document.getElementById("base_currency_select").value;
        let to_currency = document.getElementById("to_currency_select").value;
        let amount = document.getElementById("amount").value;
        getAbsoluteRequestUrl(from_currency, to_currency, amount);
        getData(url_object.absolute_url());
    });
}

function getAbsoluteRequestUrl(from, to, amount) {
    url_object.from_qry = from;
    url_object.to_qry = to;
    url_object.amount_qry = amount;
}

function getData(url) {
    let regex = /-/;
    if (regex.test(url)) {
        alert("invalid currency detected, value cannot be null and cannot have negative amount");
        return;
    }
    if (url_object.from_qry === url_object.to_qry) {
        alert("base and to currency cannot be the same");
        return;
    }
    if (url_object.amount_qry === "0") {
        alert("amount cannot be zero");
        return;
    }
    fetch(url)
        .then(response => response.json())
        .then(data => displayResult(data))
        .catch(error => console.log(error));
}

function displayResult(data) {

    let result_table = document.getElementById("result_table");
    let result_table_body = document.getElementById("result_table_body");
    let result_table_row = document.createElement("tr");
    let result_table_data = document.createElement("td");
    // specify table head row as From, To, Rate, Amount, Payment, Date
    let table_head = document.getElementById("result_table_head");
    let table_head_row = document.createElement("tr");
    let table_head_data = document.createElement("th");
    let table_head_data_array = ["From", "To", "Rate", "Amount", "Payment", "Date"];
    // check if table head row is already created
    if (table_head.childElementCount === 0) {
        
        for (let i = 0; i < table_head_data_array.length; i++) {
            table_head_data.innerHTML = table_head_data_array[i];
            table_head_row.appendChild(table_head_data.cloneNode(true));
        }
        table_head.appendChild(table_head_row);
    }
    checkTable();
    // specify table body row as From, To, Rate, Amount, Payment, Date as an array
    let result_decimal = setDecimalPlace(data.result);
    
    let table_body_data_array = [data.query.from, data.query.to, data.info.rate, "$"+data.query.amount, result_decimal, data.date];
    for (let i = 0; i < table_body_data_array.length; i++) {
        result_table_data.innerHTML = table_body_data_array[i];
        result_table_row.appendChild(result_table_data.cloneNode(true));
    }
    result_table_body.appendChild(result_table_row);
    result_table.appendChild(result_table_body);

}

function setDecimalPlace(number) {
    let result_decimal_array = number.toString().split(".");
    let result_decimal_array_decimal = result_decimal_array[1];
    if (result_decimal_array_decimal.length > 2) {
        return number.toFixed(2);
    }
    return number;
}

function checkTable() {
    let result_table = document.getElementById("result_table");
    if (result_table.childElementCount > 13) {
        result_table.remove();
    }
}