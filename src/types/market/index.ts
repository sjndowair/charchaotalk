 interface IcautionData {
    PRICE_FLUCTUATIONS?: boolean;
    TRADING_VOLUME_SOARING?: boolean;
    DEPOSIT_AMOUNT_SOARING?: boolean;
    GLOBAL_PRICE_DIFFERENCES?: boolean;
    CONCENTRATION_OF_SMALL_ACCOUNTS?: boolean;

}

 interface IMarketEventData{
    warning?: boolean;
    caution?: IcautionData[];
}

export interface IMarketItemData {
 market?: string;
 korean_name?: string;
 english_name?: string;
 market_event? : IMarketEventData[];
}

