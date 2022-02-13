const utils ={
  formatPrice:(intPrice, strCurrency = 'USD') =>{
      const formatter = new Intl.NumberFormat(navigator.language, {
          style: 'currency',
          currency: strCurrency
      });
      return formatter.format(intPrice);
  }  
};

export {utils};