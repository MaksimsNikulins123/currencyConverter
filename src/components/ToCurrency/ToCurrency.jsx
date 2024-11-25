import { useState } from "react";
import { DropDownList } from "../DropDownList/DropDownList";

export const ToCurrency = ({currencies, toCurrencyConvertValue, popularCurrencies, setPopularCurrencies, toCurrency, onChangeToCurrency }) => {

  const [dropListClicked, setDropListClicked] = useState(false);

  return (
    <div className="block">
      <ul className="currencies">
        {popularCurrencies.map((cur) => (
          <li
            onClick={() => onChangeToCurrency(cur)}
            className={toCurrency === cur ? 'active' : ''}
            key={cur}>
            {cur}
          </li>
        ))}
        <li
        className={dropListClicked ? 'open' : 'close'}
        onClick={() =>setDropListClicked(!dropListClicked)}>
          <svg height="50px" viewBox="0 0 50 50" width="50px">
            <rect fill="none" height="50" width="50" />
            <polygon points="47.25,15 45.164,12.914 25,33.078 4.836,12.914 2.75,15 25,37.25 " />
          </svg>
        </li>
        {
          dropListClicked
          ? 
          <DropDownList 
            popularCurrencies={popularCurrencies}
            setPopularCurrencies={setPopularCurrencies}
            currencies={currencies} 
            setDropListClicked={setDropListClicked}
          /> 
          : 
          <></>
          }
      </ul>
      <div className="output">
        <output name="result" htmlFor="fromCurrency">{toCurrencyConvertValue}</output>
      </div>
    </div>
  )
};