//const { createElement } = require("react");

//Seleciona os elementos do Formulário
const amount = document.getElementById("amount");
const form = document.querySelector("form");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

//seleciona os elementos da lista
const expenseList = document.querySelector("ul");
const expensesQuantity = document.querySelector("aside header p span")
const expensesTotal = document.querySelector("aside header h2");
//Captura o evento de input para formatar o valor.
amount.oninput = () => {
    //obtem os valores não numéricos.
    let value = amount.value.replace(/\D/g, "");
    
    //tranforma o valor em centavos
    value = Number(value) / 100
    
    //Atualiza o valor do input
    amount.value = formatCurrencyBRL(value);
}

function formatCurrencyBRL(value){
    //formata para o padrão do real
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    return value
}

//captura o evento de submit do forms para obter os valores
form.onsubmit = (event) => {
    //previne o carregamento da página
    event.preventDefault();

    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date()

        
    }

    expenseAdd(newExpense);
}

//adiciona um novo item na lista

function expenseAdd(newExpense) {
    try {
        //cria o elemento para adicionar o item
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense");
        //cria icone da categoria
        const expenseIcon = document.createElement("img");
        expenseIcon.setAttribute("src",`img/${newExpense.category_id}.svg`);
        expenseIcon.setAttribute("alt", newExpense.category_name);
        //cria a info da despesa
        const expenseInfo = document.createElement("div");
        expenseInfo.classList.add("expense-info")
        //cria o nome da despesa
        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense 
        const expenseCategory = document.createElement("span");
        expenseCategory.textContent = newExpense.category_name;
        //adiciona nome e categoria na div das informações da despesa.
        expenseInfo.append(expenseName, expenseCategory);
        //cria o valor da despesa
        const expenseAmount = document.createElement("small");
        expenseAmount.classList.add("expense-amount");
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
            .toUpperCase()
            .replace("R$", "")}`;
        //Cria ícone de remover
        const removeIcon = document.createElement("img");
        removeIcon.classList.add("remove-icon");
        removeIcon.setAttribute("src", "img/remove.svg")
        removeIcon.setAttribute("alt", "remover")
        //adiciona as informações do item.
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);
        //adiciona o item na lista
        expenseList.append(expenseItem);
        //atualiza os totais 
        updateTotals()
        
    } catch (error) {
        alert("Não foi possível atualizar a lista de despesas.");
        console.log(error);
    }
}

//atualiza os totais
function updateTotals(){
    try {
        //recupera todos os itens (li) da lista (ul)
        const items = expenseList.children
        //atualiza a quantidade de itens da lista
        expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`
        //variável para incrementar o total
        let total = 0
        //percorre cada item (li) da lista (ul)
        for(let item = 0; item < items.length; item++){
            const itemAmount = items[item].querySelector(".expense-amount");
            //Remove caracteres não numericos e substitui a vírgula pelo ponto.
            let value = itemAmount.textContent.replace(/[^\d]/g, "").replace(",", ".");
            //Converte para float
            value = parseFloat(value);
            //verifica se é um número válido
            if(isNaN(value)){
                return alert("Não foi possível calcular o total");
            }
            total += Number(value);
        }
        expensesTotal.textContent = formatCurrencyBRL(total);
    } catch (error) {
        console.log(error);
        alert("Nõ foi possível atualizar os totais.");
        
    }
}