const calculator = document.querySelector(".calculator")
const keys = calculator.querySelector('.btnGrid')
const display = calculator.querySelector('.screen')
keys.addEventListener("click", event => {
    
    if (!event.target.closest("button")) return

    const key = event.target
    const keyValue = key.textContent
    const displayValue = display.textContent
    const type = key.dataset.type
    const {previousKeyType} = calculator.dataset


    // number key
    if (type == "number"){
        if (displayValue == "0"){
          display.textContent = keyValue
        } else if (previousKeyType == "operator") {
            display.textContent = keyValue
        } else if (previousKeyType == "equals"){
            display.textContent = keyValue
        }
        else {
          display.textContent = displayValue + keyValue
        }
        
    }

    //operator key
    if (type == "operator") {
        const operatorKeys = keys.querySelectorAll('[data-type="operator"]')
        operatorKeys.forEach(el => { el.dataset.state = '' })
        key.dataset.state = 'selected'
        
        calculator.dataset.firstNumber = displayValue
        calculator.dataset.operator = key.dataset.key
    }

    if (type == "equals"){
        //perform the calculation
        const firstNumber = parseInt(calculator.dataset.firstNumber)
        const operator = calculator.dataset.operator
        const secondNumber = parseInt(displayValue)
        console.log(firstNumber, operator, secondNumber)

        let result = ""
        if (operator == "plus") result = firstNumber + secondNumber
        if (operator == "minus") result = firstNumber - secondNumber
        if (operator == "multiply") result = firstNumber * secondNumber
        if (operator == "divide") result = firstNumber / secondNumber

        display.textContent = result
    }

    //clear key
    if (type === 'clear') {
        display.textContent = '0'
        delete calculator.dataset.firstNumber
        delete calculator.dataset.operator
      }


    calculator.dataset.previousKeyType = type
})