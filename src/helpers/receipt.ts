import { types, utils } from '@mutadev/muta-sdk';

/**
 * get fee of a receipt
 */
export function getFeeOfReceipt(receipt: types.Receipt): number {
  if (!receipt || !receipt.events || receipt.events.length === 0) {
    return 0;
  }

  return receipt.events
    .filter(
      (event) =>
        event.service === 'governance' && event.name === 'ConsumedTxFee',
    )
    .map<number>((event) => Number(utils.safeParseJSON(event.data).amount))
    .reduce((fee, amount) => fee + amount, 0);
}

export function isSuccessfulReceipt(receipt: types.Receipt): boolean {
  return Number(receipt.response.response.code) === 0;
}
