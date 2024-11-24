
export const DropDownList = ({popularCurrencies, setPopularCurrencies, currencies, setDropListClicked}) => {
   

    return (
        <div className="dropDownList">
            {currencies.map((currency) => (
                <li
                onClick={() => {
                    const newPopularCurrencyArray = popularCurrencies
                        if(newPopularCurrencyArray.includes(currency)) {
                            return
                        }else {
                            newPopularCurrencyArray.pop()
                            newPopularCurrencyArray.unshift(currency)
                        }
                    setPopularCurrencies(newPopularCurrencyArray)
                    setDropListClicked(false)
                }}
                key={currency}
                >
                    {currency}
                </li>
            ))}
        </div>
    )
}