import { useEffect, useState } from 'react';
import './index.scss';
import { COPY_FETCH_JSON } from './constants/constants';
import { FromCurrency } from './components/FromCurrency/FromCurrency';
import { ToCurrency } from './components/ToCurrency/ToCurrency';

// Starting remote development
function App() {

  console.log('App component created')

  const [fromCurrency, setFromCurrency] = useState('EUR');
  const [toCurrency, setToCurrency] = useState('USD');
  const [rates, setRates] = useState({});
  const [currencies, setCurrencies] = useState([]);
  const [popularCurrencies, setPopularCurrencies] = useState(['EUR', 'USD', 'GBP', 'RUB']);
  const [fromCurrencyInput, setFromCurrencyInput] = useState(1);
  const [toCurrencyConvertValue, setToCurrencyConvertValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true)


  const convertCurrency = (input, rates, fromCurrency, toCurrency) => {
    const price = input / rates[fromCurrency];
    const convertedValue = price * rates[toCurrency]
    setToCurrencyConvertValue(convertedValue.toFixed(2))
  }
  
  
  useEffect(() => {
    const json = COPY_FETCH_JSON;
    const currenciesArray = Object.keys(json.rates);
    setCurrencies(currenciesArray);
    const rates = json.rates;
    setRates(rates)
    setIsLoading(false)
  },[])

  useEffect(() => {
    convertCurrency(fromCurrencyInput, rates, fromCurrency, toCurrency)
  },[fromCurrencyInput, rates, fromCurrency, toCurrency])

  // useEffect(() => {
      
  //     fetch('http://data.fixer.io/api/latest?access_key=361c89aa860d8da7c25a5c9c44af76cf')
  //     .then(response => response.json())
  //     .then((json) => {
  //       const currenciesArray = Object.keys(json.rates);
  //       setCurrencies(currenciesArray);
  //       setRates(json.rates) 
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       alert('Failed get info');
  //     });
  //   }, [])

const onChangeFromCurrency = (fromCurrency) => {
    setFromCurrency(fromCurrency)
    convertCurrency(fromCurrencyInput, rates, fromCurrency, toCurrency)
  }
 
const onChangeToCurrency = (toCurrency) => {
  setToCurrency(toCurrency)
  convertCurrency(fromCurrencyInput, rates, fromCurrency, toCurrency)
}
  
  
  
  
  const onChangeValue = (inputValue) => {
    if(inputValue.toString().length > 7) {
      return
    }
    setFromCurrencyInput(inputValue)
    convertCurrency(inputValue, rates, fromCurrency, toCurrency)
  }


    return (
      <div className="app">
        {
          isLoading
          ?
          <p>Loading....</p>
          :
          <>
            <FromCurrency 
              currencies={currencies}
              fromCurrencyInput={fromCurrencyInput} 
              popularCurrencies={popularCurrencies} 
              setPopularCurrencies={setPopularCurrencies}
              fromCurrency={fromCurrency} 
              onChangeValue={onChangeValue} 
              onChangeFromCurrency={onChangeFromCurrency} 
            />
            <ToCurrency 
              currencies={currencies}
              toCurrencyConvertValue={toCurrencyConvertValue} 
              popularCurrencies={popularCurrencies} 
              setPopularCurrencies={setPopularCurrencies}
              toCurrency={toCurrency} 
              onChangeToCurrency={onChangeToCurrency} 
            />
          </>
        }
        
      </div>
    )
  }


export default App;
