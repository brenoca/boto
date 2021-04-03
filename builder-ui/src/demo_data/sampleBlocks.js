module.exports = [
  {
    preview: {
      title: 'Get BTC Price',
      description: 'Reads and provides the price of BTC to the next block',
      icon: 'eye',
    },
    node: {
      title: 'Get BTC Price',
      description: '<span>Reads and provides the <span class="font-bold">BTC price</span> to the next block</span>',
      icon: 'eyeblue',
    },
  },
  {
    preview: {
      title: 'Get ETH Gas Fee',
      description: 'Reads and provides the GAS fee for the transaction to be performed.',
      icon: 'eye',
    },
    node: {
      title: 'Get ETH Gas Fee',
      description: '<span>Reads and provides the <span class="font-bold">GAS fee</span> to the next block</span>',
      icon: 'eyeblue',
    },
  },
  {
    preview: {
      title: 'Repay Loan',
      description: 'Repays a certain amount of a loan',
      icon: 'handshake-solid',
    },
    node: {
      title: 'Repay Loan',
      description: 'Repays <span class="bold">10%</span> on loan if health factor <span class="font-bold"><4</span>',
      icon: 'handshake-solid-blue',
    },
  },
  {
    preview: {
      title: 'Deposit extra funds',
      description: 'Deposits extra funds on a loan',
      icon: 'money-bill-alt-regular',
    },
    node: {
      title: 'Deposit extra funds',
      description: 'Deposits <span class="bold">2%</span> extra funds on loan if health factor <span class="font-bold"><2</span>',
      icon: 'money-bill-alt-regular-blue',
    },
  },
  {
    preview: {
      title: 'Get Health Factor',
      description: 'Gets the health factor provides it to the next block',
      icon: 'file-medical-alt-solid',
    },
    node: {
      title: 'Get Health Factor',
      description: 'Gets the health factor provides it to the next block',
      icon: 'file-medical-alt-solid-blue',
    },
  },
  {
    preview: {
      title: 'Take BTC Loan',
      description: 'Triggers actions based on the health factor',
      icon: 'landmark-solid',
    },
    node: {
      title: 'Take BTC Loan',
      description: 'Takes a loan if BTC price is below <span class="font-bold">$60,000</span>',
      icon: 'landmark-solid-blue',
    },
  },
];
