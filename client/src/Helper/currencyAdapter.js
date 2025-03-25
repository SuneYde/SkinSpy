const currencyAdapter = (value) => {
  const dkk_to_eur = 0.1341;
  return (value * dkk_to_eur).toFixed(2);
};

export default currencyAdapter;
